import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// import './App.css';
import { Navbar } from '../components/navbar/Navbar';
import { About } from '../pages/about/About';
import { AddUpdate } from '../pages/addUpdate/AddUpdate';
import { Admin } from '../pages/admin/Admin';
import { Search } from '../pages/search/Search';
import { View } from '../pages/view/View';

export const RoutersAdmin = () => {

    return (
        <BrowserRouter>
            <div className="App" >
                <Navbar/>
                <ToastContainer position='top-center' />
                <Routes>
                    <Route path='/' element={<Admin/>} />
                    <Route path='/add' element={<AddUpdate/>} />
                    <Route path='/update/:id' element={<AddUpdate/>} />
                    <Route path='/view/:id' element={<View/>} />
                    <Route path='/about' element={<About/>} />
                    <Route path='/search' element={<Search/>} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}