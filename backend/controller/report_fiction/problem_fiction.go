package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST /problem_fiction
func CreateProblemFiction(c *gin.Context) {
	var problem_fiction entity.ProblemFiction
	if err := c.ShouldBindJSON(&problem_fiction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&problem_fiction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": problem_fiction})
}

// GET /problem_fiction/:id
func GetProblemFiction(c *gin.Context) {
	var problem_fiction entity.ProblemFiction
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM problem_fictions WHERE id = ?", id).Scan(&problem_fiction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": problem_fiction})
}

// GET /problem_fictions
func ListProblemFictions(c *gin.Context) {
	var problem_fictions []entity.ProblemFiction
	if err := entity.DB().Raw("SELECT * FROM problem_fictions").Scan(&problem_fictions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": problem_fictions})
}

// DELETE /problem_fictions/:id
func DeleteProblemFiction(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM problem_fictions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "problem_fiction not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /problem_fictions
func UpdateProblemFiction(c *gin.Context) {
	var problem_fiction entity.ProblemFiction
	if err := c.ShouldBindJSON(&problem_fiction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", problem_fiction.ID).First(&problem_fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "problem_fiction not found"})
		return
	}

	if err := entity.DB().Save(&problem_fiction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": problem_fiction})
}
