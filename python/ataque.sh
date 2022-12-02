#!/bin/bash

# Endereço de rede
ifconfig | grep "broadcast" | cut -d "n" -f 2 | cut -d " " -f 2 | cut -d "." -f 1,2,3 > redes

#endereço de rede para variavel
REDE=$(cat redes) 
echo $REDE | cut -d " " -f 4 > rede
REDESEC=$(cat rede)
#Verificando rede
for ip in $(seq 254)
do

	ping -c 1 $REDESEC.$ip | grep "64" | cut -d " " -f 4 | cut -d ":" -f 1 >> resultado &
done

#scan portas
sudo nmap -p 22,80,443,53 -iL resultado
