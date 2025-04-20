.PHONY: prod dev

# --- NEXT.JS ---
prod:
	docker build -f ./nextjs/Dockerfile -t kiosken:latest ./nextjs/
	- docker rm -f kiosken
	docker run --env-file .env -p 6000:3000 --name kiosken --restart unless-stopped -d kiosken:latest
	- docker image prune -f

dev:
	docker compose down --remove-orphans
	docker compose up --build -d
	

