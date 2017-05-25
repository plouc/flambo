.DEFAULT_GOAL  := help

PRODUCT_NAME   := flambo
NODE_IMAGE     := node:7
POSTGRES_IMAGE := postgres:9-alpine
ELASTIC_IMAGE  := docker.elastic.co/elasticsearch/elasticsearch:5.3.0

OS             := $(shell uname)

ifdef CI
    DOCKER_COMPOSE_FILE := "docker-compose-ci.yml"
else
    DOCKER_COMPOSE_FILE := "docker-compose.yml"
endif

DOCKER_COMPOSE := export \
    NODE_IMAGE=${NODE_IMAGE} \
    POSTGRES_IMAGE=${POSTGRES_IMAGE} \
    ELASTIC_IMAGE=${ELASTIC_IMAGE}; \
    docker-compose -f ${DOCKER_COMPOSE_FILE}

########################################################################################################################
#
# HELP
#
########################################################################################################################

# COLORS
RED    := $(shell tput -Txterm setaf 1)
GREEN  := $(shell tput -Txterm setaf 2)
WHITE  := $(shell tput -Txterm setaf 7)
YELLOW := $(shell tput -Txterm setaf 3)
RESET  := $(shell tput -Txterm sgr0)

# Add the following 'help' target to your Makefile
# And add help text after each target name starting with '\#\#'
# A category can be added with @category
HELP_HELPER = \
    %help; \
    while(<>) { push @{$$help{$$2 // 'options'}}, [$$1, $$3] if /^([a-zA-Z\-\%]+)\s*:.*\#\#(?:@([a-zA-Z\-\%]+))?\s(.*)$$/ }; \
    print "usage: make [target]\n\n"; \
    for (sort keys %help) { \
    print "${WHITE}$$_:${RESET}\n"; \
    for (@{$$help{$$_}}) { \
    $$sep = " " x (32 - length $$_->[0]); \
    print "  ${YELLOW}$$_->[0]${RESET}$$sep${GREEN}$$_->[1]${RESET}\n"; \
    }; \
    print "\n"; }

help: ##prints help
	@perl -e '$(HELP_HELPER)' $(MAKEFILE_LIST)

########################################################################################################################
#
# CONTROL
#
########################################################################################################################

install: ##@control Install dependencies
	@make make-in-node MAKE_RULE=_install

_install: #@see install
	@echo "${YELLOW}installing dependencies${RESET}"
	@yarn install
	@yarn run lerna bootstrap
	@yarn run lerna ls

uninstall: ##@control Uninstall dependencies
	@yarn run lerna clean -- --yes
	@rm -rf bin

up: ##@control setup stack
	@make download-modd

	@${DOCKER_COMPOSE} up -d node
	@make install

	# setup storage
	#@${DOCKER_COMPOSE} up -d postgres elastic
	#@make wait-for-postgres
	#@make wait-for-elastic
	#@sleep 3

	#@${DOCKER_COMPOSE} up --remove-orphans -d

clean: ##@control Remove all components
	@echo "${YELLOW}Stopping stack and removing components${RESET}"
	@${DOCKER_COMPOSE} stop -t 0
	@${DOCKER_COMPOSE} rm -f

sync-docker-stack: ##@control run docker-compose
	@${DOCKER_COMPOSE} up --remove-orphans -d

dev: ##@control Watch for files changes and restart services accordingly
	@./bin/modd

restart-%: ##@control restart % service. To restart Quickly use QUICK=1
    ifdef QUICK
		@${DOCKER_COMPOSE} restart -t 0 ${*}
    else
		@${DOCKER_COMPOSE} restart ${*}
    endif

restart: ##@control restart all services. To restart Quickly use QUICK=1
    ifdef QUICK
		@${DOCKER_COMPOSE} restart -t 0
    else
		@${DOCKER_COMPOSE} restart
    endif

log: ##@control Print logs for all services
	@${DOCKER_COMPOSE} logs -f --tail=$${TAIL_LENGTH:-50}

log-%: ##@control Print logs for a given service (e.g. log-api)
	@${DOCKER_COMPOSE} logs --tail=$${TAIL_LENGTH:-50} -f ${*}

########################################################################################################################
#
# BUILD/PUBLISH
#
########################################################################################################################

build: build-webapp docker-build-webapp docker-build-api docker-ls ##@build Build all Docker images

build-webapp: ##@build Build webapp
	@echo "${YELLOW}Building webapp targeting env: \"${TARGET_ENV}\"${RESET}"
	@cd webapp && PUBLIC_URL=/webapp \
		REACT_APP_API_URL=/api/v1 \
		yarn run build

docker-build-webapp: ##@build Build webapp Docker image
	@echo "${YELLOW}Building webapp Docker image: \"${PRODUCT_NAME}/webapp:latest\"${RESET}"
	@cd webapp && docker build -t ${PRODUCT_NAME}/webapp:latest .

docker-build-api: ##@build Build API Docker image
	@echo "${YELLOW}Building API Docker image: \"${PRODUCT_NAME}/api:latest\"${RESET}"
	@cd api && docker build -t ${PRODUCT_NAME}/api:latest .

docker-ls: ##@build List local related Docker images
	@echo "${YELLOW}Available Docker images for: \"${PRODUCT_NAME}\"${RESET}"
	@docker images | grep ${PRODUCT_NAME}

########################################################################################################################
#
# TESTING
#
########################################################################################################################

check-security: ##@testing Check for potential security issues
	@cd api && ../node_modules/.bin/nsp check
	@cd webapp && ../node_modules/.bin/nsp check
	@cd website && ../node_modules/.bin/nsp check
	@find packages -mindepth 1 -maxdepth 1 -type d -exec bash -c "cd '{}' && ../../node_modules/.bin/nsp check" \; -o -quit;

test: test-api-unit ##@testing Run all tests

test-unit: ##@testing Run all unit tests
	@make make-in-node MAKE_RULE=_test-unit

_test-unit: #@see test-unit
	@cd api && yarn run test-unit -- --color

lint: ##@testing run eslint
	@make make-in-node MAKE_RULE=_lint

_lint: ##@testing run eslint
	@echo "${YELLOW}Running eslint${RESET}"
	@./node_modules/.bin/lerna run eslint -- --quiet

########################################################################################################################
#
# WEBSITE
#
########################################################################################################################

website-install: ##@website install website deps
	@cd website && yarn install

website-build: ##@website build static website
	@cd website && yarn run build

website-publish: website-build ##@website publish static website to github pages
	@cd website && yarn run deploy

########################################################################################################################
#
# API
#
########################################################################################################################

api-swagger-build: ##@api generate swagger API spec with resolved refs
	@echo "${YELLOW}Generating API swagger specification${RESET}"
	@cd api && yarn run swagger-gen

########################################################################################################################
#
# API CLIENT
#
########################################################################################################################

api-client-build: api-swagger-build ##@api-client build api-client (code & documentation)
	@echo "${YELLOW}Generating api-client${RESET}"
	@cp api/src/api/v1/spec/swagger.json packages/api-client
	@cd packages/api-client && yarn run build
	@cp -r packages/api-client/doc website/src/modules/doc/components/api_client

########################################################################################################################
#
# UTILS
#
########################################################################################################################

wait-for-postgres: ##@utils used to ensure posgresql is running
	@${DOCKER_COMPOSE} exec -T postgres /bin/bash -c \
    "while ! pg_isready > /dev/null 2> /dev/null; do \
        echo \"${YELLOW}Waiting for postgres to accept connections…${RESET}\"; \
        sleep 1; \
    done;"
	@echo "${GREEN}postgres is ready${RESET}"

wait-for-elastic: ##@utils used to ensure elastic is running
	@${DOCKER_COMPOSE} exec -T elastic /bin/bash -c \
	"while ! curl http://0.0.0.0:9200/ > /dev/null 2> /dev/null; do \
      	echo \"${YELLOW}Waiting for elastic to accept connections…${RESET}\"; \
      	sleep 3; \
    done;"
	@echo "${GREEN}elastic is ready${RESET}"

_%-should-be-up: ##@utils make sure % container is up
	@/bin/bash -c ' \
        IS_UP=`${DOCKER_COMPOSE} ps ${*} | grep Up`; \
        if [ -z "$${IS_UP}" ] ; \
            then echo "${RED}${*} is down. You should start stack through make up{RESET}"; exit -1; \
        fi \
    '

run-in-%: ##@utils Run a command in given service
    ifdef NO_DOCKER
		@${COMMAND}
    else
		@make _${*}-should-be-up
		@${DOCKER_COMPOSE} exec --user ${LOCAL_USER_UID}:${LOCAL_USER_GID} -T ${*} /bin/sh -c "${COMMAND}"
    endif

make-in-%: ##@utils Run a make command in given service
	@make run-in-${*} COMMAND="${ENV} make ${MAKE_RULE} args='${args}'"

download-modd: ##@utils Download modd watcher
	@mkdir -p ./bin
    ifeq ("$(wildcard ./bin/modd)","")
		@echo "${YELLOW}Downloading modd watcher${RESET}"
        ifeq ($(OS), Darwin)
			@curl -L https://github.com/cortesi/modd/releases/download/v0.4/modd-0.4-osx64.tgz | tar xvf - --strip-components=1 -C ./bin
        endif
        ifeq ($(OS), Linux)
			@curl -L https://github.com/cortesi/modd/releases/download/v0.4/modd-0.4-linux64.tgz | tar xvf - --strip-components=1 -C ./bin
        endif
    endif

