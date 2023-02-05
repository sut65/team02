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
		&Role{},
		&Admin{},

		&Writer{},
		&Affiliation{},
		&Reader{},
		&Gender{},
		&Prefix{},
		&Bookshelf_Number{},
		&Added_Book{},

		&ProblemSystem{},
		&Priority{},
		&Feedback{},

		&Genre{},
		&RatingFiction{},
		&Fiction{},

		&Rating{},
		&Review{},

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

	password, err := bcrypt.GenerateFromPassword([]byte("654321"), 14)

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

	//Prefix
	prefix1 := Prefix{
		Prefix_Name: "นาย",
	}
	db.Model(&Prefix{}).Create(&prefix1)

	prefix2 := Prefix{
		Prefix_Name: "นางสาว",
	}
	db.Model(&Prefix{}).Create(&prefix2)

	prefix3 := Prefix{
		Prefix_Name: "เด็กชาย",
	}
	db.Model(&Prefix{}).Create(&prefix3)

	prefix4 := Prefix{
		Prefix_Name: "เด็กหญิง",
	}
	db.Model(&Prefix{}).Create(&prefix4)

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
		Role: "Admin",
	}
	db.Model(&Role{}).Create(&role1)

	role2 := Role{
		Role: "Executive Admin",
	}
	db.Model(&Role{}).Create(&role2)

	role3 := Role{
		Role: "Public Relaions",
	}
	db.Model(&Role{}).Create(&role3)

	//Admin
	admin1 := Admin{
		Admin_firstname:     "Onika",
		Admin_lastname:      "Maraj-Petty",
		Admin_email:         "Nickiminaj@gmail.com",
		Admin_password:      string(password),
		Admin_tel:           "0912345671",
		Admin_salary:        35000.0,
		Admin_birthday:      time.Now(),
		Admin_date_register: time.Now(),

		ExecutiveAdmin: executive_admin1,
		Education:      education4,
		Gender:         gender1,
		Role:           role2,
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
		Education:      education3,
		Gender:         gender2,
		Role:           role1,
	}
	db.Model(&Admin{}).Create(&admin2)

	admin3 := Admin{
		Admin_firstname:     "Wongsadhorn",
		Admin_lastname:      "Payungsakul",
		Admin_email:         "wongsa2544@gmail.com",
		Admin_password:      string(password),
		Admin_tel:           "0637756269",
		Admin_salary:        28000.0,
		Admin_birthday:      time.Now(),
		Admin_date_register: time.Now(),

		ExecutiveAdmin: executive_admin2,
		Education:      education3,
		Gender:         gender3,
		Role:           role3,
	}
	db.Model(&Admin{}).Create(&admin3)

	//Affiliation
	affiliation1 := Affiliation{
		Affiliation_name: "แจ่มใส",
	}
	db.Model(&Affiliation{}).Create(&affiliation1)

	affiliation2 := Affiliation{
		Affiliation_name: "Enter Books",
	}
	db.Model(&Affiliation{}).Create(&affiliation2)

	affiliation3 := Affiliation{
		Affiliation_name: "Purple Banana",
	}
	db.Model(&Affiliation{}).Create(&affiliation3)

	affiliation4 := Affiliation{
		Affiliation_name: "Nanmeebooks",
	}
	db.Model(&Affiliation{}).Create(&affiliation4)

	//Writer
	writer1 := Writer{
		Prefix:          prefix2,
		Name:            "WriterA",
		Gender:          gender1,
		Writer_birthday: time.Date(1997, 5, 12, 9, 30, 00, 00, time.Now().Local().Location()),
		Affiliation:     affiliation2,
		Pseudonym:       "รัตติกาล",
		Email:           "writer01@gmail.com",
		Password:        string(password),
	}
	db.Model(&Writer{}).Create(&writer1)

	writer2 := Writer{
		Prefix:          prefix1,
		Name:            "WriterB",
		Gender:          gender2,
		Writer_birthday: time.Date(1989, 11, 27, 12, 05, 00, 00, time.Now().Local().Location()),
		Affiliation:     affiliation4,
		Pseudonym:       "นกเพลิงฟ้า",
		Email:           "writer02@gmail.com",
		Password:        string(password),
	}
	db.Model(&Writer{}).Create(&writer2)

	// //Reader
	// reader1 := Reader{
	// 	Name:     "ReaderA",
	// 	Email:    "reader01@gmail.com",
	// 	Password: string(password),
	// }
	// db.Model(&Reader{}).Create(&reader1)

	// reader2 := Reader{
	// 	Name:     "ReaderB",
	// 	Email:    "reader02@gmail.com",
	// 	Password: string(password),
	// }
	// db.Model(&Reader{}).Create(&reader2)

	//Genre
	genre1 := Genre{
		Genre_Name: "Boy Love",
	}
	db.Model(&Genre{}).Create(&genre1)

	genre2 := Genre{
		Genre_Name: "Girl Love",
	}
	db.Model(&Genre{}).Create(&genre2)

	genre3 := Genre{
		Genre_Name: "Sci-fi",
	}
	db.Model(&Genre{}).Create(&genre3)

	genre4 := Genre{
		Genre_Name: "สยองขวัญ",
	}
	db.Model(&Genre{}).Create(&genre4)

	genre5 := Genre{
		Genre_Name: "นิยายรักวัยว้าวุ่น",
	}
	db.Model(&Genre{}).Create(&genre5)

	// RatingFiction
	rating_fiction1 := RatingFiction{
		RatingFiction_Name: "น.15 อายุ 15 ปีขึ้นไป",
	}
	db.Model(&RatingFiction{}).Create(&rating_fiction1)

	rating_fiction2 := RatingFiction{
		RatingFiction_Name: "น.18 อายุ 18 ปีขึ้นไป",
	}
	db.Model(&RatingFiction{}).Create(&rating_fiction2)

	rating_fiction3 := RatingFiction{
		RatingFiction_Name: "ฉ.20 เฉพาะผู้ใหญ่ อายุ 20 ปีขึ้นไป",
	}
	db.Model(&RatingFiction{}).Create(&rating_fiction3)

	//Fiction
	fiction1 := Fiction{
		Fiction_Name:        "แ ค่ ที่ แ ก ง ",
		Fiction_Description: "คนที่เอาชื่อเราไปแทนคำว่ารักนี่มันต้องเป็นคนยังไงวะ",
		Fiction_Date:        time.Date(2022, 10, 23, 12, 30, 00, 00, time.Now().Local().Location()),
		Writer:              writer1,
		Genre:               genre1,
		RatingFiction:       rating_fiction2,
	}
	db.Model(&Fiction{}).Create(&fiction1)

	fiction2 := Fiction{
		Fiction_Name:        "even better.",
		Fiction_Description: "my life is even better with you.",
		Fiction_Date:        time.Date(2023, 01, 01, 12, 30, 00, 00, time.Now().Local().Location()),
		Writer:              writer1,
		Genre:               genre2,
		RatingFiction:       rating_fiction2,
	}
	db.Model(&Fiction{}).Create(&fiction2)

	fiction3 := Fiction{
		Fiction_Name:        "แ ล้ ว แ ต่ ด า ว",
		Fiction_Description: "just one of his fish that wished to be his sea :-)",
		Fiction_Date:        time.Date(2022, 10, 23, 12, 30, 00, 00, time.Now().Local().Location()),
		Writer:              writer2,
		Genre:               genre3,
		RatingFiction:       rating_fiction1,
	}
	db.Model(&Fiction{}).Create(&fiction3)

	fiction4 := Fiction{
		Fiction_Name:        "dear.",
		Fiction_Description: "แปลกดีเนอะ ที่เราอยากมีความรัก .. ทั้งๆที่ไม่เคยเข้าใจมันเลยด้วยซ้ำ ยิ่งมารักกับเพื่อนร่วมห้องที่ได้ยินแค่เสียงนี่อีก",
		Fiction_Date:        time.Date(2022, 10, 23, 12, 30, 00, 00, time.Now().Local().Location()),
		Writer:              writer2,
		Genre:               genre4,
		RatingFiction:       rating_fiction3,
	}
	db.Model(&Fiction{}).Create(&fiction4)

	fiction5 := Fiction{
		Fiction_Name:        "#นมตราหมีดีที่สุด ʕ•ᴥ•ʔ ",
		Fiction_Description: "ในวันที่เธอนั้นแก่ สายตาเริ่มแย่ อยากให้ใครมาเดินอยู่ใกล้ๆ",
		Fiction_Date:        time.Date(2022, 10, 23, 12, 30, 00, 00, time.Now().Local().Location()),
		Writer:              writer1,
		Genre:               genre5,
		RatingFiction:       rating_fiction1,
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
		R_coin: 0,
	}
	db.Model(&ReaderCoin{}).Create(&reader_coin1)

	reader_coin2 := ReaderCoin{
		R_coin: 0,
	}
	db.Model(&ReaderCoin{}).Create(&reader_coin2)

	//Reader
	reader1 := Reader{
		Name:          "ชาลิสา ชุ่มเย็น",
		Prefix:        prefix2,
		Nickname:      "AliGodess",
		Email:         "chalisa01@gmail.com",
		Date_of_Birth: time.Now(),
		Password:      string(password),
		Gender:        gender1,
		ReaderCoin:    reader_coin1,
	}
	db.Model(&Reader{}).Create(&reader1)

	reader2 := Reader{
		Name:          "ธนากร",
		Prefix:        prefix1,
		Nickname:      "InwTeo",
		Email:         "Tanakon02@gmail.com",
		Date_of_Birth: time.Now(),
		Password:      string(password),
		Gender:        gender3,
		ReaderCoin:    reader_coin2,
	}
	db.Model(&Reader{}).Create(&reader2)

	//Bookshelf
	bookshelf_number1 := Bookshelf_Number{
		Reader:         reader1,
		Bookshelf_Name: "ชั้นหนังสือของฉัน",
	}
	db.Model(&Bookshelf_Number{}).Create(&bookshelf_number1)

	bookshelf_number2 := Bookshelf_Number{
		Reader:         reader2,
		Bookshelf_Name: "ชั้นหนังสือของฉัน",
	}
	db.Model(&Bookshelf_Number{}).Create(&bookshelf_number2)

	//Added_Book
	added_book1 := Added_Book{
		Bookshelf_Number: bookshelf_number1,
		Fiction:          fiction1,
	}
	db.Model(&Added_Book{}).Create(&added_book1)

	added_book2 := Added_Book{
		Bookshelf_Number: bookshelf_number1,
		Fiction:          fiction2,
	}
	db.Model(&Added_Book{}).Create(&added_book2)

	added_book3 := Added_Book{
		Bookshelf_Number: bookshelf_number2,
		Fiction:          fiction1,
	}
	db.Model(&Added_Book{}).Create(&added_book3)

	//ToUp
	topup1 := TopUp{
		Reader:             reader1,
		PackageTopUp:       packagetu2,
		PaymentType:        paymenttype2,
		Topup_phone_number: "0123589647",
		Topup_date:         time.Date(2022, 12, 02, 20, 45, 00, 00, time.Now().Local().Location()),
		ReaderCoin:         reader_coin1,
	}
	db.Model(&TopUp{}).Create(&topup1)

	topup2 := TopUp{
		Reader:             reader2,
		PackageTopUp:       packagetu1,
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
	problem_system1 := ProblemSystem{
		Problem_Topic: "บัญชีผู้ใช้",
	}
	db.Model(&ProblemSystem{}).Create(&problem_system1)

	problem_system2 := ProblemSystem{
		Problem_Topic: "การเติม coin",
	}
	db.Model(&ProblemSystem{}).Create(&problem_system2)

	problem_system3 := ProblemSystem{
		Problem_Topic: "การอ่านนิยาย",
	}
	db.Model(&ProblemSystem{}).Create(&problem_system3)

	problem_system4 := ProblemSystem{
		Problem_Topic: "อื่นๆ/ข้อเสนอแนะ",
	}
	db.Model(&ProblemSystem{}).Create(&problem_system4)

	//Priority
	priority1 := Priority{
		Priority_Level: "รีบสุดๆไปเลยจ้า",
	}
	db.Model(&Priority{}).Create(&priority1)

	priority2 := Priority{
		Priority_Level: "รีบที่สุด",
	}
	db.Model(&Priority{}).Create(&priority2)

	priority3 := Priority{
		Priority_Level: "รีบมาก",
	}
	db.Model(&Priority{}).Create(&priority3)

	//Feedback
	feedback1 := Feedback{
		Reader:           reader1,
		Telephone_Number: "0983412445",
		ProblemSystem:    problem_system1,
		Priority:         priority1,
		FeedbackDetail:   "เปลี่ยนรหัสไม่ได้จ้า",
	}
	db.Model(&Feedback{}).Create(&feedback1)

	feedback2 := Feedback{
		Reader:           reader2,
		Telephone_Number: "0951234567",
		ProblemSystem:    problem_system2,
		Priority:         priority2,
		FeedbackDetail:   "เติม coin แล้วไม่เข้า",
	}
	db.Model(&Feedback{}).Create(&feedback2)

	feedback3 := Feedback{
		Reader:           reader1,
		Telephone_Number: "0623476891",
		ProblemSystem:    problem_system3,
		Priority:         priority1,
		FeedbackDetail:   "กดเข้าไปอ่านนิยายไม่ได้ค่า",
	}
	db.Model(&Feedback{}).Create(&feedback3)

	feedback4 := Feedback{
		Reader:           reader2,
		Telephone_Number: "0985736152",
		ProblemSystem:    problem_system4,
		Priority:         priority3,
		FeedbackDetail:   "อยากให้สามารถเพิ่มหมวดหมู่ย่อยของนิยายเองได้",
	}
	db.Model(&Feedback{}).Create(&feedback4)

	//ProblemFiction
	problemFiction1 := ProblemFiction{
		ProblemFiction_Topic: "มีปัญหา ไม่สามารถอ่านได้",
	}
	db.Model(&ProblemFiction{}).Create(&problemFiction1)

	problemFiction2 := ProblemFiction{
		ProblemFiction_Topic: "มีเนื้อหาไม่เหมาะสม",
	}
	db.Model(&ProblemFiction{}).Create(&problemFiction2)

	problemFiction3 := ProblemFiction{
		ProblemFiction_Topic: "มีปัญหาเรื่องการละเมิดลิขสิทธิ์",
	}
	db.Model(&ProblemFiction{}).Create(&problemFiction3)

	problemFiction4 := ProblemFiction{
		ProblemFiction_Topic: "อื่นๆ",
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
