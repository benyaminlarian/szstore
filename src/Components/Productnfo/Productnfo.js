import React, { useState } from "react";
import "./Productnfo.css";
import { FaPlus, FaMinus } from "react-icons/fa6";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import Comments from "../Comments/Comments";
import { FcLikePlaceholder } from "react-icons/fc";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function Productnfo() {
  const { productCode } = useParams();
  const [imgSrcTopProduct, setImgSrcTopProduct] = useState('');
  const[countProduct , setCountProduct] = useState(1)
  const [product, setProduct] = useState({});

    const handleAddToBasket = async () => {
    const requestBody = {
      productID: product.id,
      quantity: countProduct,
    };

    try {
      console.log(requestBody)
      const response = await fetch('https://localhost:7090/api/Orders/addToBasket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to add product to basket');
      }

      const data = await response.json();
                Swal.fire({
                  title:"شما با موفقیت وارد اکانت خود شدید",
                  icon:"success",
                  confirmButtonText:"بستن"
                })
      // Optional: show a success message or update UI
    } catch (error) {
      console.error('Error adding to basket:', error);
      // Optional: show an error message to the user
    }
  };

  useEffect(() => {
    if (!productCode) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://localhost:7090/api/Products/prod/${productCode}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const product = await response.json();
        console.log(product)
        setProduct(product)
        setImgSrcTopProduct(product.mainImage)
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [productCode]);


  const minesCountProduct = () =>{
    if(countProduct !== 1){
      setCountProduct(countProduct - 1)
    }
  }

  

  return (
    <>
      <div className="product-info-parent">
        <div className="top-product-info-parent">
          <div className="right-top-product-info-parent">
            <div className="images-right-top-product-info-parent">
                        {[product.mainImage, ...((product.images || "").split(',').filter(Boolean))].map((img, idx) => (
            <div key={idx} className="images-item-right-top-product-info-parent">
              <img
                src={img}
                className="images-right-top-product-info"
                alt=""
                onClick={() => setImgSrcTopProduct(img)}
              />
            </div>
          ))}
            </div>
            <div className="main-image-right-top-product-info-parent">
              <img src={imgSrcTopProduct} className="main-image-right-top-product-info" alt="" />
            </div>
          </div>
          <div className="left-product-info-parent">
            <p className="gray-text-color">{product.name}</p>
            <div className="title-icon-top-product-info-parent">
            <h3 className="text-left-product-info">{product.partNo}</h3>
            <FcLikePlaceholder className="is-icon-like-top-product-info"/>
            </div>
            <span className="score-top-product-info">4.5</span>
            <br />
            <p className="gray-text-color">{product.description}</p>
            <span className="price-top-product-info">{product.noOffPrice}</span>
            <span className="price-top-product-info-off">{product.price}</span>
            <br /><br />
            <p className="text-left-product-info">رنگ ها:</p>
            <div className="color-item-top-product-info-parent">
              <div className="color-top-product-info-parent">
                <span className="color-top-product-info"></span>
              </div>
              <div className="color-top-product-info-parent">
                <span className="color-top-product-info"></span>
              </div>
              <div className="color-top-product-info-parent">
                <span className="color-top-product-info"></span>
              </div>
            </div>
            <br />
            <p className="text-left-product-info">تعداد</p>
            <div className="add-count-top-product-info-parent">
              <span className="count-top-product-info-parent">
                <FaMinus className="icon-count-top-product-info" onClick={()=> minesCountProduct()}/>
                {countProduct}
                <FaPlus className="icon-count-top-product-info" onClick={()=> setCountProduct(countProduct+1)}/>
              </span>
              <button className="add-to-cart-button-top-product-info" onClick={handleAddToBasket}>افزودن به سبد خرید</button>
            </div>
          </div>
        </div>
        
        <SimilarProducts/>

        <Comments/>
      </div>
    </>
  );
}
