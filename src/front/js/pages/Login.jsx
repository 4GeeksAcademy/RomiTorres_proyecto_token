import React, { useState, useContext} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";



export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // para obtener el token almacenado en el sessionStorage
    const token = sessionStorage.getItem('token');

    const handleClick = (e) => {
        e.preventDefault();
        actions.login(email, password);
           
        // Agrega una redirección después de iniciar sesión
        navigate('/private');
    };

    // const handleLogout = () => {
    //     actions.logout();
    //     navigate('login')
    // };

    return (

        <form className="container ">
            {store.isLoggedIn ? (
                <div>
                    <p> Ha iniciado sesión correctamente: {store.email}</p> 
                <button type="button" className="btn btn-danger" id="logout" onClick={handleLogout}>Cerrar sesión</button>
                </div>
                
            ) : (
            <div className="card">
                <div className="row mb-3" id="email">
                    <div className="col-sm-10">
                        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail3" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="row mb-3" id="contraseña">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Contraseña</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword3" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="mt-6">
                    <button type="submit" className="btn btn-primary" id="ingresar" onClick={handleClick}>Iniciar sesión</button>
                </div>
              
                <hr className="m-4"/>
                <div className="ml-auto" id="register">
					<Link to="/signup">
						<button className="btn btn-primary">Registrarse</button>
					</Link>
				</div>
            </div>
            
           ) }
        </form>

    )
}