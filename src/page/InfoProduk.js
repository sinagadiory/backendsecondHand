import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate, Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { BiArrowBack } from 'react-icons/bi';
import { FiPlus } from "react-icons/fi";
import styles from "./styles/InfoProduk.module.css"
import toast, { Toaster } from 'react-hot-toast';
import CurrencyFormat from 'react-currency-format';
import Preview from './Preview';
const contentUser = <div className="my-2"
    style={{
        height: '34px',
        backgroundColor: '#4B1979',
        color: '#4B1979',
    }}>
    Navbarsa
</div>

export default function InfoProduk() {
    const [file, setFile] = useState(null);
    const [token, SetToken] = useState('');
    const [user, SetUser] = useState('');
    const [id_penjual, SetId_penjual] = useState("0")
    const [id_kategori, SetId_kategori] = useState("")
    const [nama_produk, SetNama_produk] = useState("")
    const [harga, SetHarga] = useState("")
    const [stok, SetStok] = useState("")
    const [deskripsi, SetDeskripsi] = useState("")
    const [foto, SetFoto] = useState("")
    const [msg, setmsg] = useState("")
    const navigasi = useNavigate()
    const [link, SetLink] = useState("")
    const [kategori, setKategori] = useState([])
    const [preview, setPreview] = useState(false)

    const prew = () => {
        setPreview(!preview)
    }

    async function uploadFoto(e) {
        let uploaded = e.target.files[0];
        SetFoto(URL.createObjectURL(uploaded));
        setFile(uploaded);
    }

    useEffect(() => {
        fetchdata();
    }, [])

    const fetchdata = async () => {
        try {
            let response = await axios.get("http://localhost:8000/token", {
                withCredentials: true
            })
            SetToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            response = await fetch(`http://localhost:8000/user/${decoded.id}`)
            const data = await response.json()
            SetUser(data)
            response = await axios.get("http://localhost:8000/v1/Produk/add/form")
            setKategori(response.data)
            // console.log(response.data)
        } catch (error) {
            navigasi("/")
        }
    }

    const berhasil = () => {
        const content = <strong>Berhasil di Terbitkan</strong>
        toast.success(content, {
            duration: 4000,
            // Styling
            style: { background: '#73CA5C', color: 'white', padding: "22px" },
            className: '',
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        })
    }
    const gagal = (pesan) => {
        toast.error(pesan, {
            duration: 5000
        })
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const addProduct = async (e) => {
        e.preventDefault();
        const form = new FormData();

        form.append("image", file);

        try {
            if (user.kota == null || user.alamat == null || user.nomor_hp == null || user.image == null) {
                setmsg("Lengkapi Profil Dulu!!")
                SetLink(user.id)
                gagal("Lengkapi Profil Terlebih Dahulu")
                return
            }

            if (file != null) {
                let response = await axios.post("http://localhost:8000/v1/Produk/add/image/cloudinary",
                    form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }

                );
                SetFoto(response.data.url)
                response = await axios.post("http://localhost:8000/v1/Produk/add", {
                    id_penjual: user.id,
                    id_kategori: id_kategori,
                    nama_produk: nama_produk,
                    harga: harga,
                    stok: stok,
                    deskripsi: deskripsi,
                    foto: response.data.url
                })
                await axios.post("http://localhost:8000/v1/Produk/email")
                berhasil()
                await sleep(2 * 1000)
                navigasi("/home")
                // navigasi("/home");npm ru
            } else {
                await axios.post("http://localhost:8000/v1/Produk/add", {
                    id_penjual: id_penjual,
                    id_kategori: id_kategori,
                    nama_produk: nama_produk,
                    harga: harga,
                    stok: stok,
                    deskripsi: deskripsi,
                })
                // navigasi("/home");
                berhasil()
                await sleep(2 * 1000)
                navigasi('/home')
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                setmsg(error.response.data.msg)
                console.log(error.response.data);
            }
            const pesan = <strong>{error.response.data.msg}</strong>
            gagal(pesan)
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const { value = "" } = e.target;
        const parsedValue = value.replace(/[^\d,]/gi, "");
        SetHarga(parsedValue);
    };

    const Kembali = () => {
        navigasi("/home")
    }
    return (
        <>
            {preview == false ? <div>
                <Nav contentUser={contentUser} />
                <div className='container'>
                    <Form className='p-5' onSubmit={addProduct}>
                        <h4 className='text-center'>
                            {msg}<span style={{ display: "block" }} className='mx-1'>
                                {link == "" ? "" : <Link style={{ textDecoration: "none" }} to={"/infoprofil"}>Lengkapi</Link>}
                            </span>
                        </h4>
                        <Col md="9" lg="9" sm="9" style={{ marginRight: "auto", marginLeft: "auto" }}>
                            <BiArrowBack style={{ width: "45px", height: "25px", cursor: "pointer" }} onClick={Kembali} />
                        </Col>
                        <Form.Group className="mb-3" >
                            <Col md="9" lg="7" sm="7" style={{ marginRight: " auto", marginLeft: " auto" }}>
                                <Form.Label>Nama Produk</Form.Label>
                                <Form.Control style={{
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }} type="text" placeholder="Nama Produk" className="form-control" value={nama_produk} onChange={(e) => SetNama_produk(e.target.value)} /></Col>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Col md="9" lg="7" sm="7" style={{ marginRight: " auto", marginLeft: " auto" }}>
                                <Form.Label>Harga Produk</Form.Label>
                                {/* <Form.Control style={{
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }} type="text" placeholder="Harga Produk" className="form-control" value={harga} onChange={(e) => SetHarga(e.target.value)} /> */}
                                <CurrencyFormat value={harga} onChange={handleChange} style={{
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }} className='form-control' displayType={'input'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp'} placeholder="Harga Produk" />
                                {/* <CurrencyFormat value={harga} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp'} onChange={(e) => SetHarga(e.target.harga)} /> */}
                                {console.log(harga)}
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicKota">
                            <Col md="9" lg="7" sm="7" style={{ marginRight: " auto", marginLeft: " auto" }}>
                                <Form.Label>Stok Produk</Form.Label>
                                <Form.Control style={{
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }} type="text" placeholder="Jumlah Stok" value={stok} onChange={(e) => SetStok(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Col md="9" lg="7" sm="7" style={{ marginRight: " auto", marginLeft: " auto" }}>
                                <Form.Select aria-label="Default select example" style={{
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }} value={id_kategori} onChange={(e) => SetId_kategori(e.target.value)}>
                                    <option>Pilih Kategori</option>
                                    {kategori.map((kat) => (
                                        <option value={kat.id} key={kat.id}>{kat.macam}</option>
                                    ))}
                                    {/* <option value="1">Sepatu</option>
                                <option value="2">Kendaraan</option>
                                <option value="3">Elektronik</option>
                                <option value="4">Baju</option>
                                <option value="5">Celana</option> */}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicAlamat">
                            <Col md="9" lg="7" sm="7" style={{ marginRight: " auto", marginLeft: " auto" }}>
                                <Form.Label>Deskripsi Produk</Form.Label>
                                <Form.Control as="textarea" style={{
                                    border: '1px solid #D0D0D0',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }} type="text" placeholder="Deskripsi" value={deskripsi} onChange={(e) => SetDeskripsi(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Col md="9" lg="7" sm="7" style={{ marginRight: "auto", marginLeft: "auto" }}>
                            <label htmlFor="input" style={{ cursor: "pointer" }} >
                                {foto ? (
                                    <img className='rounded-circle' style={{ width: "200px", height: "180px" }} src={foto} />
                                ) : (<div style={{ textAlign: "center" }} className={styles.fotoProduk}><FiPlus className={styles["plus-icon"]} />Pilih Foto Produk
                                </div>)}<br /><br />
                            </label>
                        </Col>
                        <Form.Control id='input' style={{ marginRight: "auto", marginLeft: "auto", display: "none" }} type="file" onChange={uploadFoto} />
                        <Form.Group>
                            <Col md="9" lg="7" sm="7" className='d-flex' style={{ marginRight: " auto", marginLeft: " auto" }}>
                                <Button onClick={prew} className="form-control" style={{
                                    background: 'white',
                                    borderColor: '#7126B5',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                    color: "black",
                                    marginRight: "5px"
                                }}>
                                    Preview
                                </Button>
                                <Button className="form-control" type="submit" style={{
                                    background: '#7126B5',
                                    borderColor: '#7126B5',
                                    borderRadius: '16px',
                                    padding: '12px 16px',
                                }}>
                                    Terbitkan
                                </Button>
                                <Toaster
                                    containerStyle={{
                                        top: 230,
                                        left: 20,
                                        bottom: 20,
                                        right: 20,
                                    }}
                                />
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            </div> : <Preview orang={user} prew={prew} addProduct={addProduct} deskripsi={deskripsi} nama_produk={nama_produk} kategori={kategori} id_kategori={id_kategori} harga={harga} foto={foto} />}
        </>
    )
}
