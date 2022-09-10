import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import firebaseDB from '../../db/firebase';

export const Search = () => {

    const [data, setData] = useState({});

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    let search = query.get('contact');

    const searchData = (search) => {
        firebaseDB.child('students').orderByChild('contact').equalTo(search).on('value', (snapshot) => {
            if (snapshot.val()) {
                setData(snapshot.val())
            }
        })
    };

    useEffect(() => {
        searchData(search);
    }, [search])


    return (
        <div style={{ marginTop: '50px' }}>
            <h1>Estudiantes encontrados</h1>
            <Link to={'/'}>
                <button className="btn btn-edit">Regresar</button>
            </Link>
            {
                Object.keys(data).length === 0 ? (
                    <h2>Ningun dato encontrado!!</h2>
                ) : (
                    <table className="table-styled">
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center" }} >No.</th>
                                <th style={{ textAlign: "center" }} >Nombres</th>
                                <th style={{ textAlign: "center" }} >Correo</th>
                                <th style={{ textAlign: "center" }} >Contacto</th>
                                <th style={{ textAlign: "center" }} >Fees</th>
                                <th style={{ textAlign: "center" }} >Estado</th>
                                <th style={{ textAlign: "center" }} >Acciones</th>
                            </tr>
                        </thead>
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
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}
