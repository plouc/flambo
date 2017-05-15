.DEFAULT_GOAL := help

PRODUCT_NAME ?= flambo

ifdef CI
    DOCKER_COMPOSE_FILE ?= "docker-compose-ci.yml"
else
    DOCKER_COMPOSE_FILE ?= "docker-compose-full.yml"
endif

DOCKER_COMPOSE ?= docker-compose -f ${DOCKER_COMPOSE_FILE}


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

clean: ##@control Remove all components
	@${DOCKER_COMPOSE} stop -t 0
	@${DOCKER_COMPOSE} rm -f

up: ##@control setup stack
	@${DOCKER_COMPOSE} up -d postgres elastic
	@make wait-for-postgres
	@make wait-for-elastic
	@sleep 3
	@${DOCKER_COMPOSE} up -d

log: ##@control Print stdout of all servers
	@${DOCKER_COMPOSE} logs --tail=$${TAIL_LENGTH:-100}

log-%: ##@control Get stdout of running server (log-api, log-postgresql)
	@${DOCKER_COMPOSE} logs --tail=$${TAIL_LENGTH:-100} ${*}

########################################################################################################################
#
# TESTING
#
########################################################################################################################

test: test-api-unit ##@testing Run all tests

test-api-unit: ##@testing Run API unit tests
	@cd api && yarn run test-unit

install:
	@cd api && yarn install
	@cd webapp && yarn install
	@cd sources/meetup && yarn install
	@cd sources/rss && yarn install
	@make link-packages

link-packages:
	@cd sources/meetup && yarn link
	@cd sources/rss && yarn link
	@cd api yarn link flambo-source-meetup
	@cd api yarn link flambo-source-rss

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

run-in-%: ##@utils Run a make command in % container
	@make _${*}-should-be-up
	@${DOCKER_COMPOSE} exec -T ${*} /bin/bash -c "${COMMAND}"
