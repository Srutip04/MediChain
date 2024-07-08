import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";


const StyledBox = styled(Box)({
  padding: "16px",
  border: "1px solid #ccc",
  margin: "16px 0",
});

const getStatusText = (status) => {
  switch (status) {
    case '0':
      return "Not initiated";
    case '1':
      return "Shipped by Supplier";
    case '2':
      return "Received by Manufacturer";
    case '3':
      return "Shipped by Manufacturer";
    case '4':
      return "Received by Distributor";
    case '5':
      return "Delivered to Retailer";
    case '6':
      return "Delivered";
    default:
      return "Unknown";
  }
};

const TrackingDashboard = (props) => {
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [supplyChain] = useState(props.supplyChain);
  const [shipmentId, setShipmentId] = useState("");
  const [shipmentDetails, setShipmentDetails] = useState(null);

  const handleTrackShipment = async () => {
    try {
      const shipmentDetails = await supplyChain.methods
        .getShipmentDetails(shipmentId)
        .call();
      setShipmentDetails(shipmentDetails);
    } catch (error) {
      console.error("Error fetching shipment details:", error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <h2>Track Shipment</h2>
      <Card style={{ margin: "20px 0" }}>
        <CardContent>
          <TextField
            label="Enter Shipment ID"
            value={shipmentId}
            onChange={(e) => setShipmentId(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleTrackShipment}
          >
            Track Shipment
          </Button>
        </CardContent>
      </Card>
      {shipmentDetails && (
        <Card style={{ marginTop: 20 }}>
          <CardContent>
            <Typography variant="h6">Shipment Details</Typography>
            <Typography>Shipment ID: {shipmentDetails.shipment.shipmentId}</Typography>
            <Typography>Product Name: {shipmentDetails.product.name}</Typography>
            <Typography>Material Name: {shipmentDetails.material.name}</Typography>
            <Typography>Shipment Status: {getStatusText(shipmentDetails.shipment.shipmentStatus)}</Typography>
            <Typography>Product Batch Number: {shipmentDetails.product.batchNumber}</Typography>
            <Typography>Product Manufacturing Date:  {new Date(shipmentDetails.product.manufacturingDate * 1000).toLocaleDateString()} </Typography>
            <Typography>Product Expiry Date: {new Date(shipmentDetails.product.expiryDate * 1000).toLocaleDateString()}</Typography>
            <Typography>Product Price: {shipmentDetails.product.price}</Typography>
            <Typography>Total Amount: {shipmentDetails.shipment.totalAmount}</Typography>
            <Typography>From Address: {shipmentDetails.shipment.fromAddress}</Typography>
            <Typography>To Address: {shipmentDetails.shipment.toAddress}</Typography>
          </CardContent>
        </Card>
      )}
     </Container>
  );
};

export default TrackingDashboard;
