package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST /fictions
func CreateFiction(c *gin.Context) {

	var fiction entity.Fiction
	var writer entity.Writer
	var genre entity.Genre
	var t_type entity.Type

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร fiction
	if err := c.ShouldBindJSON(&fiction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา writer ด้วย id
	if tx := entity.DB().Where("id = ?", fiction.WriterID).First(&writer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "writer not found"})
		return
	}

	// 10: ค้นหา genre ด้วย id
	if tx := entity.DB().Where("id = ?", fiction.GenreID).First(&genre); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "genre not found"})
		return
	}

	// 11: ค้นหา type ด้วย id
	if tx := entity.DB().Where("id = ?", fiction.TypeID).First(&t_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type not found"})
		return
	}
	// 12: สร้าง Fiction
	wv := entity.Fiction{
		F_name:        fiction.F_name,        // ตั้งค่าฟิลด์ Product_name
		F_Description: fiction.F_Description, //ตั้งค่าฟิลด์ Product_price
		F_File:        fiction.F_File,        // โยงความสัมพันธ์กับ Entity Typeproduct
		F_Date:        fiction.F_Date,
		Writer:        writer, // โยงความสัมพันธ์กับ Entity Typeproduct
		Genre:         genre,  // โยงความสัมพันธ์กับ Entity Employee
		Type:          t_type,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": wv})
}

// GET /fiction/:id
func GetFiction(c *gin.Context) {
	var fiction entity.Fiction
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": fiction})
}

// GET /fictions
func ListFictions(c *gin.Context) {
	var fictions []entity.Fiction
	if err := entity.DB().Preload("Writer").Preload("Genre").Preload("Type").Raw("SELECT * FROM fictions").Find(&fictions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": fictions})
}

// DELETE fictions/:id
func DeleteFiction(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM fictions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /fictions
func UpdateFiction(c *gin.Context) {
	var fiction entity.Fiction
	if err := c.ShouldBindJSON(&fiction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", fiction.ID).First(&fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}

	if err := entity.DB().Save(&fiction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": fiction})
}
