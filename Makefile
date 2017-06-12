.DEFAULT_GOAL      := help

PRODUCT_NAME       := flambo
DOCKER_USER        := plouc
DOCKER_TAG         ?= beta
NODE_IMAGE         := node:7
POSTGRES_IMAGE     := postgres:9-alpine
ELASTIC_IMAGE      := docker.elastic.co/elasticsearch/elasticsearch:5.3.0

OS                 := $(shell uname)
PACKAGES           := $(shell find packages -mindepth 1 -maxdepth 1 -type d -exec basename {} \;)

ifdef CI
    STACK_MODE := CI
else
    ifdef DEMO
        STACK_MODE := DEMO
    else
        STACK_MODE := DEV
    endif
endif

STACK_SUFFIX   := $(shell echo ${STACK_MODE} | tr '[A-Z]' '[a-z]')
STACK_NAME     := "${PRODUCT_NAME}-${STACK_SUFFIX}"

DOCKER_COMPOSE := export \
    NODE_IMAGE=${NODE_IMAGE} \
    POSTGRES_IMAGE=${POSTGRES_IMAGE} \
    ELASTIC_IMAGE=${ELASTIC_IMAGE}; \
    docker-compose \
    -p ${STACK_NAME} \
    -f docker-compose-${STACK_SUFFIX}.yml

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
	@echo "${YELLOW}Launching stack in ${RESET}${WHITE}${STACK_MODE}${RESET}${YELLOW} mode${RESET} (${STACK_NAME})"

    ifeq ($(STACK_MODE), DEV)
		@make download-modd
		@${DOCKER_COMPOSE} up -d node
		@make install
    endif

    ifeq ($(STACK_MODE), DEMO)
		@echo "${YELLOW}Pulling up to date service images${RESET}"
		@${DOCKER_COMPOSE} pull
    endif

	@echo "${YELLOW}Initializing postgres & elastic${RESET}"
	@${DOCKER_COMPOSE} up --remove-orphans -d postgres elastic
	@make wait-for-postgres
	@make wait-for-elastic
	@sleep 3

	@make dc-up

ifeq ($(STACK_MODE), DEV)
		@make storage-reset
endif

stop: ##@control Stop all services. To stop Quickly use QUICK=1
    ifdef QUICK
		@${DOCKER_COMPOSE} stop -t 0
    else
		@${DOCKER_COMPOSE} stop
    endif

clean: ##@control Remove all components
	@echo "${YELLOW}Stopping stack and removing components${RESET}"
	@${DOCKER_COMPOSE} stop -t 0
	@${DOCKER_COMPOSE} rm -f

dc-up: ##@control run docker-compose
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

bash-%: ##@control Get a bash in given running service
	@make _${*}-should-be-up
	@${DOCKER_COMPOSE} exec ${*} /bin/bash

########################################################################################################################
#
# STORAGE PG/ES
#
########################################################################################################################

storage-reset: ##@storage reset storage (postgres & elasticsearch)
	@make storage-init

storage-init: ##@storage Init storage (run postgres migrations & init es mapping)
	@make run-in-api COMMAND="cd api && yarn run migrate"
	@make run-in-api COMMAND="cd api && yarn run init-elastic"
	@make run-in-api COMMAND="cd api && yarn run load-data"

########################################################################################################################
#
# BUILD
#
########################################################################################################################

build: ##@build Build all Docker images
	@make build-webapp WEBAPP_PUBLIC_URL=/webapp WEBAPP_API_URL=/api/v1
	@make build-api-spec
	@make build-website
	@make docker-build-webapp
	@make docker-build-api
	@make docker-build-bot
	@make docker-ls

build-webapp: ##@build Build webapp
	@echo "${YELLOW}Building webapp${RESET}"
	@cd webapp && PUBLIC_URL=${WEBAPP_PUBLIC_URL} \
		REACT_APP_API_URL=${WEBAPP_API_URL} \
		yarn run build

build-api-client: ##@build Build api-client (code & documentation)
	@echo "${YELLOW}Generating api-client${RESET}"
	@cp api/src/api/v1/spec/swagger.json packages/api-client
	@cd packages/api-client && yarn run build
	@cp -r packages/api-client/doc website/src/modules/doc/components/api_client

build-website: ##@build Build static website
	@echo "${YELLOW}Building website${RESET}"
	@cd website && yarn run build

build-api-spec: ##@build Generate swagger API spec with resolved refs
	@echo "${YELLOW}Generating API swagger specification${RESET}"
	@cd api && yarn run swagger-gen

docker-build-%: ##@build Build given Docker image, must be a package or top level directory (e.g. docker-build-api)
	@echo "${YELLOW}Building ${*} Docker image: \"${DOCKER_USER}/${PRODUCT_NAME}-${*}:${DOCKER_TAG}\"${RESET}"
	@if [[ "${PACKAGES}" =~ " ${*} " ]]; then \
        echo "building from package packages/${*}"; \
        cd packages/${*} && docker build -t ${DOCKER_USER}/${PRODUCT_NAME}-${*}:${DOCKER_TAG} .; \
    else \
        cd ${*} && docker build -t ${DOCKER_USER}/${PRODUCT_NAME}-${*}:${DOCKER_TAG} .; \
    fi
	@echo "${GREEN}Successfully built \"${DOCKER_USER}/${PRODUCT_NAME}-${*}:${DOCKER_TAG}\"${RESET}"

docker-ls: ##@build List local related Docker images
	@echo "${YELLOW}Available Docker images for: \"${PRODUCT_NAME}\"${RESET}"
	@docker images | grep ${PRODUCT_NAME}

########################################################################################################################
#
# PUBLISH
#
########################################################################################################################

publish: build ##@publish Build & publish all Docker images & packages
	@echo "${YELLOW}Building & publishing images/packages/website${RESET}"
	@make docker-publish-webapp
	@make docker-publish-api
	@make docker-publish-bot
	@make publish-website

publish-website: ##@publish Publish static website to github pages
	@cd website && yarn run deploy

docker-publish-%: ##@publish Publish given Docker image (e.g. docker-publish-api)
	@echo "${YELLOW}Publishing Docker image: \"${DOCKER_USER}/${PRODUCT_NAME}-${*}:${DOCKER_TAG}\"${RESET}"
	@docker push ${DOCKER_USER}/${PRODUCT_NAME}-${*}:${DOCKER_TAG}

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

_test-unit: # see test-unit
	@cd api && yarn run test-unit -- --color

lint: ##@testing Run eslint on directories exposing an eslint script in package.json
	@make make-in-node MAKE_RULE=_lint

_lint: # see lint
	@echo "${YELLOW}Running eslint${RESET}"
	@./node_modules/.bin/lerna run eslint -- --quiet

########################################################################################################################
#
# WEBSITE
#
########################################################################################################################

website-install: ##@website install website deps
	@cd website && yarn install

########################################################################################################################
#
# DEPLOY
#
########################################################################################################################

deploy-aws-plan: ##@deploy Deploy flambo to AWS
	@$(eval PUBLIC_IP := $(shell curl -s ipinfo.io/ip))
	@cd deploy/aws && ./generate_files.sh
	@cd deploy/aws && terraform plan \
        -var admin_cidr_ingress='"${PUBLIC_IP}/32"'

deploy-aws: ##@deploy Deploy flambo to AWS
	@$(eval PUBLIC_IP := $(shell curl -s ipinfo.io/ip))
	@cd deploy/aws && ./generate_files.sh
	@cd deploy/aws && terraform apply \
        -var admin_cidr_ingress='"${PUBLIC_IP}/32"'

deploy-aws-show:
	@cd deploy/aws && terraform show

deploy-aws-destroy: ##@deploy Destroy flambo AWS resources
	@$(eval PUBLIC_IP := $(shell curl -s ipinfo.io/ip))
	@cd deploy/aws && terraform destroy \
        -var admin_cidr_ingress='"${PUBLIC_IP}/32"'

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

