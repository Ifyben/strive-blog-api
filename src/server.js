import express from "express"
import cors from "cors"
import listEndpoints from "express-list-endpoints"
import authorsRouter from "./authors/index.js"
import blogsRouter from "./blogs/index.js"
import {  errorHandler } from "./errorHandlers.js"
import path,{dirname} from "path";
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDirectory = path.join(__dirname, "../public");

const server = express();

const { PORT } = process.env;


const whiteList = ["http://localhost:3000"];
const corsOptions = {
   origin:(origin, callback) => {
      if(whiteList.some(allowedUrl => allowedUrl === origin)) {
         callback(null, true);
      }
      else {
         const error = new Error("Not allowed by cors!");
         error.status = 403;
         callback(error);
      }
   },
};

server.use(cors(corsOptions));

server.use(express.json());

server.use(express.static(publicDirectory)); // I shared my publicDirectory

server.use("/authors", authorsRouter);

server.use("/blogs", blogsRouter);

server.use(errorHandler);

console.log(listEndpoints(server));

server.listen(PORT, () => console.log("✅ server is running on port : ", PORT));

console.table(listEndpoints(server));

server.on("error", (error) => 
   console.log(`❌ server is not running due to : ${error}`)
   );



