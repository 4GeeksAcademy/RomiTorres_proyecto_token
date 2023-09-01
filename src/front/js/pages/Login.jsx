import React, { useState, useContext} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";



export const Login = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const navegate = useNavigate()

    // para obtener el token almacenado en el sessionStorage
    const token = sessionStorage.getItem('token');

    const handleClick = (e) => {
        e.preventDefault();
        actions.login(email, password)
            .then(success => {
                if(success) {
                    navegate('/private');
                } else {
                    alert("Error de inicio de sesión. Por favor, verifique su dirección de email y su contraseña")
                }
            });
    };


    return (

        <form className="container ">
            {store.token && store.token != "" && store.token !== undefined ? (
                <p> Ha iniciado sesión correctamente: {store.token}</p>
            ) : (
            <div className="card">
                <div className="row mb-3" id="email">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
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