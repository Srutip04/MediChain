import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

function ShipmentItem({ shipment, onProcessShipment }) {
  const handleProcessShipment = () => {
    onProcessShipment(shipment.shipmentId);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Not initiated";
      case 1:
        return "Shipped by Supplier";
      case 2:
        return "Received by Manufacturer";
      case 3:
        return "Shipped by Manufacturer";
      case 4:
        return "Received by Distributor";
      case 5:
        return "Delivered to Retailer";
      case 6:
          return "Delivered";
      default:
        return "Unknown";
    }
  };

  return (
    <TableRow>
      <TableCell>{shipment.shipmentId}</TableCell>
      <TableCell>{shipment.productId}</TableCell>
      <TableCell>{shipment.materialId}</TableCell>
      <TableCell>{shipment.fromAddress}</TableCell>
      <TableCell>{shipment.toAddress}</TableCell>
      <TableCell>{getStatusText(shipment.shipmentStatus)}</TableCell>
      <TableCell>{shipment.totalAmount}</TableCell>
      <TableCell>
        {shipment.shipmentStatus == 4 && (
          <Button variant="contained" onClick={handleProcessShipment}>
            Process Shipment
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ShipmentItem;
