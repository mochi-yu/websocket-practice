package controller

import (
	"github.com/gin-gonic/gin"
	"github.com/mochi-yu/websocket-practice/usecase"
)

type IMessageController interface {
	PostMessage(c *gin.Context)
	GetMessages(c *gin.Context)
}

type MessageController struct {
	mu usecase.IMessageUsecase
}

func NewMessageController(mu usecase.IMessageUsecase) IMessageController {
	return &MessageController{mu: mu}
}

func (mc *MessageController) PostMessage(c *gin.Context) {

}

func (mc *MessageController) GetMessages(c *gin.Context) {

}
