package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--package--
func CreatePaymentType(c *gin.Context) {
	var paymenttype entity.PaymentType
	if err := c.ShouldBindJSON(&paymenttype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&paymenttype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paymenttype})
}

//GET--packagetu id--

func GetPaymentType(c *gin.Context) {
	var paymenttype entity.PaymentType
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM paymenttypes WHERE id = ?", id).Scan(&paymenttype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paymenttype})
}

// GET--packagetus--
func ListPaymentTypes(c *gin.Context) {
	var paymenttypes []entity.PaymentType
	if err := entity.DB().Raw("SELECT * FROM paymenttypes").Scan(&paymenttypes).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paymenttypes})
}

// DELETE--packagetu id--
func DeletePaymentType(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM paymenttypes WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "paymenttype not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--packagetu--
func UpdatePaymentType(c *gin.Context) {
	var paymenttype entity.PaymentType
	if err := c.ShouldBindJSON(&paymenttype); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", paymenttype.ID).First(&paymenttype); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "paymenttype not found"})
		return
	}

	if err := entity.DB().Save(&paymenttype).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": paymenttype})
}

//75
