package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--writercoin--
func CreateWriterCoin(c *gin.Context) {
	var writercoin entity.WriterCoin
	if err := c.ShouldBindJSON(&writercoin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&writercoin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": writercoin})
}

//GET--writercoin id--

func GetWriterCoin(c *gin.Context) {
	var writercoin entity.WriterCoin
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM writercoins WHERE id = ?", id).Scan(&writercoin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": writercoin})
}

// GET--writercoins--
func ListWriterCoins(c *gin.Context) {
	var writercoins []entity.WriterCoin
	if err := entity.DB().Raw("SELECT * FROM readercoins").Scan(&writercoins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": writercoins})
}

// DELETE--writercoin id--
func DeleteWriterCoin(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM writercoins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "writercoin not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--writercoin--
func UpdateWriterCoin(c *gin.Context) {
	var writercoin entity.WriterCoin
	if err := c.ShouldBindJSON(&writercoin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", writercoin.ID).First(&writercoin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "readercoin not found"})
		return
	}

	if err := entity.DB().Save(&writercoin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": writercoin})
}

//75
