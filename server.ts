import http from "http";
import { app } from "./app";
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is started at port ${PORT} !`);
});
