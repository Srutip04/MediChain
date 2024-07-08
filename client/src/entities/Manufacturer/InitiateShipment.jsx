import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const InitiateShipment = (props) => {
  const [account] = useState(props.account);
  const [supplyChain] = useState(props.supplyChain);
  const [shipmentId, setShipmentId] = useState("");
  const [toAddress, setToAddress] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "shipmentId") {
      setShipmentId(value);
    } else if (id === "toAddress") {
      setToAddress(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await supplyChain.methods
        .shipProduct(parseInt(shipmentId), toAddress)
        .send({ from: account });
      alert("Shipment Initiated");
      console.log("res:", res);
      setShipmentId("");
      setToAddress("");
    } catch (error) {
      console.error("Error initiating shipment:", error);
      alert("An error occurred while initiating the shipment.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card style={{ marginTop: 20, padding: 20 }}>
        <CardContent>
          <Typography component="h1" variant="h5">
            Initiate Shipment
          </Typography>
          <form noValidate autoComplete="on" onSubmit={handleSubmit}>
            <TextField
              id="shipmentId"
              label="Shipment ID"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleInputChange}
            />
            <TextField
              id="toAddress"
              label="To Address"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Initiate Shipment
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default InitiateShipment;
