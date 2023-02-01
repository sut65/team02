package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST /genres
func CreateGenre(c *gin.Context) {
	var genre entity.Genre
	if err := c.ShouldBindJSON(&genre); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&genre).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": genre})
}

// GET /genre/:id
func GetGenre(c *gin.Context) {
	var genre entity.Genre
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM genres WHERE id = ?", id).Scan(&genre).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": genre})
}

// GET /genres
func ListGenres(c *gin.Context) {
	var genres []entity.Genre
	if err := entity.DB().Raw("SELECT * FROM genres").Scan(&genres).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": genres})
}

// DELETE /genres/:id
func DeleteGenre(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM genres WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "genre not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /genres
func UpdateGenre(c *gin.Context) {
	var genre entity.Genre
	if err := c.ShouldBindJSON(&genre); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", genre.ID).First(&genre); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "genre not found"})
		return
	}

	if err := entity.DB().Save(&genre).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": genre})
}

//78
