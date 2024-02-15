import { Routes, Route } from "react-router-dom";
import MainPage from "@/pages/MainPage";
import SignInPage from "@/pages/SignInPage";
import DetailPage from "@/pages/DetailPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
    </Routes>
  );
};
export default Router;
