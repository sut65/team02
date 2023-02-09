package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	//"github.com/asaskevich/govalidator"
	"gorm.io/gorm"

	//"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	//"golang.org/x/crypto/bcrypt"
)

// GET /public_ralations
// List all public_ralations
func ListPublicRelations(c *gin.Context) {
	var public_ralations []entity.Public_Relation
	if err := entity.DB().Preload("Admin").Preload("Writer").Preload("Fiction").Raw("SELECT * FROM public_ralations").Find(&public_ralations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": public_ralations})
}

// GET /public_relation/:id
// Get public_ralation by id
func GetPublicRelaion(c *gin.Context) {
	var public_ralation entity.Public_Relation
	id := c.Param("id")
	if tx := entity.DB().Preload("Admin").Preload("Writer").Preload("Fiction").Raw("SELECT * FROM public_ralations WHERE id = ?", id).Find(&public_ralation).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "public relation not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": public_ralation})
}

// POST /public_ralations
func CreatePublicRelaion(c *gin.Context) {
	var pr entity.Public_Relation
	var admin entity.Admin
	var writer entity.Writer
	var fiction entity.Fiction

	if err := c.ShouldBindJSON(&pr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ค้นหา admin ด้วย id
	if tx := entity.DB().Where("id = ?", pr.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}
	// ค้นหา writer ด้วย id
	if tx := entity.DB().Where("id = ?", pr.WriterID).First(&writer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "writer not found"})
		return
	}
	// ค้นหา fiction ด้วย id
	if tx := entity.DB().Where("id = ?", pr.FictionID).First(&fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}

	// 14: สร้าง  writer
	prs := entity.Public_Relation{
		Pr_topic:   pr.Pr_topic,
		Pr_cover:   pr.Pr_cover,
		Pr_details: pr.Pr_details,
		Pr_time:    pr.Pr_time,
		Admin:      admin,
		Writer:     writer,
		Fiction:    fiction,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&prs).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": prs})
}

// PATCH /admins
func UpdatePublicRelation(c *gin.Context) {
	var pr entity.Public_Relation
	var admin entity.Admin
	var writer entity.Writer
	var fiction entity.Fiction

	if err := c.ShouldBindJSON(&pr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var new_pr_topic = pr.Pr_topic
	var new_pr_cover = pr.Pr_cover
	var new_pr_details = pr.Pr_details
	var new_pr_time = pr.Pr_time

	if tx := entity.DB().Where("id = ?", pr.AdminID).First(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", pr.WriterID).First(&writer); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "writer not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", pr.FictionID).First(&fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", pr.ID).First(&pr); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "public relation not found"})
		return
	}

	update_pr := entity.Public_Relation{
		Model:      gorm.Model{ID: pr.ID},
		Pr_topic:   new_pr_topic,
		Pr_cover:   new_pr_cover,
		Pr_details: new_pr_details,
		Pr_time:    new_pr_time,
		Admin:      admin,
		Writer:     writer,
		Fiction:    fiction,
	}

	if err := entity.DB().Save(&update_pr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": update_pr})

}

// DELETE /public_relation/:id
func DeletePublicRelation(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM public_ralations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "public relation not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}
