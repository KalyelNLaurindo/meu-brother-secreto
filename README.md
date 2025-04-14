# 🎁 Meu Brother Secreto

Aplicação web moderna para realizar sorteios de amigo secreto com regras personalizadas, validação de nomes e interface divertida. Construído com **React**

## 📦 Funcionalidades

- ✅ Adição de participantes com nome e sobrenome (sobrenome opcional)
- ✅ Validação de nomes duplicados
- ✅ Regras de bloqueio entre participantes (ex: fulano não pode pegar sicrano)
- ✅ Prevenção de sorteios inválidos (como recíprocos e autoatribuição)
- ✅ Persistência automática com `localStorage`
- ✅ Interface responsiva com feedback visual de erros
- ✅ Sorteio circular (p1 → p2 → p3 → ... → p1)

## 🧠 Arquitetura

O projeto segue uma estrutura em camadas:

```
src/
├── application/       # Casos de uso (regras do negócio)
├── domain/            # Entidades e estratégias puras
├── infrastructure/    # Implementações externas (ex: LocalStorage)
├── pages/             # Telas do sistema (React)
├── context/           # React Context para orquestração global
├── styles/            # Estilos CSS (modularizados)
```

## 🚀 Como Rodar

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/meu-brother-secreto.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o projeto:
   ```bash
   npm run dev
   ```

4. Acesse em [http://localhost:5173](http://localhost:5173)

## 📂 Tecnologias Utilizadas

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [ESLint + Prettier](https://eslint.org/)
- [Iconify](https://iconify.design/)
- [CSS Modules](https://github.com/css-modules/css-modules)

## 🔒 Regras do Sorteio

1. Uma pessoa **nunca se pega**.
2. **Pares recíprocos** são inválidos (ex: A → B e B → A).
3. Respeita pares **bloqueados manualmente**.
4. Sorteios inválidos são reprocessados automaticamente até o máximo de `5000` tentativas.

## 📜 Licença

MIT — use, modifique e compartilhe à vontade. Só não se esqueça de me dar aquele ⭐ no GitHub se curtir! 😉

## 💡 Autor

Desenvolvido por Kalyel Nunes Laurindo
