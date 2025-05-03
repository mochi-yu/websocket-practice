package main

import (
	"log"

	"github.com/mochi-yu/websocket-practice/config"
	"github.com/mochi-yu/websocket-practice/infrastructure"
)

func main() {
	cfg, err := config.NewConfig()
	if err != nil {
		log.Fatalf("Failed to read config: %v", err)
	}

	db, err := infrastructure.NewDB(cfg)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer db.Close()

	// For debug
	log.Printf("config: %+v", cfg)

	// http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	// 	fmt.Fprintf(w, "Hello, World!")
	// })
}
