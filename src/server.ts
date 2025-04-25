import express, { Request, Response } from "express";
import { AppDataSource } from "./dataSource/dataSource";
import router from "./routes/routes";

const app = express();
app.use(express.json());
const PORT = 3000;

app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hi World");
});

AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server Listening at Port ${PORT}`);
});
