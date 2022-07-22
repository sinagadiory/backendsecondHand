import React from 'react'
import Nav from '../components/Nav'
import { FiLogIn } from "react-icons/fi"
import CardProduk from '../components/card/Card'
import Carousel from '../components/carousel'
import { useNavigate } from 'react-router-dom'

export default function Masuk() {
    const navigasi = useNavigate()

    const masuk = () => {
        navigasi("/login")
    }
    const content1 = <div>
        <button onClick={masuk} className='btn p-2' style={{
            backgroundColor: '#7126B5',
            color: 'white',
        }}><FiLogIn /> Masuk</button>
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
            <Carousel />
            <div className='container'>
                <CardProduk />
            </div>
        </>
    )
}
