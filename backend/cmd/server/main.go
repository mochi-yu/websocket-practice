package main

import (
	"log"

	"github.com/mochi-yu/websocket-practice/config"
)

func main() {
	cfg, err := config.NewConfig()
	if err != nil {
		log.Fatalf("Failed to read config: %v", err)
	}

	// For debug
	log.Printf("config: %+v", cfg)

	// http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	// 	fmt.Fprintf(w, "Hello, World!")
	// })
}
