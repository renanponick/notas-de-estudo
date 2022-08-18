resource "random_password" "passwords" {
  length            = 5
  special           = true
  count             = 3
  override_special  = "!#$%&*()-_=+[]{}<>:?"
}

#
# Users
resource "postgresql_role" "teste_readonly" {
  for_each            = {
        "batata" = random_password.passwords[0].result,
        "teste" = random_password.passwords[1].result
    }
  
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
  value = postgresql_role.teste_readonly["batata"].password
}
output "teste_admin" {
  value = postgresql_role.teste_admin.password
}