import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseLine";
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
      <div>
        <form noValidate autoComplete="on">
          <TextField
            id="address"
            label="Account"
            variant="outlined"
            onChange={handleInputChange}
          />
          <br></br>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
      {user && (
        <div>
          <h3>User Details</h3>
          <p>User ID: {user.userId}</p>
          <p>Address: {user.addr}</p>
          <p>Name: {user.name}</p>
          <p>Role: {user.role}</p>
        </div>
      )}
    </Container>
  );
};

export default ViewUser;
