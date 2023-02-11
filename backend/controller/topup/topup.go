package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST top_ups
func CreateTopUp(c *gin.Context) {

	var top_up entity.TopUp
	var reader entity.Reader
	var package_top_up entity.PackageTopUp
	var payment_type entity.PaymentType
	// var coin entity.ReaderCoin

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร top_up
	if err := c.ShouldBindJSON(&top_up); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : ค้นหา reader ด้วย id
	if tx := entity.DB().Where("id = ?", top_up.ReaderID).First(&reader); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader not found"})
		return
	}

	// : ค้นหา top_up ด้วย id
	if tx := entity.DB().Where("id = ?", top_up.PackageTopUpID).First(&package_top_up); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "package top up not found"})
		return
	}

	// : ค้นหา top_up ด้วย id
	if tx := entity.DB().Where("id = ?", top_up.PaymentTypeID).First(&payment_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment type not found"})
		return
	}

	// : สร้าง top_up
	tu := entity.TopUp{
		Reader:             reader,
		PackageTopUp:       package_top_up,
		PaymentType:        payment_type,
		Topup_phone_number: top_up.Topup_phone_number,
		Note:               top_up.Note,
		Topup_date:         top_up.Topup_date.Local(),
	}

	// การ validate
	if _, err := govalidator.ValidateStruct(top_up); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// : บันทึก
	if err := entity.DB().Create(&tu).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": tu})
}

// GET /top_up/:id
func GetTopUp(c *gin.Context) {
	var top_up entity.TopUp
	id := c.Param("id")
	if tx := entity.DB().Preload("Reader").Preload("PackageTopUp").Preload("PaymentType").Raw("SELECT * FROM top_ups WHERE id = ?", id).Find(&top_up).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "top up not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": top_up})
}

// GET /top_ups
func ListTopUps(c *gin.Context) {
	var top_ups []entity.TopUp
	if err := entity.DB().Preload("Reader").Preload("PackageTopUp").Preload("PaymentType").Raw("SELECT * FROM top_ups").Find(&top_ups).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": top_ups})
}

func GetTopUpByTID(c *gin.Context) {
	var top_up []entity.TopUp
	id := c.Param("id")
	if err := entity.DB().Preload("Reader").Preload("PackageTopUp").Preload("PaymentType").Raw("SELECT * FROM top_ups WHERE reader_id = ?", id).Find(&top_up).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": top_up})

}

// DELETE top_ups/:id
func DeleteTopUp(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM top_ups WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "top up not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /top_ups
func UpdateTopUp(c *gin.Context) {

	var top_up entity.TopUp
	var reader entity.Reader
	var package_top_up entity.PackageTopUp
	var payment_type entity.PaymentType

	if err := c.ShouldBindJSON(&top_up); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var newTopup_phone_number = top_up.Topup_phone_number

	// : ค้นหา reader ด้วย id
	if tx := entity.DB().Where("id = ?", top_up.ReaderID).First(&reader); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader not found"})
		return
	}

	// : ค้นหา top_up ด้วย id
	if tx := entity.DB().Where("id = ?", top_up.PackageTopUpID).First(&package_top_up); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "package top up not found"})
		return
	}

	// : ค้นหา top_up ด้วย id
	if tx := entity.DB().Where("id = ?", top_up.PaymentTypeID).First(&payment_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment type not found"})
		return
	}

	update_top_up := entity.TopUp{
		Model:              gorm.Model{ID: top_up.ID},
		Reader:             reader,
		PackageTopUp:       package_top_up,
		PaymentType:        payment_type,
		Topup_phone_number: newTopup_phone_number,
		Topup_date:         top_up.Topup_date.Local(),
	}

	if err := entity.DB().Save(&update_top_up).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update_top_up})
}
