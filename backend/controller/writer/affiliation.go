package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--affiliation--
func CreateAffiliation(c *gin.Context) {
	var affiliation entity.Affiliation
	if err := c.ShouldBindJSON(&affiliation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&affiliation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": affiliation})
}

//GET--affiliation id--

func GetAffiliation(c *gin.Context) {
	var affiliation entity.Affiliation
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM affiliations WHERE id = ?", id).Scan(&affiliation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": affiliation})
}

// GET--affiliations--
func ListAffiliations(c *gin.Context) {
	var affiliations []entity.Affiliation
	if err := entity.DB().Raw("SELECT * FROM affiliations").Scan(&affiliations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": affiliations})
}

// DELETE--affiliation id--
func DeleteAffiliation(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM affiliations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "affiliation not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--affiliation--
func UpdateAffiliation(c *gin.Context) {
	var affiliation entity.Affiliation
	if err := c.ShouldBindJSON(&affiliation); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", affiliation.ID).First(&affiliation); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "affiliation not found"})
		return
	}

	if err := entity.DB().Save(&affiliation).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": affiliation})
}

//75
