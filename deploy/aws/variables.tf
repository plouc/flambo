variable "aws_access_key" {}
variable "aws_secret_key" {}

variable "aws_region" {
  description = "The AWS region to create things in."
  default     = "ap-northeast-1"
}

variable "flambo_api_version" {
  description = "The version of flambo API to use (docker tag)"
  default     = "beta"
}

variable "az_count" {
  description = "Number of AZs to cover in a given AWS region"
  default     = "2"
}

variable "key_name" {
  description = "Name of AWS key pair"
}

variable "instance_type" {
  default     = "t2.small"
  description = "AWS instance type"
}

variable "asg_min" {
  description = "Min numbers of servers in ASG"
  default     = "1"
}

variable "asg_max" {
  description = "Max numbers of servers in ASG"
  default     = "2"
}

variable "asg_desired" {
  description = "Desired numbers of servers in ASG"
  default     = "1"
}

variable "admin_cidr_ingress" {
  description = "CIDR to allow tcp/22 ingress to EC2 instance"
}

variable "webapp_bucket" {
  description = "Name of the bucket to use for webapp static hosting"
  default     = "flambo-webapp"
}

variable "db_name" {
  description = "Name of the postgres database"
  default     = "flambo"
}

variable "db_user" {
  description = "User used for postgres"
  default     = "flambo"
}
variable "db_password" {
  description = "Postgres user's password"
}

# see generate_files.sh
variable "mime_types" {
  default = {
    htm  = "text/html"
    html = "text/html"
    css  = "text/css"
    js   = "application/javascript"
    map  = "application/javascript"
    json = "application/json"
    png  = "image/png"
    ico  = "image/x-icon"
    gif  = "image/gif"
  }
}