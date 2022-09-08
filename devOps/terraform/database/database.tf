# Define providers
terraform {
  required_providers {
    postgresql = {
      source = "terraform-providers/postgresql"
    }
  }
  required_version = ">= 0.13"
}
#
# Connect the database
provider "postgresql" {
  alias = "main"
  host = "localhost" 
  port = "5432"
  username = "postgres"
  database = "postgres"
  password = "123456"
  superuser = false
  sslmode = "disable"
}
#
# Create the database
resource "postgresql_database" "teste" {
  provider = postgresql.main
  name     = "teste"
}
#
# Roles
resource "postgresql_role" "admin" {
  provider = postgresql.main
  create_database = true
  name     = "admin123"
  login = true
  password = "123"
}
resource "postgresql_role" "readonly" {
  provider = postgresql.main
  name     = "readonly2"
}
#
# Schemas
resource "postgresql_schema" "teste" {
  depends_on = [ postgresql_database.teste ]
  provider = postgresql.main
  database = "teste"
  for_each = toset(["public"])
  name     = each.value

  policy {
    role   = postgresql_role.readonly.name
    usage  = true
  }

  policy {
    role   = postgresql_role.admin.name
    usage  = true
    create = true
  }
}
#
# Permissions
resource "postgresql_grant" "readonly" {
  depends_on = [ postgresql_database.teste, postgresql_schema.teste  ]
  for_each = toset(["public"])
  provider    = postgresql.main
  role        = postgresql_role.readonly.name
  database    = "teste"
  schema      = each.value
  object_type = "table"
  privileges  = ["SELECT"]
}
# resource "postgresql_grant" "admin" {
#   depends_on = [ postgresql_database.teste, postgresql_schema.teste  ]
#   for_each = toset(["public"])
#   provider    = postgresql.main
#   role        = postgresql_role.admin.name
#   database    = "teste"
#   schema      = each.value
#   object_type = "table"
#   privileges  = ["SELECT", "INSERT", "UPDATE", "DELETE", "TRUNCATE", "REFERENCES"]
# }
resource "postgresql_grant" "admin2" {
  depends_on = [ postgresql_database.teste, postgresql_schema.teste ]
  provider    = postgresql.main
  role        = "admin123"
  database    = "teste"
  object_type = "database"
  privileges  = ["CREATE"]
  with_grant_option = "true"
}