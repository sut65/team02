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
type Writer struct {
	gorm.Model
	Name           string
	Email          string `gorm:"uniqueIndex" valid:"email"`
	ID             uint
	Password       string
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

	R_CoinID   *uint
	ReaderCoin ReaderCoin `gorm:"references:id"`

	Review        []Review        `gorm:"foreignKey:ReaderID"`
	ReportFiction []ReportFiction `gorm:"foreignKey:ReaderID"`

	TopUp  []TopUp  `gorm:"foreignKey:ReaderID"`
	Donate []Donate `gorm:"foreignKey:ReaderID"`

	Feedback   []Feedback   `gorm:"foreignKey:ReaderID"`
	Collection []Collection `gorm:"foreignKey:ReaderID"`

	Bookshelf_Number []Bookshelf_Number `gorm:"foreignKey:ReaderID"`
}

// ตาราง Prefix ระบบนักอ่าน(Reader)
type Prefix struct {
	gorm.Model
	Prefix_Name string
	Reader      []Reader `gorm:"foreignKey:PrefixID"`
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

	F_ID    *uint
	Fiction Fiction `gorm:"references:id"`
}

type Genre struct {
	gorm.Model
	Genre_Name string
	Fiction    []Fiction `gorm:"foreignKey:GenreID"`
}

type Type struct {
	gorm.Model
	Type_Name string
	Fiction   []Fiction `gorm:"foreignKey:TypeID"`
}

type Fiction struct {
	gorm.Model
	F_name        string
	F_Description string
	F_File        string
	F_Date        time.Time
	WriterID      *uint
	Writer        Writer `gorm:"references:id"`
	GenreID       *uint
	Genre         Genre `gorm:"references:id"`
	TypeID        *uint
	Type          Type `gorm:"references:id"`

	Review         []Review         `gorm:"foreignKey:FictionID"`
	Donate         []Donate         `gorm:"foreignKey:FictionID"`
	PublicRelation []PublicRelation `gorm:"foreignKey:FictionID"`
}

// ---ระบบเติมเงิน(TopUp)---
type PackageTU struct {
	gorm.Model
	Promotion string
	Total     uint
	TopUp     []TopUp `gorm:"foreignKey:PackageTUID"`
}

type PaymentType struct {
	gorm.Model
	Payment_Type string
	TopUp        []TopUp `gorm:"foreignKey:PaymentTypeID"`
}

type ReaderCoin struct {
	gorm.Model
	R_Coin uint
	TopUp  []TopUp  `gorm:"foreignKey:ReaderCoinID"`
	Reader []Reader `gorm:"foreignKey:R_CoinID"`
	Donate []Donate `gorm:"foreignKey:ReaderCoinID"`
}

type TopUp struct {
	gorm.Model
	TU_Date       time.Time
	ReaderID      *uint
	Reader        Reader `gorm:"references:id"`
	PackageTUID   *uint
	PackageTU     PackageTU `gorm:"references:id"`
	PaymentTypeID *uint
	PaymentType   PaymentType `gorm:"references:id"`
	ReaderCoinID  *uint
	ReaderCoin    ReaderCoin `gorm:"references:id"`
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

	ReviewTopic string

	FictionID *uint
	Fiction   Fiction `gorm:"references:id"`

	RatingID *uint
	Rating   Rating `gorm:"references:id"`

	ReviewDetail string

	ReaderID *uint
	Reader   Reader `gorm:"references:id"`
}

// --------------- ระบบรายงาน(ReportFiction) -----------------//
type ProblemFiction struct {
	gorm.Model
	ProblemFictionTopic string
	ReportFiction       []ReportFiction `gorm:"foreignKey:ProblemFictionID"`
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
}

// ---ระบบรายงานปัญหาของนักอ่าน(Feedback)---

type Problem_system struct {
	gorm.Model
	Problem_system_topic string
	Feedback             []Feedback `gorm:"foreignKey:Problem_systemID"`
}

type Priority struct {
	gorm.Model
	Priority_level string
	Feedback       []Feedback `gorm:"foreignKey:PriorityID"`
}

type Feedback struct {
	gorm.Model
	Telephone_number string
	Detail           string
	ReaderID         *uint
	Reader           Reader `gorm:"references:id"`
	Problem_systemID *uint
	Problem_system   Problem_system `gorm:"references:id"`
	PriorityID       *uint
	Priority         Priority `gorm:"references:id"`
}

// ---ระบบเพิ่มคอลเลกชันนิยาย(Collection)---

type Privacy struct {
	gorm.Model
	Privacy    string
	Collection []Collection `gorm:"foreignKey:PrivacyID"`
}

type Collection struct {
	gorm.Model
	Collection_name    string
	Description        string
	ReaderID           *uint
	Reader             Reader `gorm:"references:id"`
	Bookshelf_NumberID *uint
	Bookshelf_Number   []Bookshelf_Number `gorm:"references:id"`
	PrivacyID          *uint
	Privacy            Privacy `gorm:"references:id"`
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
	D_Date       time.Time
	ReaderID     *uint
	Reader       Reader `gorm:"references:id"`
	FictionID    *uint
	Fiction      Fiction `gorm:"references:id"`
	WriterCoinID *uint
	WriterCoin   WriterCoin `gorm:"references:id"`
	ReaderCoinID *uint
	ReaderCoin   ReaderCoin `gorm:"references:id"`
	CoinID       *uint
	Coin         Coin `gorm:"references:id"`
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
