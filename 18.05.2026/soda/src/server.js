import express from "express";
import { sodasRoute } from "./routes/sodaRoutes.js";

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.json("Alex1111!");
});

app.use("/soda", sodasRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
