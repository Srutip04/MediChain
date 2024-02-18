import React, { useState } from "react";
// import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseLine";

const CreateMed = (props) => {
    console.log("acc:", props.account);
    const [account] = useState(props.account);
    const [web3, setWeb3] = useState(props.web3);
    const [supplyChain] = useState(props.supplyChain);
    const [name, setName] = useState("");
    const [batchNumber, setBatchNumber] = useState("");
    const [manufacturingDate, setManufacturingDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [price, setPrice] = useState("");
    console.log([account]);
    console.log("Check?");
    console.log([supplyChain]);

    const handleInputChange = (e) => {
      if (e.target.id === "name") {
        setName(e.target.value);
      } else if (e.target.id === "batchNo") {
        setBatchNumber(e.target.value);
      } else if (e.target.id === "mandate") {
        setManufacturingDate(e.target.value);
      } else if (e.target.id === "exp") {
        setExpiryDate(e.target.value);
      } else if (e.target.id === "price") {
        setPrice(e.target.value);
      }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await supplyChain.methods
            .createProduct(
              name,
              parseInt(batchNumber),
              parseInt(manufacturingDate),
              parseInt(expiryDate),
              parseInt(price)
            )
            .send({ from: account }); 
          alert("Medicine created successfully!");
          // Clear the form after submission
          setName("");
          setBatchNumber("");
          setManufacturingDate("");
          setExpiryDate("");
          setPrice("");
        } catch (error) {
          console.error("Error creating medicine:", error);
          alert("An error occurred while creating the medicine.");
        }
    }

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div>
          <Typography component="h1" variant="h5">
            Create New Medicine
          </Typography>
          <form noValidate autoComplete="on">
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              onChange={handleInputChange}
            />
            <br></br>
            <TextField
              id="batchNo"
              label="Batch Number"
              variant="outlined"
              onChange={handleInputChange}
            />
            <br></br>
            <TextField
              id="mandate"
              label="Manufacturing Date"
              variant="outlined"
              onChange={handleInputChange}
            />
            <br></br>
            <TextField
              id="exp"
              label="Expiry Date"
              variant="outlined"
              onChange={handleInputChange}
            />
            <br></br>
            <TextField
              id="price"
              label="Price"
              variant="outlined"
              type="number"
              onChange={handleInputChange}
            />
            <br></br>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Create Medicine
            </Button>
          </form>
        </div>
      </Container>
    );
};

export default CreateMed;
