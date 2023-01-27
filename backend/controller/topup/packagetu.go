package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--package--
func CreatePackageTU(c *gin.Context) {
	var packagetu entity.PackageTU
	if err := c.ShouldBindJSON(&packagetu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&packagetu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": packagetu})
}

//GET--packagetu id--

func GetPackageTU(c *gin.Context) {
	var packagetu entity.PackageTU
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM packagetus WHERE id = ?", id).Scan(&packagetu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": packagetu})
}

// GET--packagetus--
func ListPackageTUs(c *gin.Context) {
	var packagetus []entity.PackageTU
	if err := entity.DB().Raw("SELECT * FROM packagetus").Scan(&packagetus).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": packagetus})
}

// DELETE--packagetu id--
func DeletePackageTU(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM packagetus WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "packagetu not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--packagetu--
func UpdatePackageTU(c *gin.Context) {
	var packagetu entity.PackageTU
	if err := c.ShouldBindJSON(&packagetu); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", packagetu.ID).First(&packagetu); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "packagetu not found"})
		return
	}

	if err := entity.DB().Save(&packagetu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": packagetu})
}

//75
