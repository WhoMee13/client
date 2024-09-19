import React, { useEffect, useState } from "react";
import "../../css/Home.scss";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/authContext";
import ProductCard from "../../components/ProductCard";
function Home() {
    const {value,_} = useAuth()
    const [products,setProducts] = useState()
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await fetch("/api/product",{
                method:'get',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${value.token}`
                }
            })
            const data = await response.json()
            console.log(data)
            if(data.success){
                setProducts(data.data)
            }
        }
        fetchData()
    },[value.token])
  return (
    <>
        <Navbar></Navbar>
        <h1>Welcome to Modern Muse..</h1>
        <div className="container">
            {products?products.map(ele=><ProductCard product={JSON.stringify(ele)}></ProductCard>):<div>No products avalable</div>}
        </div>
        <Footer></Footer>
    </>
  );
}

export default Home;
