import React, { createContext, useState, useEffect } from 'react';
import AxiosService from '../common/ApiService';

export const ProductDataCxt = createContext();

function ProductDataContext({ children }) {

  const [data, setData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosService.get('/products/allproducts');
        console.log(response)
        if (response.status === 200) {
          // Initialize quantity for each product
          const productsWithQuantity = response.data.items.map(product => ({
            ...product,
            quantity: 1 // Default quantity value
          }));
          setData(productsWithQuantity);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      } 
    };

    fetchData();
  }, []);

  const setQuantity = (id, quantity) => {
    setData(prevData =>
      prevData.map(product =>
        product._id === id ? { ...product, quantity } : product
      )
    );
  };
  console.log(data)

  return (
    <ProductDataCxt.Provider value={{ data, setQuantity }}>
      {children}
    </ProductDataCxt.Provider>
  );
}

export default ProductDataContext;
