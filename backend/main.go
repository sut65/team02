package main

import (
	"github.com/JRKS1532/SE65/controller"
	collection_controller "github.com/JRKS1532/SE65/controller/collection"
	feedback_controller "github.com/JRKS1532/SE65/controller/feedback"
	review_controller "github.com/JRKS1532/SE65/controller/review"
	"github.com/JRKS1532/SE65/entity"
	"github.com/JRKS1532/SE65/middlewares"
	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// Admin Routes
			protected.GET("/admins", controller.ListAdmins)
			protected.GET("/admin/:id", controller.GetAdmin)
			protected.PATCH("/admins", controller.UpdateAdmin)
			protected.DELETE("/admins/:id", controller.DeleteAdmin)

			// Writer Routes
			protected.GET("/writers", controller.ListWriters)
			protected.GET("/writer/:id", controller.GetWriter)
			protected.PATCH("/writers", controller.UpdateWriter)
			protected.DELETE("/writers/:id", controller.DeleteWriter)

			// Reader Routes
			protected.GET("/readers", controller.ListReaders)
			protected.GET("/reader/:id", controller.GetReader)
			protected.PATCH("/readers", controller.UpdateReader)
			protected.DELETE("/readers/:id", controller.DeleteReader)

			//Genre Routes
			protected.GET("/genres", controller.ListGenres)
			protected.GET("/genre/:id", controller.GetGenre)
			protected.POST("/genres", controller.CreateGenre)
			protected.PATCH("/genres", controller.UpdateGenre)
			protected.DELETE("/genres/:id", controller.DeleteGenre)

			//Type Routes
			protected.GET("/types", controller.ListTypes)
			protected.GET("/type/:id", controller.GetType)
			protected.POST("/types", controller.CreateType)
			protected.PATCH("/types", controller.UpdateType)
			protected.DELETE("/types/:id", controller.DeleteType)

			//Fiction Routes
			protected.GET("/fictions", controller.ListFictions)
			protected.GET("/fiction/:id", controller.GetFiction)
			protected.POST("/fictions", controller.CreateFiction)
			protected.PATCH("/fictions", controller.UpdateFiction)
			protected.DELETE("/fictions/:id", controller.DeleteFiction)

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
			protected.GET("/problem_systems", feedback_controller.ListProblem_systems)
			protected.GET("/problem_system/:id", feedback_controller.GetProblem_system)
			protected.POST("/problem_systems", feedback_controller.CreateProblem_system)
			protected.PATCH("/problem_systems", feedback_controller.UpdateProblem_system)
			protected.DELETE("/problem_systems/:id", feedback_controller.DeleteProblem_system)

			//Priority Routes
			protected.GET("/prioritys", feedback_controller.ListPrioritys)
			protected.GET("/priority/:id", feedback_controller.GetPriority)
			protected.POST("/prioritys", feedback_controller.CreatePriority)
			protected.PATCH("/prioritys", feedback_controller.UpdatePriority)
			protected.DELETE("/prioritys/:id", feedback_controller.DeletePriority)

			//Feedback Routes
			protected.GET("/feedbacks", feedback_controller.ListFeedbacks)
			protected.GET("/feedback/:id", feedback_controller.GetFeedback)
			protected.POST("/feedbacks", feedback_controller.CreateFeedback)
			protected.PATCH("/feedbacks", feedback_controller.UpdateFeedback)
			protected.DELETE("/feedbacks/:id", feedback_controller.DeleteFeedback)

			//Privacy Routes
			protected.GET("/privacys", collection_controller.ListPrivacys)
			protected.GET("/privacy/:id", collection_controller.GetPrivacy)
			protected.POST("/privacys", collection_controller.CreatePrivacy)
			protected.PATCH("/privacys", collection_controller.UpdatePrivacy)
			protected.DELETE("/privacys/:id", collection_controller.DeletePrivacy)

			//Collection Routes
			protected.GET("/collections", collection_controller.ListCollections)
			protected.GET("/collection/:id", collection_controller.GetCollection)
			protected.POST("/collections", collection_controller.CreateCollection)
			protected.PATCH("/collections", collection_controller.UpdateCollection)
			protected.DELETE("/collections/:id", collection_controller.DeleteCollection)
		}
	}

	// User Routes
	r.POST("/admins", controller.CreateAdmin)
	r.POST("/writers", controller.CreateWriter)
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
