import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
// Debes importar el context.
// En el context definir un store isLoggin: inicialmente en false y se cambaira a true cuando el back devuelva un login adecuiado y volvera a false cuando hagas un logout
// en el context definir una actions quer cambie  el valor isLogin de false a true y de true a false
// esa actions se modifica en el componente login en el componente logout 


export const Private = () => {
    // definir el context 
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const handleLogout = () => {
        actions.logout();
        navigate('/')
    };
    
    // let isLogin =  true  // esto debe venir del context, temporalm lo escribimos aca para probar
    return ( 
       store.isLoggedIn ?
            <div className= "container">
                
               
                            </div>
        : 
            <div className= "container">
                <h1>Private component</h1>
                <h2>Te has logueado correctamente</h2>
                 <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
            </div>
            
    )
}