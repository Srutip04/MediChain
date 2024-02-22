import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Batch Number</StyledTableCell>
              <StyledTableCell align="right">
                Manufacturing Date
              </StyledTableCell>
              <StyledTableCell align="right">Expiry Date</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Manufacturer</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <StyledTableRow key={product.pid}>
                <StyledTableCell component="th" scope="row">
                  {product.name}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {product.batchNumber}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(
                    product.manufacturingDate * 1000
                  ).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {new Date(product.expiryDate * 1000).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell align="right">{product.price}</StyledTableCell>
                <StyledTableCell align="right">
                  {product.manufacturer}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewAllMeds;
