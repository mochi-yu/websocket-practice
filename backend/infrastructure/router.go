package infrastructure

import (
	"github.com/gin-gonic/gin"
	"github.com/mochi-yu/websocket-practice/config"
	"github.com/mochi-yu/websocket-practice/controller"
	"github.com/mochi-yu/websocket-practice/ent"
	"github.com/mochi-yu/websocket-practice/middleware"
	"github.com/mochi-yu/websocket-practice/repository"
	"github.com/mochi-yu/websocket-practice/usecase"
)

func NewRouter(db *ent.Client, cfg *config.Config) *gin.Engine {
	router := gin.Default()

	router.Use(middleware.Cors(cfg))
	router.Use(middleware.Options())
	router.Use(middleware.Transaction(db))

	mr := repository.NewMessageRepository(db)
	mu := usecase.NewMessageUsecase(mr)
	mc := controller.NewMessageController(mu)

	router.POST("/messages", mc.PostMessage)
	router.GET("/messages", mc.GetMessages)

	return router
}
