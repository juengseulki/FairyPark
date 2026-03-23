import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("서버 실행 중");
});

app.listen(4000, () => {
  console.log("서버 실행: http://localhost:4000");
});
