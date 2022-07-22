import React, { useState } from 'react'
import gambar from "../image/SecondHand.png"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import { BsEyeSlash } from "react-icons/bs";
import { BsEye } from "react-icons/bs";
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import styles from "./styles/Login.module.css"

const style = {
    position: "absolute", width: "40px", height: "20px", margin: '-32px 358px', color: "gray", cursor: "pointer"
}

export default function Login() {
    let [showPassword, setShowPassword] = useState(true);
    const checkShowPassword = () => setShowPassword(!showPassword);
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [msg, setmsg] = useState("")
    const [link, SetLink] = useState("")
    const navigasi = useNavigate()

    const login = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/login", {
                email: email,
                password: password,
            }, {
                withCredentials: true,
                headers: { 'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json' }
            })
            // console.log(response.data);
            const data = await response.data
            if (data.verifikasi != "1") {
                setmsg("Email Belum Diverifikasi")
                SetLink(data.email)
                return
            }
            await axios.get("http://localhost:8000/user",
                {
                    headers: {
                        "Authorization": `Bearer ${data.accessToken}`
                    }
                }
            )
            await navigasi("/home")
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
                    <Form className='p-5' onSubmit={login}>
                        <Form.Group>
                            <Col sm="9" style={{ marginRight: "auto", marginLeft: "auto" }}>
                                <h2>Login</h2>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col sm="9" style={{ marginRight: "auto", marginLeft: "auto" }}>
                                <h5 className='text-center'>
                                    {msg}<span style={{ display: "block" }} className='mx-1'>
                                        {link == "" ? "" : <Link style={{ textDecoration: "none" }} to={`/konfirmasi/${link}`}>Verifikasi Sekarang!</Link>}
                                    </span>
                                </h5>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail" >
                            <Col sm="9" style={{ marginRight: " auto", marginLeft: " auto" }}>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control style={{
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }} type="email" placeholder="Email Anda" value={email} onChange={(e) => SetEmail(e.target.value)} /></Col>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Col sm="9" style={{ marginRight: " auto", marginLeft: " auto" }}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control style={{
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }} type={showPassword ? "password" : "text"} placeholder="Password" value={password} onChange={(e) => SetPassword(e.target.value)} />
                                {showPassword ? <BsEyeSlash style={style} onClick={checkShowPassword} /> : <BsEye style={style} className='icon' onClick={checkShowPassword} />}
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col sm="9" style={{ marginRight: " auto", marginLeft: " auto" }}>
                                <Button className="form-control" type="submit" style={{
                                    background: '#7126B5',
                                    borderColor: '#7126B5',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }}>
                                    Masuk
                                </Button>
                            </Col>
                        </Form.Group>
                        <Form.Group>
                            <Col sm="9" style={{ marginRight: " auto", marginLeft: " auto" }}>
                                <h6 className="text-center mt-3">
                                    Belum punya akun?{' '}
                                    <Link style={{ textDecoration: 'none' }} to="/register">
                                        <span style={{ color: '#7126B5' }}>Daftar di sini</span>
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
