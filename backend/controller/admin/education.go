package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--education--
func CreateEducation(c *gin.Context) {
	var education entity.Education
	if err := c.ShouldBindJSON(&education); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&education).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": education})
}

//GET--education id--

func GetEducation(c *gin.Context) {
	var education entity.Education
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM educations WHERE id = ?", id).Scan(&education).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": education})
}

// GET--educations--
func ListEducations(c *gin.Context) {
	var educations []entity.Education
	if err := entity.DB().Raw("SELECT * FROM educations").Find(&educations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": educations})
}

// DELETE--education id--
func DeleteEducation(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM educations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "education not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--education--
func UpdateEducation(c *gin.Context) {
	var education entity.Education
	if err := c.ShouldBindJSON(&education); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", education.ID).First(&education); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "education not found"})
		return
	}

	if err := entity.DB().Save(&education).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": education})
}
