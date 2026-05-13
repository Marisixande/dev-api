import express from "express";
import { vegetableRoute } from "./routes/vegetablesRoutes.js";

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.json("Alex1111!");
});

app.use("/vegetables", vegetableRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
