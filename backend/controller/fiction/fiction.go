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
	var rating_fiction entity.RatingFiction

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

	// 11: ค้นหา rating_fiction ด้วย id
	if tx := entity.DB().Where("id = ?", fiction.RatingFictionID).First(&rating_fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type not found"})
		return
	}
	// 12: สร้าง Fiction
	ft := entity.Fiction{
		Fiction_Name:        fiction.Fiction_Name,        // ตั้งค่าฟิลด์ Fiction_Name
		Fiction_Description: fiction.Fiction_Description, //ตั้งค่าฟิลด์ Fiction_Description
		Fiction_Date:        fiction.Fiction_Date,        // ตั้งค่าฟิลด์ Fiction_Date
		Writer:              writer,                      // โยงความสัมพันธ์กับ Entity Writer
		Genre:               genre,                       // โยงความสัมพันธ์กับ Entity Genre
		RatingFiction:       rating_fiction,              // โยงความสัมพันธ์กับ Entity RatingFiction
	}

	// 13: บันทึก
	if err := entity.DB().Create(&ft).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": ft})
}

// GET--fiction id--
func GetFiction(c *gin.Context) {
	var fiction entity.Fiction
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": fiction})
}

// GET--fictions--
func ListFictions(c *gin.Context) {
	var fictions []entity.Fiction
	if err := entity.DB().Preload("Writer").Preload("Genre").Preload("RatingFiction").Raw("SELECT * FROM fictions").Find(&fictions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": fictions})
}

// DELETE--fiction id--
func DeleteFiction(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM fictions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--fictions--
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

//111