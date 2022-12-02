import datetime

hoje = datetime.date.today()
ano_nascimento = int(input("Ano de nascimento: "))
ano_atual = hoje.year
idade = ano_atual-ano_nascimento

resultado = "Sua idade é " + str(idade) + " anos"

if(idade <= 10):
    print (resultado)
    print ("Você é uma criança, nem pense em dirigir.")
elif(idade >= 18):
    print (resultado)
    print ("Você já pode dirigir.")
else:
    print (resultado)
    print ("Você ainda não pode dirigir.")
    
