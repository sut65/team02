package entity

import (
	"time"

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

	PublicRelation []PublicRelation `gorm:"foreignKey:AdminID"`
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
	Prefix          Prefix `gorm:"references:id"`
	Name            string
	GenderID        *uint
	Gender          Gender `gorm:"references:id"`
	Writer_birthday time.Time
	AffiliationID   *uint
	Affiliation     Affiliation `gorm:"references:id"`
	Pseudonym       string
	Email           string `gorm:"uniqueIndex" valid:"email"`
	Password        string

	Fiction        []Fiction        `gorm:"foreignKey:WriterID"`
	PublicRelation []PublicRelation `gorm:"foreignKey:WriterID"`
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

	Collection []Collection `gorm:"Bookshelf_NumberID"`
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
	Fiction_Name        string
	Fiction_Description string
	Fiction_Story       string
	Fiction_Date        time.Time
	WriterID            *uint
	Writer              Writer `gorm:"references:id"`
	GenreID             *uint
	Genre               Genre `gorm:"references:id"`
	RatingFictionID     *uint
	RatingFiction       RatingFiction `gorm:"references:id"`

	Review         []Review         `gorm:"foreignKey:FictionID"`
	PublicRelation []PublicRelation `gorm:"foreignKey:FictionID"`
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

	FictionID *uint
	Fiction   Fiction `gorm:"references:id"`

	ReviewTopic string `valid:"required~กรุณากรอกหัวข้อ,maxstringlength(20)~หัวข้อการเขียนรีวิวมีความยาวไม่เกิน 20 ตัวอักษร"`

	RatingID *uint
	Rating   Rating `gorm:"references:id"`

	ReviewDetail string `valid:"required~กรุณากรอกรายละเอียด,maxstringlength(100)~รายละเอียดมีความยาวไม่เกิน 100 ตัวอักษร"`

	ReaderID *uint
	Reader   Reader `gorm:"references:id"`
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

	FictionID *uint
	Fiction   Fiction `gorm:"references:id"`

	ProblemFictionID *uint
	ProblemFiction   ProblemFiction `gorm:"references:id"`

	ProblemFictionDetail string

	ReaderID *uint
	Reader   Reader `gorm:"references:id"`

	PhoneNumber string
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
	Telephone_Number string `valid:"required~กรอกเบอร์โทรด้วยจ้า, matches(^0([6|8|9])([0-9]{8}$))~กรอกเบอร์โทนไม่ถูกจ้า"`
	ProblemSystemID  *uint
	ProblemSystem    ProblemSystem `gorm:"references:id;" valid:"-"`
	PriorityID       *uint
	Priority         Priority `gorm:"references:id;" valid:"-"`
	FeedbackDetail   string   `valid:"required~บอกรายละเอียดมาด้วยจ้า"`
}

// ---ระบบเพิ่มคอลเลกชันนิยาย(Collection)---

type Privacy struct {
	gorm.Model
	Privacy string
}

type Collection struct {
	gorm.Model
	ReaderID           *uint
	Reader             Reader `gorm:"references:id"`
	Collection_name    string
	Bookshelf_NumberID *uint
	Bookshelf_Number   Bookshelf_Number `gorm:"references:id"`
	PrivacyID          *uint
	Privacy            Privacy `gorm:"references:id"`
	Description        string
}

// Public Relation
type PublicRelation struct {
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
