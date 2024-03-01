drop table payment;
drop table user;
drop table fav;
drop table donation;


select * from user;
select * from fav; 
select * from donation;
select * from payment;


--  donation 
-- 다문화
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (1, 'test1', '아빠의 사고로 어려움에 처한 지수가족의 손을 잡아주세요', 'image01.jpg', '한국인 아빠와 베트남인 엄마 사이에서 태어난 13살 지수와 12살 서영이. 평범하고 단란한 가족에게 어려움이 찾아온 것은 지수와 서영이가 불과 8살, 7살이었던 5년 전, 2017년입니다. 가족의 주요 수입원이었던 아빠는 대형화물차 운전을 하고 있던 중, 갑작스러운 교통사고를 겪었습니다. 사고 후에는 심정지까지 발생하여 심폐소생술을 받아 겨우 생명을 유지할 수 있었지만, 뇌에 큰 충격을 받아 거동이 불가능한 상태로 남게 되었습니다. 지금까지도 산소호흡기를 의지하여 호흡을 유지하며, 식사는 목에 구멍을 뚫고 음식을 넣어주어야 하는 상황입니다. 의사의 소견으로는 재활은 불가능하며, 아빠가 돌아가실 때까지 현 상태를 유지하며 지켜보는 것 외에는 다른 조치를 취할 수 없다고 합니다.', '기아대책', 9900000, '2024.05.01 ~ 2024.12.31', '다문화', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (2, 'test1', '2024년 새학기엔 깨끗한 새옷을 입고 등교하고 싶어요', 'image2.jpg', '세연이 엄마는 시댁에 돈이 많아 결혼만 하면 돈 걱정없이 살수 있다는 말에 솔깃해 남편에 대한 정보 하나없이 한국으로 시집을 왔습니다. 시부모님이 안계셔 누나 집에서 함께 살며 누나가 엄마 노릇을 해왔다는 말에 정말 가족간의 정이 넘치는 집이구나 마음이 따뜻해졌고 낯선 한국땅에서 잘 살수 있을 것 같은 자신감도 생겼습니다. 막상 도착한 누나의 집에서 만난 남편은 휠체어에 의존하여 살아가고 있는 선천성 지체장애인 이었습니다. 놀란 가슴을 진정할 겨를도 없이 결혼 생활이 시작되었고 남편의 수발을 들고 집안 일을 하면서 지옥같은 하루 하루를 보냈습니다. 누나는 본인이 하던 모든일을 엄마에게 미루고 행여 엄마가 도망이라도 갈까 하루종일 감시했고 남편의 세상을 향한 대상없는 화풀이와 폭력은 어느덧 엄마를 향해 있었습니다. 낯선 땅, 언어도 통하지 않는 곳에서 감금되다시피 살던 엄마가 삶을 포기하고 있을 즈음 생각지도 못하게 세연이가 찾아왔습니다.
', '사단법인 한국다문화청소년협회', 660000, '2024.01.17 ~ 2024.06.17', '다문화', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (3, 'test1', '병원가기 두려운 외국인 노동자를 위한 무료진료', 'image3.jpg', '많은 이주외국인들이 가족의 생계를 유지하기 위해, 가정의 미래를 위해 낯선 ‘한국’에 와서 노동자로서의 삶을 살아갑니다. 한국에서 외국인으로 사는 것은 쉬운 일은 아닙니다. 온갖 궂은 일을 하며 때로는 모멸과 멸시를 참으면서도 가족과 자녀를 위해 생활을 이어갑니다. 이들도 우리와 똑같은 이웃입니다.', '사단법인 러브 아시아', 500000, '2024.01.09 ~ 2024.03.31', '다문화', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (4, 'test1', '승연아 조금씩 천천히 배워가보자.할수 있어!', 'image4.jpg', '베트남 출신 엄마는 아빠와 맞선으로 결혼을 했습니다. 한국이라는 나라는 엄마에게 낯선 땅이었습니다. 모든 것이 낯설고 서툴기만 했습니다.문화도 달랐고 말도 달랐고 음식도 달랐고 그 무엇보다 친정 부모님과 형제 자매가 없는 한국땅이 엄마에겐 너무 슬프기만 했습니다. 기댈곳은 오로지 남편뿐이었습니다. 그러나 결혼식을 하고 신혼여행을 다녀 온 후부터 남편은 다른 사람이 되어 있었습니다. 나이 차이가 많아 조금은 다를것이라 이해를 했지만 이토록 차이가 날 줄은 차마 몰랐습니다. 남편은 엄마의 모든것을 이해하지 못했습니다. 한 여름에도 무릎 아래 치마나 반바지를 용납하지 못했고 긴 머리를 짧게 묶는 것도 절대 하면 안되는 행동이었습니다. 다른 사람과 절대 이야기를 하는 것도 안되고, 모든 집안일 이외에는 남편이 전부 도맡았습니다. 시장보기도 당연히 남편이 하는 일이었습니다. 왜냐하면 다른 사람과 말을 섞는다는 이유이기 때문이었습니다. 그래서인지 엄마는 한국말이 잘 늘지 않았습니다.', '사단법인 한국다문화청소년협회', 930000, '2024.02.01 ~ 2024.11.18', '다문화', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (5, 'test1', '곰팡이가 가득한 우리집을 도배할 수 있게 도와주세요.', 'image5.jpg', '어머니는 애가 탑니다. 부동산 사장님에게 전화를 해 보고 다시 집주인에게 전화를 다시 해 보았지만 되돌아 오는것 메아리처럼 똑같은 대답뿐입니다. 도배는 우리가 해 줄것이 아니다. 이사 들어올 사람이 하는것이지 왜 집주인이 해야 되는것이냐, 대한민국에 도배장판을 해주는 집주인이 세상에 어디있냐는 이야기를 연지어머니에게 소리치며 이야기합니다. 얼마전 연지엄마는 공공임대주택에 당첨이 되어 이사를 했습니다. 지하2층 햇볕이 들어오지 않는 곳에서 살다가 드디어 해가 따스히 들어오는 1층으로 이사를 한다는 것에 엄마는 너무 감동이었고 기뻤습니다. 매일 매일을 이사 갈 곳인 그 집 주변을 서성거렸습니다. 집 안으로 들어가 보진 못했지만 담벼락에 서서 바라만 보는 것만으로도 행복했습니다. 3달앞으로 다가온 이사는 준비할 것이 많았지만 아무것도 모르는 엄마는 부동산 사장님에게 묻고 또 물어보며 하나 하나 서류부터 차근 차근 준비해 이사 준비를 했습니다.', '사단법인 한국다문화청소년협회', 990000, '2024.04.01 ~ 2024.12.31', '다문화', 0);
-- 동물
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (6, 'test1', '낚싯줄에 걸린 돌고래 "종달이"를 구해주세요', 'image01.jpg', '1월 29일 제주돌고래 긴급구조단이 종달이 꼬리에 걸린 낚싯줄 제거에 성공했습니다. 아직 종달이 몸과 입에 제거하지 못한 낚싯줄이 남아 있습니다', '해피해피기관', 9000000, '2024.02.14 ~ 2024.04.30', '동물', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (7, 'test1', '하천을 찾아오는 백조의 생명을 위한 횡단구조물 철거', 'image2.jpg', '대전 갑천에 놀라운 새들이 계속 확인되고 있습니다. 얼마 전 노랑부리저어가 3년째 월동하는 것을 확인했고. 잿빛개구리매와 큰말똥가리 두 종이 추가로 확인되었습니다. 모두 환경부가 멸종위기 야생생물 2급으로 지정한 보호종입니다. 맹금류는 최상위 포식자로 중요한 생태적 위치에 있어 서식하는 것 자체만으로 의미가 높은 깃대종입니다', '해피해피기관', 800000, '2024.01.19 ~ 2024.04.18', '동물', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (8, 'test1', '팔현습지의 깃대종 수리부엉이 부부를 꼭 지켜주세요', 'image3.jpg', '금호강 팔현습지는 금호강에서 가장 아름다운 습지 중 하나로 대구의 3대 습지이기도 합니다. 이 아름다운 팔현습지엘 가면 이곳 금호강 팔현습지의 깃대종이라 할 수 있는 수리부엉이 부부를 만날 수 있습니다. 이들 부부는 팔현습지의 하식애 절벽에 둥지를 짓고 살고 있어서 눈 밝은 이들은 육안으로도 이들을 관찰할 수 있습니다. 이들은 낮에는 팔현습지를 굽어보면서 잠을 청하고 밤이 오면 백수의 제왕답게 사냥에 나섭니다.', '해피해피기관', 950000, '2024.01.09 ~ 2024.04.08', '동물', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (9, 'test1', '새와 하늘다람쥐를 위한 둥지상자', 'image4.jpg', '사람들을 위해 산책로로 숲과 강에 설치된 시설물이 하늘을 날아다니는 새와 하늘다람쥐등의 동물들에게는 매우 위험합니다. 점점 길과 사람들의 공간이 늘어나면서 새와 생물은 살 곳을 잃어 갑니다. 새들의 먹이가 되는 지렁이, 곤충들 역시 살아가기 힘들 수 밖에 없습니다. 숲과 강을 서식지로 살아가는 생명들에게는 위험 요인들만 늘어갑니다.', '해피해피기관', 800000, '2024.01.19 ~ 2024.04.18', '동물', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (10, 'test1', '전문훈련을 통해 단 한아이의 손도 놓지 않도록', 'image5.jpg', '구조견들 중에는 사람을 극도로 무서워하는 아이들이 종종 있습니다. 낯선 환경, 낯선 사람에게 겁을 먹고 처음에는 경계를 하다가 시간이 지나면서 마음을 여는 아이들도 많지만, 1년이 지나고 2년이 지나도 여전히 사람을 경계하는 아이들도 있습니다. 예방접종 등의 병원 진료를 위해 사람과의 접촉이 불가피할 때면 죽을힘을 다해 도망가거나 자신을 방어하기 위해서 그 극도의 두려움을 공격성으로 표현하는 아이들도 있습니다.', '해피해피기관', 995000, '2024.02.01 ~ 2024.05.01', '동물', 0);
-- 아동*청소년
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (11, 'test1', 'KBS동행 제447화 꽃할매와 숨바꼭질', 'image01.jpg', '열네 살 은선이가 하루 중 가장 긴장하는 시간은 오후 4시와 자정 무렵입니다. 3년 전부터 치매 증세를 보이던 할머니는 최근들어 병세가 눈에 띄게 나빠지시며 잠깐만 긴장을 늦춰도 홀연히 사라져버리십니다. 때문에 남들은 깊은 잠에 빠져있을 시간에도 은선이는 할머니를 찾으러 다니느라 하루하루가 숨 가쁩니다. 아침에는 분명 지금껏 봐온 할머니 모습 그대로인데.. 오후 4시만 지나면 전혀 다른 사람이 되어 기억을 잃고 혼자 길거리를 배회하십니다. 부모님의 이혼으로 여섯 살 때부터 할머니 품에서 자란 은선이기에 어릴적 꽃처럼 고왔던 할머니의 모습이 더더욱 그립습니다. 치매 할머니를 돌보는 일만으로도 벅찰텐데, 은선이는 요즘 할아버지의 손발도 되어드립니다. 작년 오토바이 사고로 대퇴골이 부러져 수술을 받으신 후로 거동이 어려워진 할아버지. 대부분 누워 지내시는 할아버지의 운동을 돕고 무료한 시간 말벗이 되어드리는 건 자신을 사랑으로 길러주신 조부모님께 너무 당연한 효도라 여기고 있습니다.', '초록우산', 20000000, '2024.04.01 ~ 2024.09.02', '아동*청소년', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (12, 'test1', '수아가 무사히 학교에 갈 수 있도록 도와주세요.', 'image2.jpg', '심한 지적 장애를 가진 수아(가명, 8세)는 또래보다 전반적인 발달이 지연되었습니다. 배고프다거나, 화장실에 가고 싶다거나 하는 기본적인 의사 표현도 하지 못해 엄마는 24시간 수아의 곁을 떠날 수 없습니다. 수아가 올해 학교 입학을 앞둔 지금, 엄마는 걱정이 깊어졌습니다. 학교 특수반을 가더라도 기본적인 의사 표현이나 배변 처리가 가능하고, 사회성이 있어야 할 텐데··· 증상 호전을 위해서 재활 치료를 받아야 하지만 형편이 되지 않아 발만 동동 구르고 있습니다.', '밀알복지재단', 990000, '2024.02.16 ~ 2025.02.15', '아동*청소년', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (13, 'test1', 'KBS동행 제446화 내 소원을 들어줘', 'image3.jpg', '행운을 전해준다는 네잎클로버를 찾기 위해 길가에 잡초도 그냥 지나치지 않는 아이 이진이가 있습니다. 네잎클로버뿐만 아니라 소원을 이뤄준다는 거북이 동상에도 매일 찾아간다는데, 그 이유는 엄마의 건강을 빌기 위해서입니다. 4년 전부터 몸이 뻣뻣해지기 시작한 이진이 엄마는 병명도 모른 채 원인을 찾아다니다 지난 12월에야 ‘강직인간증후군’ 판정을 받게 됐습니다. 100만 명 중에 한 명이 진단받는다는 강직인간증후군은 온몸에 근육이 점점 굳어가다 어느순간 혼자 걷는 것조차 쉽지 않아지는 극희귀질환입니다. 허리에는 항상 복대를 차고, 통증을 줄여보려 매일 무릎과 발에 파스를 달고 사는 엄마. 그런 엄마를 보는 이진이의 마음 속상하기만 합니다. 하여 오늘도 작은 두 손을 모아 엄마의 건강을 비는 이진이. 갖고 싶은 것도, 하고 싶은 것도 많을 나이일텐데, 이진이의 소원은 단 하나 엄마의 건강과 가족의 행복이라 합니다.', '초록우산', 2200000, '2024.03.25 ~ 2024.08.25', '아동*청소년', 0);
-- 시민사회
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (14, 'test1', '백혈병혈액암 환자들의 위로의 시간 "책읽기 모임 쉼표"', 'image01.jpg', '백혈병.혈액암 환자와 가족에게 전하는 위로와 응원의 시간
치료 중이거나 치료가 끝나고 사회복귀를 준비하는 백혈병.혈액암 환자와 가족들에게 백혈병환우회의 책 읽기 모임 "쉼표"는 또 하나의 위로의 만남이 되고 있습니다."쉼표"에서는 완치환자와, 투병 중인 환자 그리고 환자 가족이 함께 매월 선정된 도서를 함께 읽고, 서로의 생각을 나누고, 그 안에서 서로 위로와 용기를 전하는 시간입니다."쉼표"는 다양한 에세이, 소설, 시, 수필 등을 읽으며 마음의 양식을 채우고 희망을 채우는 희망충전소입니다.', '한국백혈병환우회', 5000000, '2024.02.01 ~ 2024.04.30', '시민사회', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (15, 'test1', '자질미달 국회의원, 언제까지 두고 보실 건가요?', 'image2.jpg', '경실련은 지난 한 해, 국회의원을 대상으로 다양한 조사를 진행, 발표했습니다. 국민의 대표인 국회의원이 국회법에 명시된 출석 의무조차 제대로 지키지 않는 실태, 국민의 봉사자인 국회의원이 의정활동 기간 가상자산 투자를 일삼고도 제대로 된 징계를 받지 않는 실태, 가장 청렴해야 할 고위공직자인 국회의원이 부동산, 주식 투자를 통해 자기재산 증식에 몰두하는 실태 등을 밝혀냈습니다.', '경제정의실천시민연합', 1000000, '2024.02.07 ~ 2024.05.31', '시민사회', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (16, 'test1', '일제가 ‘제일 맹렬히 잡고자’ 했던 김단야', 'image3.jpg', '1926년 4월 25일 조선의 마지막 왕인 순종이 승하했습니다. 조선 500년 마지막 왕의 죽음을 맞아 애도 분위기가 확산됨은 물론 정의부·신민부 등 만주 독립군 부대가 국내로 진입할 것이라는 기사가 잇따르는 등 항일 분위기 역시 더욱 고조되었습니다. 1919년 3.1운동과 마찬가지로 독립운동가들은 순종의 장례에 맞춰 전국적인 만세운동을 기획합니다. 3.1운동이 민족대표 33인으로 상징되는 천도교, 기독교 세력이 앞장섰다면 이번에는 조선공산당이 중심이 되었습니다. 하지만 조선총독부는 3.1운동의 전례를 반복하지 않기 위해 1개 사단의 군대와 4천 명의 경찰을 동원하며 삼엄한 경계를 펼쳤습니다. 순종 승하 후 1주일 동안 경찰에 검속, 설유, 주의 등의 제재 조치를 받은 사람이 종로경찰서 관내에서만 29,497명에 달할 정도였습니다.', '민족문제연구소', 9000000, '2024.05.15 ~ 2024.09.01', '시민사회', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (17, 'test1', '잊혀졌던 궁궐, 경희궁을 해설로 복원합니다.', 'image3.jpg', '1620년 광해군대에 지어진 경희궁은 서궐로 불리우며 동궐인 창덕궁과 함께 조선 후기 양궐 체제의 한 축을 이루던 중요한 궁궐이었습니다. 그러나 근현대와 일제강점기를 거치면서 궁궐의 전각들이 팔리거나 뿔뿔이 흩어졌고, 경희궁은 궁궐로써의 외형을 모두 잃고 말았습니다.', '사단법인 우리문화숨결', 3000000, '2024.01.01 ~ 2024.12.31', '시민사회', 0);
-- 장애인
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (18, 'test1', '쑥쑥 자라는 율빈이에게 필요한 발 교정 인솔깔창', 'image01.jpg', '작고 고사리 손을 가진 초등학생 율빈이가 이제는 어느새 훌쩍 커버려 중학생 1학년이 되었답니다. 아이들이 쑥쑥 성장해 가는 모습을 볼 때면 시간이 정말 바르게 지나가고 있구나 라는 현실을 느끼고 마음에 더 크게 와 닿을 수 밖에 없는데요. 수줍음도 많고 웃음도 많은 귀여운 율빈이에게는 염색체 이상으로 인해 발행하는 다운증후군이란 질환과 어릴적 아치가 제대로 형성되지 못하여 교정을 통한 꾸준한 치료가 필요합니다. 하지만 금전적인 부분에 있어 지속적인 병원치료가 어려웠던 어린시절 율빈이는 치료 시기를 놓치고 말았으며 율빈이가 성장하는 속도에 맞춰 주기적으로 율빈이 발에 맞는 인솔깔창으로 발의 밸런스를 맞춰 교정 할 수 밖에 없는데요. 한 번의 제작구입으로 성인이 되어서까지 사용 할 수 있다면 조금이나마 제작비용을 아낄 수 있겠지만.. 성장하며 변화하는 발의 형태, 발 사이즈 등에 맞춰 다시 제작해야 하기에 율빈이의 인솔깔창 모금함을 다시 열게 되었습니다.', '한뜻마을', 2200000, '2024.01.16 ~ 2025.01.14', '장애인', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (19, 'test1', '언어 자극이 꼭 필요한 장애아동들', 'image2.jpg', '하고 싶은 말은 많은데 어떻게 말을 해야 좋을지 모르겠습니다. 발달장애아동인 지민(가명)이의 이야기입니다. 지민이는 하루 종일 중얼중얼 거리지만 제대로 된 언어 표현이 아닌 의성어를 반복할 뿐입니다. 오늘 지민이는 무엇을 말하고 싶을까요? 지민이가 어떤 아이스크림을 좋아하는지, 어떤 장난감을 좋아하는지 말로 의사 전달을 할 수 있다면 얼마나 좋을까요?', '사단법인 난치병아동돕기운동본부', 9600000, '2024.01.04 ~ 2024.12.31', '장애인', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (20, 'test1', '장애인 장애아동 부모들을 위한 배움터, 엄마의 날', 'image3.jpg', '소방관이 화재현장에서 안타깝게 목숨을 잃는 소식이 전해지면 국민들 역시 큰 슬픔에 빠집니다. 소방관의 안전과 보호 시스템 마련에 대한 목소리도 점점 커지고 있습니다. 2023년에 서울 지역 소방관을 대상으로 트라우마와 외상 후 스트레스 장애(PTSD)에 관한 설문조사를 진행한 결과, 총 1,057명 중 업무로 인해 트라우마를 경험하는 소방관이 477명(45%)이었고, 이 중 트라우마 치료 경험이 단 한 번도 없는 소방관이 354명(74%)이었습니다. PTSD와 관련한 주요 키워드로는 출동 벨소리, CPR(심폐소생술), 사고, 기억, 현장, 부상 등을 가장 많이 꼽았습니다.', '사회복지법인 한림화상재단', 9900000, '2024.04.01 ~ 2024.12.31', '장애인', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (21, 'test1', '힌남노 태풍으로 상하지 완전마비가 되어버린 소방관', 'image4.jpg', '2022년 4월에 임용된 김 소방관은 119안전센터에서 화재진압 대원으로 근무 중이었습니다. 같은 해 9월, 모두가 기억하는 슈퍼 태풍 힌남노가 경남에 상륙했습니다. 태풍이 몰고 온 많은 양의 비와 강풍으로 영남권에 피해가 집중되었습니다. 당시 새벽 근무 중이었던 김 소방관은 태풍으로 인해 쓰러진 나무의 2차 피해를 방지하고자 현장 안전조치를 실시하고 귀소하고 있었습니다. 그러던 중, 왕복 2차선 도로상 쓰러진 나무를 발견하였고, 안전조치를 취하던 소방관에게 작업 중인 나무 외 뒤편의 나무가 2차로 쓰러지며 현장을 덮치고 말았습니다.', '대한적십자사경상남도지사', 50000000, '2024.03.18 ~ 2024.08.17', '장애인', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (22, 'test1', '쑥쑥 자라는 율빈이에게 필요한 발 교정 인솔깔창', 'image5.jpg', '작고 고사리 손을 가진 초등학생 율빈이가 이제는 어느새 훌쩍 커버려 중학생 1학년이 되었답니다.아이들이 쑥쑥 성장해 가는 모습을 볼 때면 시간이 정말 바르게 지나가고 있구나 라는 현실을 느끼고 마음에 더 크게 와 닿을 수 밖에 없는데요. 수줍음도 많고 웃음도 많은 귀여운 율빈이에게는 염색체 이상으로 인해 발행하는 다운증후군이란 질환과 어릴적 아치가 제대로 형성되지 못하여 교정을 통한 꾸준한 치료가 필요합니다. 하지만 금전적인 부분에 있어 지속적인 병원치료가 어려웠던 어린시절 율빈이는 치료 시기를 놓치고 말았으며 율빈이가 성장하는 속도에 맞춰 주기적으로 율빈이 발에 맞는 인솔깔창으로 발의 밸런스를 맞춰 교정 할 수 밖에 없는데요. 한 번의 제작구입으로 성인이 되어서까지 사용 할 수 있다면 조금이나마 제작비용을 아낄 수 있겠지만.. 성장하며 변화하는 발의 형태, 발 사이즈 등에 맞춰 다시 제작해야 하기에 율빈이의 인솔깔창 모금함을 다시 열게 되었습니다.', '한뜻마을', 2200000, '2024.04.01 ~ 2024.12.31', '장애인', 0);
-- 어르신
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (24, 'test1', '생신날조차 폐지를 주우러 가는 할머니', 'image3.jpg', '올해 83세가 되신 박복순(가명) 할머니는 뇌성마비 1급을 앓고 있는 60대 아들과 함께 살고 계십니다. 할머니의 하루는 몸이 불편한 아들을 챙기며 시작됩니다. 수건으로 얼굴을 닦고, 양치질하는 것을 도우며 양말을 신겨줍니다. 평생 아들을 챙기느라 정작 본인 스스로는 제대로 챙기지 못한 할머니는 여든이 된 지금도 자신의 생일날조차 폐지를 주우러 밖으로 향합니다. 일 년의 하루, 마음껏 축복받아야 하는 생일임에도 할머니는 생계를 위해 폐지를 줍습니다. 일평생 제대로 된 생신상 한 번을 받아본 적이 없다는 할머니... 그래서인지 평소 식사도 부실한 것은 마찬가지입니다. 할머니는 월세, 수도세 등 각종 세금과 병원비, 약값으로 나가고 나면 쌀 사기도 벅차다고 하십니다. 우리 주변에는 박복순 할머니처럼 하루하루 빈곤 속에서 살아가는 취약계층 어르신분들이 너무도 많습니다.', '사단법인 따뜻한하루', 9900000, '2024.05.01 ~ 2024.06.30', '어르신', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (25, 'test1', '어르신의 어두워진 세상에 밝은 빛을 선물해 주세요.', 'image4.jpg', '시각장애를 가진 김덕만 어르신(가명, 71세)은 고시원의 작은방 한 칸에서 생활하고 계십니다. 조리공간이 마땅치 않은 고시원은 시각장애를 갖고 있는 어르신께서 따뜻한 밥을 차려 드시기에 많은 어려움이 있습니다. 이런 고시원 생활은 어르신의 밥상까지 어둡게 만들었습니다. 제대로 된 식사를 드시기 어려운 어르신은 시장에서 두부를 사다가 간장을 뿌려 한 끼를 겨우 해결하고 있습니다. “어르신 식사하는 것도 힘들고 고시원 생활이 많이 불편하시겠어요” 고시원을 방문한 사회복지사가 물어보자 어르신은 눈물을 글썽거리시며 “한 끼 때우는 것 조차 힘들고 삶이 버거워 죽음까지도 생각했어요.”라고 말씀하셨습니다.', '강동구립해공노인복지관', 3156000, '2024.04.01 ~ 2025.03.31', '어르신', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (26, 'test1', '생신잔치로 홀로 지내시는 어르신들을 축하해주세요', 'image5.jpg', '살다 보면 여러 가지 의미 있는 순간들을 경험하게 됩니다. 기념일은 그런 순간들을 기억하기 위해 만들어지는데요. 그 중에서 생일은 태어나면서 누구나 자연스럽게 갖게 되는 기념일이라는 점에서 의미가 남다릅니다. 생일이 되면 한 사람의 출생을 진심으로 축하하고자 가족들이나 소중한 사람들이 모여 함께 시간을 보는데요. 생일인 사람은 스스로에 대한 소중함과 축하해주는 주변 사람들에 대한 고마움을 느끼며 삶에 대한 긍정적 마음가짐을 얻게 됩니다.', '도봉노인종합복지관', 2000000, '2024.02.20 ~ 2024.11.30', '장애인', 0);
-- 가족*여성
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (27, 'test1', 'MBN 소나무 암에 걸린 부부와 지적 장애 아들"', 'image01.jpg', '의정부시의 한 빌라, 영순 씨(57)는 남편 석성 씨(71)와 중증 지적장애를 진단받은 아들 민수 씨(19)와 함께 살고 있습니다. 영순 씨는 작년 4월, 방광암 4기 판정을 받고 급하게 두 차례의 수술을 받은 이후 일상생활에 제약이 많아졌습니다. 집안일을 할 수 없음은 물론, 혼자 일어서는 일조차 버거워 영순 씨의 곁에는 늘 누군가 있어야 합니다. 뿐만 아니라 당뇨 합병증으로 인해 재작년부터는 이가 빠지기 시작했습니다. 6개만 남은 치아는 그마저도 항암 치료로 약해진 잇몸 탓에 뿌리가 흔들립니다. 음식을 거의 씹을 수 없으니 영양 섭취가 제대로 이루어지지 못하고 있는 상황. 수술 후유증과 더불어 심각한 체력 저하로 인해 고생하고 있는 영순 씨는 우울증약, 수면제, 통증약 등 매일 여러 가지 약을 복용해야 합니다.', '한국백혈병환우회', 9900000, '2024.05.20 ~ 2025.05.19', '가족*여성', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (28, 'test1', '모자원에서 새출발을 꿈꾸는 미영씨네 가족', 'image2.jpg', '저는 어렸을 적부터 고아원에서 나고 자랐습니다. 고등학교 졸업과 동시에 고아원을 나와 사회생활을 하다가, 꽃다운 나이 스무 살에 12살 차이 나는 아이 아빠를 만났습니다. 처음에는 나이 차이가 너무 커 부담스러웠지만, 시간이 지날수록 변함없이 아껴주고 챙겨주는 모습에 조금씩 마음의 문을 열었고 남편에게 의지하게 되었습니다. 철없던 어린 시절이라 사랑만 가지고 살 수 있을 것이라고 생각하며, 돈을 모은 뒤 결혼식을 올리자는 남편의 말을 믿었는데…. 같이 살림을 합친 그 순간부터 남편은 폭력적으로 변하기 시작하였습니다.', '에벤에셀모자원', 7000000, '2024.02.13 ~ 2024.04.30', '가족*여성', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (29, 'test1', '이번 설날에는 엄마와 행복한 시간을 보내고 싶어요', 'image3.jpg', '민영(가명) 씨는 혼자서 2명의 자녀를 키우는 한부모가정으로 남편의 폭력으로 인하여 이혼을 한 뒤 모자원에 입소하게 되었습니다. 모자원에 이사를 오고 난 뒤로는 아이들만 두고 일하러 나가지 않아도 되는 것에 대해 너무 고맙게 생각하며 민영씨네 가족에 '모자원'이 울타리가 되어준것 같다면서, ‘더 열심히 돈을 벌어 아이들과 행복하게 살겠다.’라며 ’항상 감사하다.’라는 말을 하며 자립을 준비하고 있습니다.', '에벤에셀모자원', 2450000, '2024.02.08 ~ 2024.02.29', '가족*여성', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (30, 'test1', '가정폭력으로 치료가 필요한 윤서씨에게 힘이되어주세요.', 'image3.jpg', '남편은 둘째 아이가 20개월 되었을 때부터 아이들에게 폭력을 휘두르기 시작했습니다. 학대의 정도는 갈수록 심해지고 윤서씨(가명)에게도 폭행과 성학대를 하는 일이 점점 잦아져 이혼을 결심했습니다. 하지만 이혼 조정 기간 중 남편은 스스로 목숨을 끊고 말았고... 윤서씨는 폭력으로 인한 트라우마와 상실로 인한 충격으로 마음 깊이 상처가 남았습니다.윤서씨는 공황장애와 우울증, PTSD를 앓고 있습니다. 매일 힘든 순간들이 찾아오지만 아이들을 생각에 이겨냅니다. 약물치료를 받고 있으며, 얼마 전 상담치료 회기가 끝났지만 비용을 마련할 수 없어 이어가지 못하고 있습니다.', '밀알복지재단', 9900000, '2024.01.26 ~ 2025.01.25', '가족*여성', 0);
-- 기타
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (31, 'test1', '저소득 청년은 오늘도 끼니를 해결할 수 없습니다.', 'image01.jpg', '대학생 혜수씨는 고등학생 때부터 컴퓨터 코딩에 관심이 있었지만, 경제적 어려움 때문에 학교 교육에만 몰두하며 원하던 학과에 입학할 수 있었습니다. 하지만 입학 후 처음 느꼈던 감정은 '비참함'... 컴퓨터나 노트북이 없어 눈으로만 지식을 익혀왔던 자신과, 다양한 사교육을 통해 지식을 쌓아온 친구들과의 출발점은 너무나 달랐습니다. 수업시간에 과제를 끝내는 친구들과는 달리 혜수씨는 새벽까지 남아 학습해야만 했고, 주말에도 집에 컴퓨터가 없어 왕복 3시간이 걸리는 학교로 향해 부족한 부분을 채워야만 했습니다. 점차 학습에 재미를 붙이고 전공 수업에서도 두각을 보이기 시작했지만 생활비 부재라는 큰 문제에 맞닥뜨렸습니다. 만만치 않은 교통비, 식비를 해결하기 위해 편의점 야간 아르바이트를 시작했고 피로가 누적되기 시작했습니다.', '우양재단', 6000000, '2024.06.01 ~ 2024.08.31', '기타', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (32, 'test1', '독립 영웅 후손, 남은 건 무거운 삶의 무게', 'image2.jpg', '1932년 4월 29일, 상하이 훙커우 공원에서 열린 일본 전승 행사장에서 폭발음이 울려 퍼졌습니다. 윤봉길 의사가 던진 물통 폭탄으로 현장에 모여 있던 일본군 수뇌부가 괴멸한 것입니다. 자결용으로 추측되는 도시락 폭탄을 터뜨리기 전, 윤봉길 의사는 일본 헌병에 의해 붙잡히고 말았습니다. 이후 한 달도 되지 않아 사형선고를 받은 후 일본으로 압송되었고, 같은 해 25세라는 꽃다운 나이에 총살형으로 하늘의 별이 됩니다. 가혹한 고문과 취조를 당한 것도 모자라서 돌아가신 후에도 쓰레기 하치장으로 가는 길목에 묻혀 행인들에게 짓밟히는 수모를 당해야만 했습니다. 하지만 "장부출가생불환(丈夫出家生不還): 대장부가 집을 떠나 뜻을 이루기 전에 살아 돌아오지 않겠다"는 생전 다짐처럼 윤봉길 의사는 조국과 민족을 위해서라면 죽는 순간까지 두려울 것이 단 하나도 없었던 영웅 중의 참 영웅이었습니다.', '사단법인 따뜻한하루', 40000000, '2024.05.20 ~ 2024.10.31', '기타', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (33, 'test1', '3.1만세운동, 평범한 사람들의 특별한 외침', 'image3.jpg', '1919년 3월 1일 탑골공원은 조국 독립을 열망하는 가슴 뜨거운 학생들로 가득했습니다. 그들은 3.1만세운동 신호탄이 될 ‘독립선언문’ 낭독자를 기다리고 있었습니다. 아무리 기다려도 ‘독립선언문’을 읽어줄 민족 대표는 나타나지 않았습니다. 모두가 독립선언식이 열린 태화관에서 체포되어 경찰서로 연행되었기 때문입니다. 불씨가 꺼지려 할 바로 그 때, 자기 품에 숨겨둔 ‘독립선언문’을 꺼내 낭독한 한 사람이 있었습니다. 이 사람은 세간이 다 아는 유명인이 아닌 평범한 시골 교회 전도사였습니다. 용기 있는 행동 덕분에 학생들은 약속대로 가슴 터져라 ‘대한! 독립! 만세!’를 외쳤고, 이 운동은 전국으로 확산되었습니다. 3.1만세운동은 탑골공원에 있던 학생과 일반이 가진 뜨거운 열망 덕분에 전국으로 전파되었습니다. 대한민국 독립운동사 분수령이 된 3.1만세운동을 시작하고 전파한 주인공은 바로 평범한 사람들이었습니다.', '한국해비타트', 9900000, '2024.07.01 ~ 2025.06.30', '기타', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (34, 'test1', '청년활동가의 든든한 안전망을 마련해주세요.', 'image4.jpg', '사회 변화를 위해 시민사회 활동가의 삶을 선택한 청년들이 있습니다. 이들은 노동, 환경, 젠더, 교육, 인권 등 다양한 현장에서 존재합니다. 열정을 듬뿍 안고 시민단체 활동가로 살고 있지만, 그들의 일상도 여느 청년들과 크게 다르지 않습니다. 각자의 생계를 챙겨야 하고, 미래를 위한 준비도 해야 합니다. 그러나 열악한 근로조건 속에서 스스로 삶을 돌보며 사는 일은 녹록치 않습니다. ‘시민단체가 원래 그렇지, 라떼는 더 했어. 돌도 씹어 먹을 나이잖냐’ 라는 선배들의 위로로 견디기엔 청년 활동가가 마주한 현실은 생각보다 더 버겁습니다. 2022년 청년활동가안전망 지원사업을 통해 지원을 받은 청년활동가 대상으로 진행한 설문조사에서 85%가 경제적 상황으로 인해 높은 스트레스를 받고 있는 것으로 답변했습니다. 또, 생활비, 주거비, 의료비같이 필수적인 지출에서 경제적 어려움을 겪고 있는 활동가가 90%에 달하는 것으로 나타났습니다.', '아름다운재단', 5000000, '2024.04.01 ~ 2024.11.30', '기타', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (35, 'test1', '권진규 아틀리에 살림채 긴급 보수에 함께해 주세요!', 'image5.jpg', '권진규(1922-1973)는 "지원의 얼굴, "마두" 등 테라코타와 건칠 기법을 이용한 작품으로 한국적 사실주의라고 평가를 받고 있습니다. 권진규는 독자적인 예술세계를 정립한 조각가로 우리나라 근현대 조각사에서 높은 평가를 받고 있습니다. 권진규는 2022년 탄생 100주년을, 2023년 서거 50주기를 맞았습니다. 그의 삶과 예술세계를 돌아보며 유족들이 작품 140여점을 서울시립미술관에 기증하였고, 권진규 탄생 100주년 기념전시가 열렸습니다. 많은 관람객들이 권진규 작품을 바라보며 인간 ‘권진규’와 작품 제작에 몰두하며 치열했던 그의 예술세계를 공감했습니다.', '한뜻마을', 1500000, '2024.02.02 ~ 2024.03.31', '기타', 0);
-- 환경
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (36, 'test1', '자갈밭을 사랑한 작은 생명의 이야기', 'image01.jpg', '날이 따뜻해지면 사람들로 북적이는 곳, 바로 시원한 하천이죠. 물가 근처 모래톱에서 자갈밭을 본 적이 있으실 텐데요. 어쩌면 여러분은 그곳에서 신비한 생명의 탄생을 마주했을 지도 몰라요. 무슨 소리냐고요? 바로 모래톱 자갈밭을 좋아하는 ‘흰목물떼새’ 이야기랍니다.', '생태지평연구소', 9900000, '2024.03.01 ~ 2024.07.31', '환경', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (37, 'test1', '갑천습지에 사는 야생생물을 기록하고 보호해요', 'image2.jpg', '2023년 6월, 월평공원 갑천구간이 국가습지로 지정되었습니다. 갑천국가습지보호구역은 멸종위기종이 사는 도심의 야생으로, 지속적인 개발 압력을 받던 곳입니다. 1998년 천변고속화도로 건설, 2006년 월평공원 관통도로 건설, 2018년 갈마지구 대규모 아파트 건설, 2021년 관리형 제방도로 건설 등 수많은 개발 계획이 발표되고 이행과정을 밟았습니다. 하지만 생명의 편에 서서 우리 곁을 함께 살아온 자연을 지키려는 시민들의 적극적인 활동으로 월평공원 관통도로 건설을 제외한 다른 개발 사업들은 진행되지 않았습니다. 개발이 되었다면 국가습지보호구역으로 우리 곁에 남기는 어려웠겠지요.', '대전충남녹색연합', 5000000, '2024.04.01 ~ 2024.10.31', '환경', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (38, 'test1', '환경과 아이들을 위한 장난감 재활용', 'image3.jpg', '장난감은 어린아이들이 가장 갖고 싶어 하는 선물 중 하나입니다. 장난감은 사용 기간도 짧고 아이들이 금방 지겨워해 쉽게 버려지곤 합니다. 어린아이들은 신제품을 사달라고 조르지만, 이미 집에 쌓여있는 장난감을 볼 때마다 마음이 편치 않습니다. 해마다 버려지는 플라스틱 장난감류 양이 240만t 가량 된다고 합니다. 장난감은 대부분 복합 플라스틱으로 구성돼 있습니다. 일반 플라스틱의 경우 재활용이 가능하지만, 장난감의 플라스틱은 재활용이 힘듭니다. 그 이유는 장난감의 크기가 너무 작고 수십 개의 나사, 전선, 회로 기판, 모터 등 여러 가지로 이뤄져 있어 분해하기 어렵기 때문입니다. 장난감을 플라스틱으로 분류해 버려도 중간집하장에서 90% 이상이 다시 일반쓰레기로 매립 또는 소각되고 있는 실정입니다. 한국환경공단이 발표한 자료에 따르면, 전체 폐기물 품목 중 장난감이 재활용이 어려운 폐기물 품목 2위를 차지했다고 합니다.', '환경실천연합회', 9900000, '2024.04.01 ~ 2024.11.30', '환경', 0);
-- 지구촌
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (39, 'test1', '생리대가 없어 집에 갇힌 아이들을 구해주세요.', 'image01.jpg', '아프리카 일부 지역 여성 청소년들은 월경 기간 동안 집 밖에 나가지 못합니다. 월경은 부정한 것이라는 인식, 그리고 생리대를 구입할 형편이 되지 않기 때문이죠. 부족 문화가 강하게 남아있는 지역은 여성 인권이 매우 낮아 여성 청소년의 조혼, 조기 임신으로 인한 학업 중단이 빈번할 정도입니다. 교육받을 기회를 박탈당하는 것뿐만 아니라 여성 질환에도 취약한 환경에 건강마저 위협받고 있는 상황... 여성 청소년의 안전을 위해 지역 사회의 변화가 꼭 필요합니다.', '밀알복지재단', 8500000, '2024.02.07 ~ 2025.02.06', '기타', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (40, 'test1', '에티오피아 소녀들은 생리기간에 사용할 화장실이 필요해요', 'image2.jpg', '매년 2월 20일은 세계 사회 정의의 날입니다. 이 날은 누구나 제약 없이 안정된 환경에서 교육받을 수 있고, 평등한 삶을 보장받을 수 있는 사회로 나아가자는 의미에서 UN에서 제정한 국제 기념일입니다. 유니세프는 2022년 조사를 통해 전 세계 5억 명의 여성들이 여전히 적절한 생리위생 시설을 이용하지 못하고 있으며, 문화적인 편견과 차별 등으로 교육 및 사회활동 참여를 제한받고 있다고 밝혔습니다. 세계 사회 정의의 날이 제정되고 짧지 않은 시간이 흘렀으나, 이를 달성하기 위해 꼭 필요한 ‘성 평등’이 실현되는 일은 변함없이 멀기만 합니다.', '팀앤팀', 9900000, '2024.04.01 ~ 2024.12.31', '기타', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (41, 'test1', '인천 화재로 화상 입은 외국인, 치료를 응원해주세요!', 'image3.jpg', '많은 사람들이 일상에서 벗어나 잠시 쉬고 싶을 때 다른 나라로 여행을 가곤 합니다. 메이리(가명, 여자) 님도 설레는 마음으로 한국에 입국하여 쉬어가던 관광객 중 한 명이었습니다. 하지만, 잠시 머물던 인천 숙소에 예기치 못한 화재가 발생하자 메이리 님의 상황은 180도 달라졌습니다. 화재 현장에서 가까스로 구조되었으나 이미 검붉게 타버린 이후였습니다. 급히 화상 전문 병원으로 이송 되었으나, 상황이 심각하여 중환자실에서 한 달 넘게 집중 치료 중입니다. 가족도 지인도 없이 그저 홀로 견뎌야 하는 화상치료', '사회복지법인 한림화상재단', 9900000, '2024.01.25 ~ 2024.06.30', '기타', 0);
insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (42, 'test1', '아이들의 건강한 미래를 위한 영양지원 캠페인', 'image4.jpg', '인도네시아 수마트라(Sumatera) 섬에서 가장 큰 도시인 메단(Medan)에는 ADRF가 운영하는 희망교실이 있습니다. 메단은 인구 240만 명이 넘는 대도시이자 경제 및 상업이 발달한 곳으로 인도네시아에서도 손에 꼽히는 대도시 중 한 곳입니다. 빠른 경제성장에 힘입어 인도네시아 사람들의 삶도 점차 나아지고 있지만 빈부격차 문제는 갈수록 심각해지고 있고, 특히 경제적 취약계층 사람들의 삶은 더더욱 어려워지고 있습니다.', 'ADRF 아프리카아시아난민교육후원회', 2540000, '2024.04.08 ~ 2024.04.30', '기타', 0);


--  donation 
insert into donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (1, 'test1', '낚싯줄에 걸린 돌고래 "종달이"를 구해주세요', 'image01.jpg', '1월 29일 제주돌고래 긴급구조단이 종달이 꼬리에 걸린 낚싯줄 제거에 성공했습니다. 아직 종달이 몸과 입에 제거하지 못한 낚싯줄이 남아 있습니다', '해피해피기관', 9000000, '2024.02.14 ~ 2024.04.30', '동물', 0);
insert into donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (2, 'test1', '하천을 찾아오는 백조의 생명을 위한 횡단구조물 철거', 'image2.jpg', '대전 갑천에 놀라운 새들이 계속 확인되고 있습니다. 얼마 전 노랑부리저어가 3년째 월동하는 것을 확인했고. 잿빛개구리매와 큰말똥가리 두 종이 추가로 확인되었습니다. 모두 환경부가 멸종위기 야생생물 2급으로 지정한 보호종입니다. 맹금류는 최상위 포식자로 중요한 생태적 위치에 있어 서식하는 것 자체만으로 의미가 높은 깃대종입니다', '해피해피기관', 800000, '2024.01.19 ~ 2024.04.18', '동물', 0);
insert into donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (3, 'test1', '팔현습지의 깃대종 수리부엉이 부부를 꼭 지켜주세요', 'image3.jpg', '금호강 팔현습지는 금호강에서 가장 아름다운 습지 중 하나로 대구의 3대 습지이기도 합니다. 이 아름다운 팔현습지엘 가면 이곳 금호강 팔현습지의 깃대종이라 할 수 있는 수리부엉이 부부를 만날 수 있습니다. 이들 부부는 팔현습지의 하식애 절벽에 둥지를 짓고 살고 있어서 눈 밝은 이들은 육안으로도 이들을 관찰할 수 있습니다. 이들은 낮에는 팔현습지를 굽어보면서 잠을 청하고 밤이 오면 백수의 제왕답게 사냥에 나섭니다.', '해피해피기관', 950000, '2024.01.09 ~ 2024.04.08', '동물', 0);
insert into donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (4, 'test1', '새와 하늘다람쥐를 위한 둥지상자', 'image4.jpg', '사람들을 위해 산책로로 숲과 강에 설치된 시설물이 하늘을 날아다니는 새와 하늘다람쥐등의 동물들에게는 매우 위험합니다. 점점 길과 사람들의 공간이 늘어나면서 새와 생물은 살 곳을 잃어 갑니다. 새들의 먹이가 되는 지렁이, 곤충들 역시 살아가기 힘들 수 밖에 없습니다. 숲과 강을 서식지로 살아가는 생명들에게는 위험 요인들만 늘어갑니다.', '해피해피기관', 800000, '2024.01.19 ~ 2024.04.18', '동물', 0);
insert into donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (5, 'test1', '전문훈련을 통해 단 한아이의 손도 놓지 않도록', 'image5.jpg', '구조견들 중에는 사람을 극도로 무서워하는 아이들이 종종 있습니다. 낯선 환경, 낯선 사람에게 겁을 먹고 처음에는 경계를 하다가 시간이 지나면서 마음을 여는 아이들도 많지만, 1년이 지나고 2년이 지나도 여전히 사람을 경계하는 아이들도 있습니다. 예방접종 등의 병원 진료를 위해 사람과의 접촉이 불가피할 때면 죽을힘을 다해 도망가거나 자신을 방어하기 위해서 그 극도의 두려움을 공격성으로 표현하는 아이들도 있습니다.', '해피해피기관', 995000, '2024.02.01 ~ 2024.05.01', '동물', 0);



-- user
insert into my_db.user (user_no, user_name, user_avatar, user_id, user_pw, user_email, user_nick, user_phone, user_enum) 
values (1,'테스트1','','test1','Test1234!','test1@naver.com','유저1','01012341234',0); 
insert into my_db.user (user_no, user_name, user_avatar, user_id, user_pw, user_email, user_nick, user_phone, user_enum) 
values (2,'테스트2','','test2','Test1234!','test2@naver.com','유저2','01012341234',0); 
insert into my_db.user (user_no, user_name, user_avatar, user_id, user_pw, user_email, user_nick, user_phone, user_enum) 
values (3,'테스트3','','test3','Test1234!','test3@naver.com','유저3','01012341234',0); 
insert into my_db.user (user_no, user_name, user_avatar, user_id, user_pw, user_email, user_nick, user_phone, user_enum) 
values (4,'테스트4','','test4','Test1234!','test4@naver.com','유저4','01012341234',0); 
insert into my_db.user (user_no, user_name, user_avatar, user_id, user_pw, user_email, user_nick, user_phone, user_enum) 
values (5,'테스트5','','test5','Test1234!','test5@naver.com','유저5','01012341234',0); 
insert into my_db.user (user_no, user_name, user_avatar, user_id, user_pw, user_email, user_nick, user_phone, user_enum) 
values (6,'테스트6','','test6','Test1234!','test6@naver.com','유저6','01012341234',0);  



--  payment
insert into my_db.payment (payment_no, user_id, donation_no, donation_support, donation_current, payment_division, payment_method, payment_card_name, payment_card_company, payment_card_expiry, 
payment_card_num, payment_account_name, payment_account_company, payment_account_transfer, payment_account_num, payment_birth, payment_company_code, payment_createAt) values
 (1, 'test1', 1, '일시', 30000, '개인', '카드', '테스트1', '신한카드', '2025년도/2월', '1111-2222-3333-4444', null, null, null, null, '970924', null, now());




CREATE TABLE my_db.user (
  user_no int NOT NULL AUTO_INCREMENT,
  user_name varchar(10) DEFAULT NULL,
  user_avatar varchar(100) DEFAULT NULL,
  user_id varchar(10) DEFAULT NULL,
  user_pw varchar(100) DEFAULT NULL,
  user_email varchar(50) DEFAULT NULL,
  user_nick varchar(10) DEFAULT NULL,
  user_phone varchar(20) DEFAULT NULL,
  user_enum int DEFAULT NULL,
  user_createAt date DEFAULT NULL,
  PRIMARY KEY (user_no),
  KEY index_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 


CREATE TABLE my_db.donation (
  donation_no int NOT NULL AUTO_INCREMENT,
  user_id varchar(10) DEFAULT NULL,
  donation_name varchar(50) DEFAULT NULL,
  donation_image varchar(100) DEFAULT NULL,
  donation_content varchar(1000) DEFAULT NULL,
  donation_company varchar(20) DEFAULT NULL,
  donation_goal bigint DEFAULT NULL,
  donation_period varchar(50) DEFAULT NULL,
  donation_category varchar(10) DEFAULT NULL,
  donation_createAt date DEFAULT NULL,
  donation_status int DEFAULT NULL,
  PRIMARY KEY (donation_no),
  KEY user_id (user_id),
  CONSTRAINT donation_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 

CREATE TABLE my_db.fav (
  fav_no int NOT NULL AUTO_INCREMENT,
  user_id varchar(10) DEFAULT NULL,
  donation_no int DEFAULT NULL,
  PRIMARY KEY (fav_no),
  KEY user_id (user_id),
  KEY donation_no (donation_no),
  CONSTRAINT fav_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE,
  CONSTRAINT fav_ibfk_2 FOREIGN KEY (donation_no) REFERENCES donation (donation_no) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 

CREATE TABLE my_db.payment (
  payment_no int NOT NULL AUTO_INCREMENT,
  user_id varchar(10) DEFAULT NULL,
  donation_no int DEFAULT NULL,
  donation_support varchar(10) NOT NULL,
  donation_current bigInt NOT NULL,
  payment_division varchar(10) NOT NULL,
  payment_method varchar(10) DEFAULT NULL,
  payment_card_name varchar(10) DEFAULT NULL,
  payment_card_company varchar(10) DEFAULT NULL,
  payment_card_expiry varchar(30) DEFAULT NULL,
  payment_card_num varchar(100) DEFAULT NULL,
  payment_account_name varchar(10) DEFAULT NULL,
  payment_account_company varchar(10) DEFAULT NULL,
  payment_account_transfer varchar(10) DEFAULT NULL,
  payment_account_num varchar(100) DEFAULT NULL,
  payment_birth varchar(10) DEFAULT NULL COMMENT '개인: 생년월일',
  payment_company_code varchar(20) DEFAULT NULL COMMENT '법인: 사업자등록번호',
  payment_createAt date DEFAULT NULL,
  PRIMARY KEY (payment_no),
	KEY user_id (user_id), 
	KEY donation_no (donation_no), 
  CONSTRAINT payment_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id) ON DELETE CASCADE,
  CONSTRAINT payment_ibfk_2 FOREIGN KEY (donation_no) REFERENCES donation (donation_no) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 

