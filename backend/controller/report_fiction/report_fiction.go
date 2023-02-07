package controller

import (
	"net/http"
	"time"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST report_fictions
func CreateReportFiction(c *gin.Context) {

	var report_fiction entity.ReportFiction
	var fiction entity.Fiction
	var problem_fiction entity.ProblemFiction
	var reader entity.Reader

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร report_fiction
	if err := c.ShouldBindJSON(&report_fiction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา fiction ด้วย id
	if tx := entity.DB().Where("id = ?", report_fiction.FictionID).First(&fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}

	// 10: ค้นหา problem_fiction ด้วย id
	if tx := entity.DB().Where("id = ?", report_fiction.ProblemFictionID).First(&problem_fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "problem_fiction not found"})
		return
	}

	// 11: ค้นหา reader ด้วย id
	if tx := entity.DB().Where("id = ?", report_fiction.ReaderID).First(&reader); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader not found"})
		return
	}
	// 12: สร้าง Review
	wv := entity.ReportFiction{
		Timestamp:            time.Now(),
		Fiction:              fiction,
		ProblemFiction:       problem_fiction,
		ProblemFictionDetail: report_fiction.ProblemFictionDetail,
		Reader:               reader,
		PhoneNumber:          report_fiction.PhoneNumber,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": wv})
}

// GET /report_fiction/:id
func GetReportFiction(c *gin.Context) {
	var report_fiction entity.ReportFiction
	id := c.Param("id")
	if tx := entity.DB().Preload("Fiction").Preload("ProblemFiction").Preload("Reader").Raw("SELECT * FROM report_fictions WHERE id = ?", id).Find(&report_fiction).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "report fiction not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": report_fiction})
}

// GET /report_fictions
func ListReportFictions(c *gin.Context) {
	var report_fictions []entity.ReportFiction
	if err := entity.DB().Preload("Fiction").Preload("ReportFiction").Preload("Reader").Raw("SELECT * FROM problem_fictions").Find(&report_fictions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": report_fictions})
}

func GetReportFictionByRID(c *gin.Context) {
	var report_fiction []entity.ReportFiction
	id := c.Param("id")
	if err := entity.DB().Preload("Fiction").Preload("ProblemFiction").Preload("Reader").Raw("SELECT * FROM report_fictions WHERE reader_id = ?", id).Find(&report_fiction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": report_fiction})

}

// DELETE report_fictions/:id
func DeleteReportFiction(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM report_fictions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "report fiction not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /report_fictions
func UpdateReportFiction(c *gin.Context) {
	var report_fiction entity.ReportFiction
	var fiction entity.Fiction
	var problem_fiction entity.ProblemFiction
	var reader entity.Reader

	if err := c.ShouldBindJSON(&report_fiction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var newProblemFictionDetail = report_fiction.ProblemFictionDetail
	var newPhoneNumber = report_fiction.PhoneNumber

	if tx := entity.DB().Where("id = ?", report_fiction.FictionID).First(&fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", report_fiction.ProblemFictionID).First(&problem_fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "problem fiction not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", report_fiction.ReaderID).First(&reader); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", report_fiction.ID).First(&report_fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "report fiction not found"})
		return
	}

	update_reportF := entity.ReportFiction{
		Model:                gorm.Model{ID: report_fiction.ID},
		Timestamp:            time.Now(),
		Fiction:              fiction,
		ProblemFiction:       problem_fiction,
		ProblemFictionDetail: newProblemFictionDetail,
		Reader:               reader,
		PhoneNumber:          newPhoneNumber,
	}

	if err := entity.DB().Save(&update_reportF).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update_reportF})

}
