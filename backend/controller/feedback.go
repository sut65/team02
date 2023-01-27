package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--feedback--
func CreateFeedback(c *gin.Context) {
	var feedback entity.Feedback
	if err := c.ShouldBindJSON(&feedback); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&feedback).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": feedback})
}

//GET--feedback id--

func GetFeedback(c *gin.Context) {
	var feedback entity.Feedback
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM feedbacks WHERE id = ?", id).Scan(&feedback).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": feedback})
}

// GET--feedbacks--
func ListFeedbacks(c *gin.Context) {
	var feedbacks []entity.Feedback
	if err := entity.DB().Raw("SELECT * FROM feedbacks").Scan(&feedbacks).Error; err != nil {
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

// PATCH--feedback--
func UpdateFeedback(c *gin.Context) {
	var feedback entity.Feedback
	if err := c.ShouldBindJSON(&feedback); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", feedback.ID).First(&feedback); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "feedback not found"})
		return
	}

	if err := entity.DB().Save(&feedback).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": feedback})
}

//75
