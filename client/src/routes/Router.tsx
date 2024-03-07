import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";
import AdminPageAccountList from "@/components/AdminPageAccountList";
const MainPage = loadable(() => import("@/pages/MainPage"));
const SignInPage = loadable(() => import("@/pages/SignInPage"));
const LoginPage = loadable(() => import("@/pages/LoginPage"));
const DetailPage = loadable(() => import("@/pages/DetailPage"));
const MyPage = loadable(() => import("@/pages/MyPage"));
const MyPageDonation = loadable(() => import("@/components/MyPageDonation"));
const MyPageInfo = loadable(() => import("@/components/MyPageInfo"));
const MypageFav = loadable(() => import("@/components/MypageFav"));
const AdminPage = loadable(() => import("@/pages/AdminPage"));
const AdminPageDonationList = loadable(
  () => import("@/components/AdminPageDonationList")
);
const KaKaoLogin = loadable(() => import("@/components/KaKaoLogin"));
const NaverLogin = loadable(() => import("@/components/NaverLogin"));

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/kakao/oauth/logout" element={<LoginPage />} />
      <Route path="/kakao/oauth" element={<KaKaoLogin />} />
      <Route path="/naver/oauth" element={<NaverLogin />} />
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
