Exercício: Sistema de Mensageria Interna
Imagine que você precisa projetar um sistema de mensagens internas para uma aplicação (tipo Slack simplificado).
Requisitos:
Cada usuário pode enviar mensagens para outro usuário ou para um grupo.
As mensagens devem ser armazenadas de forma persistente.
O sistema deve escalar para milhares de usuários online ao mesmo tempo.
Usuários precisam receber notificações em tempo real (quando estiverem conectados).
Histórico de mensagens deve ser recuperável rapidamente (ex.: carregar as últimas 50 mensagens de um chat).
Sua missão:
Explique passo a passo como projetaria o sistema.
Quais componentes você criaria?
Que tecnologias/serviços você usaria (SQL, NoSQL, filas, cache…)?
Como lidaria com escalabilidade?
Desenhe (mentalmente ou descrevendo) uma arquitetura de alto nível.
Fale trade-offs entre decisões (ex.: usar WebSockets x polling, SQL x NoSQL, cache x custo de memória).