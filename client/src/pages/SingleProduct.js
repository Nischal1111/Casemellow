import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"
import "../css/Singleproduct.css"
import { useDispatch,useSelector } from "react-redux";
import { selectCart } from "../redux/CartSlice"; 
import { addToCart } from "../redux/CartSlice";
import {motion as m} from "framer-motion"



export default function SingleProduct(){
    const [productData,setProductData] = useState([])
    const [loading,setLoading] = useState(false)
    const [message, setMessage] = useState('');
    const cart = useSelector(selectCart); 
    const url = "http://localhost:4000";

    const dispatch = useDispatch()

    const productId = useParams() 

    const getSingleProduct = async() => { 

        try{
            setLoading(true)
            const response = await axios.get(`${url}/get-single-product/${productId.id}`)
            setProductData(response.data)
            if(response.status !== 200){
                console.log("Error getting single product data")
            }
        }catch(error){
            console.log("Error getting single product data :",error)
        } finally{
            setLoading(false)
        }

    }
    useEffect(() => {
        getSingleProduct()
    },[productId.id])

   const handleAddToCart = () => {
        if (productData) {
            const { _id } = productData;
            const isItemInCart = cart.find(item => item.id === _id);
            if (isItemInCart) {
                setMessage('Item is already in the cart');
            } else {
                const { coverPhoto, coverName, coverDescription, coverPrice, coverType, coverCategory } = productData;
                dispatch(addToCart({ img: url + '/' + coverPhoto, Cname: coverName, desc: coverDescription, price: coverPrice, id: _id, type: coverType, category: coverCategory }));
                setMessage('Item Added');
            }
            setTimeout(() => {
                setMessage('');
            }, 1500);
        }
    };

    return(
      <>
      <m.div
      initial={{opacity:0}} 
      animate={{opacity:1}}
      exit={{opacity:0}}
      transition={{duration:1,ease:"easeOut"}}
      >
      <Navbar/>
      <Sidebar/>
     {message && <div className={`item-added ${message === 'Item is already in the cart' ? 'already-in-cart' : ''}`}>{message}</div>}
        <div className="single-card">
            {productData && (
  <div className="min-h-screen bg-gray-100 p-4">
    <div className="flex gap-8 p-4 rounded-md bg-white shadow-md">
      <div className="flex-shrink-0 w-1/2">
        <img
          src={url + '/' + productData.coverPhoto}
          alt={productData.name}
          className="product-image"
        />
      </div>
      <div className="flex-grow">
        <div className="mb-4">
          <span className="text-sm">Product Id: {productData._id}</span>
          <h2 className="text-3xl font-semibold mt-2 mb-4">{productData.coverName}</h2>
          <p className="text-lg font-semibold text-red-600">{`Rs ${productData.coverPrice}`}</p>
          <p className="text-lg  ">{`Type: ${productData.coverType}`}</p>
          <p className="text-lg ">{`Category: ${productData.coverCategory}`}</p>
        </div>
        <p className="text-lg ">{`${productData.coverDescription}`}</p>
        <div className="mt-4">
          <button
            className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 w-40"
            onClick={()=>handleAddToCart()}
          >
            Add to Cart
          </button>
        </div>
        <Link to="/">
        <button className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 mt-2  w-40">
          Go Back
        </button>
        </Link>
      </div>
    </div>
  </div>
)}

        </div>
      </m.div>

      </>
    )}