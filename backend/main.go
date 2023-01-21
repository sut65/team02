package main

import (
	"github.com/JRKS1532/SE65/controller"
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
