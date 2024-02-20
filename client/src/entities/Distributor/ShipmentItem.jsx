import React from "react";

function ShipmentItem({ shipment, onProcessShipment }) {
  const handleProcessShipment = () => {
    onProcessShipment(shipment.shipmentId);
  };

  // function getShipmentStatus(status) {
  //   switch (status) {
  //     case 0:
  //       return "Not initiated";
  //     case 1:
  //       return "In transit";
  //     case 2:
  //       return "Delivered";
  //     default:
  //       return "Unknown";
  //   }
  // }

  return (
    <tr>
      <td>{shipment.shipmentId}</td>
      <td>{shipment.productId}</td>
      <td>{shipment.fromAddress}</td>
      <td>{shipment.toAddress}</td>
      <td>
        {shipment.shipmentStatus == 0
          ? "Not initiated"
          : shipment.shipmentStatus == 1
          ? "In transit"
          : "Delivered"}
        {/* {shipment.shipmentStatus} */}
        {/* {getShipmentStatus(shipment.shipmentStatus)} */}
      </td>
      <td>{shipment.totalAmount}</td>
      <td>
        {shipment.shipmentStatus == 1 && (
          <button onClick={handleProcessShipment}>Process Shipment</button>
        )}
      </td>
    </tr>
  );
}

export default ShipmentItem;
