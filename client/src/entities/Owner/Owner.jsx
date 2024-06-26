import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AddUser from "./AddUser";
import ViewUser from "./ViewUser";
const Owner = ({ ...rest }) => {
  const { account, supplyChain, web3 } = rest;
  console.log("acc:",account);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              centered
            >
              <Tab label="Add User" value="1" />
              <Tab label="View User" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1"><AddUser {...rest} /></TabPanel>
          <TabPanel value="2"><ViewUser {...rest} /></TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Owner;
