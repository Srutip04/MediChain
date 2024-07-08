import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const CreateMaterial = (props) => {
  const [account] = useState(props.account);
  const [supplyChain] = useState(props.supplyChain);
  const [materialName, setMaterialName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setMaterialName(value);
    } else if (id === "quantity") {
      setQuantity(value);
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
      <Card style={{ marginTop: 20, padding: 20 }}>
        <CardContent>
          <Typography component="h1" variant="h5">
            Create New Material
          </Typography>
          <form noValidate autoComplete="on" onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleInputChange}
            />
            <TextField
              id="quantity"
              label="Quantity"
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
              Create Material
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CreateMaterial;
