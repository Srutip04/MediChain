import React, { useState, useEffect } from "react";

const ReceiveShipment = (props) => {
  console.log("acc:", props.account);
  const [account] = useState(props.account);
  const [web3, setWeb3] = useState(props.web3);
  const [supplyChain] = useState(props.supplyChain);
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    fetchShipments();
  }, [supplyChain]); // Fetch shipments when contract changes

  const fetchShipments = async () => {
    const shipmentCount = await supplyChain.methods.shipmentCnt().call();
    const fetchedShipments = [];
    for (let i = 1; i <= shipmentCount; i++) {
      const shipment = await supplyChain.methods.shipments(i).call();
      fetchedShipments.push(shipment);
    }
    setShipments(fetchedShipments);
  };
  const receiveShipment = async (shipmentId) => {
    try {
      await supplyChain.methods
        .receiveShipment(shipmentId)
        .send({ from: account });
      alert("Shipment received successfully!");
      // Refresh shipment list after receiving
      fetchShipments();
    } catch (error) {
      console.error("Error receiving shipment:", error);
      alert("An error occurred while receiving the shipment.");
    }
  };
 return (
   <div>
     <h2>Shipment List</h2>
     <table>
       <thead>
         <tr>
           <th>Shipment ID</th>
           <th>Product ID</th>
           <th>From Address</th>
           <th>To Address</th>
           <th>Shipment Status</th>
           <th>Total Amount</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>
         {shipments.map((shipment) => (
           <tr key={shipment.shipmentId}>
             <td>{shipment.shipmentId}</td>
             <td>{shipment.productId}</td>
             <td>{shipment.fromAddress}</td>
             <td>{shipment.toAddress}</td>
             <td>
               {" "}
               {shipment.shipmentStatus == 0
                 ? "Not initiated"
                 : shipment.shipmentStatus == 1
                 ? "In transit"
                 : "Delivered"}
             </td>
             <td>{shipment.totalAmount}</td>
             <td>
               {shipment.shipmentStatus == 1 && (
                 <button onClick={() => receiveShipment(shipment.shipmentId)}>
                   Receive Shipment
                 </button>
               )}
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>
 );
};

export default ReceiveShipment;
