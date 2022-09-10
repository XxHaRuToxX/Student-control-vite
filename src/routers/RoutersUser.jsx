import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { User } from '../pages/user/User';

export const RoutersUser = () => {
    return (
        <BrowserRouter>
            <div className="App" >
                <Routes>
                    <Route path='/' element={<User/>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
