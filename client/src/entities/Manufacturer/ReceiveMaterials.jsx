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

const ReceiveShipment = (props) => {
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [supplyChain] = useState(props.supplyChain);
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetchShipments();
  }, [supplyChain]); // Fetch shipments when contract changes

  const fetchShipments = async () => {
    try {
      const shipmentCount = await supplyChain.methods.shipmentCnt().call();
      const fetchedShipments = [];
      for (let i = 1; i <= shipmentCount; i++) {
        const shipment = await supplyChain.methods.shipments(i).call();
        const material = await supplyChain.methods
          .getMaterialDetails(shipment.materialId)
          .call(); // Fetch material details
        shipment.material = material; // Add material details to the shipment object
        fetchedShipments.push(shipment);
      }
      setShipments(fetchedShipments);
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  const receiveMaterial = async (shipmentId) => {
    console.log(shipmentId)
    try {
      await supplyChain.methods
        .receiveMaterial(shipmentId)
        .send({ from: account });
      alert("Material received successfully!");
      // Refresh material list after receiving
      fetchShipments();
    } catch (error) {
      console.error("Error receiving material:", error);
      alert("An error occurred while receiving the material.");
    }
  };

  return (
    <div>
      <h2>Shipment List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Shipment ID</StyledTableCell>
              <StyledTableCell>Material ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Supplier</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map((shipment) => (
              <TableRow key={shipment.shipmentId}>
                <TableCell>{shipment.shipmentId}</TableCell>
                <TableCell>{shipment.materialId}</TableCell>
                <TableCell>{shipment.material.name}</TableCell>
                <TableCell>{shipment.material.supplier}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => receiveMaterial(shipment.shipmentId)}
                  >
                    Receive Material
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReceiveShipment;
