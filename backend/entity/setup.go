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

		&Rating{},
		&Review{},

		&Problem_system{},
		&Priority{},
		&Feedback{},
		&Privacy{},
		&Collection{},
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

	//rating
	ratingExcellent := Rating{
		Rating_score: 5,
		Rating_name:  "ชอบมากที่สุด",
	}
	db.Model(&Rating{}).Create(&ratingExcellent)

	ratingGood := Rating{
		Rating_score: 4,
		Rating_name:  "ชอบอยู่นะ",
	}
	db.Model(&Rating{}).Create(&ratingGood)

	ratingFair := Rating{
		Rating_score: 3,
		Rating_name:  "เฉยๆ",
	}
	db.Model(&Rating{}).Create(&ratingFair)

	ratingImprovement := Rating{
		Rating_score: 2,
		Rating_name:  "ไม่แย่",
	}
	db.Model(&Rating{}).Create(&ratingImprovement)

	ratingPoor := Rating{
		Rating_score: 1,
		Rating_name:  "ไม่ชอบเลย",
	}
	db.Model(&Rating{}).Create(&ratingPoor)

	//review
	review1 := Review{
		Timestamp:    time.Date(2023, 1, 27, 10, 30, 00, 00, time.Now().Local().Location()),
		ReviewTopic:  "ภาษาสวย",
		Fiction:      fiction1,
		Rating:       ratingGood,
		ReviewDetail: "ดีมากเลยค่ะ แต่งดีมากๆ รอติดตามเรื่องต่อไปนะคะ",
		Reader:       reader2,
	}
	db.Model(&Review{}).Create(&review1)

	review2 := Review{
		Timestamp:    time.Date(2023, 1, 27, 10, 30, 00, 00, time.Now().Local().Location()),
		ReviewTopic:  "เนื้อเรื่องดีมาก",
		Fiction:      fiction1,
		Rating:       ratingExcellent,
		ReviewDetail: "อ่านจบแล้วดีมาก อยากให้มีเพิ่มตอนพิเศษเลยค่า",
		Reader:       reader1,
	}
	db.Model(&Review{}).Create(&review2)

	review3 := Review{
		Timestamp:    time.Date(2023, 1, 27, 10, 30, 00, 00, time.Now().Local().Location()),
		ReviewTopic:  "เนื้อหา",
		Fiction:      fiction2,
		Rating:       ratingFair,
		ReviewDetail: "เนื้อเรื่องโอเคอยู่ แต่การคลายปมที่ผูกจนยุ่งมันง่ายไปหรือเราคาดหวังไป",
		Reader:       reader1,
	}
	db.Model(&Review{}).Create(&review3)

	review4 := Review{
		Timestamp:    time.Date(2023, 1, 27, 10, 30, 00, 00, time.Now().Local().Location()),
		ReviewTopic:  "คุณภาพงาน",
		Fiction:      fiction1,
		Rating:       ratingFair,
		ReviewDetail: "ดีมากเลยค่ะ",
		Reader:       reader1,
	}
	db.Model(&Review{}).Create(&review4)

	//Problem_system
	problem_system1 := Problem_system{
		Problem_system_topic: "บัญชีผู้ใช้",
	}
	db.Model(&Problem_system{}).Create(&problem_system1)

	problem_system2 := Problem_system{
		Problem_system_topic: "การเติม coin",
	}
	db.Model(&Problem_system{}).Create(&problem_system2)

	problem_system3 := Problem_system{
		Problem_system_topic: "การอ่านนิยาย",
	}
	db.Model(&Problem_system{}).Create(&problem_system3)

	problem_system4 := Problem_system{
		Problem_system_topic: "อื่นๆ/ข้อเสนอแนะ",
	}
	db.Model(&Problem_system{}).Create(&problem_system4)

	//Priority
	priority1 := Priority{
		Priority_level: "5",
	}
	db.Model(&Priority{}).Create(&priority1)

	priority2 := Priority{
		Priority_level: "4",
	}
	db.Model(&Priority{}).Create(&priority2)

	priority3 := Priority{
		Priority_level: "3",
	}
	db.Model(&Priority{}).Create(&priority3)

	//Feedback
	feedback1 := Feedback{
		Detail:         "เปลี่ยนรหัสไม่ได้จ้า",
		Reader:         reader1,
		Problem_system: problem_system1,
		Priority:       priority1,
	}
	db.Model(&Feedback{}).Create(&feedback1)

	feedback2 := Feedback{
		Detail:         "เติม coin แล้วไม่เข้า",
		Reader:         reader2,
		Problem_system: problem_system2,
		Priority:       priority2,
	}
	db.Model(&Feedback{}).Create(&feedback2)

	feedback3 := Feedback{
		Detail:         "กดเข้าไปอ่านนิยายไม่ได้ค่า",
		Reader:         reader1,
		Problem_system: problem_system3,
		Priority:       priority1,
	}
	db.Model(&Feedback{}).Create(&feedback3)

	feedback4 := Feedback{
		Detail:         "อยากให้สามารถเพิ่มหมวดหมู่ย่อยของนิยายเองได้",
		Reader:         reader2,
		Problem_system: problem_system4,
		Priority:       priority3,
	}
	db.Model(&Feedback{}).Create(&feedback4)

	//Privacy
	privacy1 := Privacy{
		Privacy: "private",
	}
	db.Model(&Privacy{}).Create(&privacy1)

	privacy2 := Privacy{
		Privacy: "public",
	}
	db.Model(&Privacy{}).Create(&privacy2)

	//Collection
	collection1 := Collection{
		Collection_name: "minnominjai",
		Description:     "รวมฟิค minno ที่ชอบจ้า",
		Reader:          reader1,
		//Bookshelf: bookshelf1,
		Privacy: privacy1,
	}
	db.Model(&Collection{}).Create(&collection1)

	collection2 := Collection{
		Collection_name: "เหมียวเอยกลอยใจกุบ",
		Description:     "รวมฟิคหวานๆแบบตัดขา",
		Reader:          reader2,
		//Bookshelf: bookshelf1,
		Privacy: privacy2,
	}
	db.Model(&Collection{}).Create(&collection2)

	collection3 := Collection{
		Collection_name: "ดราม่าน้ำตาไหลไปสามลิตร",
		Description:     "รวมฟิคแบบชีวิตมีความสุขอยู่แล้วเลยอยากเศร้าบ้าง",
		Reader:          reader1,
		//Bookshelf: bookshelf1,
		Privacy: privacy2,
	}
	db.Model(&Collection{}).Create(&collection3)

}
