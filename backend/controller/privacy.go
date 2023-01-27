package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--privacy--
func CreatePrivacy(c *gin.Context) {
	var privacy entity.Privacy
	if err := c.ShouldBindJSON(&privacy); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&privacy).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": privacy})
}

//GET--privacy id--

func GetPrivacy(c *gin.Context) {
	var privacy entity.Privacy
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM privacys WHERE id = ?", id).Scan(&privacy).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": privacy})
}

// GET--privacys--
func ListPrivacys(c *gin.Context) {
	var privacys []entity.Privacy
	if err := entity.DB().Raw("SELECT * FROM privacys").Scan(&privacys).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": privacys})
}

// DELETE--privacy id--
func DeletePrivacy(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM privacys WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "privacy not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--privacy--
func UpdatePrivacy(c *gin.Context) {
	var privacy entity.Privacy
	if err := c.ShouldBindJSON(&privacy); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", privacy.ID).First(&privacy); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "privacy not found"})
		return
	}

	if err := entity.DB().Save(&privacy).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": privacy})
}

//75
