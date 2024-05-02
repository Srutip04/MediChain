import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const AddUser = (props) => {
  const [account] = useState(props.account);
  const [supplyChain] = useState(props.supplyChain);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setName(value);
    } else if (id === "role") {
      setRole(value);
    } else if (id === "address") {
      setAddress(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await supplyChain.methods
      .registerUser(address, name, Number(role))
      .send({ from: account });
    console.log("res:", res);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card style={{ marginTop: 20, padding: 20 }}>
        <CardContent>
          <Typography component="h1" variant="h5">
            Add New User
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
              id="role"
              label="Role"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={handleInputChange}
            />
            <TextField
              id="address"
              label="Account"
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
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddUser;
