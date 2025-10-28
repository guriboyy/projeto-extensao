# 🚀 Projeto — Guia de Configuração e Trabalho

## 🧰 Tecnologias Utilizadas

- **Node.js**
- **XAMPP**
- **MySQL**
- **React**

---

## ⚙️ Passo a Passo — Configuração do Back-end

1. **Clone o repositório** em qualquer pasta ou diretório da sua máquina:

   ```bash
   git clone <url-do-repositorio>

    Instale o Node.js e o XAMPP (caso ainda não tenha instalado).

    Acesse a pasta backend/ e instale as dependências:

    cd backend
    npm install

    Copie o arquivo .env para a raiz do backend.

    Crie o banco de dados:

        Abra o Shell do XAMPP.

        Execute os comandos SQL necessários para criar o banco.

🧑‍💻 Fluxo de Trabalho — Desenvolvimento

Para garantir um ambiente organizado e colaborativo, siga estas etapas ao trabalhar em uma nova funcionalidade:

    Crie uma nova branch baseada na main.
    Use o padrão:

feature/Nome-da-Feature

Exemplo:

    feature/Design-Login-Gui

    Faça commits frequentes das suas alterações.
    Isso evita perda de progresso caso algo aconteça com sua máquina.

    Ao finalizar a feature, abra um Pull Request (PR) para a branch main.
    O PR será analisado e aprovado antes do merge.

    Caso precise atualizar sua branch com outra feature, é possível fazer o merge — apenas tenha cuidado com conflitos.

💡 Dica: mantenha sempre sua branch atualizada com a main e revise seus commits antes de abrir um PR.
