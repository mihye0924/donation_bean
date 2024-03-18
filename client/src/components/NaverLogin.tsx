import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { useLocation, useNavigate } from 'react-router-dom';

interface Response {
  ok: boolean;
  id: string;
  token?: string;
}

const NaverLogin = () => {
  const location = useLocation();
  const code = location.search.split('=')[1].split('&')[0];
  const navigate = useNavigate();
  const { data } = useQuery<Response>({
    queryKey: ['mypageinfo'],
    queryFn: () => axios.get(`${import.meta.env.VITE_SERVER_URL}/naver/oauth?code=${code}`).then((res) => res.data),
  });

  useEffect(() => {
    if (data && data.ok) {
      const cookie = new Cookies();
      cookie.set('auth_donation', 'kakaoGuest', { path: '/' });
      sessionStorage.setItem('info', JSON.stringify({ id: data.id }));
      sessionStorage.setItem('login_type', JSON.stringify({ type: 'naver',token:data.token })); //setitem
      navigate('/');
      console.log(data);
    }
  }, [data, navigate]);

  return <div>NaverLogin</div>;
};

export default NaverLogin;
