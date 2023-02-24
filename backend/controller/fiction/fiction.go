package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
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
		c.JSON(http.StatusBadRequest, gin.H{"error": "ratingfiction not found"})
		return
	}
	// 12: สร้าง Fiction
	ft := entity.Fiction{
		Fiction_Name:        fiction.Fiction_Name,        // ตั้งค่าฟิลด์ Fiction_Name
		Fiction_Description: fiction.Fiction_Description, //ตั้งค่าฟิลด์ Fiction_Description
		Fiction_Story:       fiction.Fiction_Story,       //ตั้งค่าฟิลด์ Fiction_Story
		Fiction_Date:        fiction.Fiction_Date,        // ตั้งค่าฟิลด์ Fiction_Date
		Writer:              writer,                      // โยงความสัมพันธ์กับ Entity Writer
		Genre:               genre,                       // โยงความสัมพันธ์กับ Entity Genre
		RatingFiction:       rating_fiction,              // โยงความสัมพันธ์กับ Entity RatingFiction
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(fiction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
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
	if tx := entity.DB().Preload("Writer").Preload("Genre").Preload("RatingFiction").Raw("SELECT * FROM fictions WHERE id = ?", id).Find(&fiction).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": fiction})
}

func GetFictionStory(c *gin.Context) {
	var fiction entity.Fiction
	id := c.Param("id")
	if err := entity.DB().Preload("Writer").Raw("SELECT writer_id, fiction_name, fiction_story FROM fictions WHERE id = ?", id).Find(&fiction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "story not found"})
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

func GetFictionByWID(c *gin.Context) {
	var fiction []entity.Fiction
	id := c.Param("id")
	if err := entity.DB().Preload("Writer").Preload("Genre").Preload("RatingFiction").Raw("SELECT * FROM fictions WHERE writer_id = ?", id).Find(&fiction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": fiction})

}

// DELETE--fiction id--
func DeleteFiction(c *gin.Context) {
	id := c.Param("id")

	// DELETE review เมื่อมีการ ลบ fiction
	if err := entity.DB().Exec("DELETE FROM reviews WHERE fiction_id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// DELETE report_fiction เมื่อมีการ ลบ fiction
	if err := entity.DB().Exec("DELETE FROM report_fictions WHERE fiction_id = ?", id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	//ลบตกปิ
	if tx := entity.DB().Exec("DELETE FROM fictions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--fictions--
func UpdateFiction(c *gin.Context) {

	var fiction entity.Fiction
	var writer entity.Writer
	var genre entity.Genre
	var rating_fiction entity.RatingFiction

	if err := c.ShouldBindJSON(&fiction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var newFiction_Name = fiction.Fiction_Name
	var newFiction_Description = fiction.Fiction_Description
	var newFiction_Story = fiction.Fiction_Story
	var newFiction_Date = fiction.Fiction_Date

	if tx := entity.DB().Where("id = ?", fiction.GenreID).First(&genre); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "genre not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", fiction.RatingFictionID).First(&rating_fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ratingfiction not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", fiction.WriterID).First(&writer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "writer not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", fiction.ID).First(&fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}

	update_fiction := entity.Fiction{
		Model:               gorm.Model{ID: fiction.ID},
		Fiction_Name:        newFiction_Name,
		Fiction_Description: newFiction_Description,
		Fiction_Story:       newFiction_Story,
		Fiction_Date:        newFiction_Date,
		Writer:              writer,
		Genre:               genre,
		RatingFiction:       rating_fiction,
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(update_fiction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Save(&update_fiction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update_fiction})
}

//111
