import express from "express"
import ConnectDb from "./Database/ConnectDb.js"
import router from "./routes/overview.route.js"
import {v2 as cloudinary} from "cloudinary"
import cors from "cors"
import {config} from "dotenv"

const App = express()
config()
App.use(cors());
App.use(express.json({ limit: "10mb" }));
App.use(express.urlencoded({ extended: true }))

const PORT = process.env.PORT || 8000;

ConnectDb();
cloudinary.config({ 
        cloud_name: 'ddmvyw1of', 
        api_key: '828494828935913', 
        api_secret: 'SEoHBbPrIRVA7Qn6lH-QzucnlXU'
    });

App.use("/api", router);

App.listen(PORT ,() => {
  console.log("server started")
})