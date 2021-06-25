.PHONY: help

datetime			:= $(shell date +"%Y-%m-%d-%H-%M")
date					:= $(shell date +"%Y-%m-%d")

local_path		:= $(PWD)
remote_website				:= ~/dev/map-3d

help: ## Affiche cette aide
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "} {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

deploy-to-berlin: ## Envoie le frontend
	rsync -av --delete \
		--exclude-from .rsyncignore \
		$(local_path)/dist/ \
		berlin:$(remote_website)
