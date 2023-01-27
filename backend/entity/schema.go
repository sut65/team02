package entity

import (
	"time"

	"gorm.io/gorm"
)

// ---ระบบผุู้ดูแลระดับสูง(Exclusive Admin)---
type ExecutiveAdmin struct {
	gorm.Model
	executive_firstname string
	executive_lastname  string
	executive_email     string `gorm:"uniqueIndex" valid:"email"`
	executive_password  string
}

// ---Education---
type Education struct {
	gorm.Model
	education_degree string
}

// ---gender---
type Gender struct {
	gorm.Model
	gender string
}

// ---role---
type Role struct {
	gorm.Model
	role string
}

// ---ระบบผุู้ดูแล(Admin)---
type Admin struct {
	gorm.Model
	admin_firstname     string
	admin_lastname      string
	admin_email         string `gorm:"uniqueIndex" valid:"email"`
	admin_password      string
	admin_tel           string
	admin_salary        float32
	admin_birthday      time.Time
	admin_date_register time.Time

	ExecutiveAdminID *uint
	ExecutiveAdmin   ExecutiveAdmin `gorm:"references:id"`
	EducationID      *uint
	Education        Education `gorm:"references:id"`
	GenderID         *uint
	Gender           Gender `gorm:"references:id"`
	RoleID           *uint
	Role             Role `gorm:"references:id"`
}

// ---ระบบนักเขียน(Writer)---
type Writer struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex" valid:"email"`
	ID       uint
	Password string
	Fiction  []Fiction `gorm:"foreignKey:WriterID"`
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
	Gender   []Gender `gorm:"references:id"`

	R_CoinID   *uint
	ReaderCoin []ReaderCoin `gorm:"references:id"`

	Review        []Review        `gorm:"foreignKey:ReaderID"`
	ReportFiction []ReportFiction `gorm:"foreignKey:ReaderID"`

	TopUp  []TopUp  `gorm:"foreignKey:ReaderID"`
	Donate []Donate `gorm:"foreignKey:ReaderID"`

	Feedback   []Feedback   `gorm:"foreignKey:ReaderID"`
	Collection []Collection `gorm:"foreignKey:ReaderID"`
}

// ตาราง Prefix ระบบนักอ่าน(Reader)
type Prefix struct {
	gorm.Model
	Prefix_Name string
	Reader      []Reader `gorm:"foreignKey:PrefixID"`
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

	Review []Review `gorm:"foreignKey:FictionID"`
	Donate []Donate `gorm:"foreignKey:FictionID"`
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
	Collection_name string
	Description     string
	ReaderID        *uint
	Reader          Reader `gorm:"references:id"`
	// BookshelfID       *uint
	// Bookshelf         Bookshelf `gorm:"references:id"`
	PrivacyID *uint
	Privacy   Privacy `gorm:"references:id"`
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
