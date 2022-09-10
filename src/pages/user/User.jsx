import React from 'react';
import { useUserAuth } from '../../context/UserAuthContext';

export const User = () => {

    const { logOut } = useUserAuth();

    const handleLogout = () =>{
		logOut()
	}

    return (
        <div>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    )
}
