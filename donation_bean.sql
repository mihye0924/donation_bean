drop table my_db.payment;
drop table my_db.user;
drop table my_db.fav;
drop table my_db.donation;


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
  donation_period date DEFAULT NULL,
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
  donation_support int NOT NULL COMMENT '정기:0, 일시:1',
  donation_current bigint NOT NULL,
  payment_division int NOT NULL COMMENT '개인:0, 법인:1',
  payment_method int DEFAULT NULL COMMENT '카드:0, 자동이체:1',
  payment_card_name varchar(10) DEFAULT NULL,
  payment_card_company varchar(10) DEFAULT NULL,
  payment_card_expiry varchar(30) DEFAULT NULL,
  payment_card_num varchar(100) DEFAULT NULL,
  payment_account_name varchar(10) DEFAULT NULL,
  payment_account_company varchar(10) DEFAULT NULL,
  payment_account_transfer int DEFAULT NULL,
  payment_account_num varchar(100) DEFAULT NULL,
  payment_birth varchar(10) DEFAULT NULL COMMENT '개인: 생년월일',
  payment_company_code varchar(20) DEFAULT NULL COMMENT '법인: 사업자등록번호',
  user_createAt date DEFAULT NULL,
  PRIMARY KEY (payment_no),
	KEY user_id (user_id), 
	KEY donation_no (donation_no), 
  CONSTRAINT payment_ibfk_1 FOREIGN KEY (user_id) REFERENCES user (user_id),
  CONSTRAINT payment_ibfk_2 FOREIGN KEY (donation_no) REFERENCES donation (donation_no)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; 