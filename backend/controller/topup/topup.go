package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--topup--
func CreateTopUp(c *gin.Context) {
	var topup entity.TopUp
	if err := c.ShouldBindJSON(&topup); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&topup).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": topup})
}

//GET--topup id--

func GetTopUp(c *gin.Context) {
	var topup entity.TopUp
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM readercoins WHERE id = ?", id).Scan(&topup).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": topup})
}

// GET--topups--
func ListTopUps(c *gin.Context) {
	var topups []entity.TopUp
	if err := entity.DB().Raw("SELECT * FROM topups").Scan(&topups).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": topups})
}

// DELETE--topup id--
func DeleteTopUp(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM topups WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "topup not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--topup--
func UpdateTopUp(c *gin.Context) {
	var topup entity.TopUp
	if err := c.ShouldBindJSON(&topup); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", topup.ID).First(&topup); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "topup not found"})
		return
	}

	if err := entity.DB().Save(&topup).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": topup})
}

//75
