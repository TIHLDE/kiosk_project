.PHONY: prod dev

# --- NEXT.JS ---
prod:
	docker compose -f docker-compose.prod.yml down --remove-orphans
	docker compose -f docker-compose.prod.yml up --build -d

dev:
	docker compose -f docker-compose.dev.yml down --remove-orphans
	docker compose -f docker-compose.dev.yml up --build -d
	

