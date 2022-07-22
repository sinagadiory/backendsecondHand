import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"
import { BsListUl, BsPerson } from 'react-icons/bs';
// import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdNotificationsOutline } from "react-icons/io"
// import ToastContainer from 'react-bootstrap/ToastContainer';
import Card from '../components/card/Card';
import Carousel from '../components/carousel';
import secondHand from "../image/camera.png"
axios.defaults.withCredentials = true;

export default function Home() {
    const [showA, setShowA] = useState(false);
    const [user, SetUser] = useState("")
    const navigasi = useNavigate()
    const content = <input style={{ borderRadius: "15px", background: '#EEEEEE' }} className="form-control me-2 mx-3" type="search" placeholder="Cari disini.." aria-label="Search"></input>

    const fetchdata = async () => {
        try {
            let response = await axios.get("http://localhost:8000/token", {
                withCredentials: true
            })
            const decoded = jwt_decode(response.data.accessToken)
            response = await fetch(`http://localhost:8000/user/${decoded.id}`)
            const data = await response.json()
            SetUser(data)
        } catch (error) {
            navigasi("/")
        }
    }

    useEffect(() => {
        fetchdata()
    }, []);

    const contentUser = <div className='flex'>
        {user.image == null ? <img className='rounded-circle' src={secondHand} width="60px" height="65px" /> : <img src={user.image} className="rounded-circle " width="60px" height="65px" alt="imageuser" />}
        <i><strong className='mx-1' style={{ fontSize: "15px" }}>{user.nama}</strong></i>
    </div>

    const toggleShowA = () => setShowA(!showA);
    const Logout = async (e) => {
        e.preventDefault()
        await axios.delete("http://localhost:8000/logout", {
            withCredentials: true
        })
        navigasi("/")
    }

    const content1 = <div>
        <BsListUl onClick={() => navigasi("/daftarjual")} style={{ width: "45px", height: "22px", cursor: "pointer" }} />
        <IoMdNotificationsOutline onClick={toggleShowA} style={{ width: "45px", height: "22px" }} />
        <BsPerson onClick={() => navigasi("/infoprofil")} style={{ width: "45px", height: "22px", cursor: "pointer" }} />
        <button onClick={Logout} className='btn btn-outline-danger'>Logout</button>
    </div >
    return (
        <>
            <Nav contentUser={contentUser} content={content} content1={content1} />
            <Carousel />

            <div className='container'>
                <Card user={user} />
            </div>
        </>
    )
}
