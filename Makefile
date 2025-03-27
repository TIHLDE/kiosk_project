.PHONY: prod dev
prod:
	docker build -t kiosken:latest .
	- docker rm -f kiosken
	docker run --env-file .env -p 6000:3000 --name kiosken --restart unless-stopped -d kiosken:latest
	- docker image prune -f

dev:
	docker build -t kiosken_dev:latest .
	- docker rm -f kiosken_dev
	docker run --env-file .env -p 6500:3000 --name kiosken_dev --restart unless-stopped -d kiosken_dev:latest
	- docker image prune -f