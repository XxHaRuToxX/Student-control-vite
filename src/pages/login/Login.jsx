import React, { useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';

import './login.css';

export const Login = () => {

    const [isRegister, setIsRegister] = useState(false);
    const { signUp, logIn } = useUserAuth();

    const handlerSubmit = (e) => {
        e.preventDefault();
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const rol = e.target.elements.rol.value;

        console.log('Submit', email, password, rol);

        if (isRegister) {
            signUp(email, password, rol);
        }else{
            logIn(email, password)
        }
    }

    return (
        <div className="main_div_login">
            <div className="second_div_login">
                <h1>{isRegister ? "Registrate" : "Inicia sesión"}</h1>
                <form 
                    onSubmit={handlerSubmit}
                    style={{
                        margin: 'auto',
                        padding: '1rem',
                        maxWidth: '450px',
                        alignContent: 'center'
                    }}
                >
                    <label htmlFor="email">Correo:</label>
                    <input
                        type="email"
                        placeholder="Correo..."
                        id="email"
                    />
                    <label htmlFor="password">Contraseña:</label>
                    <input
                    style={{height:'20px'}}
                        type="password"
                        placeholder="Contraseña..."
                        id="password"
                    />
                    <br />
                    <label hidden htmlFor="rol">Rol:</label>
                    <select hidden style={{ width: '50%' }} id="rol" >
                        <option hidden value="admin">Administrador</option>
                        <option hidden value="user">Usuario</option>
                    </select>
                    <input style={{ width: '50%' }} type={'submit'} value={isRegister ? 'Registrar' : 'Iniciar sesión'} />
                </form>
                <button hidden onClick={() => setIsRegister(!isRegister)} >{isRegister ? "Ya tengo una cuenta" : "Quiero registrarme"}</button>
            </div>
        </div>
    )
}
