import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
import MyPageDonation from "@/components/MyPageDonation";
import MyPageInfo from "@/components/MyPageInfo";
import MypageFav from "@/components/MypageFav";
const MainPage = loadable(() => import("@/pages/MainPage"));
const SignInPage = loadable(() => import("@/pages/SignInPage"));
const LoginPage = loadable(() => import("@/pages/LoginPage"));
const DetailPage = loadable(() => import("@/pages/DetailPage"));
const MyPage = loadable(() => import("@/pages/MyPage"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/detail/:id" element={<DetailPage />} />
      <Route path="/mypage" element={<MyPage />}>
        <Route index element={<MyPageDonation />} />
        <Route path="info" element={<MyPageInfo />} />
        <Route path="fav" element={<MypageFav />} />
      </Route>
    </Routes>
  );
};
export default Router;
