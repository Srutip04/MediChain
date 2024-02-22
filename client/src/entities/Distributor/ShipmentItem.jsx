import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

function ShipmentItem({ shipment, onProcessShipment }) {
  const handleProcessShipment = () => {
    onProcessShipment(shipment.shipmentId);
  };

  return (
    <TableRow>
      <TableCell>{shipment.shipmentId}</TableCell>
      <TableCell>{shipment.productId}</TableCell>
      <TableCell>{shipment.fromAddress}</TableCell>
      <TableCell>{shipment.toAddress}</TableCell>
      <TableCell>
        {shipment.shipmentStatus == 0
          ? "Not initiated"
          : shipment.shipmentStatus == 1
          ? "In transit"
          : "Delivered"}
      </TableCell>
      <TableCell>{shipment.totalAmount}</TableCell>
      <TableCell>
        {shipment.shipmentStatus == 1 && (
          <Button variant="contained" onClick={handleProcessShipment}>
            Process Shipment
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ShipmentItem;
