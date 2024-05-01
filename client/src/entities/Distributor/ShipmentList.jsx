import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ShipmentItem from "./ShipmentItem";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
}));

const ShipmentList = (props) => {
  console.log("acc:", props.account);
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [supplyChain] = useState(props.supplyChain);
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetchShipments();
  }, [supplyChain]); // Fetch shipments when contract changes

  const fetchShipments = async () => {
    const shipmentCount = await supplyChain.methods.shipmentCnt().call();
    const fetchedShipments = [];
    for (let i = 1; i <= shipmentCount; i++) {
      const shipment = await supplyChain.methods.shipments(i).call();
      fetchedShipments.push(shipment);
    }
    setShipments(fetchedShipments);
  };

  const processShipment = async (shipmentId) => {
    try {
      await supplyChain.methods
        .processShipment(shipmentId)
        .send({ from: account });
      alert("Shipment processed successfully!");
      // Refresh shipment list after processing
      fetchShipments();
    } catch (error) {
      console.error("Error processing shipment:", error);
      alert("An error occurred while processing the shipment.");
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
              <StyledTableCell>Product ID</StyledTableCell>
              <StyledTableCell>Material ID</StyledTableCell>
              <StyledTableCell>From Address</StyledTableCell>
              <StyledTableCell>To Address</StyledTableCell>
              <StyledTableCell>Shipment Status</StyledTableCell>
              <StyledTableCell>Total Amount</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shipments.map((shipment) => (
              <ShipmentItem
                key={shipment.shipmentId}
                shipment={shipment}
                onProcessShipment={processShipment}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ShipmentList;
