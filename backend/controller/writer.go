package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// GET /writers
// List all writers
func ListWriters(c *gin.Context) {
	var writers []entity.Writer
	if err := entity.DB().Raw("SELECT * FROM writers").Scan(&writers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": writers})
}

// GET /writer/:id
// Get writer by id
func GetWriter(c *gin.Context) {
	var writer entity.Writer
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM writers WHERE id = ?", id).Scan(&writer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": writer})
}

// POST /writers
func CreateWriter(c *gin.Context) {
	var writer entity.Writer
	if err := c.ShouldBindJSON(&writer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่นักเขียนกรอกก่อนบันทึกลงฐานข้อมูล
	bytes, err := bcrypt.GenerateFromPassword([]byte(writer.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}
	writer.Password = string(bytes)

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(writer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&writer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": writer})
}

// PATCH /writers
func UpdateWriter(c *gin.Context) {
	var writer entity.Writer
	if err := c.ShouldBindJSON(&writer); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", writer.ID).First(&writer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "writer not found"})
		return
	}

	if err := entity.DB().Save(&writer).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": writer})
}

// DELETE /writers/:id
func DeleteWriter(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM writers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "writer not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
