resource "aws_elasticsearch_domain" "es" {
  domain_name           = "flambo-es"
  elasticsearch_version = "5.1"

  cluster_config {
    instance_type = "m3.medium.elasticsearch"
  }

  advanced_options {
    "rest.action.multi.allow_explicit_index" = "true"
  }

  snapshot_options {
    automated_snapshot_start_hour = 23
  }

  tags {
    app = "flambo"
  }
}