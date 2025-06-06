import React from "react";
import "./TrendingProducts.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import CartBox from "../CartBox/CartBox";
import { useEffect, useState } from 'react';

export default function TrendingProducts() {

  const [products, setProducts] = useState([]);
    useEffect(() => {

    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:7090/api/Products/cat?Cat=New&PageNumber=0&PageSize=10');
        const data = await response.json();
        setProducts(data.itemList || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="trending-products-parent mt-5">
        <SectionHeader text="پر فروش ها" />
        <div className="trending-products">
              {products.map((product) => {
        const {
          id,
          name,
          productCode,
          price,
          noOffPrice,
          mainImage,
        } = product;

        const numberOff = Math.round(((noOffPrice - price) / noOffPrice) * 100);

        return (
          <CartBox
            key={id}
            category="هدفون" // Hardcoded or you can use actual category data if available
            shortName={productCode}
            cover={mainImage}
            price={noOffPrice}
            title={name}
            off={price}
            numberOff={numberOff}
          />
        );
      })}
        {/* <CartBox category="هدفون" shortName="هدوفن-فلان" cover="headphone-2.png" price={180000} title="هدفون فلان" off={150000} numberOff={20}/>
        <CartBox category="هدفون" shortName="هدفون-فلان-2" cover="headphone-3.png" price={200000} title="هدفون فلان 2"/>
        <CartBox category="هدفون" shortName="هدفون-فلان-3" cover="headphone-4.png" price={18000} title="هدفون فلان 3"/>
        <CartBox category="موبایل" shortName="آیپد" cover="ipad-1.png" price={150000} title="آیپد"/>
        <CartBox category="موبایل" shortName="موبایل" cover="mobile-2.png" price={350000} title="موبایل"/>
        <CartBox category="موبایل" shortName="موبایل فلان" cover="mobile-3.png" price={100000} title="موبایل فلان"/>
        <CartBox category="پردازنده" shortName="پردازنده" cover="cpu-3.png" price={250000} title="پردازنده" off={200000} numberOff={20}/>
        <CartBox category="پردازنده" shortName="پردازنده-فلان" cover="cpu-2.png" price={160000} title="پردازنده فلان"/> */}
        </div>
      </div>
    </>
  );
}
