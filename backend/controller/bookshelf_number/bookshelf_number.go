package controller

import (
	"net/http"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST--Bookshelf_Number--
func CreateBookshelf_Number(c *gin.Context) {

	var bookshelf_number entity.Bookshelf_Number
	var reader entity.Reader

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร bookshelf_number
	if err := c.ShouldBindJSON(&bookshelf_number); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 11: ค้นหา reader ด้วย id
	if tx := entity.DB().Where("id = ?", bookshelf_number.ReaderID).First(&reader); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader not found"})
		return
	}
	// 12: สร้าง Review
	wv := entity.Bookshelf_Number{
		Bookshelf_Name: bookshelf_number.Bookshelf_Name,
		Reader:         reader,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": wv})
}

//GET--Bookshelf_Number id--

func GetBookshelf_Number(c *gin.Context) {
	var bookshelf_number entity.Bookshelf_Number
	id := c.Param("id")
	if tx := entity.DB().Preload("Reader").Raw("SELECT * FROM bookshelf_numbers WHERE id = ?", id).Find(&bookshelf_number).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bookshelf number not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookshelf_number})
}

// GET--bookshelf_numbers--
func ListBookshelf_Numbers(c *gin.Context) {
	var bookshelf_numbers []entity.Bookshelf_Number
	if err := entity.DB().Preload("Reader").Raw("SELECT * FROM bookshelf_numbers").Find(&bookshelf_numbers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": bookshelf_numbers})
}

func GetBookshelfNumByRID(c *gin.Context) {
	var bookshelf_numbers []entity.Bookshelf_Number
	id := c.Param("id")
	if err := entity.DB().Preload("Reader").Raw("SELECT * FROM bookshelf_numbers WHERE reader_id = ?", id).Find(&bookshelf_numbers).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": bookshelf_numbers})

}

// DELETE--bookshelf_number id--
func DeleteBookshelf_Number(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM bookshelf_numbers WHERE reader_id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bookshelf_number not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH--bookshelf_number--
func UpdateBookshelf_Number(c *gin.Context) {

	var bookshelf_number entity.Bookshelf_Number
	var reader entity.Reader

	if err := c.ShouldBindJSON(&bookshelf_number); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var newBookshelf_Name = bookshelf_number.Bookshelf_Name

	if tx := entity.DB().Where("id = ?", bookshelf_number.ReaderID).First(&reader); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", bookshelf_number.ID).First(&bookshelf_number); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "bookshelf number not found"})
		return
	}

	update_bookshelfNum := entity.Bookshelf_Number{
		Model:          gorm.Model{ID: bookshelf_number.ID},
		Bookshelf_Name: newBookshelf_Name,
		Reader:         reader,
	}

	if err := entity.DB().Save(&update_bookshelfNum).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update_bookshelfNum})
}

//75
