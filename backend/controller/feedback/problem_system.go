package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--problem_system--

func CreateProblemSystem(c *gin.Context) {
	var problem_system entity.ProblemSystem
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

func GetProblemSystem(c *gin.Context) {
	var problem_system entity.ProblemSystem
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM problem_systems WHERE id = ?", id).Scan(&problem_system).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": problem_system})
}

// GET--problem_systems--

func ListProblemSystems(c *gin.Context) {
	var problem_systems []entity.ProblemSystem
	if err := entity.DB().Raw("SELECT * FROM problem_systems").Scan(&problem_systems).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": problem_systems})
}

// DELETE--problem_system id--

func DeleteProblemSystem(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM problem_systems WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "problem_system not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--problem_system--

func UpdateProblemSystem(c *gin.Context) {
	var problem_system entity.ProblemSystem
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

//79
