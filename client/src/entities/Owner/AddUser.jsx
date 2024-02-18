import React, { useState } from "react";
// import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseLine";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "40ch",
//     },
//   },
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

const AddUser = (props) => {
  console.log("acc:", props.account);
//   const classes = useStyles();
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [supplyChain] = useState(props.supplyChain);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  console.log([account]);
  console.log("Check?");
  console.log([supplyChain]);

  const handleInputChange = (e) => {
    if (e.target.id === "name") {
      setName(e.target.value);
    } else if (e.target.id === "role") {
      setRole(e.target.value);
    } else if (e.target.id === "address") {
      setAddress(e.target.value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await supplyChain.methods.registerUser(address,name,Number(role)).send({from: account});
    console.log("res:",res);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >
        <Typography component="h1" variant="h5">
          Add New User
        </Typography>
        <form  noValidate autoComplete="on">
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            onChange={handleInputChange}
          />
          <br></br>
          <TextField
            id="role"
            label="Role"
            variant="outlined"
            onChange={handleInputChange}
          />
          <br></br>
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
    </Container>
  );
};

export default AddUser;
