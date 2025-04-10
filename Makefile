.PHONY: prod dev websocket websocket-dev

# --- NEXT.JS ---
prod:
	docker build -f ./nextjs/Dockerfile -t kiosken:latest ./nextjs/
	- docker rm -f kiosken
	docker run --env-file .env -p 6000:3000 --name kiosken --restart unless-stopped -d kiosken:latest
	- docker image prune -f

dev:
	docker build -f ./nextjs/Dockerfile -t kiosken_dev:latest ./nextjs/
	- docker rm -f kiosken_dev
	docker run --env-file .env -p 6500:3000 --name kiosken_dev --restart unless-stopped -d kiosken_dev:latest
	- docker image prune -f

# --- NODE SERVER ---
websocket:
	docker build -f ./server/Dockerfile -t websocket_server:latest ./server/
	- docker rm -f websocket_server
	docker run --env-file .env -p 8002:8001 --name websocket_server --restart unless-stopped -d websocket_server:latest

websocket-dev:
	docker build -f ./server/Dockerfile -t websocket_server_dev:latest ./server/
	- docker rm -f websocket_server_dev
	docker run --env-file .env -p 127.0.0.1:8001:8001 --name websocket_server_dev --restart unless-stopped -d websocket_server_dev:latest
