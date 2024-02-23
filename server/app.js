import express, { urlencoded } from "express"; 
import UserRouter from "./router/UserRouter.js"; 
import PaymentRouter from "./router/PaymentRouter.js"; 
import cors from "cors";
import bodyParser from "body-parser";
import path from 'path'; 
const app = express(); 
const __dirname = path.resolve(); 

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: ["http:/localhost:5173",""], 
  credentials: true, // 크로스 도메인 허용 
}));  
app.use(bodyParser.json({ limit:'100mb' }));
app.use(express.static(path.join(__dirname, '/public')));  
app.use("/", UserRouter); 
app.use("/", PaymentRouter); 

app.listen(8081, () => {
  console.log(`http://localhost:8081 서버실행중`);
});
