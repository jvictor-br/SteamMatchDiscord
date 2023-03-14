
# Steam Match Discord

Um bot do Discord para encontrar jogos em comum entre players


[![MIT License](https://camo.githubusercontent.com/3dbcfa4997505c80ef928681b291d33ecfac2dabf563eb742bb3e269a5af909c/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f496c65726961796f2f6d61726b646f776e2d6261646765733f7374796c653d666f722d7468652d6261646765)](https://choosealicense.com/licenses/mit/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)]()
[![JS](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)]()
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)]()
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)




## Onde me encontrar

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jvictor-br/SteamMatchDiscord)
[![Discord](https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/HNfKw8CDWd)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/jvferreirasantana/)
[![Steam](https://img.shields.io/badge/Steam-000000?style=for-the-badge&logo=steam&logoColor=white)](https://steamcommunity.com/id/VictorOficial/)






## Stack utilizada

**Back-end:** Node, Express

**Hospedagem:** Firebase, Firestore


## Funcionalidades

- Bot com Slash Commands, a forma mais atual de criação de Bots para discord
- Encontrar jogos em comum entre jogadores do mesmo canal de voz
- Fazer sorteio usando resultado de busca, gerando um jogo aleatório que ambos possuem
- Feedback rápido de comandos
- Descrição de comandos
- Sincronização com Firebase
- Facil criação de novos comandos
#### Comandos exclusivos de ADMs:
- Vinculação de um usuário a sua conta Steam via id64 da Steam
- Vinculação de um usuário a sua conta Steam via link do perfil da Steam
- Vinculação de um usuário a sua conta Steam via nickname da Steam
- Vinculação de jogos ao usuário de forma controlada, por padrao a cada 3 horas, evitando spam e sobrecarregamento de API
- Opção para ignorar tempo de espera para nova vinculação de jogos ao usuário



## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/jvictor-br/SteamMatchDiscord
```

Entre no diretório do projeto

```bash
  cd SteamMatchDiscord
```

Instale as dependências

```bash
  npm install
```

Após configurar as variáveis de ambiente, inicie o servidor com

```bash
  npm run start
```


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

### Crie sua aplicação aqui https://discord.com/developers/ para receber as seguintes keys

`APP_ID` Encontre em /General Information

`PUBLIC_KEY` Encontre em /General Information

`DISCORD_TOKEN` Encontre em /Bot

`GUILD_ID` ID do servidor discord que será adicionado

### Gere sua API_KEY da Steam aqui https://steamcommunity.com/dev/apikey

`API_KEY` Chave disponibilizada pela Steam

### Outras

`PORT` Qual a porta que seu servidor deve rodar

## Firestore

1 Crie sua aplicação Firestore aqui https://console.firebase.google.com/

2 Clique na engrenagem ao lado de `Visão geral do Projeto`

3 Role a página até o fim

4 Procure por `Configuração do SDK` e clique em `Config`

Deve encontrar algo parecido com isso:
```
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxx"
};
```

5 Copie o código que encontrou e cole dentro do seguinte código:
```
module.exports = {

                                COLE AQUI

};
```

6 Você terá algo parecido com isso:
```
module.exports = {
    const firebaseConfig = {
        apiKey: "xxxxxxxxxxxxxxxxxxxxxx",
        authDomain: "xxxxxxxxxxxxxxxxxxxx",
        databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        projectId: "xxxxxxxxxxxxxxxxx",
        storageBucket: "xxxxxxxxxxxxxxxxxx",
        messagingSenderId: "xxxxxxxxxxxxxx",
        appId: "xxxxxxxxxxxxxxxxxx"
    };
};
```
7 Crie um arquivo chamado `config.js` no caminho `#/firestore` e  cole o código gerado no passo 6