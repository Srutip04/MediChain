pragma solidity ^0.8.0;

import './Transactions.sol';

contract Medicine {

    address Owner;

    enum medicineStatus {
        atManufacturer,
        pickedForW,
        pickedForD,
        deliveredAtW,
        deliveredAtD,
        pickedForC,
        deliveredAtC
    }

    bytes32 description;
    address[] rawMaterials;
    address[] transporters;
    address manufacturer;
    address wholesaler;
    address distributor;
    address customer;
    uint quantity;
    medicineStatus status;
    address txnContractAddress;

    event ShippmentUpdate(
        address indexed BatchID,
        address indexed Shipper,
        address indexed Receiver,
        uint TransporterType,
        uint Status
    );


    constructor(address _manufacturerAddr,bytes32 _description,address[] memory _rawAddr,uint _quantity,address[] memory _transporterAddr,address _receiverAddr,uint RcvrType){
        Owner = _manufacturerAddr;
        manufacturer = _manufacturerAddr;
        description = _description;
        rawMaterials = _rawAddr;
        quantity = _quantity;
        transporters = _transporterAddr;
        if(RcvrType == 1) {
            wholesaler = _receiverAddr;
        } else if( RcvrType == 2){
            distributor = _receiverAddr;
        }
        Transactions txnContract = new Transactions(_manufacturerAddr);
        txnContractAddress = address(txnContract);
    }


    function getMedicineInfo () public view returns(address _manufacturerAddr,bytes32 _description,address[] memory _rawAddr,uint _quantity,address[] memory _transporterAddr,address _distributor,address _customer) {
        return(manufacturer,description,rawMaterials,quantity,transporters,distributor,customer);
    }

 
    function getWDC() public view returns(address[3] memory WDP) {
        return (
            [wholesaler, distributor, customer]
        );
    }

    function getBatchIDStatus() public view returns(uint) {
        return uint(status);
    }


    function pickMedicine(address _transporterAddr) public {
        require(_transporterAddr == transporters[transporters.length - 1],"OT");
        require(status == medicineStatus(0),"Pk must be at M.");

        if(wholesaler != address(0x0)){
            status = medicineStatus(1);
            emit ShippmentUpdate(address(this), _transporterAddr, wholesaler, 1, 1);
        }else{
            status = medicineStatus(2);
            emit ShippmentUpdate(address(this), _transporterAddr, distributor, 1, 2);
        }
    }
    
    function updateTransporterArray(address _transporterAddr) public {
        transporters.push(_transporterAddr);
    }


    function receivedMedicine(address _receiverAddr) public returns(uint){
        require( _receiverAddr == wholesaler || _receiverAddr == distributor,"O W/D");

        require(uint(status) >= 1,"not picked");

        if(_receiverAddr == wholesaler && status == medicineStatus(1)){
            status = medicineStatus(3);
            emit ShippmentUpdate(address(this), transporters[transporters.length - 1], wholesaler, 2, 3);
            return 1;
        } else if(_receiverAddr == distributor && status == medicineStatus(2)){
            status = medicineStatus(4);
            emit ShippmentUpdate(address(this), transporters[transporters.length - 1], distributor,3, 4);
            return 2;
        }
    }


    function sendWtoD(address receiver,address sender) public {
        require(
            wholesaler == sender,
            "WnotAssociated"
        );
        distributor = receiver;
        status = medicineStatus(2);
    }


    function receivedWtoD(address receiver) public {
        require(distributor == receiver,"DntAssociated");
        status = medicineStatus(4);
    }


    function sendDtoC(address receiver,address sender) public {
        require( distributor == sender,"DntAssociated");
        customer = receiver;
        status = medicineStatus(5);
    }


    function receivedDtoC(address receiver) public {
        require(customer == receiver,"CntAssociated");
        status = medicineStatus(6);
    }
}