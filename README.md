# InventoryManager

## Setup Instructions

### prerequisites

1. install node
2. have a mongodb cloud url or local setup ready
3. install mongodb compass to view enteries in DB if you are using cloud url
4. git for cloning
5. install Docker to create docker_image and run it 

## Installation steps

1. Clone the repository
    <pre>bash<br>
    git clone https://github.com/nayangaripelly/InventoryManager.git
    cd InventoryManager
    <br></pre>
    

2. Install Dependencies
    <pre>bash<br>
    npm install
    <br></pre>

3. Configure environment variables
    Create a .env file in the root directory and add the following

    <pre>.env<br>
    PORT=5000
    MONGODB_URL=mongodb://localhost:27017/your-db-name
    JWT_SECRET=your_secret_key
    <br></pre>

4. To run
    <pre>bash<br>
    npm run dev
    <br></pre>

5. To create and run docker image
  <pre>.powershell<br>
      docker build -t inventorymanager .
      docker run -it -e PORT={portnum} -e MONGO_URL={url} -e JWT_SECRET={secret} -p 3000:{portnum} inventorymanager
    <br></pre>

## Sample postman collections

### POST /api/v1/register

Takes username(unique), password and make their entries in users collection.

#### Request Body
```json
{
  "username": "john",
  "password": "123123"
}
```
### POST /api/v1/login

Takes username(unique), password and verifies them and send back jwt token.

#### Request Body
```json
{
  "username": "john",
  "password": "123123"
}
```
### POST /api/v1/products

Takes name, type, sku, image_url, description, quantity and price in body and jwt token in header

### Request header
 authorization :Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjAzNDVlNGRmMjhhNDdkNzFkZGMwMyIsImlhdCI6MTc1MTEzNTkwN30.Qlok-tqWtcJtU6JOdBMZA5zJMJaMIX23hRyap9Ng-8Ya 

#### Request Body
```json
{
  "name": "MacBook Air M4",
  "type": "gadget",
  "sku": "MBA-M4-2025-001",
  "image_url": "https://example.com/images/macbook-air-m4.jpg",
  "description": "Apple MacBook Air with M4 chip, 16GB RAM, 512GB SSD.",
  "quantity": 50,
  "price": 1399.99
}
```

### PUT /api/v1/products/:id/quantity

Takes quantity in body.

### Request header
 authorization :Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjAzNDVlNGRmMjhhNDdkNzFkZGMwMyIsImlhdCI6MTc1MTEzNTkwN30.Qlok-tqWtcJtU6JOdBMZA5zJMJaMIX23hRyap9Ng-8Ya 

#### Request Body
```json
{
  "quantity": 50
}
```

### GET /api/v1/products/

### Request header
 authorization :Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjAzNDVlNGRmMjhhNDdkNzFkZGMwMyIsImlhdCI6MTc1MTEzNTkwN30.Qlok-tqWtcJtU6JOdBMZA5zJMJaMIX23hRyap9Ng-8Ya 

## Testing

This repo includes `test_api.py`, the test script provided for validating API functionality.
Run it using:

```bash
pip install requests
python test_api.py
```


All tests passed
![alt](./All_tests_passed.png)