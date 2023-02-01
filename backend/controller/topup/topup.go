package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--topup--
func CreateTopUp(c *gin.Context) {
	var top_up entity.TopUp
	if err := c.ShouldBindJSON(&top_up); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&top_up).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": top_up})
}

//GET--topup id--

func GetTopUp(c *gin.Context) {
	var top_up entity.TopUp
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM top_ups WHERE id = ?", id).Scan(&top_up).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": top_up})
}

// GET--topups--
func ListTopUps(c *gin.Context) {
	var top_ups []entity.TopUp
	if err := entity.DB().Raw("SELECT * FROM top_ups").Scan(&top_ups).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": top_ups})
}

// DELETE--topup id--
func DeleteTopUp(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM top_ups WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "top_up not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--topup--
func UpdateTopUp(c *gin.Context) {
	var top_up entity.TopUp
	if err := c.ShouldBindJSON(&top_up); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", top_up.ID).First(&top_up); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "top_up not found"})
		return
	}

	if err := entity.DB().Save(&top_up).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": top_up})
}

//75
