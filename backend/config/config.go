package config

import (
	"github.com/caarlos0/env/v11"
)

type Config struct {
	Port string `env:"PORT,notEmpty" envDefault:"8080"`
}

func NewConfig() (*Config, error) {
	var cfg Config
	err := env.Parse(&cfg)
	if err != nil {
		return nil, err
	}

	return &cfg, nil
}
