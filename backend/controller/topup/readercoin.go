package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--readercoin--
func CreateReaderCoin(c *gin.Context) {
	var readercoin entity.ReaderCoin
	if err := c.ShouldBindJSON(&readercoin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&readercoin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": readercoin})
}

//GET--readercoin id--

func GetReaderCoin(c *gin.Context) {
	var readercoin entity.ReaderCoin
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM readercoins WHERE id = ?", id).Scan(&readercoin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": readercoin})
}

// GET--readercoins--
func ListReaderCoins(c *gin.Context) {
	var readercoins []entity.ReaderCoin
	if err := entity.DB().Raw("SELECT * FROM readercoins").Scan(&readercoins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": readercoins})
}

// DELETE--readercoin id--
func DeleteReaderCoin(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM readercoins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "readercoin not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--readercoin--
func UpdateReaderCoin(c *gin.Context) {
	var readercoin entity.ReaderCoin
	if err := c.ShouldBindJSON(&readercoin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", readercoin.ID).First(&readercoin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "readercoin not found"})
		return
	}

	if err := entity.DB().Save(&readercoin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": readercoin})
}

//75
