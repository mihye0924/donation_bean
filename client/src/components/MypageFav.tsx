import { getUser } from "@/util/userinfo";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";

interface Response {
  ok: boolean;
  favList?: {
    donation_name: string;
  };
}

const MypageFav = () => {
  const user = getUser();
  const { data: favData } = useQuery<Response>({
    queryKey: ["fav"],
    queryFn: () =>
      axios
        .get(`http://localhost:8081/user/fav?id=${user.id}`)
        .then((res) => res.data),
  });
  console.log(favData);

  return (
    <>
      <CardWrap></CardWrap>
    </>
  );
};
/* 
 <CardList 
                                key={item.id}
                                to={item.to}
                                imgSrc={item.imgSrc} 
                                imgUrl={item.imgUrl} 
                                title={item.title}
                                agency={item.agency}
                                day={item.day}
                                price={item.price}
                                percentage={item.percentage}
                            />

*/
export default MypageFav;

const CardWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  li {
    flex: 0 1 calc((100% / 4) - 20px);
  }
`;
