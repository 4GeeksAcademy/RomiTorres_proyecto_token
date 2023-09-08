import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {
    // const [signup, setSignup] = useState([])
    // const userView = JSON.parse(sessionStorage.getItem('signupLocal'))
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const navigate = useNavigate()


    const fetchSignup = async () => {
        // if (sessionStorage.getItem('token') !== null) {
        //     console.log("No se porque llegamos aca")
        // setSignup(JSON.parse(sessionStorage.getItem('signupLocal')))
        // } else {
        // hacer un fetch al edpoint /api/user method POST
        // definir las options = objeto header, method 
        const options = {
            headers: {
                "Content-Type": "application/json",
            },
            method: 'POST',
            redirect: 'follow',
            body: JSON.stringify({
                "email": email,
                "password": password,
                "name": name,
                "lastname": lastname,
            })

        }
        console.log(options)
        const response = await fetch(process.env.BACKEND_URL + '/api/users', options);
        console.log(response)
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            sessionStorage.setItem('signupLocal', JSON.stringify(data))
            // resetea los campos
            setEmail('');
            setPassword(''),
                setName('');
            setLastname('');
            // redirigir el componente
            navigate('/login');
        } else {
            console.log('error:', response.status, response.statusText)
        }
    }
    // }

    // useEffect(() => {
    //     fetchSignup();
    // }, []);

    const handleOnclick = (e) => {
        e.preventDefault();
        fetchSignup();
    }

    return (
        <form onSubmit={handleOnclick}>
            <div className="row g-3 container">
                <div className="col-md-6">
                    <label htmlFor="validationServer01" className="form-label">Nombre</label>
                    <input type="text" className="form-control " id="validationServer01" value={name} onChange={e => setName(e.target.value)} required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationServer02" className="form-label">Apellido</label>
                    <input type="text" className="form-control " id="validationServer02" value={lastname} onChange={e => setLastname(e.target.value)} required />
                </div>
            </div>
            <div className="row g-3 container">
                <div className="col-md-6">
                    <label htmlFor="inputEmail3" className=" col-form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                    <div className="col-md-6" id="contraseña">
                        <label htmlFor="inputPassword3" className="col-form-label">Contraseña</label>
                        <input type="password" className="form-control" id="inputPassword" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
            </div>
            <div className=" mt-4 ms-4">
                <button className="btn btn-primary" type="submit">Enviar</button>
            </div>
        </form>



    )


}
