package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--paymenttype--
func CreatePaymentType(c *gin.Context) {
	var payment_type entity.PaymentType
	if err := c.ShouldBindJSON(&payment_type); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&payment_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment_type})
}

//GET--paymenttype id--

func GetPaymentType(c *gin.Context) {
	var payment_type entity.PaymentType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM payment_types WHERE id = ?", id).Scan(&payment_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment_type})
}

// GET--paymenttypes--
func ListPaymentTypes(c *gin.Context) {
	var payment_types []entity.PaymentType
	if err := entity.DB().Raw("SELECT * FROM payment_types").Scan(&payment_types).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment_types})
}

// DELETE--paymenttype id--
func DeletePaymentType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM payment_types WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment_type not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--paymenttype--
func UpdatePaymentType(c *gin.Context) {
	var payment_type entity.PaymentType
	if err := c.ShouldBindJSON(&payment_type); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", payment_type.ID).First(&payment_type); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "payment_type not found"})
		return
	}

	if err := entity.DB().Save(&payment_type).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": payment_type})
}

//75
