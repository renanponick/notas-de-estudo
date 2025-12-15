Inicialmente perguntaria se este sistema precisa seguir em padrão mvp ou se ele pode ser construido do inicio ao fim sem que seja entregue ao cliente em partes, afinal o prazo tem impacto direto nas funcionalidades da aplicação

Depois seria necessário elencar qual aspecto é mais importante, disponibilidade ou confiabilidade, para saber se é valida a implementação de um cache (visot que o mesmo precisa de maior conhecimento de código e tempo para desenvolvimento, por envolve cacheamento, invalidação e outros controles necessários para o cache)

Outra pergunta válida é sobre o banco, um banco SQL teria maior integridade de dados, quanto um NOSQL se da melhor com a questão de grandes volumes, qual destes aspectos é mais relevante? (vai de encontro com a questão de confiabilidade e disponibilidade)

Vou seguir descrevendo como um modelo MVP afinal a maioria dos negocios é construido dessa maneira, com base nas informações que tenho

Sobre a infraestrutura/arquitetura:

    Hospedaria na AWS, por questões de custo e melhor maleabilidade dos serviços oferecidos, fazendo controle do mesmo através de IaC, com TF e Ansible
    
    Para que o negócio seja escalável precisariamos de um ALB na AWS, instancias que escala horizontalmente sozinhas caso a CPU ou RAM atinja 80% do uso afim de suprir a alta demanda, e que diminuam sozinhas caso a quantidade de CPU e RAM for inferior a 40% (mas este caso poderá ser aplicado em V2 ou V3 conforme o produto for crescendo e demandando performance)
    
    Seria necessário usar Docker Swarm ou Kubernates para a orquestração dos serviços e MS, a própria utilização do docker swarm com 3 containers dentro de uma instancia ajuda inicialmente no balanceamento de carga, claro que ele não substitui o ALB, porém de mandeira inicial é muito útil.
    
    Banco principal seria um Postgres, pois trabalha bem em grande escala e é possivel criar READ-Replicas para consulta, fazendo assim com que o banco de escrita não fique sobrecarregado com o aumento de demanda de leitura, porém neste caso é possivel se analisar um banco NOSQL por conta da grande quantidade de volumes, então só migrar para NoSQL em caso de crescimento

    Entre o banco e a aplicação é interessante adicionar uma camada de cache, o Redis é um bom banco para cacheamento de dados, visto que o importante.

    O disparo de push notification pode ser resolvido com um serviço da AWS, sendo ele o SNS e precisa integrar com as Stores, apple principalmente por questões de certificado.

    É interessante aplicar MFA e criptografia de dados para a aplicação, afinal trabalhariamos com mensagens que podem ou não ter dados sensiveis, então criptografia e segurança multi fator são bem vindas, porém a inclusão destes questios pode impactar diretamente no prazo de entrega do serviço em si - RED FLAG

    A infraestrutura contaria tambékm com NGINX para servir de proxy reverso e aumentar a segurança inferindo algumas regras de acesso para os serviços

    O rabbitmq poderia auxiliar na troca de mensageria async, dessa forma os endpoints não ficam sobrecarregados aguardando resposta

    é importante também manter log para auditoria, então optaria pelo Cloudwatch da AWS afim de registro de logs
    monitoramento do serviços tambémé importante, adicionar prometheus ao serviços e um serviço aparte para o grafana afim de consumir os dados exportados com prometheus ajuda a entender como a aplicação está

Sobre o software

    Trabalharia dentro da minha stack, afinal se trata de uma aplicação web/mobile, então escolheria React e React-native para front/mobile, e typeScript para backend, isso facilitaria o desenvolvimento visto que a linguagem utilziada para se trabalhar em ambas as frentes é igual

    Como comentado anteriormente precisariamos trabalhar com criptografia no disparo da mensagem

    O usuario precisará logar com email e senha para receber um bearer token, que deverá ser enviado durante a troca de mensageria afim de autenticar e autorizar a troca de mensagens

    fluxo de dados

    a mensagem do usuario chega -> cai em um endpoint para registrar -> endpoint joga em uma fila rabbitmq para processamento e responde ao cliente que a msg foi recebida
        um worker contendo bullmq faz a orquestração do processamento das mensagens recebidas -> armazenadno no banco e notificando a outra ponta sobre a msg (invalidando o cache)
            Usuario da outra ponta abre a notificação, entnrando na conversa e busca as ultimas 10 mensagens (cacheando informação) e o fluxo retorna ao inicio.
    