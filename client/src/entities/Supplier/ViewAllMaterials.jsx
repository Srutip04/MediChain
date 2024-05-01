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

const ViewAllMaterials = (props) => {
  console.log("acc:", props.account);
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [supplyChain] = useState(props.supplyChain);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    async function fetchMaterials() {
      const materialCount = await supplyChain.methods.materialCnt().call();
      const fetchedMaterials = [];
      for (let i = 1; i <= materialCount; i++) {
        const material = await supplyChain.methods.materials(i).call();
        fetchedMaterials.push(material);
      }
      setMaterials(fetchedMaterials);
    }
    fetchMaterials();
  }, [supplyChain]);

  return (
    <div>
      <h2>All Materials</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Supplier</StyledTableCell>
              <StyledTableCell align="right">Manufacturer</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <StyledTableRow key={material.mid}>
                <StyledTableCell component="th" scope="row">{material.name}</StyledTableCell>
                <StyledTableCell align="right">{material.quantity}</StyledTableCell>
                <StyledTableCell align="right">{material.supplier}</StyledTableCell>
                <StyledTableCell align="right">{material.manufacturer}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ViewAllMaterials