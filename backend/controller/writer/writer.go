package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// POST /writers

func CreateWriter(c *gin.Context) {

	var writer entity.Writer
	var prefix entity.Prefix
	var gender entity.Gender
	var affiliation entity.Affiliation

	if err := c.ShouldBindJSON(&writer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา prefix ด้วย id
	if tx := entity.DB().Where("id = ?", writer.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกคำนำหน้า"})
		return
	}
	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", writer.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกเพศ"})
		return
	}
	// ค้นหา affiliation ด้วย id
	if tx := entity.DB().Where("id = ?", writer.AffiliationID).First(&affiliation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกต้นสังกัด"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(writer.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	// 14: สร้าง  writer
	wrt := entity.Writer{
		Prefix:          prefix,
		Name:            writer.Name,
		Gender:          gender,
		Writer_birthday: writer.Writer_birthday,
		Affiliation:     affiliation,
		Pseudonym:       writer.Pseudonym,
		Email:           writer.Email,
		Password:        string(hashPassword),
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(writer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13: บันทึก
	if err := entity.DB().Create(&wrt).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": wrt})

}

// GET /writer/:id
func GetWriter(c *gin.Context) {
	var writer entity.Writer
	id := c.Param("id")
	if tx := entity.DB().Preload("Prefix").Preload("Gender").Preload("Affiliation").Raw("SELECT * FROM writers WHERE id = ?", id).Find(&writer).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "writer not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": writer})
}

// GET /writer
func ListWriters(c *gin.Context) {
	var writers []entity.Writer

	if err := entity.DB().Preload("Prefix").Preload("Gender").Preload("Affiliation").Raw("SELECT * FROM writers").Find(&writers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": writers})
}

func UpdateWriter(c *gin.Context) {
	var writer entity.Writer
	var prefix entity.Prefix
	var gender entity.Gender
	var affiliation entity.Affiliation

	if err := c.ShouldBindJSON(&writer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", writer.PrefixID).First(&prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกคำนำหน้า"})
		return
	}

	if tx := entity.DB().Where("id = ?", writer.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกเพศ"})
		return
	}

	if tx := entity.DB().Where("id = ?", writer.AffiliationID).First(&affiliation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "กรุณาเลือกต้นสังกัด"})
		return
	}

	update_writer := entity.Writer{
		Model:           gorm.Model{ID: writer.ID},
		Prefix:          prefix,
		Name:            writer.Name,
		Gender:          gender,
		Writer_birthday: writer.Writer_birthday,
		Affiliation:     affiliation,
		Pseudonym:       writer.Pseudonym,
		Email:           writer.Email,
		Password:        writer.Password,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(update_writer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if !(writer.Password[0:6] == "$2a$14$") {
		hashPassword, err := bcrypt.GenerateFromPassword([]byte(writer.Password), 14)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
			return

		}
		update_writer.Password = string(hashPassword)
	}

	if tx := entity.DB().Where("id = ?", writer.ID).Updates(&update_writer).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": tx.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_writer})

}
func DeleteWriter(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM writers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "writers not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}
