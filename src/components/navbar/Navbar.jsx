import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';

import './navbar.css';

export const Navbar = () => {

	const [activeTab, setActiveTab] = useState("Home");
	const [search, setSearch] = useState("");
	const location = useLocation();
	const navigate = useNavigate();

	const { logOut } = useUserAuth();

	useEffect(() => {
		if (location.pathname === '/') {
			setActiveTab('Home');
		} else if (location.pathname === '/add') {
			setActiveTab('AddStudent');
		} else if (location.pathname === '/about') {
			setActiveTab('About');
		}
	}, [location]);

	const handleSubmitSearch = (e)=>{
		e.preventDefault();
		navigate(`/search?contact=${search}`);
		setSearch("");
	}

	const handleLogout = () =>{
		logOut()
	}


	return (
		<div className="header">
			<Link to={"/"}>
				<p className="logo">Student App</p>
			</Link>
			<div className="header-right">
				<form onSubmit={handleSubmitSearch} style={{display:'inline'}}>
					<input
						type="text"
						className="inputField"
						placeholder="Buscar contacto..."
						onChange={(e) => setSearch(e.target.value)}
						value={search}
					/>
				</form>
				<Link to={"/"}>
					<p
						className={`${activeTab === 'Home' ? 'active' : ''}`}
						onClick={() => setActiveTab('Home')}
					>
						Inicio
					</p>
				</Link>
				<Link to={"/add"}>
					<p
						className={`${activeTab === 'AddStudent' ? 'active' : ''}`}
						onClick={() => setActiveTab('AddStudent')}
					>
						Añadir estudiante
					</p>
				</Link>
				<Link to={"/about"}>
					<p
						className={`${activeTab === 'About' ? 'active' : ''}`}
						onClick={() => setActiveTab('About')}
					>
						Acerca
					</p>
				</Link>
				<p onClick={handleLogout}>Cerrar sesión</p>
			</div>
			
		</div>
	)
}
