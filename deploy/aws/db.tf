resource "aws_db_instance" "postgres" {
  allocated_storage    = 5
  storage_type         = "standard"
  engine               = "postgres"
  instance_class       = "db.t2.micro"
  name                 = "${var.db_name}"
  username             = "${var.db_user}"
  password             = "${var.db_password}"

  tags {
    app = "flambo"
  }
}