package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
)

// POST--Added_Book--
func CreateAdded_Book(c *gin.Context) {
	var added_book entity.Added_Book
	var bookshelf_number entity.Bookshelf_Number
	var fiction entity.Fiction

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Added_Book
	if err := c.ShouldBindJSON(&added_book); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา bookshelf_number ด้วย id
	if tx := entity.DB().Where("id = ?", added_book.Bookshelf_NumberID).First(&bookshelf_number); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bookshelf number not found"})
		return
	}

	// 10: ค้นหา fiction ด้วย id
	if tx := entity.DB().Where("id = ?", added_book.FictionID).First(&fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}

	// 11: สร้าง Added_Book
	ab := entity.Added_Book{
		Bookshelf_Number: bookshelf_number, // โยงความสัมพันธ์กับ Bookshelf_Number
		Fiction:          fiction,          // โยงความสัมพันธ์กับ Entity Fiction
	}

	if err := entity.DB().Save(&ab).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": ab})
}

//GET--Added_Book id--

func GetAdded_Book(c *gin.Context) {
	var added_book entity.Added_Book
	id := c.Param("id")
	if err := entity.DB().Preload("Bookshelf_Number").Preload("Writer").Preload("Fiction").Raw("SELECT * FROM added_books WHERE id = ?", id).Find(&added_book).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "added book not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": added_book})
}

// GET--added_books--
func ListAdded_Books(c *gin.Context) {
	var added_books []entity.Added_Book
	if err := entity.DB().Preload("Bookshelf_Number").Preload("Fiction").Raw("SELECT * FROM added_books").Find(&added_books).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bookshelf Number not found"})
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

func GetAddedBookByBSID(c *gin.Context) {
	var added_book []entity.Added_Book
	id := c.Param("id")
	if err := entity.DB().Preload("Bookshelf_Number").Preload("Fiction").Raw("SELECT * FROM added_books WHERE bookshelf_number_id = ?", id).Find(&added_book).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": added_book})

} //ไว้ให้เพื่อนดึง

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
