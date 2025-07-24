# InventoryManager

## Setup Instructions

### prerequisites

1. install node
2. have a mongodb cloud url or local setup and url ready
3. install mongodb compass to view enteries in DB
4. git for cloning

## Installation steps

1. Clone the repository
    `git clone https://github.com/nayangaripelly/InventoryManager.git`
    `cd InventoryManager`

2. Install Dependencies
    `npm install`

3. Configure env variables
    Create a .env file in the root directory and add the following

    <pre>bash<br>
    PORT=5000
    MONGODB_URI=mongodb://localhost:27017/your-db-name
    JWT_SECRET=your_secret_key
    <br></pre>

4. To run
    <pre>bash<br>
    npm run dev
    <br></pre>