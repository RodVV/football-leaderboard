  Projeto individual onde coloquei em pratica conhecimentos de typescript no backend, sequelize e docker. Somente o backend foi feito por mim.
  
  
  O `TFC` é um site informativo sobre partidas e classificações de futebol! 

  No time de desenvolvimento do `TFC`, seu *squad* ficou responsável por desenvolver uma API (utilizando o método `TDD`) e também integrar *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, foi construido **um back-end dockerizado utilizando modelagem de dados através do Sequelize**. O front-end ja foi feito pelo time da Trybe.
  
 O Projeto foi feito com base na metodologia TDD de implementacao de testes. Para os testes foram usados chai e sinon.



Esse projeto é composto de 4 seções principais:

1. Users e Login

2. Times

3. Partidas

4. Placar


Database
  - Comece rodando o comando `npm run build` na pasta do `back-end` para fazer o _build_ da aplicação;
  
  

O que foi feito:



## Seção 1: Users e Login



- A rota (`/login`);

- O body da requisição possui o seguinte formato:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```

- O endpoint `/login` no back-end permite o acesso com dados válidos no front-end

  - rota do tipo `POST`;
  
  
- Se o login foi feito com sucesso, o resultado retornado deverá ser similar ao exibido abaixo, com um status http `200`:


  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc" // Aqui deve ser o token gerado pelo backend.
  }
  ```


  # Validacoes de login:


  - Se o login não tiver o campo "email", o resultado retornado deverá ser a mensagem abaixo, com um status http `400`:
  ```json
    { "message": "All fields must be filled" }
  ```


  - Se o login não tiver o campo "password", o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
  ```json
    { "message": "All fields must be filled" }
  ```


  - Se o login tiver o "email" **inválido**, o resultado retornado será similar ao exibido abaixo, com um status http `401`:
  ```json
    { "message": "Incorrect email or password" }
  ```


  - Se o login tiver a "senha" **inválida**, o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
  ```json
    { "message": "Incorrect email or password" }
  ```



 # O endpoint `/login/validate` no back-end:


  - Rota `GET` que recebe um `header` com parâmetro `authorization`, onde fica armazenado o token gerado no login;


  A resposta deve ser de status `200` com um `objeto` contendo a `role` do *user*:
  ```json
    { "role": "admin" }
  ```



## Seção 2: Times


# Endpoint `/teams` no back-end retorna todos os times corretamente

  - Rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
[
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  ...
]
```


# Endpoint `/teams/:id` no back-end retorna dados de um time específico

  - Rota `GET` com resposta com status `200` e com um `json` contendo o retorno no seguinte modelo:

```json
{
  "id": 5,
  "teamName": "Cruzeiro"
}
```


## Seção 3: Partidas



### Endpoint `/matches` retorna os dados na tela de partidas no front-end.

  - Rota `GET` e retorna uma lista de partidas;

    Exemplo de retorno:
    ```json
    [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Grêmio"
        }
      },
      ...
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "teamHome": {
          "teamName": "São Paulo"
        },
        "teamAway": {
          "teamName": "Internacional"
        }
      }
    ]
    ```

  -


# O endpoint `/matches` torna possível filtrar as partidas em andamento na tela de partidas do front-end

  - Rota do tipo `GET` e retorna uma lista de partidas filtradas;

  - Essa requisição deverá usar `query string` para definir o parâmetro:
    ex: `matches?inProgress=true`

  Exemplo de retorno da requisição:
  ```json
  [
    {
      "id": 41,
      "homeTeam": 16,
      "homeTeamGoals": 2,
      "awayTeam": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeam": 6,
      "homeTeamGoals": 1,
      "awayTeam": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "teamHome": {
        "teamName": "Ferroviária"
      },
      "teamAway": {
        "teamName": "Avaí/Kindermann"
      }
    }
  ]
  ```


# Endpoint `/matches` tambem filtra as partidas finalizadas na tela de partidas do front-end


  - Rota do tipo `GET` e retornar uma lista de partidas filtradas;
  

  - Essa requisição deverá usar `query string` para definir o parâmetro.
    ex: `matches?inProgress=false`
    

  Exemplo de retorno da requisição:
  
  ```json
  [
    {
      "id": 1,
      "homeTeam": 16,
      "homeTeamGoals": 1,
      "awayTeam": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "São Paulo"
      },
      "teamAway": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeam": 9,
      "homeTeamGoals": 1,
      "awayTeam": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "teamHome": {
        "teamName": "Internacional"
      },
      "teamAway": {
        "teamName": "Santos"
      }
    }
  ]
  ```


# Endpoint `/matches` tambem salva uma partida com o status de inProgress como true no banco de dados

  - Rota do tipo `POST` e retorna a partida inserida no banco de dados;

  - A partida só pode ser criada com token JWT validado;

  - O corpo da requisição terá o seguinte formato:
  ```json
  {
    "homeTeam": 16, // O valor deve ser o id do time
    "awayTeam": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2,
    "inProgress": true 
  }
  ```

  - Caso a partida seja inserida com sucesso, deve-se retornar os dados da partida, com _status_ `201`:

  ```json
  {
    "id": 1,
    "homeTeam": 16,
    "homeTeamGoals": 2,
    "awayTeam": 8,
    "awayTeamGoals": 2,
    "inProgress": true,
  }
  ```


# Endpoint `/matches/:id/finish` possibilita alterar o status inProgress de uma partida para false no banco de dados

  - Rota do tipo `PATCH`;

  - Será recebido o `id` pelo parâmetro da URL;

  - Deve-se retornar, com um status `200`, a seguinte mensagem:

  ```json
  { "message": "Finished" }
  ```


# Endpoint `/matches` de forma que não seja insere uma partida com times iguais

  - Não deve ser possível criar uma partida com o mesmo time, por exemplo: Barcelona x Barcelona. Caso isso ocorra, deve-se retornar, com um status `401`, a seguinte mensagem::

  ```json
  { "message": "It is not possible to create a match with two equal teams" }
  ```


# Endpoint `/matches`  que não insere uma partida com um time que não existe na tabela teams

  - Caso algum dos times não esteja cadastrado no banco de dados, deve-se retornar, com um status `404,` a seguinte mensagem:

  ```json
  { "message": "There is no team with such id!" }
  ```


# Endpoint `/matches` precisa de um token válido

  - Caso o token informado não seja válido, deve-se retornar, com um status `401`, a seguinte mensagem:

  ```json
  { "message": "Token must be a valid token" }
  ```


# Endpoint `/matches/:id` possibilita atualizar partidas em andamento

  - Endpoint do tipo `PATCH`;

  - Será recebido o `id` pelo parâmetro da URL;

  - Será avaliado que é possível alterar o resultado de uma partida.

  - O corpo da requisição terá o seguinte formato:
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```

## Seção 4: Leaderboards (placares)

  ▶️ Para construir a classificação dos times, foram seguidas as seguintes regras de negócios:

    - `Classificação`: Posição na classificação;
    - `Time`: Nome do time;
    - `P`: Total de Pontos;
    - `J`: Total de Jogos;
    - `V`: Total de Vitórias;
    - `E`: Total de Empates;
    - `D`: Total de Derrotas;
    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos;
    - `SG`: Saldo total de gols;
    - `%`: Aproveitamento do time.

    

  - Todas as regras de negócio e cálculos necessários deverão ser realizados no seu back-end. A aplicação front-end apenas renderizará essas informações.


  - Para calcular o `Total de Pontos`:

    - O time `vitorioso`: marcará +3 pontos;
    - O time `perdedor`: marcará 0 pontos;
    - Em caso de `empate`: ambos os times marcam +1 ponto.
    

  - Para o campo `Aproveitamento do time (%)`, que é a porcentagem de jogos ganhos:

    - `P`: Total de Pontos;
    - `J`: Total de Jogos.

   
  - Para calcular `Saldo de Gols`:

    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos.



  - O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no `Total de Pontos`, você deve levar em consideração os seguintes critérios para desempate:

  **Ordem para desempate**

  1º Total de Vitórias;
  2º Saldo de gols;
  3º Gols a favor;
  4º Gols sofridos.


  

**Exemplo de retorno esperado:**

```json
[
  {
    "name": "Palmeiras",
    "totalPoints": 13,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 1,
    "totalLosses": 0,
    "goalsFavor": 17,
    "goalsOwn": 5,
    "goalsBalance": 12,
    "efficiency": 86.67
  },
  {
    "name": "Corinthians",
    "totalPoints": 12,
    "totalGames": 5,
    "totalVictories": 4,
    "totalDraws": 0,
    "totalLosses": 1,
    "goalsFavor": 12,
    "goalsOwn": 3,
    "goalsBalance": 9,
    "efficiency": 80
  },
  {
    "name": "Santos",
    "totalPoints": 11,
    "totalGames": 5,
    "totalVictories": 3,
    "totalDraws": 2,
    "totalLosses": 0,
    "goalsFavor": 12,
    "goalsOwn": 6,
    "goalsBalance": 6,
    "efficiency": 73.33
  },
  ...
]
```

  - Os endpoints dessa seção, irão alimentar uma tabela idêntica ao exemplo abaixo no front-end:

    | Classificação | Time        | P   | J   | V   | E   | D   | GP  | GC  | SG  | %    |
    | ------------- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- | ---- |
    | 1             | Ferroviária | 38  | 15  | 12  | 2   | 1   | 44  | 13  | 31  | 84.4 |







# Endpoint `/leaderboard/home` filtra as classificações dos times `da casa` na tela de classificação do front-end com os dados iniciais do banco de dados

  - Endpoint do tipo `GET`;

  - Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.

 
 
# Endpoint `/leaderboard/home` filtra as classificações dos times da casa na tela de classificação do front-end, e atualiza a tabela ao inserir uma partida, ex: Corinthians 2 X 1 Internacional

  
  

# Endpoint `/leaderboard/away`, filtra as classificações dos times quando visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados

  - Do tipo `GET`;

  - Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.



# Endpoint `/leaderboard/away` filtra as classificações dos times quando visitantes na tela de classificação do front-end e atualiza a tabela ao inserir uma partida, ex: Corinthians 2 X 1 Internacional

  
  



# Endpoint `/leaderboard` filtra a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados

  - tipo `GET`;


  - Partidas que estiverem em andamento (não foram finalizadas) não devem ser consideradas.




# Endpoint /leaderboard filtra a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida uma nova partida, ex: Flamengo 3 X 0 Napoli-SC



# Endpoint /leaderboard filtra a classificação geral dos times na tela de classificação do front-end e atualiza a tabela ao inserir uma partida, ex: Minas Brasília 1 X 0 Ferroviária

  
