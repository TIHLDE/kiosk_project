.PHONY: prod
prod:
	docker build -t kiosken:latest .
	- docker container stop kiosken
	- docker container rm kiosken
	docker run --env-file .env -p 6000:3000 --name kiosken --restart unless-stopped -d kiosken:latest
	- docker image prune -f