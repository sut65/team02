package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// GET /readers
// List all readers
func ListReaders(c *gin.Context) {
	var readers []entity.Reader
	if err := entity.DB().Preload("Prefix").Preload("Gender").Raw("SELECT * FROM readers WHERE id = ?").Find(&readers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": readers})
}

// GET /reader/:id
// Get reader by id
func GetReader(c *gin.Context) {
	var reader entity.Reader
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM readers WHERE id = ?", id).Scan(&reader).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reader})
}

// POST /fictions
func CreateReader(c *gin.Context) {

	var reader entity.Reader
	var gender entity.Gender
	var prefix entity.Prefix
	var genre entity.Genre

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร fiction
	if err := c.ShouldBindJSON(&reader); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา Gender ด้วย id
	if tx := entity.DB().Where("id = ?", reader.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	// 10: ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", reader.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	// 11: ค้นหา Genre ด้วย id
	if tx := entity.DB().Where("id = ?", reader.GenreID).First(&genre); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "genre coin not found"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(reader.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}
	// การ validate
	if _, err := govalidator.ValidateStruct(reader); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 12: สร้าง Fiction
	ft := entity.Reader{
		Email:         reader.Email,    // ตั้งค่าฟิลด์ Fiction_Name
		Name:          reader.Name,     //ตั้งค่าฟิลด์ Fiction_Description
		Nickname:      reader.Nickname, //ตั้งค่าฟิลด์ Fiction_Story
		ReaderCoin:    reader.ReaderCoin,
		Date_of_Birth: reader.Date_of_Birth, // ตั้งค่าฟิลด์ Fiction_Date
		Password:      string(hashPassword), // ตั้งค่าฟิลด์ Fiction_Date
		Prefix:        prefix,               // โยงความสัมพันธ์กับ Entity Genre
		Gender:        gender,               // โยงความสัมพันธ์กับ Entity RatingFiction
		Genre:         genre,                // โยงความสัมพันธ์กับ Entity RatingFiction
	}

	// 13: บันทึก
	if err := entity.DB().Create(&ft).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": ft})
}

// PATCH /readers
func UpdateReader(c *gin.Context) {
	var reader entity.Reader
	var prefix entity.Prefix
	var gender entity.Gender
	var genre entity.Genre

	if err := c.ShouldBindJSON(&reader); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var newEmail = reader.Email // ตั้งค่าฟิลด์ Fiction_Name
	var newName = reader.Name   //ตั้งค่าฟิลด์ Fiction_Description
	var newNickname = reader.Nickname
	var newDate_of_Birth = reader.Date_of_Birth
	var newReaderCoin = reader.ReaderCoin

	if tx := entity.DB().Where("id = ?", reader.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", reader.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", reader.GenreID).First(&genre); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "genre not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", reader.ID).First(&reader); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader not found"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(reader.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	update_reader := entity.Reader{
		Model:         gorm.Model{ID: reader.ID},
		Prefix:        prefix,
		Name:          newName,
		Nickname:      newNickname,
		ReaderCoin:    newReaderCoin,
		Gender:        gender,
		Date_of_Birth: newDate_of_Birth,
		Email:         newEmail,
		Password:      string(hashPassword),
	}
	// การ validate
	if _, err := govalidator.ValidateStruct(update_reader); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !(reader.Password[0:6] == "$2a$14$") {
		hashPassword, err := bcrypt.GenerateFromPassword([]byte(reader.Password), 14)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
			return

		}
		update_reader.Password = string(hashPassword)
	}

	if err := entity.DB().Save(&update_reader).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_reader})
}

// DELETE /readers/:id
func DeleteReader(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM readers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
