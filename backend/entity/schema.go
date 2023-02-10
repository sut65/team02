package entity

import (
	"time"

	"regexp"

	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"
)

// ---Education---
type Education struct {
	gorm.Model
	Education_degree string
	Admin            []Admin `gorm:"foreignKey:EducationID"`
}

// ---gender---
type Gender struct {
	gorm.Model
	Gender string

	Admin  []Admin  `gorm:"foreignKey:GenderID"`
	Reader []Reader `gorm:"foreignKey:GenderID"`
	Writer []Writer `gorm:"foreignKey:GenderID"`
}

// ---role---
type Role struct {
	gorm.Model
	Role  string
	Admin []Admin `gorm:"foreignKey:RoleID"`
}

// ---ระบบผุู้ดูแล(Admin)---
type Admin struct {
	gorm.Model
	Admin_firstname     string `valid:"required~กรุณากรอกชื่อ"`
	Admin_lastname      string `valid:"required~กรุณากรอกนามสกุล"`
	Admin_email         string `gorm:"uniqueIndex" valid:"email~กรอกอีเมล์ไม่ถูก,required~กรุณากรอกอีเมล์"`
	Admin_password      string
	Admin_tel           string `valid:"required~กรุณากรอกเบอร์โทร, matches(^0([6|8|9])([0-9]{8}$))~กรอกเบอร์โทรไม่ถูก"`
	Admin_date_register time.Time

	EducationID *uint
	Education   Education `gorm:"references:id;" valid:"-"`
	GenderID    *uint
	Gender      Gender `gorm:"references:id;" valid:"-"`
	RoleID      *uint
	Role        Role `gorm:"references:id;" valid:"-"`

	Public_Relation []Public_Relation `gorm:"foreignKey:AdminID"`
}

// ---ระบบนักเขียน(Writer)---
type Affiliation struct {
	gorm.Model
	Affiliation_name string
	Writer           []Writer `gorm:"foreignKey:AffiliationID"`
}

type Writer struct {
	gorm.Model
	PrefixID        *uint
	Prefix          Prefix `gorm:"references:id" valid:"-"`
	Name            string `valid:"required~กรุณากรอกชื่อ-นามสกุล"`
	GenderID        *uint
	Gender          Gender    `gorm:"references:id" valid:"-"`
	Writer_birthday time.Time `valid:"Future~วันที่และเวลาต้องไม่เป็นอนาคต"`
	AffiliationID   *uint
	Affiliation     Affiliation `gorm:"references:id" valid:"-"`
	Pseudonym       string      `gorm:"uniqueIndex" valid:"required~กรุณากรอกนามปากกา"`
	Email           string      `gorm:"uniqueIndex" valid:"email~รูปแบบอีเมล์ไม่ถูกต้อง,required~กรุณากรอกอีเมล์"`
	Password        string

	Fiction         []Fiction         `gorm:"foreignKey:WriterID" valid:"-"`
	Public_Relation []Public_Relation `gorm:"foreignKey:WriterID" valid:"-"`
}

// ---ระบบนักอ่าน(Reader)---
// ตารางReader ระบบนักอ่าน(Reader)
type Reader struct {
	gorm.Model
	Name string `valid:"required~กรุณากรอกชื่อ"`

	PrefixID *uint
	Prefix   Prefix `gorm:"references:id"`

	Nickname      string
	Email         string `gorm:"uniqueIndex" valid:"email~กรอกอีเมล์ไม่ถูก,required~กรุณากรอกอีเมล์"`
	Date_of_Birth time.Time
	Password      string

	GenderID *uint
	Gender   Gender `gorm:"references:id"`

	ReaderCoinID *uint
	ReaderCoin   ReaderCoin `gorm:"references:id"`

	Review        []Review        `gorm:"foreignKey:ReaderID"`
	ReportFiction []ReportFiction `gorm:"foreignKey:ReaderID"`

	TopUp []TopUp `gorm:"foreignKey:ReaderID"`

	Feedback []Feedback `gorm:"foreignKey:ReaderID"`

	Bookshelf_Number []Bookshelf_Number `gorm:"foreignKey:ReaderID"`
}

// ตาราง Prefix ระบบนักอ่าน(Reader)
type Prefix struct {
	gorm.Model
	Prefix_Name string
	Reader      []Reader `gorm:"foreignKey:PrefixID"`
	Writer      []Writer `gorm:"foreignKey:PrefixID"`
}

// ---ระบบเพิ่มเข้าชั้นหนังสือ(Bookshelf)---
// ตาราง Bookshelf_Number ระบบชั้นหนังสือ
type Bookshelf_Number struct {
	gorm.Model
	ReaderID *uint
	Reader   Reader `gorm:"references:id"`

	Bookshelf_Name string

	Added_Book []Added_Book `gorm:"Bookshelf_NumberID"`
}

// ตาราง Added_Book ระบบชั้นหนังสือ
type Added_Book struct {
	gorm.Model
	Bookshelf_NumberID *uint
	Bookshelf_Number   Bookshelf_Number `gorm:"references:id"`

	FictionID *uint
	Fiction   Fiction `gorm:"references:id"`
}

// ---ระบบบันทึกนิยาย(Fiction)---
type Genre struct {
	gorm.Model
	Genre_Name string
	Fiction    []Fiction `gorm:"foreignKey:GenreID"`
}

type RatingFiction struct {
	gorm.Model
	RatingFiction_Name string
	Fiction            []Fiction `gorm:"foreignKey:RatingFictionID"`
}

type Fiction struct {
	gorm.Model
	Fiction_Name        string    `valid:"required~ต้องเพิ่มชื่อนิยายด้วยนะ, minstringlength(3)~กรุณากรอกชื่อนิยายเพิ่มเติม,maxstringlength(120)~ชื่อนิยายต้องสั้นกว่านี้อีกหน่อยนะ,cha_valid~ชื่อนิยายต้องไม่มีอักขระพิเศษ กรุณากรอกใหม่อีกครั้ง"`
	Fiction_Description string    `valid:"required~ต้องกรอกคำโปรยนิยายก่อนกดบันทึก, minstringlength(3)~กรุณากรอกคำโปรยเพิ่มเติม,maxstringlength(200)~คำโปรยนิยายต้องสั้นกว่านี้อีกหน่อยนะ"`
	Fiction_Story       string    `valid:"required~อย่าลืมเพิ่มเนื้อหานิยายนะ, minstringlength(200)~แต่งเพิ่มอีกซักนิดนะ"`
	Fiction_Date        time.Time `valid:"-"`
	WriterID            *uint
	Writer              Writer `gorm:"references:id;" valid:"-"` //ไม่มีการ วาเพราะเป็นตารางที่ดึงมา
	GenreID             *uint
	Genre               Genre `gorm:"references:id;" valid:"-"` //ไม่มีการ วาเพราะเป็นตารางที่ดึงมา
	RatingFictionID     *uint
	RatingFiction       RatingFiction `gorm:"references:id;" valid:"-"` //ไม่มีการ วาเพราะเป็นตารางที่ดึงมา

	Review          []Review          `gorm:"foreignKey:FictionID"`
	Public_Relation []Public_Relation `gorm:"foreignKey:FictionID"`
}

// ---ระบบเติมเงิน(TopUp)---
type PackageTopUp struct {
	gorm.Model
	Promotion string
	Price     int32
	Total     int32
	TopUp     []TopUp `gorm:"foreignKey:PackageTopUpID"`
}

type PaymentType struct {
	gorm.Model
	Payment_Type string
	TopUp        []TopUp `gorm:"foreignKey:PaymentTypeID"`
}

type ReaderCoin struct {
	gorm.Model
	R_coin int32
	TopUp  []TopUp  `gorm:"foreignKey:ReaderCoinID"`
	Reader []Reader `gorm:"foreignKey:ReaderCoinID"`
}

type TopUp struct {
	gorm.Model
	ReaderID           *uint
	Reader             Reader `gorm:"references:id"`
	PackageTopUpID     *uint
	PackageTopUp       PackageTopUp `gorm:"references:id"`
	PaymentTypeID      *uint
	PaymentType        PaymentType `gorm:"references:id"`
	Topup_phone_number string
	Topup_date         time.Time
	ReaderCoinID       *uint
	ReaderCoin         ReaderCoin `gorm:"references:id"`
}

// --------------- ระบบเขียนรีวิว(Review) -----------------//
type Rating struct {
	gorm.Model
	Rating_score int
	Rating_name  string

	Review []Review `gorm:"foreignKey:RatingID"`
}

type Review struct {
	gorm.Model
	Timestamp time.Time

	FictionID *uint   `valid:"-"`
	Fiction   Fiction `gorm:"references:id" valid:"-"`

	ReviewTopic string `valid:"required~กรุณาใส่หัวข้อรีวิว,maxstringlength(20)~หัวข้อการเขียนรีวิวต้องมีความยาวไม่เกิน 20 ตัวอักษร,minstringlength(3)~หัวข้อการเขียนรีวิวต้องมีความยาวไม่ต่ำกว่า 3 ตัวอักษร,cha_valid~ต้องไม่ใช่ตัวเลขหรืออักษรพิเศษ"`

	RatingID *uint  `valid:"-"`
	Rating   Rating `gorm:"references:id" valid:"-"`

	ReviewDetail string `valid:"required~กรุณาใส่รายละเอียดการรีวิว,maxstringlength(100)~รายละเอียดการเขียนรีวิวต้องมีความยาวไม่เกิน 100 ตัวอักษร,minstringlength(5)~รายละเอียดการเขียนรีวิวต้องมีความยาวไม่ต่ำกว่า 5 ตัวอักษร"`

	ReaderID *uint  `valid:"-"`
	Reader   Reader `gorm:"references:id" valid:"-"`
}

// --------------- ระบบรายงาน(ReportFiction) -----------------//
type ProblemFiction struct {
	gorm.Model
	ProblemFiction_Topic string
	ReportFiction        []ReportFiction `gorm:"foreignKey:ProblemFictionID"`
}

type ReportFiction struct {
	gorm.Model
	Timestamp time.Time

	FictionID *uint   `valid:"-"`
	Fiction   Fiction `gorm:"references:id" valid:"-"`

	ProblemFictionID *uint          `valid:"-"`
	ProblemFiction   ProblemFiction `gorm:"references:id" valid:"-"`

	ProblemFictionDetail string `valid:"required~กรุณาใส่รายละเอียดการรายงานนิยาย,maxstringlength(100)~รายละเอียดการรายงานนิยายต้องมีความยาวไม่เกิน 100 ตัวอักษร,minstringlength(5)~รายละเอียดการรายงานนิยายต้องมีความยาวไม่ต่ำกว่า 5 ตัวอักษร"`

	ReaderID *uint  `valid:"-"`
	Reader   Reader `gorm:"references:id" valid:"-"`

	PhoneNumber string `valid:"required~กรุณาระบุเบอร์ติดต่อ,matches(^0([6|8|9])([0-9]{8}$))~กรุณากรอกเบอร์ติดต่อที่ถูกต้อง"`
}

// ---ระบบรายงานปัญหาของนักอ่าน(Feedback)---

type ProblemSystem struct {
	gorm.Model
	Problem_Topic string
	Feedback      []Feedback `gorm:"foreignKey:ProblemSystemID"`
}

type Priority struct {
	gorm.Model
	Priority_Level string
	Feedback       []Feedback `gorm:"foreignKey:PriorityID"`
}

type Feedback struct {
	gorm.Model
	ReaderID         *uint
	Reader           Reader `gorm:"references:id;" valid:"-"` //ไม่มีการ วาเพราะเป็นตารางที่ดึงมา
	Telephone_Number string `valid:"required~อย่าลืมกรอกเบอร์โทรศัพท์นะ, matches(^0([6|8|9])([0-9]{8}$))~กรอกเบอร์โทรศัพท์ไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง"`
	ProblemSystemID  *uint
	ProblemSystem    ProblemSystem `gorm:"references:id;" valid:"-"`
	PriorityID       *uint
	Priority         Priority `gorm:"references:id;" valid:"-"`
	FeedbackDetail   string   `valid:"required~บอกรายละเอียดมาก่อนกดบันทึกนะฮะ, minstringlength(3)~กรุณากรอกรายอะเอียดเพิ่มเติม,maxstringlength(200)~สรุปรายละเอียดมาพอสังเขปนะ, cha_valid~รายละเอียดต้องไม่มีอักขระพิเศษ กรุณากรอกใหม่อีกครั้ง"`
}

// Public Relation
type Public_Relation struct {
	gorm.Model
	Pr_topic   string
	Pr_cover   string
	Pr_details string
	Pr_time    time.Time

	WriterID  *uint
	Writer    Writer `gorm:"references:id"`
	AdminID   *uint
	Admin     Admin `gorm:"references:id"`
	FictionID *uint
	Fiction   Fiction `gorm:"references:id"`
}

// ฟังก์ชันที่จะใช่ในการ validation ตัวอักษรพิเศษและตัวเลข
func init() {
	govalidator.CustomTypeTagMap.Set("cha_valid", govalidator.CustomTypeValidator(func(i interface{}, context interface{}) bool {
		s, ok := i.(string)
		if !ok {
			return false
		}
		match, _ := regexp.MatchString("^[ก-๛a-zA-Z\\s]+$", s)
		return match
	}))
}

// ฟังก์ชันที่จะใช่ในการ validation EntryTime
func init() {
	govalidator.CustomTypeTagMap.Set("Past", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.After(time.Now().Add(time.Minute*-2)) || t.Equal(time.Now())
		//return t.Before(time.Now())
	})

	govalidator.CustomTypeTagMap.Set("Future", func(i interface{}, context interface{}) bool {
		t := i.(time.Time)
		return t.Before(time.Now().Add(time.Minute*24)) || t.Equal(time.Now())

		// now := time.Now()
		// return now.Before(time.Time(t))
	})
}
