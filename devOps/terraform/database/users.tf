resource "random_password" "passwords" {
  length            = 5
  special           = true
  count             = 3
  override_special  = "!#$%&*()-_=+[]{}<>:?"
  # keepers = {
  #   trigger = timestamp()
  # }
}

locals {
  users = [ "teste", "admin", "batata" ]
  passwords = random_password.passwords[*].result

  full_users = { for i, k in local.passwords : local.users[i] => k }
}
output "all" {
  value = local.full_users
}


# Users
resource "postgresql_role" "teste_readonly" {
  for_each = local.full_users
  
  provider            = postgresql.main
  login               = true
  name                = each.key
  password            = each.value
  roles               = [postgresql_role.readonly.name]
  skip_reassign_owned = true
}

resource "postgresql_role" "teste_admin" {
  provider            = postgresql.main
  login               = true
  name                = "testeadm"
  password            = random_password.passwords[2].result
  roles               = [postgresql_role.admin.name]
  skip_reassign_owned = true
}

output "teste_readonly_password" {
  value = postgresql_role.teste_readonly[*]
}
output "teste_admin" {
  value = postgresql_role.teste_admin.password
}