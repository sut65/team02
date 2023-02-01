package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--rating_fiction--
func CreateRatingFiction(c *gin.Context) {
	var rating_fiction entity.RatingFiction
	if err := c.ShouldBindJSON(&rating_fiction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&rating_fiction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": rating_fiction})
}

//GET--rating_fiction id--

func GetRatingFiction(c *gin.Context) {
	var rating_fiction entity.RatingFiction
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM rating_fictions WHERE id = ?", id).Scan(&rating_fiction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": rating_fiction})
}

// GET--rating_fictions--

func ListRatingFictions(c *gin.Context) {
	var rating_fictions []entity.RatingFiction
	if err := entity.DB().Raw("SELECT * FROM rating_fictions").Scan(&rating_fictions).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": rating_fictions})
}

// DELETE--rating_fiction id--

func DeleteRatingFiction(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM rating_fictions WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rating_fiction not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--rating_fiction--

func UpdateRatingFiction(c *gin.Context) {
	var rating_fiction entity.RatingFiction
	if err := c.ShouldBindJSON(&rating_fiction); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", rating_fiction.ID).First(&rating_fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "genre not found"})
		return
	}

	if err := entity.DB().Save(&rating_fiction).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": rating_fiction})
}

//82
