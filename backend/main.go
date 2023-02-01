package main

import (
	"github.com/JRKS1532/SE65/controller"
	admin_controller "github.com/JRKS1532/SE65/controller/admin"
	bookshelf_number_controller "github.com/JRKS1532/SE65/controller/bookshelf_number"
	donate_controller "github.com/JRKS1532/SE65/controller/donate"
	feedback_controller "github.com/JRKS1532/SE65/controller/feedback"
	fiction_controller "github.com/JRKS1532/SE65/controller/fiction"
	public_relation_controller "github.com/JRKS1532/SE65/controller/public_relation"
	reader_controller "github.com/JRKS1532/SE65/controller/reader"
	report_fiction_controller "github.com/JRKS1532/SE65/controller/report_fiction"
	review_controller "github.com/JRKS1532/SE65/controller/review"
	top_up_controller "github.com/JRKS1532/SE65/controller/topup"
	writer_controller "github.com/JRKS1532/SE65/controller/writer"
	"github.com/JRKS1532/SE65/entity"
	"github.com/JRKS1532/SE65/middlewares"
	"github.com/gin-gonic/gin"
)

const PORT = "9999"

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// Admin Routes
			protected.GET("/admins", admin_controller.ListAdmins)
			protected.GET("/admin/:id", admin_controller.GetAdmin)
			protected.PATCH("/admins", admin_controller.UpdateAdmin)
			protected.DELETE("/admins/:id", admin_controller.DeleteAdmin)

			// Writer Routes
			protected.GET("/writers", writer_controller.ListWriters)
			protected.GET("/writer/:id", writer_controller.GetWriter)
			protected.PATCH("/writers", writer_controller.UpdateWriter)
			protected.DELETE("/writers/:id", writer_controller.DeleteWriter)

			// Reader Routes
			protected.GET("/readers", controller.ListReaders)
			protected.GET("/reader/:id", controller.GetReader)
			protected.PATCH("/readers", controller.UpdateReader)
			protected.DELETE("/readers/:id", controller.DeleteReader)

			//Genre Routes
			protected.GET("/genres", fiction_controller.ListGenres)
			protected.GET("/genre/:id", fiction_controller.GetGenre)
			protected.POST("/genres", fiction_controller.CreateGenre)
			protected.PATCH("/genres", fiction_controller.UpdateGenre)
			protected.DELETE("/genres/:id", fiction_controller.DeleteGenre)

			//Rating_fictions Routes
			protected.GET("/rating_fictions", fiction_controller.ListRatingFictions)
			protected.GET("/rating_fiction/:id", fiction_controller.GetRatingFiction)
			protected.POST("/rating_fictions", fiction_controller.CreateRatingFiction)
			protected.PATCH("/rating_fictions", fiction_controller.UpdateRatingFiction)
			protected.DELETE("/rating_fictions/:id", fiction_controller.CreateRatingFiction)

			//Fiction Routes
			protected.GET("/fictions", fiction_controller.ListFictions)
			protected.GET("/fiction/:id", fiction_controller.GetFiction)
			protected.POST("/fictions", fiction_controller.CreateFiction)
			protected.PATCH("/fictions", fiction_controller.UpdateFiction)
			protected.DELETE("/fictions/:id", fiction_controller.DeleteFiction)

			//Rating Routes
			protected.GET("/ratings", review_controller.ListRatings)
			protected.GET("/rating/:id", review_controller.GetRating)
			protected.POST("/ratings", review_controller.CreateRating)
			protected.PATCH("/ratings", review_controller.UpdateRating)
			protected.DELETE("/ratings/:id", review_controller.DeleteRating)

			//Review Routes
			protected.GET("/reviews", review_controller.ListReviews)
			protected.GET("/review/:id", review_controller.GetReview)
			protected.POST("/reviews", review_controller.CreateReview)
			protected.PATCH("/reviews", review_controller.UpdateReview)
			protected.DELETE("/reviews/:id", review_controller.DeleteReview)

			//Problem_system Routes
			protected.GET("/problem_systems", feedback_controller.ListProblemSystems)
			protected.GET("/problem_system/:id", feedback_controller.GetProblemSystem)
			protected.POST("/problem_systems", feedback_controller.CreateProblemSystem)
			protected.PATCH("/problem_systems", feedback_controller.UpdateProblemSystem)
			protected.DELETE("/problem_systems/:id", feedback_controller.DeleteProblemSystem)

			//Priority Routes
			protected.GET("/priorities", feedback_controller.ListPriorities)
			protected.GET("/priority/:id", feedback_controller.GetPriority)
			protected.POST("/priorities", feedback_controller.CreatePriority)
			protected.PATCH("/priorities", feedback_controller.UpdatePriority)
			protected.DELETE("/priorities/:id", feedback_controller.DeletePriority)

			//Feedback Routes
			protected.GET("/feedbacks", feedback_controller.ListFeedbacks)
			protected.GET("/feedback/:id", feedback_controller.GetFeedback)
			protected.POST("/feedbacks", feedback_controller.CreateFeedback)
			protected.PATCH("/feedbacks", feedback_controller.UpdateFeedback)
			protected.DELETE("/feedbacks/:id", feedback_controller.DeleteFeedback)

			//TopUp Routes
			protected.GET("/top_ups", top_up_controller.ListTopUps)
			protected.GET("/top_up/:id", top_up_controller.GetTopUp)
			protected.POST("/top_ups", top_up_controller.CreateTopUp)
			protected.PATCH("/top_ups", top_up_controller.UpdateTopUp)
			protected.DELETE("/top_ups/:id", top_up_controller.DeleteTopUp)

			//Donate Routes
			protected.GET("/donates", donate_controller.ListDonates)
			protected.GET("/donate/:id", donate_controller.GetDonate)
			protected.POST("/donates", donate_controller.CreateDonate)
			protected.PATCH("/donates", donate_controller.UpdateDonate)
			protected.DELETE("/donates/:id", donate_controller.DeleteDonate)

			//Gender Routes
			protected.GET("/genders", admin_controller.ListGenders)
			protected.GET("/gender/:id", admin_controller.GetGender)
			protected.POST("/genders", admin_controller.CreateGender)
			protected.PATCH("/genders", admin_controller.UpdateGender)
			protected.DELETE("/genders/:id", admin_controller.DeleteGender)

			//Prefix Routes
			protected.GET("/prefixes", reader_controller.ListPrefixes)
			protected.GET("/prefix/:id", reader_controller.GetPrefix)
			protected.POST("/prefixes", reader_controller.CreatePrefix)
			protected.PATCH("/prefixes", reader_controller.UpdatePrefix)
			protected.DELETE("/prefixes/:id", reader_controller.DeletePrefix)

			//Bookshelf_Number Routes
			protected.GET("/bookshelf_numbers", bookshelf_number_controller.ListBookshelf_Numbers)
			protected.GET("/bookshelf_number/:id", bookshelf_number_controller.GetBookshelf_Number)
			protected.POST("/bookshelf_numbers", bookshelf_number_controller.CreateBookshelf_Number)
			protected.PATCH("/bookshelf_numbers", bookshelf_number_controller.UpdateBookshelf_Number)
			protected.DELETE("/bookshelf_numbers/:id", bookshelf_number_controller.DeleteBookshelf_Number)

			//Bookshelf_Number Routes
			protected.GET("/added_books", bookshelf_number_controller.ListAdded_Books)
			protected.GET("/added_book/:id", bookshelf_number_controller.GetAdded_Book)
			protected.POST("/added_books", bookshelf_number_controller.CreateAdded_Book)
			protected.PATCH("/added_books", bookshelf_number_controller.UpdateAdded_Book)
			protected.DELETE("/added_books/:id", bookshelf_number_controller.DeleteAdded_Book)

			//ProblemFiction Routes
			protected.GET("/problem_fictions", report_fiction_controller.ListProblemFictions)
			protected.GET("/problem_fiction/:id", report_fiction_controller.GetProblemFiction)
			protected.POST("problem_fictions", report_fiction_controller.CreateProblemFiction)
			protected.PATCH("/problem_fictions", report_fiction_controller.UpdateProblemFiction)
			protected.DELETE("/problem_fictions/:id", report_fiction_controller.DeleteProblemFiction)

			//ReportFiction Routes
			protected.GET("/report_fictions", report_fiction_controller.ListReportFictions)
			protected.GET("/report_fiction/:id", report_fiction_controller.GetReportFiction)
			protected.POST("/report_fictions", report_fiction_controller.CreateReportFiction)
			protected.PATCH("/report_fictions", report_fiction_controller.UpdateReportFiction)
			protected.DELETE("/report_fictions/:id", report_fiction_controller.DeleteReportFiction)

			// Public Relation Routes
			protected.GET("/public_relations", public_relation_controller.ListPR)
			protected.GET("/public_relations/:id", public_relation_controller.GetPR)
			protected.PATCH("/public_relations", public_relation_controller.UpdatePR)
			protected.DELETE("/public_relation/:id", public_relation_controller.DeletePR)
		}
	}

	// User Routes
	r.POST("/admins", admin_controller.CreateAdmin)
	r.POST("/writers", writer_controller.CreateWriter)
	r.POST("/readers", controller.CreateReader)

	// Authentication Routes
	r.POST("/login/admin", controller.LoginAdmin)
	r.POST("/login/writer", controller.LoginWriter)
	r.POST("/login/reader", controller.LoginReader)

	// Run the server go run main.go
	r.Run("localhost: " + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
