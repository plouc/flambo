help: ## prints help
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf " > \033[36m%-20s\033[0m %s\n", $$1, $$2}'

doc: doc-api doc-css-styleguide doc-webapp ## builds all documentations

doc-api: ## builds api documentation (Node.js required)
	cd api && npm run doc

doc-css-styleguide: ## builds webapp CSS styleguide (Node.js required)
	cd webapp && npm run styleguide

doc-webapp: ## builds webapp documentation (Node.js required)
	cd webapp && npm run doc

run-dev: ## launch docker containers and starts webapp dev server
	NODE_ENV=development docker-compose up --build --remove-orphans
	#cd webapp && npm start

logs-api: ## outputs logs from api
	docker-compose logs -f api

test: test-api-bdd ## runs all tests (api & webapp)

test-api-bdd: ## runs api functional tests
	docker-compose exec api /bin/ash -c "cd /flambo/api && ../node_modules/.bin/cucumberjs"

data-reset: ## reset rethinkdb and elasticsearch data
	docker-compose exec api /bin/ash -c "cd /flambo/api && npm run reset"

build-webapp: ## builds webapp inside a docker container
	@docker run --rm=true --volume=$(shell pwd)/webapp:/webapp mhart/alpine-node:6.3 /bin/ash -c "cd /webapp && npm i && npm run build"
	@cp -r webapp/public/ api/public/

run: build-webapp ## run flambo
	NODE_ENV=production docker-compose up

kill: ## kill all running services and remove associated containers/volumes
	NODE_ENV=production docker-compose kill
	NODE_ENV=production docker-compose rm -f -v
