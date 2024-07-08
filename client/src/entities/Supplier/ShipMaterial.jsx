import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const ShipMaterial = (props) => {
  const [account] = useState(props.account);
  const [supplyChain] = useState(props.supplyChain);
  const [materialId, setMaterialId] = useState("");
  const [toAddress, setToAddress] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "materialId") {
      setMaterialId(value);
    } else if (id === "toAddress") {
      setToAddress(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await supplyChain.methods
        .shipMaterial(parseInt(materialId), toAddress)
        .send({ from: account });
      alert("Shipment Shipped By Supplier");
      console.log("res:", res);
      setMaterialId("");
      setToAddress("");
    } catch (error) {
      console.error("Error shipping material:", error);
      alert("An error occurred while shipping the material");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card style={{ marginTop: 20, padding: 20 }}>
        <CardContent>
          <Typography component="h1" variant="h5">
            Ship Material
          </Typography>
          <form noValidate autoComplete="on" onSubmit={handleSubmit}>
            <TextField
              id="materialId"
              label="Material ID"
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
              Ship Material
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ShipMaterial;
