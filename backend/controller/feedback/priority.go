package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--priority--
func CreatePriority(c *gin.Context) {
	var priority entity.Priority
	if err := c.ShouldBindJSON(&priority); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&priority).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": priority})
}

//GET--priority id--

func GetPriority(c *gin.Context) {
	var priority entity.Priority
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM priorities WHERE id = ?", id).Scan(&priority).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": priority})
}

// GET--prioritys--
func ListPrioritys(c *gin.Context) {
	var priorities []entity.Priority
	if err := entity.DB().Raw("SELECT * FROM priorities").Scan(&priorities).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": priorities})
}

// DELETE--priority id--
func DeletePriority(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM priorities WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "priority not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--priority--
func UpdatePriority(c *gin.Context) {
	var priority entity.Priority
	if err := c.ShouldBindJSON(&priority); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", priority.ID).First(&priority); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "priority not found"})
		return
	}

	if err := entity.DB().Save(&priority).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": priority})
}

//75
