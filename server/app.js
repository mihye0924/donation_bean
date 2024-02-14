import express, { urlencoded } from "express"; 
import userRouter from "./router/UserRouter.js";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: ["http:/localhost:5173",""], 
  credentials: true, // 크로스 도메인 허용 
}));  
app.use(bodyParser.json({ limit:'100mb' }));
app.use("/", userRouter); 

app.listen(8081, () => {
  console.log(`http://localhost:8081 서버실행중`);
});
