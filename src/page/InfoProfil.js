import React, { useState, useEffect } from 'react'
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { BiArrowBack } from "react-icons/bi"
import kamera from "../image/camera.png"
import toast, { Toaster } from 'react-hot-toast';
const contentUser = <div className="my-2"
    style={{
        height: '34px',
        backgroundColor: '#4B1979',
        color: '#4B1979',
    }}>
    Navbarsa
</div>

export default function InfoProfil() {
    const [user, SetUser] = useState("")
    const [file, setFile] = useState(null);
    const navigasi = useNavigate()
    const [nama, SetNama] = useState(user.nama)
    const [kota, SetKota] = useState(user.kota)
    const [alamat, SetAlamat] = useState(user.alamat)
    const [image, SetImage] = useState(user.image)
    const [nomor_hp, SetNomor_hp] = useState(user.nomor_hp)
    const [msg, setmsg] = useState("")
    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);

    const fetchdata = async () => {
        try {
            let response = await axios.get("http://localhost:8000/token", {
                withCredentials: true
            })
            // console.log('ini lagi', response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            // console.log('ini coy', decoded);
            response = await fetch(`http://localhost:8000/user/${decoded.id}`)
            const data = await response.json()
            // console.log('data', data)
            SetUser(data)
        } catch (error) {
            navigasi("/")
        }
    }

    useEffect(() => {
        fetchdata()
    }, []);

    async function handleUploadChange(e) {
        let uploaded = e.target.files[0];
        SetImage(URL.createObjectURL(uploaded));
        setFile(uploaded);
    }

    const klik = () => {
        // toast.loading('Waiting...', { duration: 5000 });
        const content = <strong>Berhasil Di Update</strong>
        toast.success(content, {
            duration: 4000,
            // Styling
            style: { background: '#73CA5C', color: 'white', padding: "18px" },
            className: '',
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        });
        // <Toaster
        //     containerStyle={{
        //         top: 190,
        //         left: 20,
        //         bottom: 20,
        //         right: 20,
        //     }}
        // />
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const form = new FormData();

        form.append("image", file);
        try {
            if (file != null) {
                const response = await axios.put(
                    "http://localhost:8000/api/v1/profiles/:id/image/cloudinary",
                    form,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                SetImage(response.data.url)
                console.log(SetImage('inilah', response.data.url))
                await axios.put(`http://localhost:8000/update/${user.id}`, {
                    nama: nama,
                    kota: kota,
                    alamat: alamat,
                    nomor_hp: nomor_hp,
                    image: response.data.url
                })
                // navigasi("/home")
                // toggleShowA()
                klik()
                await sleep(2 * 1000)
                navigasi('/home')
            } else {
                await axios.put(`http://localhost:8000/update/${user.id}`, {
                    nama: nama,
                    kota: kota,
                    alamat: alamat,
                    nomor_hp: nomor_hp
                })
                // navigasi("/home")
                klik()
                await sleep(2 * 1000)
                navigasi('/home')

            }
        } catch (err) {
            console.log(err);
            console.log(err?.responses?.data);
            setmsg(err.response.data.msg)
        }
    }
    const Kembali = () => {
        navigasi("/home")
    }


    return (
        <>
            <Nav contentUser={contentUser} />
            <div className='container'>
                <Form className='p-5' onSubmit={handleSubmit}>
                    <h5 className='text-center'>{msg}</h5>
                    <Col sm="9" style={{ marginRight: "auto", marginLeft: "auto" }}>
                        <BiArrowBack style={{ width: "45px", height: "25px", cursor: "pointer" }} onClick={Kembali} />
                    </Col>
                    <Col sm="7" md="7" lg="7" style={{ marginRight: "0 auto", marginLeft: "auto" }}>
                        <label htmlFor="input" >
                            {image == null && user.image == null ? (
                                <img className='rounded-circle' style={{ width: "200px", height: "180px", cursor: "pointer" }} src={kamera} alt='image' />
                            ) : image == null && user.image != null ? (<img className='rounded-circle' style={{ width: "200px", height: "180px", cursor: "pointer" }} src={user.image} alt="imageuser" />) : (<img className='rounded-circle' style={{ width: "200px", height: "180px", cursor: "pointer" }} src={image} alt="photo" />)}<br /><br />
                        </label>
                    </Col>
                    <Form.Control id='input' style={{ marginRight: "auto", marginLeft: "auto", display: "none" }} type="file" onChange={handleUploadChange} />
                    {/* <Col sm="7" md="7" lg="7" className='my-2' style={{ marginRight: "auto", marginLeft: "auto" }}>
                        <Form.Control id='input' style={{ marginRight: "auto", marginLeft: "auto", display: "none" }} type="file" onChange={handleUploadChange} />
                    </Col> */}
                    <Form.Group className="mb-3" >
                        <Col sm="7" md="7" lg="7" style={{ marginRight: " auto", marginLeft: " auto" }}>
                            <Form.Label>Nama</Form.Label>
                            <Form.Control style={{
                                border: '1px solid #D0D0D0',
                                borderRadius: '16px',
                                padding: '12px 16px',
                            }} type="text" placeholder={user.nama} className="form-control" value={nama} onChange={(e) => SetNama(e.target.value)} /></Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Col sm="7" md="7" lg="7" style={{ marginRight: " auto", marginLeft: " auto" }}>
                            <Form.Label>Kota</Form.Label>
                            <Form.Control style={{
                                border: '1px solid #D0D0D0',
                                borderRadius: '16px',
                                padding: '12px 16px',
                            }} type="text" placeholder={user.kota == null ? "Kota Anda" : user.kota} value={kota} onChange={(e) => SetKota(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Col sm="7" md="7" lg="7" style={{ marginRight: " auto", marginLeft: " auto" }}>
                            <Form.Label>Alamat</Form.Label>
                            <Form.Control as="textarea" style={{
                                border: '1px solid #D0D0D0',
                                borderRadius: '16px',
                                padding: '12px 16px',
                            }} type="text" placeholder={user.alamat == null ? "Alamat Anda" : user.alamat} value={alamat} onChange={(e) => SetAlamat(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Col sm="7" md="7" lg="7" style={{ marginRight: " auto", marginLeft: " auto" }}>
                            <Form.Label>No HandPhone</Form.Label>
                            <Form.Control style={{
                                border: '1px solid #D0D0D0',
                                borderRadius: '16px',
                                padding: '12px 16px',
                            }} type="text" placeholder={user.nomor_hp == null ? "NomorHp Anda" : user.nomor_hp} value={nomor_hp} onChange={(e) => SetNomor_hp(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group>
                        <Col sm="7" md="7" lg="7" style={{ marginRight: " auto", marginLeft: " auto" }}>
                            <Button className="form-control" type="submit" style={{
                                background: '#7126B5',
                                borderColor: '#7126B5',
                                borderRadius: '16px',
                                padding: '12px 16px',
                            }}>
                                Simpan
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
        </>
    )
}
