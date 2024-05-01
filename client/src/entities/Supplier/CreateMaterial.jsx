import React, { useState } from "react";
// import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseLine";

const CreateMaterial = (props) => {
  console.log("acc:", props.account);
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [supplyChain] = useState(props.supplyChain);
  const [materialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState("");
  console.log([account]);
  console.log("Check?");
  console.log([supplyChain]);

  const handleInputChange = (e) => {
    if (e.target.id === "name") {
      setMaterialName(e.target.value);
    } else if (e.target.id === "quantity") {
      setQuantity(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await supplyChain.methods
        .createMaterial(materialName, parseInt(quantity))
        .send({ from: account });
      alert("Material created successfully");
      setMaterialName("");
      setQuantity("");
    } catch (error) {
      console.error("Error creating material:", error);
      alert("An error occurred while creating the material");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          Create New Material
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
            id="quantity"
            label="Quantity"
            variant="outlined"
            onChange={handleInputChange}
          />
          <br></br>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Material
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CreateMaterial;
