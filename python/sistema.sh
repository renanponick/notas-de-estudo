#!/bi/bash
echo "Este script irá buscar informações sobre o sistema operacional. Executar?[s/n]."
read RESPOSTA
if [ $RESPOSTA != "s" ] 
then
    echo "Execução interrompida"
    exit
else
    echo "Buscando dados sobre o sistema."
    echo "..............................."
    echo "Data e Hora"
    date
    echo "Uso do Disco"
    df
    echo "Usuários logados"
    w
fi