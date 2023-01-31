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
		&ExecutiveAdmin{},
		&Education{},
		&Gender{},
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

		&ProblemFiction{},
		&ReportFiction{},

		&Coin{},
		&WriterCoin{},
		&Donate{},

		&PackageTopUp{},
		&PaymentType{},
		&ReaderCoin{},
		&TopUp{},

		&PublicRelation{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	//ExecutiveAdmin
	executive_admin1 := ExecutiveAdmin{
		Executive_firstname: "Minighan Loe",
		Executive_lastname:  "Minic",
		Executive_email:     "minics2001@gmail.com",
		Executive_password:  string(password),
	}
	db.Model(&ExecutiveAdmin{}).Create(&executive_admin1)

	executive_admin2 := ExecutiveAdmin{
		Executive_firstname: "Taylor Adison",
		Executive_lastname:  "Swift",
		Executive_email:     "swifty1989@gmail.com",
		Executive_password:  string(password),
	}
	db.Model(&ExecutiveAdmin{}).Create(&executive_admin2)

	//Education
	education1 := Education{
		Education_degree: "มัธยมศึกษาตอนต้น",
	}
	db.Model(&Education{}).Create(&education1)

	education2 := Education{
		Education_degree: "มัธยมศึกษาตอนปลาย",
	}
	db.Model(&Education{}).Create(&education2)

	education3 := Education{
		Education_degree: "ปริญญาตรี",
	}
	db.Model(&Education{}).Create(&education3)

	education4 := Education{
		Education_degree: "ปริญญาโท",
	}
	db.Model(&Education{}).Create(&education4)

	education5 := Education{
		Education_degree: "ปริญญาเอก",
	}
	db.Model(&Education{}).Create(&education5)

	education6 := Education{
		Education_degree: "ปริญญากิตติมศักดิ์",
	}
	db.Model(&Education{}).Create(&education6)

	//Gender
	gender1 := Gender{
		Gender: "หญิง",
	}
	db.Model(&Gender{}).Create(&gender1)

	gender2 := Gender{
		Gender: "ชาย",
	}
	db.Model(&Gender{}).Create(&gender2)

	gender3 := Gender{
		Gender: "LGBTQIA+",
	}
	db.Model(&Gender{}).Create(&gender3)

	//Role
	role1 := Role{
		Role: "รับเรื่องรายงานต่างๆ ของเว็บไซต์",
	}
	db.Model(&Role{}).Create(&role1)

	role2 := Role{
		Role: "พิจารณานิยาย และ ลบนิยาย",
	}
	db.Model(&Role{}).Create(&role2)

	role3 := Role{
		Role: "เพิ่มและลบบัญชีนักเขียน",
	}
	db.Model(&Role{}).Create(&role3)

	role4 := Role{
		Role: "เพิ่มและลบบัญชีนักอ่าน",
	}
	db.Model(&Role{}).Create(&role4)

	role5 := Role{
		Role: "ทำข้อมูลประชาสัมพันธ์",
	}
	db.Model(&Role{}).Create(&role5)

	//Admin
	admin1 := Admin{
		Admin_firstname:     "Onika",
		Admin_lastname:      "Maraj-Petty",
		Admin_email:         "Nickiminaj@gmail.com",
		Admin_password:      string(password),
		Admin_tel:           "0912345671",
		Admin_salary:        20000.0,
		Admin_birthday:      time.Now(),
		Admin_date_register: time.Now(),

		ExecutiveAdmin: executive_admin1,
		Education:      education3,
		Gender:         gender1,
		Role:           role3,
	}
	db.Model(&Admin{}).Create(&admin1)

	admin2 := Admin{
		Admin_firstname:     "Medison",
		Admin_lastname:      "Beer",
		Admin_email:         "Beer1999@gmail.com",
		Admin_password:      string(password),
		Admin_tel:           "09123456678",
		Admin_salary:        25000.0,
		Admin_birthday:      time.Now(),
		Admin_date_register: time.Now(),

		ExecutiveAdmin: executive_admin2,
		Education:      education4,
		Gender:         gender2,
		Role:           role5,
	}
	db.Model(&Admin{}).Create(&admin2)

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
	packagetu1 := PackageTopUp{
		Promotion: "เติมห้าสิบคอยน์ ฟรีห้าคอยน์",
		Total:     55,
	}
	db.Model(&PackageTopUp{}).Create(&packagetu1)

	packagetu2 := PackageTopUp{
		Promotion: "เติมหนึ่งร้อยคอยน์ ฟรีสิบคอยน์",
		Total:     110,
	}
	db.Model(&PackageTopUp{}).Create(&packagetu2)

	packagetu3 := PackageTopUp{
		Promotion: "เติมสองร้อยคอยน์ ฟรียี่สิบห้าคอยน์",
		Total:     225,
	}
	db.Model(&PackageTopUp{}).Create(&packagetu3)

	packagetu4 := PackageTopUp{
		Promotion: "เติมสามร้อยคอยน์ ฟรีห้าสิบคอยน์",
		Total:     350,
	}
	db.Model(&PackageTopUp{}).Create(&packagetu4)

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
		Reader:             reader1,
		PackageTU:          packagetu2,
		PaymentType:        paymenttype2,
		Topup_phone_number: "0123589647",
		Topup_date:         time.Date(2022, 12, 02, 20, 45, 00, 00, time.Now().Local().Location()),
		ReaderCoin:         reader_coin1,
	}
	db.Model(&TopUp{}).Create(&topup1)

	topup2 := TopUp{
		Reader:             reader2,
		PackageTU:          packagetu1,
		PaymentType:        paymenttype2,
		Topup_phone_number: "0586947215",
		Topup_date:         time.Date(2022, 11, 23, 22, 00, 00, 00, time.Now().Local().Location()),
		ReaderCoin:         reader_coin2,
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
		Priority_level: "รีบสุดๆไปเลยจ้า",
	}
	db.Model(&Priority{}).Create(&priority1)

	priority2 := Priority{
		Priority_level: "รีบที่สุด",
	}
	db.Model(&Priority{}).Create(&priority2)

	priority3 := Priority{
		Priority_level: "รีบมาก",
	}
	db.Model(&Priority{}).Create(&priority3)

	//Feedback
	feedback1 := Feedback{
		Reader:           reader1,
		Telephone_number: "0983412445",
		Problem_system:   problem_system1,
		Priority:         priority1,
		Detail:           "เปลี่ยนรหัสไม่ได้จ้า",
	}
	db.Model(&Feedback{}).Create(&feedback1)

	feedback2 := Feedback{
		Reader:           reader2,
		Telephone_number: "0951234567",
		Problem_system:   problem_system2,
		Priority:         priority2,
		Detail:           "เติม coin แล้วไม่เข้า",
	}
	db.Model(&Feedback{}).Create(&feedback2)

	feedback3 := Feedback{
		Reader:           reader1,
		Telephone_number: "0623476891",
		Problem_system:   problem_system3,
		Priority:         priority1,
		Detail:           "กดเข้าไปอ่านนิยายไม่ได้ค่า",
	}
	db.Model(&Feedback{}).Create(&feedback3)

	feedback4 := Feedback{
		Reader:           reader2,
		Telephone_number: "0985736152",
		Problem_system:   problem_system4,
		Priority:         priority3,
		Detail:           "อยากให้สามารถเพิ่มหมวดหมู่ย่อยของนิยายเองได้",
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
		Reader:          reader1,
		Collection_name: "minnominjai",
		//Bookshelf: bookshelf1,
		Privacy:     privacy1,
		Description: "รวมฟิค minno ที่ชอบจ้า",
	}
	db.Model(&Collection{}).Create(&collection1)

	collection2 := Collection{
		Reader:          reader2,
		Collection_name: "เหมียวเอยกลอยใจกุบ",
		//Bookshelf: bookshelf2,
		Privacy:     privacy2,
		Description: "รวมฟิคหวานๆแบบตัดขา",
	}
	db.Model(&Collection{}).Create(&collection2)

	collection3 := Collection{
		Reader:          reader1,
		Collection_name: "ดราม่าน้ำตาไหลไปสามลิตร",
		//Bookshelf: bookshelf1,
		Privacy:     privacy2,
		Description: "รวมฟิคแบบชีวิตมีความสุขอยู่แล้วเลยอยากเศร้าบ้าง",
	}
	db.Model(&Collection{}).Create(&collection3)

	//ProblemFiction
	problemFiction1 := ProblemFiction{
		ProblemFictionTopic: "มีปัญหา ไม่สามารถอ่านได้",
	}
	db.Model(&ProblemFiction{}).Create(&problemFiction1)

	problemFiction2 := ProblemFiction{
		ProblemFictionTopic: "มีเนื้อหาไม่เหมาะสม",
	}
	db.Model(&ProblemFiction{}).Create(&problemFiction2)

	problemFiction3 := ProblemFiction{
		ProblemFictionTopic: "มีปัญหาเรื่องการละเมิดลิขสิทธิ์",
	}
	db.Model(&ProblemFiction{}).Create(&problemFiction3)

	problemFiction4 := ProblemFiction{
		ProblemFictionTopic: "อื่นๆ",
	}
	db.Model(&ProblemFiction{}).Create(&problemFiction4)

	//review
	reportFiction1 := ReportFiction{
		Timestamp:            time.Date(2023, 1, 27, 10, 30, 00, 00, time.Now().Local().Location()),
		Fiction:              fiction1,
		ProblemFiction:       problemFiction2,
		ProblemFictionDetail: "มีเนื้อหารุนแรงไม่เหมาะกับเด็กและอาจจะมีการเอาไปเลียนแบบได้",
		Reader:               reader2,
		PhoneNumber:          "0999999999",
	}
	db.Model(&ReportFiction{}).Create(&reportFiction1)

	reportFiction2 := ReportFiction{
		Timestamp:            time.Date(2023, 1, 27, 10, 30, 00, 00, time.Now().Local().Location()),
		Fiction:              fiction2,
		ProblemFiction:       problemFiction3,
		ProblemFictionDetail: "ได้มีการนำรูปทำหารายได้โดยไม่ได้รับอนุญาต",
		Reader:               reader1,
		PhoneNumber:          "0988889878",
	}
	db.Model(&ReportFiction{}).Create(&reportFiction2)

	reportFiction3 := ReportFiction{
		Timestamp:            time.Date(2023, 1, 27, 10, 30, 00, 00, time.Now().Local().Location()),
		Fiction:              fiction4,
		ProblemFiction:       problemFiction4,
		ProblemFictionDetail: "มีการคัดลอกพอร์ตเรื่องจากนักเขียนท่านอื่นนำมา",
		Reader:               reader2,
		PhoneNumber:          "0912334332",
	}
	db.Model(&ReportFiction{}).Create(&reportFiction3)

	//Coin
	coin1 := Coin{
		Amount: 10,
	}
	db.Model(&Coin{}).Create(&coin1)

	coin2 := Coin{
		Amount: 30,
	}
	db.Model(&Coin{}).Create(&coin2)

	coin3 := Coin{
		Amount: 50,
	}
	db.Model(&Coin{}).Create(&coin3)

	coin4 := Coin{
		Amount: 100,
	}
	db.Model(&Coin{}).Create(&coin4)

	//WriterCoin
	writer_coin1 := WriterCoin{
		W_Coin: 0,
	}
	db.Model(&WriterCoin{}).Create(&writer_coin1)

	writer_coin2 := WriterCoin{
		W_Coin: 0,
	}
	db.Model(&WriterCoin{}).Create(&writer_coin2)

	//Donate
	donate1 := Donate{
		Reader:     reader1,
		Fiction:    fiction4,
		Coin:       coin2,
		Comment:    "สนุกมากค่ะ เป็นกำลังใจให้",
		D_Date:     time.Date(2022, 12, 18, 13, 00, 00, 00, time.Now().Local().Location()),
		WriterCoin: writer_coin1,
		ReaderCoin: reader_coin1,
	}
	db.Model(&Donate{}).Create(&donate1)

	donate2 := Donate{
		Reader:     reader2,
		Fiction:    fiction3,
		Coin:       coin1,
		Comment:    "สนับสนุนนะคะ",
		D_Date:     time.Date(2022, 12, 25, 02, 48, 00, 00, time.Now().Local().Location()),
		WriterCoin: writer_coin2,
		ReaderCoin: reader_coin2,
	}
	db.Model(&Donate{}).Create(&donate2)

	//Public Relation
	pr1 := PublicRelation{
		Pr_topic:   "Welcom to The FICTION 2, 2023",
		Pr_cover:   "https://drive.google.com/file/d/1tnokP0kRBy5z1skF1p64w64mKGws42Uv/view?usp=share_link",
		Pr_details: "ยินดีต้อนรับเข้าสู่แอพพลิเคชั่น ที่จะทำให้ทุกคนผ่อนคลายไปกับวันดีๆ กับปีใหม่ปี 2023",
		Pr_time:    time.Now(),

		Writer:  writer1,
		Admin:   admin1,
		Fiction: fiction1,
	}
	db.Model(&PublicRelation{}).Create(&pr1)

}
