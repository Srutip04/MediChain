import React,{useState,useEffect} from 'react'
import ShipmentItem from './ShipmentItem';
const ShipmentList = (props) => {
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
  
  const processShipment = async (shipmentId) => {
    try {
      await supplyChain.methods
        .processShipment(shipmentId)
        .send({ from: account });
      alert("Shipment processed successfully!");
      // Refresh shipment list after processing
      fetchShipments();
    } catch (error) {
      console.error("Error processing shipment:", error);
      alert("An error occurred while processing the shipment.");
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
            <ShipmentItem
              key={shipment.shipmentId}
              shipment={shipment}
              onProcessShipment={processShipment}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShipmentList