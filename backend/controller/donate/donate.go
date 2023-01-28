package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--donate--
func CreateDonate(c *gin.Context) {
	var donate entity.Donate
	if err := c.ShouldBindJSON(&donate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&donate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": donate})
}

//GET--donate id--

func GetDonate(c *gin.Context) {
	var donate entity.Donate
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM donates WHERE id = ?", id).Scan(&donate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": donate})
}

// GET--Donate--
func ListDonates(c *gin.Context) {
	var donates []entity.Donate
	if err := entity.DB().Raw("SELECT * FROM donates").Scan(&donates).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": donates})
}

// DELETE--donate id--
func DeleteDonate(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM donates WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "donate not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--donate--
func UpdateDonate(c *gin.Context) {
	var donate entity.Donate
	if err := c.ShouldBindJSON(&donate); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", donate.ID).First(&donate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "donate not found"})
		return
	}

	if err := entity.DB().Save(&donate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": donate})
}

//75
