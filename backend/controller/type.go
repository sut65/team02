package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST /types
func CreateType(c *gin.Context) {
	var t_type entity.Type
	if err := c.ShouldBindJSON(&t_type); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&t_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": t_type})
}

// GET /type/:id
func GetType(c *gin.Context) {
	var t_type entity.Type
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM types WHERE id = ?", id).Scan(&t_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": t_type})
}

// GET /types
func ListTypes(c *gin.Context) {
	var t_type []entity.Type
	if err := entity.DB().Raw("SELECT * FROM types").Scan(&t_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": t_type})
}

// DELETE /types/:id
func DeleteType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /types
func UpdateType(c *gin.Context) {
	var t_type entity.Type
	if err := c.ShouldBindJSON(&t_type); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", t_type.ID).First(&t_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "type not found"})
		return
	}

	if err := entity.DB().Save(&t_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": t_type})
}
