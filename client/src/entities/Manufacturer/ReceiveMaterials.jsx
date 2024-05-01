import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
}));

const ReceiveMaterial = (props) => {
  console.log("acc:", props.account);
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [supplyChain] = useState(props.supplyChain);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetchMaterials();
  }, [supplyChain]); // Fetch materials when contract changes

  const fetchMaterials = async () => {
    const materialCount = await supplyChain.methods.materialCnt().call();
    const fetchedMaterials = [];
    for (let i = 1; i <= materialCount; i++) {
      const material = await supplyChain.methods.materials(i).call();
      fetchedMaterials.push(material);
    }
    setMaterials(fetchedMaterials);
  };

  const receiveMaterial = async (materialId) => {
    try {
      await supplyChain.methods
        .receiveMaterial(materialId)
        .send({ from: account });
      alert("Material received successfully!");
      // Refresh material list after receiving
      fetchMaterials();
    } catch (error) {
      console.error("Error receiving material:", error);
      alert("An error occurred while receiving the material.");
    }
  };

  return (
    <div>
      <h2>Material List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Material ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Supplier</StyledTableCell>
              <StyledTableCell>Manufacturer</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.mid}>
                <TableCell>{material.mid}</TableCell>
                <TableCell>{material.name}</TableCell>
                <TableCell>{material.quantity}</TableCell>
                <TableCell>{material.supplier}</TableCell>
                <TableCell>{material.manufacturer}</TableCell>
                <TableCell>
                  {material.manufacturer === account && (
                    <Button
                      variant="contained"
                      onClick={() => receiveMaterial(material.mid)}
                    >
                      Receive Material
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReceiveMaterial;
