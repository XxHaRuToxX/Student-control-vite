import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import firebaseDB from '../../db/firebase';

import './admin.css';

export const Admin = () => {

    const [data, setData] = useState({});
    const [sort, setSort] = useState(false);
    const [sortedData, setSortedData] = useState([])

    useEffect(() => {
        firebaseDB.child('students').on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() })
            } else {
                setData({})
            }
        });

        return () => {
            setData({});
        }
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('¿Está seguro de querer eliminar al estudiante?')) {
            firebaseDB.child(`students/${id}`).remove((err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success('Estudiate eliminado correctamente!!')
                }
            });
        }
    };

    const handleChangeSelect = (e) => {
        setSort(true);
        firebaseDB.child('students').orderByChild(`${e.target.value}`).on('value', (snapshot) => {
            let sortedData = [];
            snapshot.forEach((snap) => {
                sortedData.push(snap.val());
            })
            setSortedData(sortedData);
        })
    }

    const handleReset = () => {
        setSort(false);
        firebaseDB.child('students').on('value', (snapshot) => {
            if (snapshot.val() !== null) {
                setData({ ...snapshot.val() })
            } else {
                setData({})
            }
        });
    };

    const filterData = (value) =>{
        firebaseDB.child('students').orderByChild('status').equalTo(value).on('value', (snapshot)=>{
            if(snapshot.val()){
                setData(snapshot.val());
            }
        })
    }

    return (
        <div style={{ marginTop: '50px' }}>
            <h1>Control de estudiantes</h1>
            <label htmlFor="sort">Ordenar por:</label>
            <select name="colValue" id="" className="dropdown" onChange={handleChangeSelect} >
                <option value="">Seleccionar opción</option>
                <option value="name">Nombres</option>
                <option value="email">Correo</option>
                <option value="contact">Contacto</option>
                <option value="fees">Tarifa</option>
                <option value="status">Estado</option>
            </select>
            <label htmlFor="">Estado:</label>
            <button className="btn btn-active" onClick={()=>filterData('Pagado')}>Pagado</button>
            <button className="btn btn-inactive" onClick={()=>filterData('No pagado')} >No pagó</button>
            <button className="btn btn-reset" onClick={handleReset} >Reiniciar</button>
            <table className="table-styled">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }} >No.</th>
                        <th style={{ textAlign: "center" }} >Nombres</th>
                        <th style={{ textAlign: "center" }} >Correo</th>
                        <th style={{ textAlign: "center" }} >Contacto</th>
                        <th style={{ textAlign: "center" }} >Fees</th>
                        <th style={{ textAlign: "center" }} >Estado</th>
                        {
                            !sort && <th style={{ textAlign: "center" }} >Acciones</th>
                        }
                    </tr>
                </thead>
                {
                    !sort && (
                        <tbody>
                            {
                                Object.keys(data).map((id, index) => {
                                    return (
                                        <tr key={id}>
                                            <th>{index + 1}</th>
                                            <th>{data[id].name}</th>
                                            <th>{data[id].email}</th>
                                            <th>{data[id].contact}</th>
                                            <th>{data[id].fees}</th>
                                            <th>{data[id].status}</th>
                                            <td>
                                                <Link to={`/update/${id}`}>
                                                    <button className="btn btn-edit">Editar</button>
                                                </Link>
                                                <button className="btn btn-delete" onClick={() => handleDelete(id)} >Eliminar</button>
                                                <Link to={`/view/${id}`}>
                                                    <button className="btn btn-view">Ver</button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    )
                }
                {
                    sort && (
                        <tbody>
                            {
                                sortedData.map((item, index)=>{
                                    return(
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <th>{item.name}</th>
                                            <th>{item.email}</th>
                                            <th>{item.contact}</th>
                                            <th>{item.fees}</th>
                                            <th>{item.status}</th>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    )
                }
            </table>
        </div>
    )
}

