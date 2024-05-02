import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const ViewUser = (props) => {
  console.log("acc:", props.account);
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [supplyChain] = useState(props.supplyChain);
  const [address, setAddress] = useState("");
  const [user, setUser] = useState(null);
  console.log([account]);
  console.log("Check view SupplyChain");
  console.log([supplyChain]);

  const handleInputChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async () => {
    const res = await supplyChain.methods.getUserInfo(address).call();
    setUser(res);
    console.log("get user info", res);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Card style={{ margin: "20px auto", padding: "20px", maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h5" component="h2">
            Enter Account Address
          </Typography>
          <TextField
            id="address"
            label="Account"
            variant="outlined"
            fullWidth
            style={{ margin: "10px 0" }}
            onChange={handleInputChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Submit
          </Button>
        </CardContent>
      </Card>
      {user && (
        <Card style={{ marginTop: 20,maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              User Details
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <b>User ID:</b> {user.userId}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <b>Address:</b> {user.addr}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <b>Name:</b> {user.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <b>Role:</b> {user.role}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ViewUser;
