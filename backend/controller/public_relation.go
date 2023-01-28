package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
)

// GET /public_relations
// List all public_relation
func ListPR(c *gin.Context) {
	var pr []entity.PublicRelation
	if err := entity.DB().Raw("SELECT * FROM pr").Scan(&pr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pr})
}

// GET /public_relations/:id
// Get public_relation by id
func GetPR(c *gin.Context) {
	var pr entity.PublicRelation
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM pr WHERE id = ?", id).Scan(&pr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pr})
}

// POST /public_relations
func CreatePR(c *gin.Context) {
	var pr entity.PublicRelation
	if err := c.ShouldBindJSON(&pr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(pr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&pr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pr})
}

// PATCH /public_relations
func UpdatePR(c *gin.Context) {
	var pr entity.PublicRelation
	if err := c.ShouldBindJSON(&pr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", pr.ID).First(&pr); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "public relation not found"})
		return
	}

	if err := entity.DB().Save(&pr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": pr})
}

// DELETE /public_relation/:id
func DeletePR(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM pr WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "public relation not found"})
		return
	}
	/*
		if err := entity.DB().Where("id = ?", id).Delete(&entity.User{}).Error; err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}*/

	c.JSON(http.StatusOK, gin.H{"data": id})
}
