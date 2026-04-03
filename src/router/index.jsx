import { BrowserRouter, Route, Routes } from "react-router-dom";
const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
         <Route path="/login" index element={<h1>Hello Route 1</h1>} />
          {/* <Route path="/login" index element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} />
          <Route path="/404" element={<ErrorNotFound />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
