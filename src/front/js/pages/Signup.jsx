import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {
    const [signup, setSignup] = useState([])
    const userView = JSON.parse(sessionStorage.getItem('signupLocal'))
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const navegate = useNavigate()


    const fetchSignup = async () => {
        if (sessionStorage.getItem('signupLocal') !== null) {
            setSignup(JSON.parse(sessionStorage.getItem('signupLocal')))
        } else {
            // hacer un fetch al edpoint /api/user method POST
            // definir las options = objeto header, method 
            const options = {
                method: 'POST',
                body: {
                    "email": email,
                    "password": password,
                    "name": name,
                    "lastname": lastname,
                    "is_active": true
                }

            }
            const response = await fetch(process.env.BACKEND_URL + '/api/users', options);
            if (response.ok) {
                const data = await response.json();
                setSignup(data);
                sessionStorage.setItem('signupLocal', JOSN.stringify(data))
            } else {
                console.log('error:', response.status, response.statusText)
            }
        }
    }

    // useEffect(() => {
    //     fetchSignup();
    // }, []);

    const handleOnclick = (e) => {
        e.preventDefault();
        fetchSignup()
            .then( () => {
                navegate('/login')
            })
    }

    return (
        <form className="row g-3 container">
            <div className="col-md-6">
                <label htmlFor="validationServer01" className="form-label">Nombre</label>
                <input type="text" className="form-control " id="validationServer01" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div className="col-md-6">
                <label htmlFor="validationServer02" className="form-label">Apellido</label>
                <input type="text" className="form-control " id="validationServer02" value={lastname} onChange={e => setLastname(e.target.value)} required />
            </div>
            <div className="row container">
                <div className="col-md-6">
                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="col mb-6" id="contraseña">
                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Contraseña</label>
                <div className="col-md-10">
                    <input type="password" className="form-control" id="inputPassword3" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
            </div>
            </div>
            
            <div className="col-12">
                <button className="btn btn-primary" type="submit" onAuxClick={handleOnclick}>Enviar</button>
            </div>
        </form>



    )


}
