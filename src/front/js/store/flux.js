const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async () => {
				const options = {
					headers: {
						method: 'POST',
						"Content-Type": "application/json",
					}}
				const response = await fetch(process.env.BACKEND_URL + '/api/login', options)
				const result = await response.json()
				console.log("esto es el toke", result)
				sessionStorageStorage.setItem('token', result.access_token)
			  },
			  
			  logout: () => {
				sessionStorage.removeItem('token');
			  },
			  
			  makeRequestWithJWT: async () => {
				const options = {
				  method: 'post',
				  headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${sessionStorage.getItem('token')}`,
				  }
				};
				const response = await fetch('/private', options);
				const result = await response.json();
				return result;
			  },

			// Se crea esta fx para sincronizar el token almacenado en el sessionStorage con el estado global de la aplicación
			// makeRequestWithJWT: () => {
			// 	//1. Obtener el token del sessionStorage
			// 	const token = sessionStorage.getItem('token')
			// 	//1.1 Verificar si el token existe y no está vacío ni es undefined
			// 	if (token && token != '' && typeof token != undefined){
			// 		// 1.2. Actualizar el estado global de la aplicación con el token
			// 		setStore({token: token})
			// 	}
			// },
			// logout: () => {
			// 	// Elimina el token almacenado en la session y lo reemplaza por null para tener que volver a logearse
			// 	sessionStorage.removeItem("token");
			// 	setStore({ token: null })

			// },
		}
	};
};

export default getState;
