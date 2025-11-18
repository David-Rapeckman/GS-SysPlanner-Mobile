# SysPlanner 📅

SysPlanner é um aplicativo mobile de planejamento pessoal desenvolvido em **React Native com Expo** como parte da **Global Solution 2025/2 – FIAP**, alinhado ao tema **“O Futuro do Trabalho”**.

A proposta é ajudar estudantes e profissionais a organizarem **estudos, trabalho e vida pessoal** em um só lugar, incentivando:

- planejamento da rotina;
- equilíbrio entre vida pessoal e profissional;
- desenvolvimento contínuo e requalificação.

---

## 🧩 Funcionalidades principais

- **Tela de Splash com animação**
  - Logo animado com efeito de escala e fade-in.
  - Indicador de carregamento (`ActivityIndicator`).
  - Mensagem: _“Carregando sua rotina...”_.

- **Autenticação simples (local)**
  - Tela de **Login (SignIn)**:
    - Validação de e-mail e senha.
    - Qualquer e-mail válido e cadastrado + senha permitem o acesso (fluxo acadêmico).
  - Tela de **Cadastro (SignUp)**:
    - Simula criação de conta (`nome`, `email`, `senha`, `confirmação`).
    - Aplica validações de campos, formato de e-mail e confirmação de senha.
    - Retorna para a tela de Login após o “cadastro”.

- **Contexto de Autenticação**
  - `AuthContext` com:
    - `user`
    - `signIn(email, password)`
    - `signOut()`
    - `updateProfile({ name, about, avatarColor })`
  - Dados do usuário persistidos localmente via **AsyncStorage**.

- **Perfil do usuário**
  - Tela **Profile**:
    - Exibe nome, e-mail, “sobre você” e avatar com iniciais.
    - Integra com as informações do `AuthContext`.
  - Tela **EditProfile**:
    - Permite atualizar nome e descrição (“sobre você”).
    - Valida nome obrigatório.
    - Salva no contexto + AsyncStorage.
  - Tela **ChangePhoto**:
    - Permite escolher uma cor para o avatar a partir de uma paleta fixa.
    - Mostra prévia do avatar com iniciais.
    - Salva a cor no contexto + AsyncStorage.

- **Planejamento e organização (ex.: Location / Tasks)**
  - Lista de cards de atividades com:
    - título, descrição, data, horário;
    - status: **Aberto, Em progresso, Pendente, Concluído** (com indicador visual, inclusive bolinha verde para concluído).
  - Permite:
    - criar novo card (com validação de campos obrigatórios, data e hora);
    - editar descrição pelo próprio app;
    - deletar cards;
    - mover card para “Concluído”.

- **Dashboard simples**
  - Área de resumo com contagem de cards (ex.: abertos, concluídos) em um dashboard básico.

- **Configurações**
  - Tela **Settings**:
    - Descrição resumida do app.
    - Navegação para:
      - **Sobre o aplicativo**
      - **Central de ajuda**
      - **Termos e condições**

- **Páginas institucionais**
  - **AboutApp**:
    - Explica o que é o SysPlanner e sua relação com a Global Solution e o tema “O Futuro do Trabalho”.
    - Botão “Voltar para Configurações”.
  - **HelpCenter**:
    - Orienta que esta é uma versão acadêmica e que dúvidas devem ser direcionadas ao professor ou grupo.
    - Botão “Voltar para Configurações”.
  - **Terms**:
    - Termos de uso acadêmicos (sem dados de produção, uso apenas para fins de estudo).
    - Botão “Voltar para Configurações”.

> ✅ O app possui **no mínimo 6 telas navegáveis**: `Splash`, `SignIn`, `SignUp`, `Location/Home`, `Profile`, `Settings`, `AboutApp`, `HelpCenter`, `Terms` (e outras, dependendo da navegação final).

---

## 🏗️ Tecnologias utilizadas

- **React Native** (via Expo)
- **TypeScript**
- **React Navigation**
  - Stack Navigator
  - Bottom Tab Navigator
- **Context API** para autenticação
- **AsyncStorage** para persistência local de usuário
- Estilos customizados com:
  - `colors` (`src/styles/colors.ts`)
  - `fonts` (`src/styles/fonts.ts`)
  - `metrics` (`src/styles/metrics.ts`)

---

## 📁 Estrutura do projeto (resumida)

```bash
src/
  contexts/
    AuthContext.tsx       # Contexto de autenticação e persistência do usuário
  screens/
    Auth/
      SplashScreen.tsx    # Tela inicial com animação
      SignInScreen.tsx    # Login
      SignUpScreen.tsx    # Cadastro (acadêmico)
    Profile/
      ProfileScreen.tsx   # Dados do usuário logado
      EditProfileScreen.tsx
      ChangePhotoScreen.tsx
    Settings/
      SettingsScreen.tsx
      AboutAppScreen.tsx
      HelpCenterScreen.tsx
      TermsScreen.tsx
    # Outras telas, ex.: Home / Location / Dashboard etc.
  styles/
    colors.ts
    fonts.ts
    metrics.ts
  types/
    navigation.ts         # Tipagem das rotas (RootStackParamList)
    user.ts               # Interface User
```

---

## ▶️ Como executar o projeto

### 1. Pré-requisitos

- **Node.js** (versão LTS recomendada)
- **npm** ou **yarn**
- **Expo CLI** ou uso do `npx expo`
- Celular com app **Expo Go** instalado ou emulador Android/iOS configurado

### 2. Instalar dependências

Na raiz do projeto:

```bash
npm install
# ou
yarn
```

### 3. Rodar em modo desenvolvimento

```bash
npm start
# ou
yarn start
# ou
npx expo start
```

Depois:

- escaneie o QR Code com o **app Expo Go** no celular, **ou**
- use as opções do terminal para abrir no emulador Android/iOS.


---

## 🎯 Relação com o tema “O Futuro do Trabalho”

O SysPlanner se conecta ao tema da Global Solution da seguinte forma:

- incentiva **planejamento e organização da rotina**, algo essencial em cenários de trabalho remoto, híbrido e flexível;
- ajuda o usuário a equilibrar **estudo contínuo, trabalho e bem-estar**, alinhado com a necessidade de **requalificação constante**;
- funciona como um protótipo de ferramenta que poderia, futuramente:
  - integrar com APIs de recomendações de cursos;
  - se conectar a dashboards de produtividade;
  - integrar visão computacional / IA para leitura de documentos, captura de tarefas, etc.

---

## ℹ️ Observações finais

- Projeto desenvolvido para **Global Solution 2025/2 – 2º Ano ADS (FIAP)**.
- Uso estritamente acadêmico, sem fins comerciais.
- O código e a estrutura podem ser estendidos para atender às outras disciplinas da GS (Java, .NET, DevOps, IA, Banco de Dados, etc.).
