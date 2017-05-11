provider "heroku" {
  email   = "${var.heroku_email}"
  api_key = "${var.heroku_api_key}"
}

resource "heroku_app" "flambo" {
  name   = "flambo"
  region = "us"

  config_vars {
    FOOBAR = "baz"
  }

  buildpacks = [
    "heroku/go"
  ]
}

resource "heroku_addon" "postgres" {
  app  = "${heroku_app.flambo.name}"
  plan = "heroku-postgresql:hobby-dev"
}

resource "heroku_addon" "bonsai" {
  app  = "${heroku_app.flambo.name}"
  plan = "bonsai:sandbox-10"
}