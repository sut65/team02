package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--collection--
func CreateCollection(c *gin.Context) {
	var collection entity.Collection
	if err := c.ShouldBindJSON(&collection); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&collection).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": collection})
}

//GET--collection id--

func GetCollection(c *gin.Context) {
	var collection entity.Collection
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM collections WHERE id = ?", id).Scan(&collection).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": collection})
}

// GET--collections--
func ListCollections(c *gin.Context) {
	var collections []entity.Collection
	if err := entity.DB().Raw("SELECT * FROM collections").Scan(&collections).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": collections})
}

// DELETE--collection id--
func DeleteCollection(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM collections WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "collection not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--collection--
func UpdateCollection(c *gin.Context) {
	var collection entity.Collection
	if err := c.ShouldBindJSON(&collection); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", collection.ID).First(&collection); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "collection not found"})
		return
	}

	if err := entity.DB().Save(&collection).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": collection})
}

//75
