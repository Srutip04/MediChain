// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import "openzeppelin-contracts/access/Ownable.sol";

contract SupplyChain is Ownable {
    uint public userCnt = 0;
    uint public prodCnt = 0;
    uint public shipmentCnt = 0;
    uint public materialCnt = 0;

    enum Role {
        None,
        Manufacturer,
        Distributor,
        Retailer,
        Supplier
    }

    struct User {
        uint userId;
        address addr;
        string name;
        Role role;
    }

    mapping(address => User) public users;
    mapping(uint => User) public uids;

    struct Product {
        string name;
        uint pid;
        uint phash;
        uint batchNumber;
        uint manufacturingDate;
        uint expiryDate;
        uint price;
        address manufacturer;
    }

    mapping(uint => Product) public products;

    struct Material {
        string name;
        uint mid;
        uint quantity;
        address supplier;
        address manufacturer;
    }

    mapping(uint => Material) public materials;

    struct Shipment {
        uint shipmentId;
        uint shiphash;
        uint productId;
        uint materialId;
        address fromAddress;
        address toAddress;
        uint shipmentStatus; // 0: Not initiated, 1: Shipped by Supplier, 2: Received by Manufacturer, 3: Shipped by Manufacturer, 4: Received by Distributor, 5: Delivered to Retailer
        uint totalAmount;
    }

    mapping(uint => Shipment) public shipments;

    // User Management Functions

    function registerUser(
        address _userAddress,
        string memory _name,
        Role _role
    ) public onlyOwner {
        userCnt++;
        users[_userAddress] = User(userCnt, _userAddress, _name, _role);
        uids[userCnt] = User(userCnt, _userAddress, _name, _role);
    }

    function getUserInfo(address _address) public view returns (User memory) {
        return users[_address];
    }

    // Supplier Functions

    function createMaterial(
        string memory _name,
        uint _quantity
    ) public returns (uint) {
        require(
            users[msg.sender].role == Role.Supplier,
            "Only supplier can create material"
        );
        materialCnt++;
        materials[materialCnt] = Material(
            _name,
            materialCnt,
            _quantity,
            msg.sender,
            address(0)
        );
        return materialCnt;
    }

    //shipmentStatus 1: Shipped by Supplier
    function shipMaterial(
        uint _materialId,
        address _manufacturer
    ) public returns (uint) {
        require(
            users[msg.sender].role == Role.Supplier,
            "Only supplier can ship material"
        );
        require(
            materials[_materialId].quantity > 0,
            "Material quantity must be greater than 0"
        );
        shipmentCnt++;
        uint shiphash = uint(
            keccak256(abi.encodePacked(msg.sender, _materialId, _manufacturer))
        );
        shipments[shipmentCnt] = Shipment(
            shipmentCnt,
            shiphash,
            0,
            _materialId,
            msg.sender,
            _manufacturer,
            1,
            materials[_materialId].quantity
        );
        materials[_materialId].manufacturer = _manufacturer;
        return shipmentCnt;
    }

    function getMaterialDetails(
        uint _materialId
    )
        public
        view
        returns (
            string memory name,
            uint quantity,
            address supplier,
            address manufacturer
        )
    {
        require(_materialId <= materialCnt, "Product ID does not exist");
        Material memory material = materials[_materialId];
        return (
            material.name,
            material.quantity,
            material.supplier,
            material.manufacturer
        );
    }

    // Manufacturer Functions

    function receiveMaterial(uint _shipmentId) public returns (bool) {
        require(
            users[msg.sender].role == Role.Manufacturer,
            "Only manufacturer can receive material"
        );
        require(
            shipments[_shipmentId].shipmentStatus == 1,
            "Shipment not initiated or material not shipped"
        );
        shipments[_shipmentId].shipmentStatus = 2; // Set shipment status to received by Manufacturer
        materials[shipments[_shipmentId].materialId].manufacturer = msg.sender;
        return true;
    }

    function createProduct(
        string memory _name,
        uint _batchNumber,
        uint _manufacturingDate,
        uint _expiryDate,
        uint _price,
        uint _shipmentId
    ) public returns (uint) {
        require(
            users[msg.sender].role == Role.Manufacturer,
            "Only manufacturer can create product"
        );
        require(
            shipments[_shipmentId].shipmentStatus == 2,
            "Material not received or already used"
        );
        prodCnt++;
        uint phash = uint(
            keccak256(abi.encodePacked(msg.sender, _batchNumber, _expiryDate))
        );
        products[prodCnt] = Product(
            _name,
            prodCnt,
            phash,
            _batchNumber,
            _manufacturingDate,
            _expiryDate,
            _price,
            msg.sender
        );
        shipments[_shipmentId].shipmentStatus = 3; // Set shipment status to shipped by Manufacturer
        shipments[_shipmentId].productId = prodCnt; // Assign product ID to shipment
        return prodCnt;
    }

    // Add a function to fetch product details
    function getProductDetails(
        uint _productId
    )
        public
        view
        returns (
            string memory name,
            uint batchNumber,
            uint manufacturingDate,
            uint expiryDate,
            uint price
        )
    {
        require(_productId <= prodCnt, "Product ID does not exist");
        Product memory product = products[_productId];
        return (
            product.name,
            product.batchNumber,
            product.manufacturingDate,
            product.expiryDate,
            product.price
        );
    }

    function shipProduct(
        uint _shipmentId,
        address _distributor
    ) public returns (bool) {
        require(
            users[msg.sender].role == Role.Manufacturer,
            "Only manufacturer can ship product"
        );
        require(
            shipments[_shipmentId].shipmentStatus == 3,
            "Product not created or already shipped"
        );
        shipments[_shipmentId].shipmentStatus = 4; // Set shipment status to received by Distributor
        shipments[_shipmentId].toAddress = _distributor; // Update shipment destination
        return true;
    }

    // Distributor Functions

    function processShipment(uint _shipmentId) public returns (bool) {
        require(
            users[msg.sender].role == Role.Distributor,
            "Only distributor can process shipment"
        );
        require(
            shipments[_shipmentId].shipmentStatus == 4,
            "Shipment not received by Distributor or already processed"
        );
        shipments[_shipmentId].shipmentStatus = 5; // Set shipment status to delivered to Retailer
        return true;
    }

    // Retailer Functions

    function receiveShipment(uint _shipmentId) public returns (bool) {
        require(
            users[msg.sender].role == Role.Retailer,
            "Only retailer can receive shipment"
        );
        require(
            shipments[_shipmentId].shipmentStatus == 5,
            "Shipment not delivered to Retailer"
        );
        shipments[_shipmentId].shipmentStatus = 6; // Set shipment status to final delivery
        return true;
    }

    // Add more functions as needed

    function getShipmentDetails(
        uint _shipmentId
    )
        public
        view
        returns (
            Shipment memory shipment,
            Product memory product,
            Material memory material
        )
    {
        require(_shipmentId <= shipmentCnt, "Invalid shipment ID");

        shipment = shipments[_shipmentId];
        product = products[shipment.productId];
        material = materials[shipment.materialId];

        return (shipment, product, material);
    }
}
