import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from 'react-bootstrap/Card';
import { FiPlus } from "react-icons/fi"
import styles from "./styles.module.css"
import { useNavigate } from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import Button from 'react-bootstrap/Button';
import { BsFilter } from "react-icons/bs"
import toast, { Toaster } from 'react-hot-toast';

export default function CardProduk({ user }) {
    const [products, setProduct] = useState([]);
    const [produk, setProduk] = useState([])
    const [benar, SetBenar] = useState(0)
    const navigasi = useNavigate()
    const [filter, SetFilter] = useState([])
    const [angka, setAngka] = useState(0)
    const [Kategori, setKategori] = useState([])


    useEffect(() => {
        getProducts();
        getKategori();
    }, []);

    const getKategori = async () => {
        let response = await axios.get("http://localhost:8000/v1/Produk/add/form")
        setKategori(response.data)
    }

    const getProducts = async () => {
        let response = await axios.get("http://localhost:8000/v1/Produk");
        setProduct(response.data);
        setAngka(0)
        // response = await axios.get("http://localhost:8000/v1/Produk/add/form")
    };

    const klik = (jumlah) => {
        // toast.loading('Waiting...', { duration: 5000 });
        let content = null
        if (jumlah !== 0) {
            content = <strong>Ditemukan {jumlah} produk</strong>
        } else {
            content = <strong>Produk Kosong</strong>
        }
        toast(content, {
            duration: 1000,
            // Styling
            style: { background: 'rgb(113, 38, 181)', color: 'white', padding: "18px" },
            className: '',
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },
        });
    };

    const kategori = async (id) => {
        let response = await axios.get(`http://localhost:8000/v1/Produk/kategori/${id}`);
        setProduk(response.data)
        SetBenar(1)
        setAngka(id)
        if (benar !== 2) {
            klik(response.data.length)
        }
    }

    const preview = (idproduk) => {
        navigasi(`/preview/produk/${idproduk}`)
    }
    const formatRupiah = (money) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(money);
    };
    const [kondisi, setKondisi] = useState("")

    const Filter = (keadaan) => {
        setKondisi(keadaan)
        if (keadaan === "termurah") {
            if (benar === 0) {
                getProducts()
                SetFilter(products.sort(function (a, b) {
                    return a.harga - b.harga;
                }))
                SetBenar(2)
            } else if (benar === 1) {
                SetFilter(produk.sort(function (a, b) {
                    return a.harga - b.harga;
                }))
                SetBenar(1)
            } else if (benar === 2) {
                if (angka !== 0) {
                    kategori(angka)
                    SetFilter(produk.sort(function (a, b) {
                        return a.harga - b.harga;
                    }))
                    SetBenar(2)
                } else {
                    getProducts()
                    SetFilter(products.sort(function (a, b) {
                        return a.harga - b.harga;
                    }))
                    SetBenar(2)
                }
            }
        } else if (keadaan === "termahal") {
            if (benar === 0) {
                getProducts()
                SetFilter(products.sort(function (a, b) {
                    return b.harga - a.harga;
                }))
                SetBenar(2)
            } else if (benar === 1) {
                SetFilter(produk.sort(function (a, b) {
                    return b.harga - a.harga;
                }))
                SetBenar(1)
            } else if (benar === 2) {
                if (angka !== 0) {
                    kategori(angka)
                    SetFilter(produk.sort(function (a, b) {
                        return b.harga - a.harga;
                    }))
                    SetBenar(2)
                } else {
                    getProducts()
                    SetFilter(products.sort(function (a, b) {
                        return b.harga - a.harga;
                    }))
                    SetBenar(2)
                }
            }
        } else if (keadaan === "terbaru") {
            if (benar === 0) {
                getProducts()
                SetFilter(products.sort(function (a, b) {
                    return b.id - a.id;
                }))
                SetBenar(2)
            } else if (benar === 1) {
                SetFilter(produk.sort(function (a, b) {
                    return b.id - a.id;
                }))
                SetBenar(1)
            } else if (benar === 2) {
                if (angka !== 0) {
                    kategori(angka)
                    SetFilter(produk.sort(function (a, b) {
                        return b.id - a.id;
                    }))
                    SetBenar(2)
                } else {
                    getProducts()
                    SetFilter(products.sort(function (a, b) {
                        return b.id - a.id;
                    }))
                    SetBenar(2)
                }
            }
        }
    }

    return (
        <div className="pt-4">
            <div className='pt-1'>
                <h4 className='mb-3'>Telesuri Kategori</h4>
                <div className='d-flex' style={{ flexWrap: "wrap" }}>
                    <Button className='mx-2 mb-2' onClick={() => SetBenar(0)} style={{ background: "#7126B5", borderColor: "#7126B5", borderRadius: "10px" }}><BsSearch /> Semua </Button>
                    {/* <Button className='mx-2 mb-2' onClick={() => kategori(1)} style={{ background: "#E2D4F0", borderColor: "#E2D4F0", color: "black", borderRadius: "10px" }}><BsSearch /> Sepatu</Button>
                    <Button className='mx-2 mb-2' onClick={() => kategori(2)} style={{ background: "#E2D4F0", borderColor: "#E2D4F0", color: "black", borderRadius: "10px" }}><BsSearch /> Kendaraan</Button>
                    <Button className='mx-2 mb-2' onClick={() => kategori(3)} style={{ background: "#E2D4F0", borderColor: "#E2D4F0", color: "black", borderRadius: "10px" }}><BsSearch /> Elektronik</Button>
                    <Button className='mx-2 mb-2' onClick={() => kategori(4)} style={{ background: "#E2D4F0", borderColor: "#E2D4F0", color: "black", borderRadius: "10px" }}><BsSearch /> Baju</Button>
                    <Button className='mx-2 mb-2' onClick={() => kategori(5)} style={{ background: "#E2D4F0", borderColor: "#E2D4F0", color: "black", borderRadius: "10px" }}><BsSearch /> Celena</Button> */}
                    {Kategori.map((kat) => (
                        <Button className='mx-2 mb-2' onClick={() => kategori(kat.id)} style={{ background: "#E2D4F0", borderColor: "#E2D4F0", color: "black", borderRadius: "10px" }}><BsSearch />{kat.macam}</Button>
                    ))}
                    {console.log("benar", benar, "angka", angka, "kondisi", kondisi)}
                    <Toaster
                        containerStyle={{
                            top: 320,
                            left: 20,
                            bottom: 20,
                            right: 20,
                        }}
                    />
                    <div className="dropdown mx-2">
                        <button
                            className="btn btn-secondary"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <BsFilter />Filter
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><button onClick={() => Filter("termurah")} className="dropdown-item btn" href="#">Harga Termurah</button></li>
                            <li><button onClick={() => Filter("termahal")} className="dropdown-item btn" href="#">Harga Termahal</button></li>
                            <li><button onClick={() => Filter("terbaru")} className="dropdown-item btn" href="#">Produk Terbaru</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* {console.log("benar", benar)}
            {console.log(filter)}
            {console.log("angka", angka)} */}
            {/* {console.log(user)} */}
            {benar === 0 ? <div className="row" >
                {products.map((product, index) => (
                    <div key={index} className="col-lg-2 col-sm-6 col-6 col-md-6 mt-2">
                        <Card style={{ cursor: "pointer" }} onClick={() => preview(product.id)} key={product.id}>
                            <Card.Img variant="top" src={product.foto} style={{ width: "100%", height: "150px" }} alt="jam" />
                            <Card.Body>
                                <Card.Title>{product.nama_produk}</Card.Title>
                                <Card.Text>
                                    <small>{product.Kategori.macam}</small><br />
                                    <strong>{formatRupiah(product.harga)}</strong>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div> : benar === 1 ? (produk.length !== 0 ? <div className="row" >
                {produk.map((product, index) => (
                    <div key={index} className="col-lg-2 col-6 col-sm-12 col-md-6 mt-2">
                        <Card style={{ cursor: "pointer" }} onClick={() => preview(product.id)} key={product.id}>
                            <Card.Img variant="top" src={product.foto} style={{ width: "100%", height: "150px" }} alt="jam" />
                            <Card.Body>
                                <Card.Title>{product.nama_produk}</Card.Title>
                                <Card.Text>
                                    <small>{product.Kategori.macam}</small><br />
                                    <strong>{formatRupiah(product.harga)}</strong>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div> : <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Data Kategori Kosong</h1>) : (filter.length !== 0 ? <div className="row" >
                {filter.map((product, index) => (
                    <div key={index} className="col-lg-2 col-6 col-sm-12 col-md-6 mt-2">
                        <Card style={{ cursor: "pointer" }} onClick={() => preview(product.id)} key={product.id}>
                            <Card.Img variant="top" src={product.foto} style={{ width: "100%", height: "150px" }} alt="jam" />
                            <Card.Body>
                                <Card.Title>{product.nama_produk}</Card.Title>
                                <Card.Text>
                                    <small>{product.Kategori.macam}</small><br />
                                    <strong>{formatRupiah(product.harga)}</strong>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div> : <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Data Kategori Kosong</h1>)}

            <div className="row" style={{ marginTop: "-15px" }}>
                <div className="col-lg-1 col-3 col-sm-1 col-md-1" style={{ marginRight: "auto", marginLeft: "auto" }}>
                    <button onClick={() => navigasi("/infoproduk")} id={styles.jual} className="btn btn-primary"><FiPlus /> Jual</button>
                </div>
            </div>
        </div >

    )
}
