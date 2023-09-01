import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
// Debes importar el context.
// En el context definir un store isLoggin: inicialmente en false y se cambaira a true cuando el back devuelva un login adecuiado y volvera a false cuando hagas un logout
// en el context definir una actions quer cambie  el valor isLogin de false a true y de true a false
// esa actions se modifica en el componente login en el componente logout 


export const Private = () => {
    // definir el context 
    const { store, actions } = useContext(Context);
    
    let isLogin =  true  // esto debe venir del context, temporalm lo escribimos aca para probar
    return ( 
        isLogin ?
            <div className= "container">
                <h1>Private component</h1>
                <h2>Aca quiero mostrar el usuario</h2>
                <p>Mostrar lo necesario al componente privado, por ejemplo dashboard, edicion de perfil </p>
            </div>
        : 
            <div className= "container">
                <h1>Debe loguearse</h1>
            </div>
            
    )
}