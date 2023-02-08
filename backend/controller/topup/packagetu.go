package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--package_top_up--
func CreatePackageTopUp(c *gin.Context) {
	var package_top_up entity.PackageTopUp
	if err := c.ShouldBindJSON(&package_top_up); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&package_top_up).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": package_top_up})
}

//GET--package_top_up id--

func GetPackageTopUp(c *gin.Context) {
	var package_top_up entity.PackageTopUp
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM package_top_ups WHERE id = ?", id).Scan(&package_top_up).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": package_top_up})
}

// GET--package_top_up--
func ListPackageTopUps(c *gin.Context) {
	var package_top_ups []entity.PackageTopUp
	if err := entity.DB().Raw("SELECT * FROM package_top_ups").Scan(&package_top_ups).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": package_top_ups})
}

// DELETE--package_top_up id--
func DeletePackageTopUp(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM package_top_ups WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "package_top_up not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--package_top_up--
func UpdatePackageTopUp(c *gin.Context) {
	var package_top_up entity.PackageTopUp
	if err := c.ShouldBindJSON(&package_top_up); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", package_top_up.ID).First(&package_top_up); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "package_top_up not found"})
		return
	}

	if err := entity.DB().Save(&package_top_up).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": package_top_up})
}

//75
