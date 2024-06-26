import React, { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import CreateMed from "./CreateMed";
import InitiateShipment from "./InitiateShipment";
import ViewAllMeds from "./ViewAllMeds";
import ReceiveMaterial from "./ReceiveMaterials";

const Manufacturer = ({ ...rest }) => {
  const { account, supplyChain, web3 } = rest;
  console.log("acc:", account);
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
              <Tab label="Receive Materials" value="1" />
              <Tab label="Add Medicine" value="2" />
              <Tab label="View All Medicines" value="3" />
              <Tab label="Initiate Shipment" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <ReceiveMaterial {...rest} />
          </TabPanel>
          <TabPanel value="2">
            <CreateMed {...rest} />
          </TabPanel>
          <TabPanel value="3">
            <ViewAllMeds {...rest} />
          </TabPanel>
          <TabPanel value="4">
            <InitiateShipment {...rest} />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default Manufacturer;
