import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import firebaseDB from '../../db/firebase';

import './view.css';

export const View = () => {

    const [student, setStudent] = useState({});
    const { id } = useParams();

    useEffect(() => {
        firebaseDB.child(`students/${id}`).get().then((snapshot)=>{
            if(snapshot.exists()){
                setStudent({...snapshot.val()});
            }else{
                setStudent({});
            }
        })
    }, [id])


    return (
        <div style={{marginTop:'50px'}} >
            <div className="card">
                <div className="card-header">
                    <p>Detalle del Estudiante</p>
                </div>
                <div className="container">
                    <strong>ID:</strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Nombres:</strong>
                    <span>{student.name}</span>
                    <br />
                    <br />
                    <strong>Correo:</strong>
                    <span>{student.email}</span>
                    <br />
                    <br />
                    <strong>COntacto:</strong>
                    <span>{student.contact}</span>
                    <br />
                    <br />
                    <strong>Fees:</strong>
                    <span>{student.fees}</span>
                    <br />
                    <br />
                    <strong>Estado:</strong>
                    <span>{student.status}</span>
                    <br />
                    <br />
                    <Link to={'/'}>
                        <button className="btn btn-edit">Regresar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
