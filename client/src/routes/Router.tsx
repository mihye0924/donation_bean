import { Routes, Route } from "react-router-dom";
import MainPage from "@/pages/MainPage";
import SignInPage from "@/pages/SignInPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
    </Routes>
  );
};
export default Router;
