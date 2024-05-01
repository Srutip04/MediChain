import React, { useState } from "react";
// import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseLine";

const InitiateShipment = (props) => {
   const [account] = useState(props.account);
   const [web3, setWeb3] = useState(props.web3);
   const [supplyChain] = useState(props.supplyChain);
   const [shipmentId, setShipmentId] = useState("");
   const [toAddress, setToAddress] = useState("");
     console.log([account]);
     console.log("Check?");
     console.log([supplyChain]);

     const handleInputChange = (e) => {
       if (e.target.id === "shipmentId") {
         setShipmentId(e.target.value);
       } else if (e.target.id === "toAddress") {
         setToAddress(e.target.value);
       } 
     };
     const handleSubmit = async (e) => {
       e.preventDefault();
       const res = await supplyChain.methods
         .shipProduct(parseInt(shipmentId),toAddress)
         .send({ from: account });
         alert("Shipment Initiated");
         console.log("res:", res);
         setShipmentId("");
         setToAddress("");
     };
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            Initiate Shipment
          </Typography>
          <form noValidate autoComplete="on">
            <TextField
              id="shipmentId"
              label="Shipment ID"
              variant="outlined"
              onChange={handleInputChange}
            />
            <br></br>
            <TextField
              id="toAddress"
              label="To Address"
              variant="outlined"
              onChange={handleInputChange}
            />
            <br></br>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Initiate Shipment
            </Button>
          </form>
        </div>
      </Container>
    );
};

export default InitiateShipment;
