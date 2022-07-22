import React from 'react'
import Nav from "../components/Nav"
import { BsListUl, BsPerson } from 'react-icons/bs';
import { IoMdNotificationsOutline } from "react-icons/io"
import CardSeller from '../components/cardSeller';
import { useNavigate } from 'react-router-dom';

export default function DaftarJual() {
    const navigasi = useNavigate()
    const content1 = <div>
        <BsListUl onClick={() => navigasi("/daftarjual")} style={{ width: "47px", height: "25px", cursor: "pointer" }} />
        <IoMdNotificationsOutline style={{ width: "45px", height: "25px", cursor: "pointer" }} />
        <BsPerson style={{ width: "45px", height: "25px", cursor: "pointer" }} />
    </div >
    const content = <input style={{ borderRadius: "15px", background: '#EEEEEE' }} className="form-control me-2 mx-3" type="search" placeholder="Cari disini.." aria-label="Search"></input>
    const contentUser = <div
        style={{
            height: '34px',
            backgroundColor: '#4B1979',
            color: '#4B1979',
            marginTop: "12px"
        }}>
        Navbarsa
    </div>
    return (
        <>
            <Nav content={content} content1={content1} contentUser={contentUser} />
            <CardSeller />
        </>
    )
}
