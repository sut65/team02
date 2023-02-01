package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--readercoin--
func CreateReaderCoin(c *gin.Context) {
	var reader_coin entity.ReaderCoin
	if err := c.ShouldBindJSON(&reader_coin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&reader_coin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reader_coin})
}

//GET--readercoin id--

func GetReaderCoin(c *gin.Context) {
	var reader_coin entity.ReaderCoin
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM reader_coins WHERE id = ?", id).Scan(&reader_coin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reader_coin})
}

// GET--readercoins--
func ListReaderCoins(c *gin.Context) {
	var reader_coins []entity.ReaderCoin
	if err := entity.DB().Raw("SELECT * FROM reader_coins").Scan(&reader_coins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reader_coins})
}

// DELETE--readercoin id--
func DeleteReaderCoin(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM reader_coins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader_coin not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--readercoin--
func UpdateReaderCoin(c *gin.Context) {
	var reader_coin entity.ReaderCoin
	if err := c.ShouldBindJSON(&reader_coin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", reader_coin.ID).First(&reader_coin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader_coin not found"})
		return
	}

	if err := entity.DB().Save(&reader_coin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": reader_coin})
}

//75
