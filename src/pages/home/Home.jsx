import React from 'react';
import { RoutersAdmin } from '../../routers/RoutersAdmin';
import { RoutersUser } from '../../routers/RoutersUser';

import './home.css';

export const Home = ({user}) => {


    return (
        <div>
            {
                user.rol === 'admin' ? <RoutersAdmin/> : <RoutersUser/>
            }
        </div>
    )
}
