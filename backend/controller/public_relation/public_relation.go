package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/asaskevich/govalidator"
	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

// GET /public_relations
// List all public_relations
func ListPublicRelations(c *gin.Context) {
	var public_relations []entity.Public_Relation
	if err := entity.DB().Preload("Admin").Preload("PR_category").Preload("Fiction").Preload("Fiction.RatingFiction").Preload("Fiction.Writer").Raw("SELECT * FROM public_relations").Find(&public_relations).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": public_relations})
}

// GET /public_relation/:id
// Get public_ralation by id
func GetPublicRelaion(c *gin.Context) {
	var public_relation entity.Public_Relation
	id := c.Param("id")
	if tx := entity.DB().Preload("Admin").Preload("PR_category").Preload("Fiction").Preload("Fiction.RatingFiction").Preload("Fiction.Writer").Raw("SELECT * FROM public_relations WHERE id = ?", id).Find(&public_relation).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "public relation not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": public_relation})
}

// POST /public_relations
func CreatePublicRelaion(c *gin.Context) {
	var pr entity.Public_Relation
	var admin entity.Admin
	var category entity.PR_category
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
	// ค้นหา category ด้วย id
	if tx := entity.DB().Where("id = ?", pr.PR_categoryID).First(&category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Public Relation Category not found"})
		return
	}
	// ค้นหา fiction ด้วย id
	if tx := entity.DB().Where("id = ?", pr.FictionID).First(&fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(pr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 14: สร้าง  PR
	prs := entity.Public_Relation{
		Pr_topic:    pr.Pr_topic,
		Pr_cover:    pr.Pr_cover,
		Pr_details:  pr.Pr_details,
		Pr_time:     pr.Pr_time,
		Admin:       admin,
		Fiction:     fiction,
		PR_category: category,
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
	var category entity.PR_category
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

	if tx := entity.DB().Where("id = ?", pr.PR_categoryID).First(&category); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Public Relation Category not found"})
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
		Model:       gorm.Model{ID: pr.ID},
		Pr_topic:    new_pr_topic,
		Pr_cover:    new_pr_cover,
		Pr_details:  new_pr_details,
		Pr_time:     new_pr_time,
		Admin:       admin,
		Fiction:     fiction,
		PR_category: category,
	}

	if _, err := govalidator.ValidateStruct(update_pr); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
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
	if tx := entity.DB().Exec("DELETE FROM public_relations WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "public relation not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}
