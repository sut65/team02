package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--Added_Book--
func CreateAdded_Book(c *gin.Context) {
	var added_book entity.Added_Book
	if err := c.ShouldBindJSON(&added_book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := entity.DB().Create(&added_book).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": added_book})
}

//GET--Added_Book id--

func GetAdded_Book(c *gin.Context) {
	var added_book entity.Added_Book
	id := c.Param("id")
	if err := entity.DB().Raw("SELECT * FROM added_books WHERE id = ?", id).Scan(&added_book).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": added_book})
}

// GET--added_books--
func ListAdded_Books(c *gin.Context) {
	var added_books []entity.Added_Book
	if err := entity.DB().Raw("SELECT * FROM added_books").Scan(&added_books).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": added_books})
}

// DELETE--added_book id--
func DeleteAdded_Book(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM added_books WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "added_book not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--added_book--
func UpdateAdded_Book(c *gin.Context) {
	var added_book entity.Added_Book
	if err := c.ShouldBindJSON(&added_book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", added_book.ID).First(&added_book); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "added_book not found"})
		return
	}

	if err := entity.DB().Save(&added_book).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": added_book})
}

//75
