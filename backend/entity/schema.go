package entity

import (
	"time"

	"gorm.io/gorm"
)

// ------------------- ระบบผุู้ดูแล(Admin) --------------------//
type Admin struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex" valid:"email"`
	Password string
}

// ------------------- ระบบนักเขียน(Writer) ----------------//
type Writer struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex" valid:"email"`
	ID       uint
	Password string
	Fiction  []Fiction `gorm:"foreignKey:WriterID"`
}

// ------------------ ระบบนักอ่าน(Reader) ----------------//
type Reader struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex" valid:"email"`
	ID       uint
	Password string

	Review []Review `gorm:"foreignKey:ReaderID"`
}

// --------------- ระบบเพิ่มนิยาย(Fiction) -----------------//
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
	Type          Type     `gorm:"references:id"`
	Review        []Review `gorm:"foreignKey:FictionID"`
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
