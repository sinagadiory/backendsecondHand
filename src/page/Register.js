import React, { useState } from 'react'
import gambar from "../image/SecondHand.png"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import axios from 'axios';
import styles from "./styles/Login.module.css"

const style = {
    position: "absolute", width: "40px", height: "20px", margin: '-32px 358px', color: "gray", cursor: "pointer"
}

export default function Register() {
    let [showPassword, setShowPassword] = useState(true);
    const checkShowPassword = () => setShowPassword(!showPassword);

    let [showPassword1, setShowPassword1] = useState(true);
    const checkShowPassword1 = () => setShowPassword1(!showPassword1);
    const [nama, SetNama] = useState("")
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [confpassword, SetConfpassword] = useState("")
    const [msg, setmsg] = useState("")
    const navigasi = useNavigate()

    const register = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/register", {
                nama: nama,
                email: email,
                password: password,
                confpassword: confpassword
            })
            navigasi(`/konfirmasi/${email}`)
        } catch (error) {
            if (error.response) {
                setmsg(error.response.data.msg)
                console.log(error.response.data);
            }
        }
    }

    return (
        <>
            <div className='row g-0'>
                <div id={styles.gambar} className='col-lg-6'>
                    <img style={{ width: "100%" }} src={gambar} alt="SecodHand" />
                </div>
                <div className='col-lg-6 col-sm-12 align-self-center'>
                    <Form className='p-5' onSubmit={register} >
                        <Form.Group>
                            <Col sm="9" style={{ marginRight: "auto", marginLeft: "auto" }}>
                                <h2>Register</h2>
                                <h5 className='text-center'>{msg}</h5>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicName" >
                            <Col sm="9" style={{ marginRight: " auto", marginLeft: "auto" }}>
                                <Form.Label>Nama</Form.Label>
                                <Form.Control style={{
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }} type="text" placeholder="Nama Lengkap" pattern="(?=.*[a-z])(?=.*[A-Z]).{1,20}" className="form-control" value={nama} onChange={(e) => SetNama(e.target.value)} title="Harus Memuat huruf besar dan huruf kecil" required />
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Col sm="9" style={{ marginRight: " auto", marginLeft: "auto" }}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control style={{
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }} type="email" placeholder="Enter email" value={email} onChange={(e) => SetEmail(e.target.value)} /></Col>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword1">
                            <Col sm="9" style={{ marginRight: " auto", marginLeft: "auto" }}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control style={{
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }} type={showPassword ? "password" : "text"} placeholder="Password" value={password} onChange={(e) => SetPassword(e.target.value)} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Harus berisi setidaknya satu angka dan satu huruf besar dan kecil, dan setidaknya 8 karakter atau lebih" required />
                                {showPassword ? <BsEyeSlash style={style} onClick={checkShowPassword} /> : <BsEye style={style} className='icon' onClick={checkShowPassword} />}
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Col sm="9" style={{ marginRight: " auto", marginLeft: "auto" }}>
                                <Form.Label>Konfirmasi Password</Form.Label>
                                <Form.Control style={{
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }} type={showPassword1 ? "password" : "text"} placeholder="Konfirmasi Password" value={confpassword} onChange={(e) => SetConfpassword(e.target.value)} />
                                {showPassword1 ? <BsEyeSlash style={style} onClick={checkShowPassword1} /> : <BsEye style={style} className='icon' onClick={checkShowPassword1} />}
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col sm="9" style={{ marginRight: " auto", marginLeft: "auto" }}>
                                <Button className="form-control" type="submit" style={{
                                    background: '#7126B5',
                                    borderColor: '#7126B5',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }}>
                                    Register
                                </Button>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col sm="9" style={{ marginRight: " auto", marginLeft: "auto" }}>
                                <h6 className="text-center mt-3">
                                    Sudah punya akun?{' '}
                                    <Link style={{ textDecoration: 'none' }} to="/login">
                                        <span style={{ color: '#7126B5' }}>Masuk di sini</span>
                                    </Link>
                                </h6>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>
    )
}
