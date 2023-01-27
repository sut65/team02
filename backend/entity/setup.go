package entity

import (
	// "fmt"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("se-65.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Admin{},
		&Writer{},
		&Reader{},
		&Genre{},
		&Type{},
		&Fiction{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	//Admin
	admin1 := Admin{
		Name:     "AdminA",
		Email:    "admin01@gmail.com",
		Password: string(password),
	}
	db.Model(&Admin{}).Create(&admin1)

	//Writer
	writer1 := Writer{
		Name:     "WriterA",
		Email:    "writer01@gmail.com",
		Password: string(password),
	}
	db.Model(&Writer{}).Create(&writer1)

	writer2 := Writer{
		Name:     "WriterB",
		Email:    "writer02@gmail.com",
		Password: string(password),
	}
	db.Model(&Writer{}).Create(&writer2)

	//Reader
	reader1 := Reader{
		Name:     "ReaderA",
		Email:    "reader01@gmail.com",
		Password: string(password),
	}
	db.Model(&Reader{}).Create(&reader1)

	reader2 := Reader{
		Name:     "ReaderB",
		Email:    "reader02@gmail.com",
		Password: string(password),
	}
	db.Model(&Reader{}).Create(&reader2)

	//Genre
	genre1 := Genre{
		Genre_Name: "นิยายรักหวานแหวว",
	}
	db.Model(&Genre{}).Create(&genre1)

	genre2 := Genre{
		Genre_Name: "นิยายรักแฟนตาซี",
	}
	db.Model(&Genre{}).Create(&genre2)

	genre3 := Genre{
		Genre_Name: "นิยายกำลังภายใน",
	}
	db.Model(&Genre{}).Create(&genre3)

	genre4 := Genre{
		Genre_Name: "นิยายจีนย้อนยุค",
	}
	db.Model(&Genre{}).Create(&genre4)

	//Type
	long_fic := Type{
		Type_Name: "นิยายยาว",
	}
	db.Model(&Type{}).Create(&long_fic)

	short_fic := Type{
		Type_Name: "นิยายสั้น",
	}
	db.Model(&Type{}).Create(&short_fic)

	//Fiction
	fiction1 := Fiction{
		F_name:        "แพทย์สาวชาวไร่",
		F_Description: "แพทย์สาวผู้เป็นเลิศด้านการปรุงยาต้องกลับมาเกิดใหม่เป็นสาวชาวไร่ผู้อาภัพอับโชค คนในครอบครัวรังเกียจ คอยจ้องแต่จะรังแกและทรมาน นางจึงต้องใช้ทักษะการปรุงยาแสนเลิศล้ำต่อสู้ฝ่าฟันเพื่อพลิกชะตาชีวิตตนเอง!",
		F_File:        "https://drive.google.com/file/d/1J8YzDjLnZcimnMx-eb3Fjv04vHyGrvvT/view?usp=share_link",
		F_Date:        time.Date(2022, 10, 23, 12, 30, 00, 00, time.Now().Local().Location()),
		Writer:        writer1,
		Genre:         genre4,
		Type:          long_fic,
	}
	db.Model(&Fiction{}).Create(&fiction1)

	fiction2 := Fiction{
		F_name:        "เกิดใหม่ครั้งนี้ไม่ขอมีสามีคนเดิม",
		F_Description: "พาขวัญได้ย้อนกลับมาในตอนอายุ 17 ปี อีกครั้ง เธอจะพาตัวเองและครอบครัวหลีกหนีจากชะตากรรมแสนสลดนั้นให้ได้",
		F_File:        "https://drive.google.com/file/d/1J8YzDjLnZcimnMx-eb3Fjv04vHyGrvvT/view?usp=share_link",
		F_Date:        time.Date(2023, 01, 01, 12, 30, 00, 00, time.Now().Local().Location()),
		Writer:        writer1,
		Genre:         genre1,
		Type:          long_fic,
	}
	db.Model(&Fiction{}).Create(&fiction2)

	fiction3 := Fiction{
		F_name:        "แผนลวงกามเทพ",
		F_Description: "'นภัทรตั้งใจจะมาหย่า แต่เด็กหญิงตาฟ้า ทำให้เขาเปลี่ยนใจ' นภัทร X อาริตา X หนูอ้าย",
		F_File:        "https://drive.google.com/file/d/1J8YzDjLnZcimnMx-eb3Fjv04vHyGrvvT/view?usp=share_link",
		F_Date:        time.Date(2022, 10, 23, 12, 30, 00, 00, time.Now().Local().Location()),
		Writer:        writer2,
		Genre:         genre1,
		Type:          short_fic,
	}
	db.Model(&Fiction{}).Create(&fiction3)

	fiction4 := Fiction{
		F_name:        "บทตัวร้ายนี้ฉันขอยกให้พวกคุณแล้วกัน",
		F_Description: "ตัวเอกทั้งหลายฉันจะสั่งสอนพวกคุณให้ได้รู้ซึ้งถึงรสชาติของการต้องรับบทตัวร้ายอย่างไม่ยุติธรรมบ้าง!",
		F_File:        "https://drive.google.com/file/d/1J8YzDjLnZcimnMx-eb3Fjv04vHyGrvvT/view?usp=share_link",
		F_Date:        time.Date(2022, 10, 23, 12, 30, 00, 00, time.Now().Local().Location()),
		Writer:        writer2,
		Genre:         genre2,
		Type:          long_fic,
	}
	db.Model(&Fiction{}).Create(&fiction4)

	fiction5 := Fiction{
		F_name:        "fiction5",
		F_Description: "ตัวเอกทั้งหลายฉันจะสั่งสอนพวกคุณให้ได้รู้ซึ้งถึงรสชาติของการต้องรับบทตัวร้ายอย่างไม่ยุติธรรมบ้าง!",
		F_File:        "https://drive.google.com/file/d/1J8YzDjLnZcimnMx-eb3Fjv04vHyGrvvT/view?usp=share_link",
		F_Date:        time.Date(2022, 10, 23, 12, 30, 00, 00, time.Now().Local().Location()),
		Writer:        writer1,
		Genre:         genre1,
		Type:          short_fic,
	}
	db.Model(&Fiction{}).Create(&fiction5)

	//Package
	package1 := Package{
		Promotion: "เติมห้าสิบคอยน์ ฟรีห้าคอยน์",
		Total:     55,
	}
	db.Model(&Package{}).Create(&package1)

	package2 := Package{
		Promotion: "เติมหนึ่งร้อยคอยน์ ฟรีสิบคอยน์",
		Total:     110,
	}
	db.Model(&Package{}).Create(&package2)

	package3 := Package{
		Promotion: "เติมสองร้อยคอยน์ ฟรียี่สิบห้าคอยน์",
		Total:     225,
	}
	db.Model(&Package{}).Create(&package3)

	package4 := Package{
		Promotion: "เติมสามร้อยคอยน์ ฟรีห้าสิบคอยน์",
		Total:     350,
	}
	db.Model(&Package{}).Create(&package4)

	//PaymentType
	paymenttype1 := PaymentType{
		Payment_Type: "Banking",
	}
	db.Model(&PaymentType{}).Create(&paymenttype1)

	paymenttype2 := PaymentType{
		Payment_Type: "Prompt Pay",
	}
	db.Model(&PaymentType{}).Create(&paymenttype2)

	paymenttype3 := PaymentType{
		Payment_Type: "Debit/Credit Card",
	}
	db.Model(&PaymentType{}).Create(&paymenttype3)

	//ReaderCoin
	reader_coin1 := ReaderCoin{
		R_Coin: 0,
	}
	db.Model(&ReaderCoin{}).Create(&reader_coin1)

	reader_coin2 := ReaderCoin{
		R_Coin: 0,
	}
	db.Model(&ReaderCoin{}).Create(&reader_coin2)

	//ToUp
	topup1 := TopUp{
		Reader:      reader1,
		Package:     package2,
		PaymentType: paymenttype2,
		TU_Date:     time.Date(2022, 12, 02, 20, 45, 00, 00, time.Now().Local().Location()),
		ReaderCoin:  reader_coin1,
	}
	db.Model(&TopUp{}).Create(&topup1)

	topup2 := TopUp{
		Reader:      reader2,
		Package:     package1,
		PaymentType: paymenttype2,
		TU_Date:     time.Date(2022, 11, 23, 22, 00, 00, 00, time.Now().Local().Location()),
		ReaderCoin:  reader_coin2,
	}
	db.Model(&TopUp{}).Create(&topup2)
}
