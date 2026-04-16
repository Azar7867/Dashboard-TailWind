import { BrowserRouter } from "react-router-dom";
import RootRouter from "./routes/RootRouter";

export default function App() {
  return (
    <BrowserRouter>
     <RootRouter />
    </BrowserRouter>
  );
}