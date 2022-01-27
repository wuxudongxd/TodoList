import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./router";

const app = express();

app.use(cors());
app.use(morgan("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.listen(3001);
