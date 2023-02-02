package entity

import (
	"time"

	"gorm.io/gorm"
)

// ---ระบบผุู้ดูแลระดับสูง(Exclusive Admin)---
type ExecutiveAdmin struct {
	gorm.Model
	Executive_firstname string
	Executive_lastname  string
	Executive_email     string `gorm:"uniqueIndex" valid:"email"`
	Executive_password  string

	Admin []Admin `gorm:"foreignKey:ExecutiveAdminID"`
}

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
	Admin_firstname     string
	Admin_lastname      string
	Admin_email         string `gorm:"uniqueIndex" valid:"email"`
	Admin_password      string
	Admin_tel           string
	Admin_salary        float32
	Admin_birthday      time.Time
	Admin_date_register time.Time

	ExecutiveAdminID *uint
	ExecutiveAdmin   ExecutiveAdmin `gorm:"references:id"`
	EducationID      *uint
	Education        Education `gorm:"references:id"`
	GenderID         *uint
	Gender           Gender `gorm:"references:id"`
	RoleID           *uint
	Role             Role `gorm:"references:id"`

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
	Name string

	PrefixID *uint
	Prefix   Prefix `gorm:"references:id"`

	Nickname      string
	Email         string
	Date_of_Birth time.Time
	Password      string

	GenderID *uint
	Gender   Gender `gorm:"references:id"`

	ReaderCoinID *uint
	ReaderCoin   ReaderCoin `gorm:"references:id"`

	Review        []Review        `gorm:"foreignKey:ReaderID"`
	ReportFiction []ReportFiction `gorm:"foreignKey:ReaderID"`

	TopUp  []TopUp  `gorm:"foreignKey:ReaderID"`
	Donate []Donate `gorm:"foreignKey:ReaderID"`

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
	Donate []Donate `gorm:"foreignKey:ReaderCoinID"`
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

	ReviewTopic string

	RatingID *uint
	Rating   Rating `gorm:"references:id"`

	ReviewDetail string

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

	PhoneNumber string `gorm:"uniqueIndex"`
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
	Reader           Reader `gorm:"references:id"`
	Telephone_Number string
	ProblemSystemID  *uint
	ProblemSystem    ProblemSystem `gorm:"references:id"`
	PriorityID       *uint
	Priority         Priority `gorm:"references:id"`
	FeedbackDetail   string
}

// ---ระบบเพิ่มคอลเลกชันนิยาย(Collection)---

type Privacy struct {
	gorm.Model
	Privacy    string
	Collection []Collection `gorm:"foreignKey:PrivacyID"`
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

// ---ระบบบริจาค(Donate)---
type Coin struct {
	gorm.Model
	Amount uint
	Donate []Donate `gorm:"foreignKey:CoinID"`
}

type WriterCoin struct {
	gorm.Model
	W_Coin uint
	Donate []Donate `gorm:"foreignKey:WriterCoinID"`
}

type Donate struct {
	gorm.Model
	ReaderID     *uint
	Reader       Reader `gorm:"references:id"`
	FictionID    *uint
	Fiction      Fiction `gorm:"references:id"`
	Comment      string
	CoinID       int8
	Coin         Coin `gorm:"references:id"`
	D_Date       time.Time
	WriterCoinID *uint
	WriterCoin   WriterCoin `gorm:"references:id"`
	ReaderCoinID int8
	ReaderCoin   ReaderCoin `gorm:"references:id"`
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
