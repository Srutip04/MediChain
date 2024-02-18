// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import "openzeppelin-contracts/access/Ownable.sol";

contract SupplyChain is Ownable{
   
    uint public userCnt = 0;
    uint public prodCnt = 0;
    uint public shipmentCnt = 0;
    // Define Role enum
    enum Role {None, Manufacturer, Distributor, Retailer}

    // Define User struct
    struct User {
        uint userId;
        address addr;
        string name;
        Role role;
    }

    // Define mapping to store users
    mapping(address => User) public users;
    mapping(uint => User) public uids;
    //function to add users 
    function registerUser(address _userAddress, string memory _name, Role _role) public onlyOwner{
        userCnt++;
        users[_userAddress] = User(userCnt,_userAddress,_name,_role);
        uids[userCnt] = User(userCnt,_userAddress,_name,_role);

    }

    //get user details
    function getUserInfo(address _address) public view returns(User memory){
        return users[_address];
    }

    //Define product struct
    struct Product{
        string name;
        uint pid;
        uint phash;
        uint batchNumber;
        uint manufacturingDate;
        uint expiryDate;
        uint price;
        address manufacturer;
    }
    
    // Define mapping to store products
    mapping(uint => Product) public products;
  
    // Function to create pharmaceutical product
    function createProduct(
        string memory _name,
        uint _batchNumber,
        uint _manufacturingDate,
        uint _expiryDate,
        uint _price
    ) public returns (uint) {

        require(users[msg.sender].role == Role.Manufacturer, "Only manufacturer can create product");
        prodCnt++;
        uint phash = uint(keccak256(abi.encodePacked(msg.sender, _batchNumber, _expiryDate))); // Generate unique product ID
        products[prodCnt] = Product(_name,prodCnt,phash, _batchNumber, _manufacturingDate, _expiryDate, _price, msg.sender);
        return prodCnt;
    }

    struct Shipment {
        uint shipmentId;
        uint shiphash;
        uint productId;
        address fromAddress;
        address toAddress;
        uint shipmentStatus; // 0: Not initiated, 1: In transit, 2: Delivered
        // uint paymentStatus; // 0: Not paid, 1: Paid
        uint totalAmount;
    }

    // Define mapping to store shipments
    mapping(uint => Shipment) public shipments;

    // Function to initiate shipment
    function initiateShipment(uint _productId, address _toAddress) public returns (uint) {
        require(users[msg.sender].role == Role.Manufacturer, "Only manufacturer can initiate shipment");
        require(products[_productId].manufacturingDate != 0, "Product does not exist");
        shipmentCnt++;
        uint shiphash = uint(keccak256(abi.encodePacked(msg.sender, _productId, _toAddress))); // Generate unique shipment ID
        require(shipments[shipmentCnt].shipmentStatus == 0, "Shipment already initiated");
        shipments[shipmentCnt] = Shipment(shipmentCnt,shiphash,_productId, msg.sender, _toAddress, 1,products[_productId].price);
        return shipmentCnt;
    }

     // Function for distributor to receive shipment
    function processShipment(uint _shipmentId) public payable returns (bool) {
        require(users[msg.sender].role == Role.Distributor, "Only distributor can process payment");
        require(shipments[_shipmentId].shipmentStatus == 1, "Shipment not initiated or already delivered");
        // require(msg.value >= shipments[_shipmentId].totalAmount, "Insufficient payment amount");
        // shipments[_shipmentId].paymentStatus = 1; // Set payment status to paid
        shipments[_shipmentId].shipmentStatus = 1; // Set shipment status to in transit
        return true;
    }

    // Function for retailer to receive shipment
    function receiveShipment(uint _shipmentId) public returns (bool) {
        require(users[msg.sender].role == Role.Retailer, "Only retailer can receive shipment");
        require(shipments[_shipmentId].shipmentStatus == 1, "Shipment not initiated or already delivered");
        shipments[_shipmentId].shipmentStatus = 2; // Set shipment status to delivered
        return true;
    }
   


}