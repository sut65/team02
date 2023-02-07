package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST--feedback--
func CreateFeedback(c *gin.Context) {

	var feedback entity.Feedback
	var reader entity.Reader
	var priority entity.Priority
	var problem_system entity.ProblemSystem

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร feedback
	if err := c.ShouldBindJSON(&feedback); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา reader ด้วย id
	if tx := entity.DB().Where("id = ?", feedback.ReaderID).First(&reader); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader not found"})
		return
	}

	// 10: ค้นหา priority ด้วย id
	if tx := entity.DB().Where("id = ?", feedback.PriorityID).First(&priority); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "priority not found"})
		return
	}

	// 11: ค้นหา problem_system ด้วย id
	if tx := entity.DB().Where("id = ?", feedback.ProblemSystemID).First(&problem_system); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "problem_system not found"})
		return
	}
	// 12: สร้าง Feedback
	fb := entity.Feedback{
		Reader:           reader,                    // โยงความสัมพันธ์กับ Entity Reader
		Telephone_Number: feedback.Telephone_Number, // ตั้งค่าฟิลด์ Telephone_Number
		ProblemSystem:    problem_system,            // โยงความสัมพันธ์กับ Entity ProblemSystem
		Priority:         priority,                  // โยงความสัมพันธ์กับ Entity Priority
		FeedbackDetail:   feedback.FeedbackDetail,   // ตั้งค่าฟิลด์ FeedbackDetail
	}

	// 13: บันทึก
	if err := entity.DB().Create(&fb).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": fb})
}

// GET--feedback id--

func GetFeedback(c *gin.Context) {
	var feedback entity.Feedback
	id := c.Param("id")
	if tx := entity.DB().Preload("Reader").Preload("ProblemSystem").Preload("Priority").Raw("SELECT * FROM feedbacks WHERE id = ?", id).Find(&feedback).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "review not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": feedback})
}

// GET--feedbacks--

func ListFeedbacks(c *gin.Context) {
	var feedbacks []entity.Feedback
	if err := entity.DB().Preload("Reader").Preload("ProblemSystem").Preload("Priority").Raw("SELECT * FROM feedbacks").Find(&feedbacks).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": feedbacks})
}

// DELETE--feedback id--

func DeleteFeedback(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM feedbacks WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "feedback not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

func GetFeedbackByFBID(c *gin.Context) {
	var feedback []entity.Feedback
	id := c.Param("id")
	if err := entity.DB().Preload("Reader").Preload("ProblemSystem").Preload("Priority").Raw("SELECT * FROM feedbacks WHERE reader_id = ?", id).Find(&feedback).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": feedback})

} //ไว้ให้เพื่อนดึง

// PATCH--feedback--

func UpdateFeedback(c *gin.Context) {

	var feedback entity.Feedback
	var reader entity.Reader
	var priority entity.Priority
	var problem_system entity.ProblemSystem

	if err := c.ShouldBindJSON(&feedback); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var newTelephone_Number = feedback.Telephone_Number
	var newFeedbackDetail = feedback.FeedbackDetail

	if tx := entity.DB().Where("id = ?", feedback.ProblemSystemID).First(&problem_system); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", feedback.PriorityID).First(&priority); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rating not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", feedback.ReaderID).First(&reader); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", feedback.ID).First(&feedback); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "feedback not found"})
		return
	}

	update_feedback := entity.Feedback{
		Model:            gorm.Model{ID: feedback.ID},
		Reader:           reader,              // โยงความสัมพันธ์กับ Entity Reader
		Telephone_Number: newTelephone_Number, // ตั้งค่าฟิลด์ Telephone_Number
		ProblemSystem:    problem_system,      // โยงความสัมพันธ์กับ Entity ProblemSystem
		Priority:         priority,            // โยงความสัมพันธ์กับ Entity Priority
		FeedbackDetail:   newFeedbackDetail,   // ตั้งค่าฟิลด์ FeedbackDetail

	}

	if err := entity.DB().Save(&update_feedback).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update_feedback})
}

// func GetFeedbackByReaderID(c *gin.Context) {
// 	var feedback []entity.Feedback
// 	id := c.Param("id")
// 	if err := entity.DB().Preload("Reader").Preload("ProblemSystem").Preload("Priority").Raw("SELECT * FROM feedbacks WHERE reader_id = ?", id).Find(&feedback).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": feedback})
// }

//114
