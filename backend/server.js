import express from "express"
import cors from "cors"
import "dotenv/config"
import connectToMongoDB from "./db/connectToMongoDB.js";

import contactRoutes from "./routes/contacts.routes.js"

const app = express();
const port = process.env.PORT || '3001';

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from your frontend
  }));

app.get('/', (req, res) => {
    res.status(200);
    res.send("Endpoint working.")
})

app.use("/contacts", contactRoutes)

app.listen(port, () => {
    connectToMongoDB()
    console.log("Server is running on port " + port);
})