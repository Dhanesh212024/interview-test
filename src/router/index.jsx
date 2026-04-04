import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Register } from "../usercontext";
import Dashboard from "../products/dashboard-products";
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route path="/" index element={<Dashboard />} />
         <Route path="/login" index element={<Login />} />
         <Route path="/register" index element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
