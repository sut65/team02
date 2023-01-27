package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--coin--
func CreateCoin(c *gin.Context) {
	var coin entity.Coin
	if err := c.ShouldBindJSON(&coin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&coin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": coin})
}

//GET--coin id--

func GetCoin(c *gin.Context) {
	var coin entity.Coin
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM coins WHERE id = ?", id).Scan(&coin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": coin})
}

// GET--coins--
func ListCoins(c *gin.Context) {
	var coins []entity.Coin
	if err := entity.DB().Raw("SELECT * FROM coins").Scan(&coins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": coins})
}

// DELETE--coin id--
func DeleterCoin(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM coins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "coin not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--coin--
func UpdateCoin(c *gin.Context) {
	var coin entity.Coin
	if err := c.ShouldBindJSON(&coin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", coin.ID).First(&coin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "coin not found"})
		return
	}

	if err := entity.DB().Save(&coin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": coin})
}

//75
