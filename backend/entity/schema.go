package entity

import (
	"time"

	"gorm.io/gorm"
)

// ---ระบบผุู้ดูแล(Admin)---
type Admin struct {
	gorm.Model
	Name     string
	Email    string `gorm:"uniqueIndex" valid:"email"`
	Password string
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
type Reader struct {
	gorm.Model
	Name       string
	Email      string `gorm:"uniqueIndex" valid:"email"`
	ID         uint
	Password   string
	Feedback   []Feedback   `gorm:"foreignKey:ReaderID"`
	Collection []Collection `gorm:"foreignKey:ReaderID"`
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
}

// ---ระบบรายงานปัญหาของนักอ่าน(Feedback)---

type Problem_system struct {
	gorm.Model
	Problem_system_topic string
	Feedback             []Feedback `gorm:"foreignKey:Problem_systemID"`
}

type Priority struct {
	gorm.Model
	priority_level string
	Feedback       []Feedback `gorm:"foreignKey:PriorityID"`
}

type Feedback struct {
	gorm.Model
	detail           string
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
	privacy    string
	Collection []Collection `gorm:"foreignKey:PrivacyID"`
}

type Collection struct {
	gorm.Model
	collection_name string
	description     string
	ReaderID        *uint
	Reader          Reader `gorm:"references:id"`
	// BookshelfID       *uint
	// Bookshelf         Bookshelf `gorm:"references:id"`
	PrivacyID *uint
	Privacy   Privacy `gorm:"references:id"`
}
