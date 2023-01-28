package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--problem_system--
func CreateProblem_system(c *gin.Context) {
	var problem_system entity.Problem_system
	if err := c.ShouldBindJSON(&problem_system); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&problem_system).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": problem_system})
}

//GET--problem_system id--

func GetProblem_system(c *gin.Context) {
	var problem_system entity.Problem_system
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM problem_systems WHERE id = ?", id).Scan(&problem_system).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": problem_system})
}

// GET--problem_systems--
func ListProblem_systems(c *gin.Context) {
	var problem_systems []entity.Problem_system
	if err := entity.DB().Raw("SELECT * FROM problem_systems").Scan(&problem_systems).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": problem_systems})
}

// DELETE--problem_system id--
func DeleteProblem_system(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM problem_systems WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "problem_system not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--problem_system--
func UpdateProblem_system(c *gin.Context) {
	var problem_system entity.Problem_system
	if err := c.ShouldBindJSON(&problem_system); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", problem_system.ID).First(&problem_system); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "problem_system not found"})
		return
	}

	if err := entity.DB().Save(&problem_system).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": problem_system})
}

//75
