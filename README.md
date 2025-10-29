# 🌐 Portal Fraternidade

Bem-vindo ao projeto **Portal Fraternidade**! 💫  
Aqui você encontra todas as instruções para configurar o **back-end** e seguir o fluxo de trabalho de forma organizada e produtiva. 🚀

---

## 🧩 Tecnologias

- 🟩 **Node.js**  
- 🐘 **XAMPP / MySQL**  
- ⚛️ **React**  

---

## ⚙️ Pré-requisitos

Antes de começar, verifique se você possui instalado:

- ✅ **Node.js** (versão compatível com o projeto)  
- ✅ **XAMPP** com o **MySQL** ativo  
- ✅ **Git** para clonar o repositório  

---

🌿 Fluxo de Trabalho — Boas Práticas com Git

Siga este padrão para manter o projeto organizado:

    🌱 Crie uma nova branch baseada na main

git checkout -b feature/Design-Login-Gui

Padrão sugerido: feature/NomeDaFeature-SeuNome

💾 Faça commits frequentes
Salve sempre suas alterações com mensagens descritivas.
Isso evita perda de trabalho e facilita o review.

🔄 Abra um Pull Request (PR)
Quando terminar sua feature, abra um PR para main.
Ele será revisado antes de ser integrado.

🧠 Atualize sua branch se necessário

git fetch origin.
git merge origin/main

ou

    git rebase origin/main

    Resolva conflitos com calma antes de subir as mudanças.

🧾 Exemplo de .env

# 🌍 Configurações do Servidor
PORT=3000
NODE_ENV=development

# 💾 Banco de Dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=PortalFraternidade

    🪄 Dica: mantenha o arquivo .env fora de commits (.gitignore já deve conter ele).

💡 Dicas Finais

    ⚙️ Use synchronize: true somente na primeira execução ou em ambiente de teste.

    🧱 Em produção, utilize migrations para controle de schema.

    🧩 Faça backup do banco antes de alterações grandes.

    📚 Documente dependências novas para o time (ex: MIGRATIONS.md, SETUP.md, etc).

    ✨ Seja organizado com branches e commits — o futuro você vai agradecer!

## 🧱 Configuração do Back-End — Passo a Passo

### 1️⃣ Clonar o repositório
```bash
git clone <URL-do-repositório>
cd <nome-do-repositório>

2️⃣ Instalar Node e XAMPP

    Baixe e instale o Node.js (https://nodejs.org

)

Instale o XAMPP (https://www.apachefriends.org/

    )

    Abra o painel do XAMPP e inicie o MySQL

3️⃣ Instalar dependências

No diretório backend, execute:

cd backend
npm install

4️⃣ Copiar arquivo .env

Copie o arquivo de exemplo, se existir:

cp .env.example .env

ou crie manualmente um .env com suas variáveis.
5️⃣ Criar o banco de dados (no XAMPP / MySQL)

    Abra o XAMPP e inicie o MySQL

    Clique em Shell no painel

    Execute o login:

mysql -u root

ou, se tiver senha:

mysql -u root -p

Crie o banco:

    CREATE DATABASE PortalFraternidade
      DEFAULT CHARACTER SET utf8mb4
      DEFAULT COLLATE utf8mb4_general_ci;

6️⃣ Ajustar date-source.ts

Local: backend/db/date-source.ts
Antes de rodar pela primeira vez:

synchronize: true,
logging: true,

    ⚠️ Use synchronize: true somente para criar ou atualizar o schema na primeira execução!

7️⃣ Rodar o back-end em modo dev

npm run dev

8️⃣ Parar o servidor

    Pressione CTRL + C no terminal.

    Altere novamente em date-source.ts:

    synchronize: false,
    logging: false,

    Pronto! 🚦

9️⃣ Reiniciar o servidor

Quando quiser rodar novamente:

npm run dev


