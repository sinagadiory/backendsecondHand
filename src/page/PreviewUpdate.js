import React, { useState, useEffect } from 'react'
import Nav from "../components/Nav"
import { BsListUl, BsPerson } from 'react-icons/bs';
import { IoMdNotificationsOutline } from "react-icons/io"
import { useNavigate } from 'react-router-dom';
import style from "./styles/Preview.module.css"
import { Button } from "react-bootstrap"
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import secondHand from "../image/camera.png"

export default function PreviewUpdate({ foto, prew, updateProduct, deskripsi, nama_produk, kategori, id_kategori, harga, Produk, Products }) {
    const [user, SetUser] = useState("")

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

    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(money);
    };

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
            <div className='container-fluid p-4'>
                <div className='row justify-content-md-center g-1'>
                    <div className='col-lg-6'>
                        {foto !== undefined ? <img className='p-4' src={foto} width="100%" /> : <img className='p-4' src={Produk.foto} width="100%" />}
                        <div className={style.kanan}>
                            <strong style={{ fontSize: "20px" }}>Deskripsi</strong><br />
                            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p> */}
                            {/* {deskripsi === "" ? (Produk.deskripsi === "" ? <p style={{ textAlign: "center", fontSize: "18px" }}>Deskripsi Kosong!!</p> : <p>{Produk.deskripsi}</p>) : <p>{deskripsi}</p>} */}
                            {deskripsi !== undefined ? <p>{deskripsi}</p> : <p>{Produk.deskripsi}</p>}

                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className={style.kanan}>
                            {nama_produk !== undefined ? <strong>{nama_produk}</strong> : <strong>{Products.nama_produk}</strong>}<br />
                            {/* <h3>{Produk.nama_produk}</h3> */}
                            {/* <small>Kategori {kategori.filter((kat) => kat.id == id_kategori).map(kat => (kat.macam))}</small> */}

                            {id_kategori !== undefined ? <small>{kategori.filter((kat) => kat.id == id_kategori).map(kat => (kat.macam))}(Kategori)</small> : <small>{kategori.filter((kat) => kat.id == Produk.id_kategori).map(kat => (kat.macam))}(Kategori)</small>}

                            {harga !== undefined ? <strong className='mt-3 d-block'>{formatRupiah(harga)}</strong> : <strong className='mt-3 d-block'>{formatRupiah(Produk.harga)}</strong>}

                            <div className='row'>
                                <div className='col-lg-12 col-6'>
                                    <Button onClick={updateProduct} className="form-control mt-2" type="submit" style={{
                                        background: '#7126B5',
                                        borderColor: '#7126B5',
                                        borderRadius: '16px',
                                        padding: '12px 16px',
                                    }}>
                                        Update
                                    </Button>
                                    <Toaster
                                        containerStyle={{
                                            top: 230,
                                            left: 20,
                                            bottom: 20,
                                            right: 20,
                                        }}
                                    />
                                </div>
                                <div className='col-lg-12 col-6'>
                                    <Button onClick={prew} className="form-control mt-2" style={{
                                        background: 'white',
                                        borderColor: '#7126B5',
                                        borderRadius: '16px',
                                        padding: '12px 16px',
                                        color: "black",
                                        marginRight: "5px"
                                    }}>
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={style.kanan} style={{ display: "flex" }}>
                            <div>
                                {user.image === null ? <img src={secondHand} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" /> : <img src={user.image} className="rounded-circle mx-2" width="60px" height="60px" alt="userimage" />}
                            </div>
                            <div>
                                <strong>{user.nama}</strong><br />
                                <p>{user.kota}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
