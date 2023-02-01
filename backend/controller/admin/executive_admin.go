package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--executive_admin--
func CreateExecutiveAdmin(c *gin.Context) {
	var executive_admin entity.ExecutiveAdmin
	if err := c.ShouldBindJSON(&executive_admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&executive_admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": executive_admin})
}

//GET-- executive_admin id--

func GetExecutiveAdmin(c *gin.Context) {
	var executive_admin entity.ExecutiveAdmin
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM executive_admins WHERE id = ?", id).Scan(&executive_admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": executive_admin})
}

// GET--executive_admins--
func ListExecutiveAdmins(c *gin.Context) {
	var executive_admins []entity.ExecutiveAdmin
	if err := entity.DB().Raw("SELECT * FROM executive_admins").Scan(&executive_admins).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": executive_admins})
}

// DELETE--executive_admin id--
func DeleteExecutiveAdmin(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM executive_admins WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "executive_admin not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--executive_admin--
func UpdateExecutiveAdmin(c *gin.Context) {
	var executive_admin entity.ExecutiveAdmin
	if err := c.ShouldBindJSON(&executive_admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", executive_admin.ID).First(&executive_admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "collection not found"})
		return
	}

	if err := entity.DB().Save(&executive_admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": executive_admin})
}
