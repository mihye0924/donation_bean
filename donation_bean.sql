drop table my_db.payment;
drop table my_db.user;
drop table my_db.fav;
drop table my_db.donation;


select * from my_db.user;
select * from my_db.fav; 
select * from my_db.donation;
select * from my_db.payment;


insert into my_db.user (user_no, user_name, user_avatar, user_id, user_pw, user_email, user_nick, user_phone, user_enum) 
values (1,'테스트','','test1','test1234','test@naver.com','유저1','01012341234',0);

insert into my_db.donation (donation_no, user_id, donation_name, donation_image, donation_content, donation_company, donation_goal, donation_period, donation_category, donation_status) 
values (1, 'test1', '낚싯줄에 걸린 돌고래 "종달이"를 구해주세요', 'image01.jpg', '1월 29일 제주돌고래 긴급구조단이 종달이 꼬리에 걸린 낚싯줄 제거에 성공했습니다. 아직 종달이 몸과 입에 제거하지 못한 낚싯줄이 남아 있습니다', '해피해피기관', 9000000, '2024.02.14 ~ 2024.04.30', '환경', 0);

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

CREATE TABLE my_db.fav (
  fav_no int NOT NULL AUTO_INCREMENT,
  user_id varchar(10) DEFAULT NULL,
  donation_no int DEFAULT NULL,
  PRIMARY KEY (fav_no),
  KEY user_id (user_id),
  KEY donation_no (donation_no),
  CONSTRAINT fav_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id),
  CONSTRAINT fav_ibfk_2 FOREIGN KEY (donation_no) REFERENCES donation (donation_no)
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
  CONSTRAINT payment_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id),
  CONSTRAINT payment_ibfk_2 FOREIGN KEY (donation_no) REFERENCES donation (donation_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 
