import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Register } from "../usercontext";
import Dashboard from "../products/dashboardProducts";
import AuthGuard from "./guard/authGuard";
import Order from "../products/orderProducts";
import CheckOut from "../products/checkoutProducts";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/order/:id"
            element={
              <AuthGuard>
                <Order />
              </AuthGuard>
            }
          />
          <Route
            path="/checkout/:id"
            element={
              <AuthGuard>
                <CheckOut />
              </AuthGuard>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
