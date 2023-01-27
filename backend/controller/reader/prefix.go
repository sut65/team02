package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST /prefix
func CreatePrefix(c *gin.Context) {
	var prefix entity.Prefix
	if err := c.ShouldBindJSON(&prefix); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&prefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": prefix})
}

// GET /prefix/:id
func GetPrefix(c *gin.Context) {
	var prefix entity.Prefix
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM prefixs WHERE id = ?", id).Scan(&prefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": prefix})
}

// GET /prefix
func ListPrefixs(c *gin.Context) {
	var prefixs []entity.Prefix
	if err := entity.DB().Raw("SELECT * FROM prefixs").Scan(&prefixs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": prefixs})
}

// DELETE /prefixs/:id
func DeletePrefix(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM prefixs WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /prefixs
func UpdatePrefix(c *gin.Context) {
	var prefix entity.Prefix
	if err := c.ShouldBindJSON(&prefix); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", prefix.ID).First(&prefix); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "prefix not found"})
		return
	}

	if err := entity.DB().Save(&prefix).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": prefix})
}
