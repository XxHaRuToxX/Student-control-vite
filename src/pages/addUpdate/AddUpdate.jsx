import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserAuth } from '../../context/UserAuthContext';
// import QrCode from 'qrcode';
// import { Buffer } from 'buffer';

import firebaseDB from '../../db/firebase';

import './addUpdate.css';

const initialState = {
    code: '',
    name: '',
    email: '',
    contact: '',
    fees: '92883',
    status: ''
}

export const AddUpdate = () => {

    const [state, setState] = useState(initialState);
    const [data, setData] = useState(initialState)
    // const [qrCode, setQrCode] = useState('');
    const { signUp } = useUserAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    const { code, name, email, contact, fees, status } = state;

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

    useEffect(() => {
        if (id) {
            setState({ ...data[id] })
        } else {
            setState({ ...initialState })
        }
    }, [id, data])


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setState({
            ...state,
            [name]: value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!id) {
            // let buff = new Buffer(qrCode, 'base64');
            // let base64ToStringNew = buff.toString('ascii');
            const rol = e.target.elements.rol.value;
            const password = e.target.elements.password.value;

            if (!code || !name || !email || !contact || !fees || !status) {
                toast.error("Todos los campos son requeridos")
            } else {
                firebaseDB.child('students').push(state, (err) => {
                    if (err) {
                        toast.error(err);
                    } else {
                        toast.success("Estudiante agregado correctamente!")
                    }
                });
                signUp(email, password, rol)
            }
        } else {
            firebaseDB.child(`students/${id}`).set(state, (err) => {
                if (err) {
                    toast.error(err);
                } else {
                    toast.success('Estudiante actualizado correctamente!')
                }
            })
        }
        setTimeout(() => navigate('/'), 500);
    }

    // const generateQrCode = async () => {
    //     try {
    //         const responde = await QrCode.toDataURL(code);
    //         setQrCode(responde);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // console.log('QR', qrCode);
    // let buff = new Buffer(qrCode, 'base64');
    // let base64ToStringNew = buff.toString('ascii');
    // console.log('A String', base64ToStringNew)
    return (
        <div style={{ marginTop: '50px' }}>

            {/* <button onClick={() => generateQrCode()} >Generar</button> */}
            <form
                onSubmit={handleSubmit}
                style={{
                    margin: 'auto',
                    padding: '1rem',
                    maxWidth: '450px',
                    alignContent: 'center'
                }}
            >
                <label htmlFor="code">Código de estudiante</label>
                <input
                    type="text"
                    placeholder="Código de estudiante..."
                    id="code"
                    value={code || ""}
                    name="code"
                    onChange={handleInputChange}
                />
                {/* {
                    qrCode ? (<img src={qrCode} alt="qrcode" />) : null
                } */}
                <br />
                <label htmlFor="name">Nombres</label>
                <input
                    type="text"
                    placeholder="Nombres..."
                    id="name"
                    value={name || ""}
                    name="name"
                    onChange={handleInputChange}
                />
                <br />
                <label htmlFor="rol">Rol:</label>
                <select style={{ width: '50%' }} id="rol" >
                    <option value="user">Usuario</option>
                </select>
                <br />
                <label htmlFor="email">Correo</label>
                <input
                    type={'email'}
                    placeholder="Correo..."
                    id="email"
                    value={email || ""}
                    name="email"
                    onChange={handleInputChange}
                />
                <label htmlFor="password">Contraseña:</label>
                <input
                    type={'password'}
                    placeholder="Contraseña..."
                    id="password"
                />
                <br />
                <label htmlFor="contact">Contacto</label>
                <input
                    type={'number'}
                    placeholder="Contacto..."
                    id="contact"
                    value={contact || ""}
                    name="contact"
                    onChange={handleInputChange}
                />
                <label htmlFor="fees">Tarifa</label>
                <input
                    type="text"
                    placeholder="Tarifa..."
                    id="fees"
                    value={fees || ""}
                    name="fees"
                    onChange={handleInputChange}
                />
                <label htmlFor="status">Estado</label>
                <input
                    type="text"
                    placeholder="Estado..."
                    id="status"
                    value={status || ""}
                    name="status"
                    onChange={handleInputChange}
                />
                <input type="submit" value={id ? 'Actualizar' : 'Guardar'} />
            </form>
        </div>
    )
}
