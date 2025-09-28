# Docker commands for document-previewer project

# Variables
COMPOSE_FILE = docker/docker-compose.yml

.PHONY: help dev stop build clean rebuild

# Default target
help:
	@echo "Available Docker commands:"
	@echo "  dev        - Start development environment with logs visible"
	@echo "  stop       - Stop development environment"
	@echo "  build      - Build the development Docker image"
	@echo "  clean      - Remove Docker containers and images"
	@echo "  rebuild    - Rebuild and restart development environment"

# Start development environment with logs visible
dev:
	docker compose -f $(COMPOSE_FILE) up

# Stop development environment
stop:
	docker compose -f $(COMPOSE_FILE) down

# Build the Docker image
build:
	docker compose -f $(COMPOSE_FILE) build

# Clean up Docker resources
clean:
	docker compose -f $(COMPOSE_FILE) down --rmi all
	docker system prune -f

# Rebuild and restart development environment
rebuild: clean build dev