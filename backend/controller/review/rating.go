package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST /rating
func CreateRating(c *gin.Context) {
	var rating entity.Rating
	if err := c.ShouldBindJSON(&rating); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&rating).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rating})
}

// GET /rating/:id
func GetRating(c *gin.Context) {
	var rating entity.Rating
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM ratings WHERE id = ?", id).Scan(&rating).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": rating})
}

// GET /ratings
func ListRatings(c *gin.Context) {
	var ratings []entity.Rating
	if err := entity.DB().Raw("SELECT * FROM ratings").Scan(&ratings).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": ratings})
}

// DELETE /ratings/:id
func DeleteRating(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM ratings WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rating not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /ratings
func UpdateRating(c *gin.Context) {
	var rating entity.Rating
	if err := c.ShouldBindJSON(&rating); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", rating.ID).First(&rating); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rating not found"})
		return
	}

	if err := entity.DB().Save(&rating).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": rating})
}
