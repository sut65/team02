package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"

	//"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// GET /admins
// List all admins
func ListAdmins(c *gin.Context) {
	var admins []entity.Admin
	if err := entity.DB().Preload("Education").Preload("Gender").Preload("Role").Raw("SELECT * FROM admins").Find(&admins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": admins})
}

// GET /admin/:id
// Get admin by id
func GetAdmin(c *gin.Context) {
	var admin entity.Admin
	id := c.Param("id")
	if tx := entity.DB().Preload("Education").Preload("Gender").Preload("Role").Raw("SELECT * FROM admins WHERE id = ?", id).Find(&admin).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": admin})
}

// POST /admins
func CreateAdmin(c *gin.Context) {
	var admin entity.Admin
	var gender entity.Gender
	var education entity.Education
	var role entity.Role

	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", admin.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}
	// ค้นหา education ด้วย id
	if tx := entity.DB().Where("id = ?", admin.EducationID).First(&education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "education not found"})
		return
	}
	// ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", admin.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(admin.Admin_password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 14: สร้าง  writer
	adm := entity.Admin{
		Admin_firstname:     admin.Admin_firstname,
		Admin_lastname:      admin.Admin_lastname,
		Gender:              gender,
		Education:           education,
		Role:                role,
		Admin_email:         admin.Admin_email,
		Admin_password:      string(hashPassword),
		Admin_tel:           admin.Admin_tel,
		Admin_date_register: admin.Admin_date_register,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&adm).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": adm})

}

// PATCH /admins
func UpdateAdmin(c *gin.Context) {
	var admin entity.Admin
	var education entity.Education
	var gender entity.Gender
	var role entity.Role

	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var newAdmin_firstname = admin.Admin_firstname
	var newAdmin_lastname = admin.Admin_lastname
	var newAdmin_email = admin.Admin_email
	var newAdmin_tel = admin.Admin_tel
	if tx := entity.DB().Where("id = ?", admin.EducationID).First(&education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "education not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", admin.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "gender not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", admin.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", admin.ID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(admin.Admin_password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	update_admin := entity.Admin{
		Model:               gorm.Model{ID: admin.ID},
		Admin_firstname:     newAdmin_firstname,
		Admin_lastname:      newAdmin_lastname,
		Gender:              gender,
		Education:           education,
		Role:                role,
		Admin_email:         newAdmin_email,
		Admin_password:      string(hashPassword),
		Admin_tel:           newAdmin_tel,
		Admin_date_register: admin.Admin_date_register,
	}
	//Check if password field is not empty(update password)
	//if empty it just skip generate hash
	if admin.Admin_password != "" {
		hashPassword, err := bcrypt.GenerateFromPassword([]byte(admin.Admin_password), 14)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
			return

		}
		admin.Admin_password = string(hashPassword)
	}

	if err := entity.DB().Save(&update_admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_admin})

}

// DELETE /admins/:id
func DeleteAdmin(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM admins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admins not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})

}
