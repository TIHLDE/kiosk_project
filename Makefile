.PHONY: prod dev
prod:
	docker build -t kiosken:latest .
	- docker container stop kiosken
	- docker container rm kiosken
	docker run --env-file .env -p 6000:3000 --name kiosken --restart unless-stopped -d kiosken:latest
	- docker image prune -f

dev:
	docker build -t kiosken_dev:latest .
	- docker container stop kiosken_dev
	- docker container rm kiosken_dev
	docker run --env-file .env -p 8000:3000 --name kiosken_dev --restart unless-stopped -d kiosken_dev:latest
	- docker image prune -f