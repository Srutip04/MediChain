import React, { useState, useEffect } from "react";

const ViewAllMeds = (props) => {
  console.log("acc:", props.account);
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [supplyChain] = useState(props.supplyChain);
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    async function fetchProducts() {
      const productCount = await supplyChain.methods.prodCnt().call();
      const fetchedProducts = [];
      for (let i = 1; i <= productCount; i++) {
        const product = await supplyChain.methods.products(i).call();
        fetchedProducts.push(product);
      }
      setProducts(fetchedProducts);
    }
    fetchProducts();
  }, [supplyChain]);
    return (
      <div>
        <h2>All Products</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Batch Number</th>
              <th>Manufacturing Date</th>
              <th>Expiry Date</th>
              <th>Price</th>
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.pid}>
                <td>{product.name}</td>
                <td>{product.batchNumber}</td>
                <td>
                  {new Date(
                    product.manufacturingDate * 1000
                  ).toLocaleDateString()}
                </td>
                <td>
                  {new Date(product.expiryDate * 1000).toLocaleDateString()}
                </td>
                <td>{product.price}</td>
                <td>{product.manufacturer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default ViewAllMeds;
