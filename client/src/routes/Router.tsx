import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
import MyPageDonation from "@/components/MyPageDonation";
import MyPageInfo from "@/components/MyPageInfo";
import MypageFav from "@/components/MypageFav";
import AdminPage from "@/pages/AdminPage";
import AdminPageDonationList from "@/components/AdminPageDonationList";
import AdminPageAccountList from "@/components/AdminPageAccountList";
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
      <Route path="/admin" element={<AdminPage />}>
        <Route index element={<AdminPageDonationList />} />
        <Route path="account" element={<AdminPageAccountList />} /> 
      </Route>
    </Routes>
  );
};
export default Router;
