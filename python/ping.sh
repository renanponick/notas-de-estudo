#!/bi/bash
echo "Este script fará pings continuos ao alvo. Executar? [s/n]"
read RESPOSTA
if [ $RESPOSTA != "s" ] 
then
    echo "Execução interrompida"
    exit
else
    echo "Qual endereço ip pinga?"
    read IP
    echo "Quantos pings executar?"
    read PINGS
    echo "Inicializando ping....."
    sleep 2
    for n in $(seq $PINGS)
    do
        ping -c 1 $IP
    done 

    ping -c $PINGS $IP # -c é a quantidade de pings para executar
fi