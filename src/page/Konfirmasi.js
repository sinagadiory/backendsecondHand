import React, { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import swal from 'sweetalert'

export default function Konfirmasi() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const { email } = useParams()
    const [user, SetUser] = useState("")
    const [pesan, SetPesan] = useState("")
    const [OTP, SetOTP] = useState("")
    const fetchdata = async () => {
        const response = await fetch(`http://localhost:8000/usernama/${email}`)
        const data = await response.json()
        SetUser(data)
        if (data.verifikasi === "1") {
            setShow(false)
        }
    }

    useEffect(() => {
        fetchdata()
    }, []);

    const konfirmasi = async () => {
        if (user.OTP !== OTP) {
            SetPesan("OTP Salah")
            return
        }
        await axios.put(`http://localhost:8000/update/${user.id}`, {
            verifikasi: "1"
        })
        setShow(false)
        await swal("Registrasi Berhasil!", "success");
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Konfirmasi Email Mu!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{pesan}</p>
                    <input type="text" placeholder='Masukan OTP yang sudah dikirim ke email mu' className="form-control" onChange={(e) => SetOTP(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={konfirmasi}>
                        Konfirmasi
                    </Button>
                </Modal.Footer>
            </Modal>
            <Login />
        </>
    )
}
