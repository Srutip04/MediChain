pragma solidity ^0.8.0;

contract PharmaSupplyChain {
    // Define possible statuses for a pharmaceutical product
    enum ProductStatus { Created, InTransit, Delivered, Verified }
    
    // Struct to represent a pharmaceutical product
    struct Product {
        uint productId;
        address manufacturer;
        address distributor;
        address retailer;
        ProductStatus status;
        uint timestamp;
    }
    
    // Mapping to store product information using product ID
    mapping(uint => Product) public products;
    
    // Counter to keep track of total products
    uint public productCount;
    
    // Address of the contract owner (administrator)
    address public owner;
    
    // Modifier to restrict access to only the contract owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }
    
    // Events to log important actions
    event ProductCreated(uint productId, address manufacturer);
    event ProductTransferred(uint productId, address from, address to, ProductStatus status);
    event ProductVerified(uint productId, address verifier);
    
    // Constructor to set the contract owner
    constructor() {
        owner = msg.sender;
    }
    
    // Function to create a new pharmaceutical product
    function createProduct() public onlyOwner {
        // Increment product count and create a new product
        productCount++;
        products[productCount] = Product(productCount, msg.sender, address(0), address(0), ProductStatus.Created, block.timestamp);
        // Emit event to log product creation
        emit ProductCreated(productCount, msg.sender);
    }
    
    // Function to transfer a pharmaceutical product between parties
    function transferProduct(uint productId, address to) public {
        // Ensure product is in a transferable state
        require(products[productId].status == ProductStatus.Created || products[productId].status == ProductStatus.InTransit, "Product must be in Created or InTransit status");
        // Ensure caller is authorized to transfer the product
        require(msg.sender == products[productId].manufacturer || msg.sender == products[productId].distributor || msg.sender == products[productId].retailer, "You are not authorized to transfer this product");
        
        // Update product status and timestamp based on transfer type
        if(products[productId].status == ProductStatus.Created) {
            products[productId].status = ProductStatus.InTransit;
        } else if(products[productId].status == ProductStatus.InTransit) {
            products[productId].status = ProductStatus.Delivered;
        }
        products[productId].timestamp = block.timestamp;
        // Update recipient based on transfer direction
        if(to == address(0)) {
            products[productId].retailer = msg.sender;
        } else {
            products[productId].distributor = msg.sender;
        }
        // Emit event to log product transfer
        emit ProductTransferred(productId, msg.sender, to, products[productId].status);
    }
    
    // Function to verify the authenticity of a delivered pharmaceutical product
    function verifyProduct(uint productId) public {
        // Ensure product is in a verifiable state
        require(products[productId].status == ProductStatus.Delivered, "Product must be in Delivered status");
        // Ensure caller is the retailer
        require(msg.sender == products[productId].retailer, "Only retailer can verify the product");
        
        // Update product status and timestamp upon verification
        products[productId].status = ProductStatus.Verified;
        products[productId].timestamp = block.timestamp;
        // Emit event to log product verification
        emit ProductVerified(productId, msg.sender);
    }
}
