drop table payment;
drop table user;
drop table fav;
drop table donation;


select * from user;
select * from fav; 
select * from donation;
select * from payment;


-- 데이터

--  user
insert into user (user_no, user_name, user_avatar, user_id, user_pw, user_email, user_nick, user_phone, user_enum) 
values (1,'테스트1','','test1','test1234','test1@naver.com','유저1','01012341234',0);
insert into user (user_no, user_name, user_avatar, user_id, user_pw, user_email, user_nick, user_phone, user_enum) 
values (2,'테스트2','','test2','test1234','test2@naver.com','유저2','01012341234',0);
insert into user (user_no, user_name, user_avatar, user_id, user_pw, user_email, user_nick, user_phone, user_enum) 
values (3,'테스트3','','test1234','Test1234!','test3@naver.com','유저3','01012341234',0);
insert into user (user_no, user_name, user_avatar, user_id, user_pw, user_email, user_nick, user_phone, user_enum) 
values (4,'관리자','','admin','Admin!','test3@naver.com','유저4','01012341234',1);


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






--  payment
insert into payment (payment_no, user_id, donation_no, donation_support, donation_current, payment_division, payment_method, payment_card_name, payment_card_company, payment_card_expiry, 
payment_card_num, payment_account_name, payment_account_company, payment_account_transfer, payment_account_num, payment_birth, payment_company_code, payment_createAt) values
 (1, 'test1', 1, '일시', 30000, '개인', '카드', '테스트1', '신한카드', '2025년도/2월', '1111-2222-3333-4444', null, null, null, null, '970924', null, now());





CREATE TABLE user (
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


 CREATE TABLE donation (
  donation_no int NOT NULL AUTO_INCREMENT,
  user_id varchar(10) DEFAULT NULL,
  donation_name varchar(50) DEFAULT NULL,
  donation_image varchar(100) DEFAULT NULL,
  donation_content varchar(255) DEFAULT NULL,
  donation_company varchar(20) DEFAULT NULL,
  donation_goal bigint DEFAULT NULL,
  donation_period varchar(50) DEFAULT NULL,
  donation_category varchar(10) DEFAULT NULL,
  donation_createAt date DEFAULT NULL,
  donation_status int DEFAULT NULL,
  PRIMARY KEY (donation_no),
  KEY user_id (user_id),
  CONSTRAINT donation_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 

CREATE TABLE fav (
  fav_no int NOT NULL AUTO_INCREMENT,
  user_id varchar(10) DEFAULT NULL,
  donation_no int DEFAULT NULL,
  PRIMARY KEY (fav_no),
  KEY user_id (user_id),
  KEY donation_no (donation_no),
  CONSTRAINT fav_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id),
  CONSTRAINT fav_ibfk_2 FOREIGN KEY (donation_no) REFERENCES donation (donation_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 

CREATE TABLE payment (
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
  CONSTRAINT payment_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id),
  CONSTRAINT payment_ibfk_2 FOREIGN KEY (donation_no) REFERENCES donation (donation_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 

