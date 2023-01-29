package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--Bookshelf_Number--
func CreateBookshelf_Number(c *gin.Context) {
	var bookshelf_number entity.Bookshelf_Number
	if err := c.ShouldBindJSON(&bookshelf_number); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&bookshelf_number).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookshelf_number})
}

//GET--Bookshelf_Number id--

func GetBookshelf_Number(c *gin.Context) {
	var bookshelf_number entity.Bookshelf_Number
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM bookshelf_numbers WHERE id = ?", id).Scan(&bookshelf_number).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookshelf_number})
}

// GET--bookshelf_numbers--
func ListBookshelf_Numbers(c *gin.Context) {
	var bookshelf_numbers []entity.Collection
	if err := entity.DB().Raw("SELECT * FROM bookshelf_numbers").Scan(&bookshelf_numbers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookshelf_numbers})
}

// DELETE--bookshelf_number id--
func DeleteBookshelf_Number(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM bookshelf_numbers WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bookshelf_number not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--bookshelf_number--
func UpdateBookshelf_Number(c *gin.Context) {
	var bookshelf_number entity.Bookshelf_Number
	if err := c.ShouldBindJSON(&bookshelf_number); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", bookshelf_number.ID).First(&bookshelf_number); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bookshelf_number not found"})
		return
	}

	if err := entity.DB().Save(&bookshelf_number).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookshelf_number})
}

//75
