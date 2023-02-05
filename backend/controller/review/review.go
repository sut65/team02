package controller

import (
	"net/http"
	"time"

	"github.com/JRKS1532/SE65/entity"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST reviews
func CreateReview(c *gin.Context) {

	var review entity.Review
	var fiction entity.Fiction
	var rating entity.Rating
	var reader entity.Reader

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร review
	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา fiction ด้วย id
	if tx := entity.DB().Where("id = ?", review.FictionID).First(&fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}

	// 10: ค้นหา rating ด้วย id
	if tx := entity.DB().Where("id = ?", review.RatingID).First(&rating); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rating not found"})
		return
	}

	// 11: ค้นหา reader ด้วย id
	if tx := entity.DB().Where("id = ?", review.ReaderID).First(&reader); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader not found"})
		return
	}
	// 12: สร้าง Review
	wv := entity.Review{
		Timestamp:    time.Now(),
		Fiction:      fiction,
		ReviewTopic:  review.ReviewTopic,
		Rating:       rating,
		ReviewDetail: review.ReviewDetail,
		Reader:       reader,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": wv})
}

// GET /review/:id
func GetReview(c *gin.Context) {
	var review entity.Review
	id := c.Param("id")
	if tx := entity.DB().Preload("Fiction").Preload("Rating").Preload("Reader").Raw("SELECT * FROM reviews WHERE id = ?", id).Find(&review).Error; tx != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "review not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": review})
}

// GET /reviews
func ListReviews(c *gin.Context) {
	var reviews []entity.Review
	if err := entity.DB().Preload("Fiction").Preload("Rating").Preload("Reader").Raw("SELECT * FROM reviews").Find(&reviews).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": reviews})
}

func GetReviewByRID(c *gin.Context) {
	var review []entity.Review
	id := c.Param("id")
	if err := entity.DB().Preload("Fiction").Preload("Rating").Preload("Reader").Raw("SELECT * FROM reviews WHERE reader_id = ?", id).Find(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": review})

}

func GetReviewByFictionID(c *gin.Context) {
	var review []entity.Review
	id := c.Param("id")
	if err := entity.DB().Preload("Fiction").Preload("Rating").Preload("Reader").Raw("SELECT * FROM reviews WHERE fiction_id = ?", id).Find(&review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": review})

}

// DELETE reviews/:id
func DeleteReview(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM reviews WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "review not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /reviews
func UpdateReview(c *gin.Context) {

	var review entity.Review
	var fiction entity.Fiction
	var rating entity.Rating
	var reader entity.Reader

	if err := c.ShouldBindJSON(&review); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	var newReviewTopic = review.ReviewTopic
	var newReviewDetail = review.ReviewDetail

	if tx := entity.DB().Where("id = ?", review.FictionID).First(&fiction); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "fiction not found"})
		return
	}
	if tx := entity.DB().Where("id = ?", review.RatingID).First(&rating); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "rating not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", review.ReaderID).First(&reader); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "reader not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", review.ID).First(&review); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "review not found"})
		return
	}

	update_review := entity.Review{
		Model:        gorm.Model{ID: review.ID},
		Timestamp:    time.Now(),
		Fiction:      fiction,
		ReviewTopic:  newReviewTopic,
		Rating:       rating,
		ReviewDetail: newReviewDetail,
		Reader:       reader,
	}

	if err := entity.DB().Save(&update_review).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": update_review})
}
