import styled from "styled-components";
import Button from "@/components/Button";
import PopupStore from "@/store/popupStore";
import { useEffect, useCallback, useState, useMemo } from "react";
import axios from "axios";
import CardList from "./CardLise";
import { DetailDonationDataProps } from "@/types/detail";
import Category from "@/api/main/Category.json";
import Sort1 from "@/api/main/Sort1.json";
import Sort2 from "@/api/main/Sort2.json";
import Select, { Option } from "./Select";
import Radio from "./Radio";
import DonationStore from "@/store/donationStore";

const AdminPageDonationList = () => {
  const { popup, popupState, setTitle } = PopupStore();

  // 진행상태 초기셋팅
  const StatusList = useMemo(() => {
    return [
      {
        label: "진행중",
        value: "0",
      },
      {
        label: "진행종료",
        value: "1",
      },
    ];
  }, []);

  const {
    donation,
    changeDonation,
    setChangeCategory,
    setChangeStatus,
    setDonation,
    setRecentDonation,
    setAmountDonation,
    setPercentDonation,
    setExitDonation,
  } = DonationStore();

  // 라디오 카테고리 구분
  const [select1, setSelect1] = useState<Option>({ value: "0", label: "전체" });
  const [select2, setSelect2] = useState<Option>({ value: "최신 순" });
  const [radioActive, setRadioActive] = useState<number>(0);
  const [radioLabel, setRadioLabel] = useState<string>("전체");

  // 셀렉트 선택시 리스트 변경 - 전체, 진행중, 종료
  const handleChangeEvent1 = useCallback(() => {
    switch (select1.label) {
      case "전체":
        switch (select2.value) {
          case "최신 순":
            setRecentDonation(radioLabel, select1);
            break;
          case "참여금액 순":
            setAmountDonation(radioLabel, select1);
            break;
          case "참여율 순":
            setPercentDonation(radioLabel, select1);
            break;
          case "종료 임박 순":
            setExitDonation(radioLabel, select1);
            break;
        }
        break;
      case "진행중":
        switch (select2.value) {
          case "최신 순":
            setRecentDonation(radioLabel, select1);
            break;
          case "참여금액 순":
            setAmountDonation(radioLabel, select1);
            break;
          case "참여율 순":
            setPercentDonation(radioLabel, select1);
            break;
          case "종료 임박 순":
            setExitDonation(radioLabel, select1);
            break;
        }
        break;
      case "종료":
        switch (select2.value) {
          case "최신 순":
            setRecentDonation(radioLabel, select1);
            break;
          case "참여금액 순":
            setAmountDonation(radioLabel, select1);
            break;
          case "참여율 순":
            setPercentDonation(radioLabel, select1);
            break;
          case "종료 임박 순":
            setExitDonation(radioLabel, select1);
            break;
        }
        break;
    }
  }, [
    radioLabel,
    select1,
    select2.value,
    setAmountDonation,
    setExitDonation,
    setPercentDonation,
    setRecentDonation,
  ]);

  // 라디오 카테고리 구분
  const handleRadioChange = useCallback(
    (e: Option, i: number) => {
      // 라디오 클릭시 체크 초기화
      changeDonation.forEach((item) => {
        item.checked = false;
      });

      // 라디오 active
      setRadioActive(i);
      setRadioLabel(e.label as string);
    },
    [changeDonation]
  );

  // 카드리스트 limit 증가
  const [limit, setLimit] = useState<number>(12);
  const handleLimitToggle = () => {
    changeDonation.length > limit && setLimit(limit + 12);
  };

  // 카드리스트 체크
  const handleCheckBoxChange = useCallback(
    (item: DetailDonationDataProps) => {
      item.checked = !item.checked;
      Category.filter((item2: Option) => {
        if (item2.label === item.donation_category) {
          setChangeCategory(item2);
        }
      });
      StatusList.filter((item2: Option) => {
        if (item2.value === String(item.donation_status)) {
          setChangeStatus(item2);
        }
      });
    },
    [StatusList, setChangeCategory, setChangeStatus]
  );

  // ----------------------------------------------------------------------------------

  // 게시글 컨텐츠 삭제
  const donationDelete = useCallback(() => {
    let count = 0;
    changeDonation.forEach((item) => {
      if (item.checked) {
        count++;
      }
    });
    if (count > 0) {
      changeDonation.forEach((item) => {
        if (item.checked) {
          axios
            .delete(
              `${import.meta.env.VITE_SERVER_URL}/admin/donation?donation_no=${
                item.donation_no
              }`
            )
            .then((res) => {
              if (res.data.ok) {
                window.location.reload();
                return;
              }
            });
        }
      });
    } else {
      alert("선택된 게시글이 없습니다.");
    }
  }, [changeDonation]);

  // 게시글 수정 체크여부
  const donationUpdate = useCallback(() => {
    let count = 0;
    changeDonation.forEach((item) => {
      if (item.checked) {
        count++;
      }
    });
    if (count === 1) {
      setTitle("수정");
      popupState(!popup);
    } else if (count > 1) {
      alert("한개의 게시물만 선택해주세요");
      setDonation(donation);
      handleChangeEvent1();
    } else {
      alert("선택된 게시글이 없습니다.");
    }
  }, [
    changeDonation,
    donation,
    handleChangeEvent1,
    popup,
    popupState,
    setDonation,
    setTitle,
  ]);

  // 전체 게시물 가져오기
  useEffect(() => {
    axios
      .get(`http://localhost:8081/main/donation`)
      .then((res) => {
        setDonation(res.data.result);
        handleChangeEvent1();
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, [handleChangeEvent1, setDonation]);

  return (
    <AdminPageWrap>
      <h1>기부목록</h1>
      <ButtonBox>
        <Button
          width="80"
          onClick={() => {
            setTitle("등록"), popupState(!popup);
          }}
        >
          등록
        </Button>
        <Button width="80" onClick={donationDelete}>
          삭제
        </Button>
        <Button width="80" onClick={donationUpdate}>
          수정
        </Button>
      </ButtonBox>
      <SelectWrap>
        <Select
          selectOptions={Sort1}
          value={Sort1[0]}
          size={120}
          onChange={(e) => {
            setSelect1(e as Option);
          }}
        />
        <Select
          selectOptions={Sort2}
          value={Sort2[0]}
          size={120}
          onChange={(e) => {
            setSelect2(e as Option);
          }}
        />
      </SelectWrap>
      <RadioWrap>
        <form>
          {Category.map((item, index) => {
            return (
              <Radio
                key={item.id}
                className={radioActive === index ? "active" : ""}
                label={item.label}
                id={item.id}
                value={item.value}
                imgUrl={item.imgUrl}
                type="image"
                name="기부리스트"
                onChange={() => handleRadioChange(item, index)}
              />
            );
          })}
        </form>
      </RadioWrap>
      <CardWrap>
        {changeDonation.map(
          (item: DetailDonationDataProps, index: number) =>
            index < limit && (
              <CardList
                check
                key={item.donation_no}
                to={`/detail/${item.donation_no}`}
                imgSrc={item.donation_name}
                imgUrl={item.donation_image}
                title={item.donation_name}
                agency={item.donation_company}
                day={item.donation_period}
                price={item.donation_goal}
                percentage={item.donation_status}
                htmlId={item.htmlId}
                name="선택"
                checked={item.checked}
                value={item.htmlId}
                onChange={() => handleCheckBoxChange(item)}
              />
            )
        )}
      </CardWrap>
      {limit <= changeDonation.length ? (
        <ButtonWrap>
          <Button border="#ddd" size="medium" onClick={handleLimitToggle}>
            더보기
          </Button>
        </ButtonWrap>
      ) : null}
    </AdminPageWrap>
  );
};

export default AdminPageDonationList;
const sizes = {
  desktop: "1200px",
  tablet: "768px",
  mobile: "375px",
};
const media = {
  desktop: `(max-width: ${sizes.desktop})`,
  tablet: `(max-width: ${sizes.tablet})`,
  mobile: `(max-width: ${sizes.mobile})`,
};

const AdminPageWrap = styled.div`
  h1 {
    color: #f56400;
    font-family: "NanumSquareNeo-Variable";
    font-size: 40px;
    font-weight: 900;
    @media ${media.desktop} {
      margin-top: 20px;
      font-size: 30px;
    }
    @media ${media.tablet} {
      display: none;
    }
  }
`;
const ButtonBox = styled.div`
  margin-top: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  button {
    background-color: #f56400;
    color: #fff;
    padding: 8px 20px;
    border: 0;
    margin-left: 10px;
    &:not(:nth-of-type(1)) {
      color: #f56400;
      border: 1px solid #f56400;
      background-color: transparent;
    }
  }
  @media ${media.desktop} {
    button {
      width: 65px;
      padding: 5px 13px;
      font-size: 14px;
    }
  }
`;
const RadioWrap = styled.div`
  margin: 20px auto 20px;
  overflow-x: scroll;
  overflow-y: hidden;
  padding-bottom: 10px;
  &::-webkit-scrollbar {
    margin-top: 20px;
    height: 5px;
  }

  /* 스크롤바 막대 꾸미기 */
  &::-webkit-scrollbar-thumb {
    height: 5px;
    background-color: #f1f1f1;
  }
  @media ${media.mobile} {
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  form {
    margin: 0 10px;
    display: flex;
    gap: 8px;
  }
`;
const SelectWrap = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
const CardWrap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  li {
    flex: 0 1 calc((100% / 3) - 15px);
    span:first-child {
      display: inline-block;
    }
  }
  @media ${media.desktop} {
    li {
      flex: 0 1 calc((100% / 2) - 10px);
    }
  }
  @media ${media.mobile} {
    li {
      flex: 0 1 100%;
    }
  }
`;
const ButtonWrap = styled.div`
  margin-top: 24px;
`;
