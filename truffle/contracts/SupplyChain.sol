// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

contract SupplyChain{
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    // Define modifier to restrict access to owner-only
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    // Define Role enum
    enum Role {None, Manufacturer, Distributor, Retailer}

    // Define User struct
    struct User {
        string name;
        Role role;
    }

    // Define mapping to store users
    mapping(address => User) public users;
    
    //function to add users 
    function registerUser(address _userAddress, string memory _name, Role _role) public onlyOwner{
        users[_userAddress] = User(_name,_role);
    }

    //get user details
    function getUserInfo(address _address) public view returns(User memory){
        return users[_address];
    }

    //Define product struct
    struct Product{
        string name;
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
        uint productId = uint(keccak256(abi.encodePacked(msg.sender, _batchNumber, _expiryDate))); // Generate unique product ID
        products[productId] = Product(_name, _batchNumber, _manufacturingDate, _expiryDate, _price, msg.sender);
        return productId;
    }

    struct Shipment {
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
        uint shipmentId = uint(keccak256(abi.encodePacked(msg.sender, _productId, _toAddress))); // Generate unique shipment ID
        require(shipments[shipmentId].shipmentStatus == 0, "Shipment already initiated");
        shipments[shipmentId] = Shipment(_productId, msg.sender, _toAddress, 1,products[_productId].price);
        return shipmentId;
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