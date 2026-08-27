# AgendaGlass ✨

Um SaaS de agendamento estilo Calendly com autenticação JWT, PostgreSQL e lógica inteligente de conflito de horários. Design temático Liquid Glass + Solarpunk Neon + Tipografia Retro Gaming.

![Status](https://img.shields.io/badge/status-production-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green) ![React](https://img.shields.io/badge/react-18%2B-blue)

---

## 🎯 Visão Geral

AgendaGlass é uma plataforma de agendamento de reuniões que permite usuários criarem tipos de eventos, compartilharem links públicos e receberem agendamentos de convidados com detecção automática de conflitos de horário. O sistema oferece um dashboard robusto com analytics em tempo real (taxa de presença, horários mais solicitados, faturamento estimado) e recuperação segura de senha via e-mail.

**Live Demo**: [https://agendaglass.vercel.app](https://agendaglass.vercel.app)

---

## ✨ Features Principais

### Autenticação & Segurança
- ✅ Registro e login com JWT (7 dias de expiração)
- ✅ Hash de senha com bcrypt (10 salt rounds)
- ✅ Recuperação de senha via e-mail com tokens temporários (1 hora)
- ✅ Proteção de rotas autenticadas
- ✅ Interceptor automático de token expirado (401 → redirect login)

### Agendamento
- ✅ Criação de tipos de evento (com título, duração, descrição, cor)
- ✅ Detecção automática de conflitos de horário em tempo real
- ✅ Geração de slots disponíveis (9h–18h, seg–sex, ajustável)
- ✅ Agendamento público (link compartilhável) e privado (pelo host)
- ✅ Cancelamento de agendamentos com sincronização imediata
- ✅ Validação de disponibilidade no momento exato de criar booking

### Dashboard Analytics Pro
- 📊 **KPIs em Tempo Real**:
  - Total de eventos ativos
  - Total de agendamentos confirmados
  - Taxa de presença (%)
  - Faturamento estimado (em reais)
- 📈 **Gráfico de Barras**: Horários mais solicitados (top 5)
- 🔄 **Sincronização automática** com o banco de dados

### Interface & UX
- 🎨 **Design Liquid Glass**: Painéis translúcidos com backdrop blur, bordas sutis e glow neon
- 🌱 **Paleta Solarpunk Neon**: Verde-lima (#39FF88), ciano (#3DFDFF), magenta (#FF6EC7), dourado (#FFD166)
- 🕹️ **Tipografia Retro Gaming**: Press Start 2P (títulos), VT323 (números/timers), Space Grotesk (corpo)
- 📱 **Responsivo**: Mobile-first, breakpoints em 480px, 768px, 1024px
- 👁️ **Toggle de Senha**: Ícone de "olho" para preview de senha nos campos de autenticação
- 🌌 **Background Animado**: Grid de fuga em ponto único (estilo tunnel retro), intensidade adaptativa
- ⚡ **Loaders & Empty States**: Componentes temáticos com feedback visual
- 🎭 **Aviso de Cold Start**: Mensagem amigável após 6s em requisições lentas

### Gestão de Dados
- 🔐 Tokens de recuperação com hash SHA-256 (nunca em texto puro)
- 🗄️ Índices PostgreSQL para queries otimizadas
- 📋 Migrations versionadas com node-pg-migrate
- 🔄 Transações ACID para consistência de dados

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Banco de Dados**: PostgreSQL (Neon em produção)
- **Autenticação**: JWT (jsonwebtoken)
- **Hash**: bcryptjs
- **Validação**: express-validator
- **Datas**: date-fns
- **Email**: Nodemailer (com fallback console em dev)
- **Migrations**: node-pg-migrate

### Frontend
- **Framework**: React 18+
- **Build Tool**: Vite
- **Roteamento**: react-router-dom
- **HTTP Client**: axios
- **Estilização**: styled-components
- **Datas**: date-fns
- **Ícones**: SVG inline

### DevOps & Deploy
- **Frontend**: Vercel (CDN global, sem cold start)
- **Backend**: Render (free tier com cold start aceito)
- **Banco**: Neon (PostgreSQL gerenciado, free tier)
- **Versionamento**: Git + GitHub
- **CI/CD**: Automático (push → redeploy)

---

## 🎨 Design System

### Liquid Glass (Glassmorphism)
```
Componente: GlassPanel
- Background: rgba(20, 46, 36, 0.45) com backdrop-filter blur(18px)
- Borda: 1px solid rgba(255, 255, 255, 0.12)
- Sombra: 0 8px 32px rgba(0, 0, 0, 0.35)
- Reflexo de topo: gradiente sutil de luz
- Border radius: 18px–28px
```

### Paleta Solarpunk Neon
```
Base:
  - Background primário: #0B1A14 (verde-noite)
  - Surface (glass): rgba(20, 46, 36, 0.45)
  - Texto primário: #EAFBF1 (verde claro)

Neons:
  - Verde: #39FF88 (sucesso, ação principal)
  - Ciano: #3DFDFF (secundário, hover)
  - Magenta: #FF6EC7 (destaque, perigo leve)
  - Dourado: #FFD166 (aviso, destaque)

Sombras:
  - Glow verde: 0 0 20px rgba(57, 255, 136, 0.45)
  - Glow ciano: 0 0 20px rgba(61, 253, 255, 0.45)
  - Glow magenta: 0 0 20px rgba(255, 110, 199, 0.45)
```

### Tipografia
```
Display (títulos):
  - Font: Press Start 2P (Google Fonts)
  - Uso: <h1>, <h2>, títulos de cards
  - Efeito: Pixelado, retro arcade

Mono (números, timers):
  - Font: VT323 (Google Fonts)
  - Uso: Horários, valores, labels técnicos
  - Efeito: Terminal/CRT

Body (leitura):
  - Font: Space Grotesk (Google Fonts)
  - Uso: Parágrafo, inputs, descrição
  - Efeito: Legível, moderna
```

### Animações
```
- breathe: 8s (grid de fundo)
- floatOrb: 8-10s (partículas neon)
- pulseGlow: 8-10s (orbs dinâmicas)
- fadeInUp: 0.5s (entrada de painéis)
- spin: 0.9s linear (loader)
- scanlines: 5s (textura CRT)

Respeitam: prefers-reduced-motion
```

---

## 🚀 Quick Start Local

### Pré-requisitos
- **Node.js** 18+
- **PostgreSQL** 13+ (local ou via Docker)
- **Git**
- **npm** ou **yarn**

### 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/agendaglass.git
cd agendaglass
```

### 2. Setup do Backend

```bash
cd server
npm install

# Criar arquivo .env (copiar de .env.example e preencher)
cp .env.example .env

# Configurar variáveis mínimas:
# DATABASE_URL=postgresql://usuario:senha@localhost:5432/agendaglass
# JWT_SECRET=seu-segredo-super-forte
# CLIENT_URL=http://localhost:5173
# NODE_ENV=development

# Rodar migrations
npm run migrate up

# Iniciar servidor
npm run dev
```

O servidor deve estar disponível em `http://localhost:4000`.

### 3. Setup do Frontend

```bash
cd ../client
npm install

# Criar arquivo .env (copiar de .env.example)
cp .env.example .env

# VITE_API_URL=http://localhost:4000/api

# Iniciar dev server
npm run dev
```

O frontend deve estar disponível em `http://localhost:5173`.

### 4. Testar o Fluxo

1. Acesse `http://localhost:5173/register`
2. Crie uma conta nova
3. Crie um tipo de evento no dashboard
4. Copie o link público e teste em aba anônima
5. Confirme um agendamento

---

## 📦 Deploy em Produção

### Banco de Dados (Neon)

1. Acesse [neon.tech](https://neon.tech), crie uma conta
2. Crie um novo projeto → copie a **Connection String** (usar a versão **direta**, sem `-pooler`, para migrations)
3. Localmente, rode as migrations uma vez contra esse banco:

```bash
cd server
DATABASE_URL="sua-connection-string-direta" npm run migrate up
```

4. Depois, use a versão **pooled** (com `-pooler`) como `DATABASE_URL` em produção

### Backend (Render)

1. Acesse [render.com](https://render.com)
2. Crie um novo **Web Service**
3. Conecte seu repositório GitHub, selecione branch `main`
4. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables** (adicionar):
     ```
     PORT=4000
     DATABASE_URL=postgresql://...pooler... (versão pooled do Neon)
     JWT_SECRET=seu-segredo-muito-forte
     CLIENT_URL=https://seu-dominio.vercel.app
     NODE_ENV=production
     MAIL_FROM=AgendaGlass <no-reply@agendaglass.app>
     ```

5. Deploy → anote a URL (ex: `https://agendaglass-api.onrender.com`)

### Frontend (Vercel)

1. Acesse [vercel.com](https://vercel.com)
2. Importe o repositório GitHub
3. Configure:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Environment Variables**:
     ```
     VITE_API_URL=https://agendaglass-api.onrender.com/api
     ```

4. Deploy → URL será algo como `https://agendaglass.vercel.app`

### ⚠️ Mitigar Cold Start (opcional)

O Render free tier coloca o serviço para dormir após 15min de inatividade. Opção gratuita:

1. Crie conta em [uptimerobot.com](https://uptimerobot.com)
2. Novo Monitor → URL: `https://seu-backend-render.com/health`
3. Frequência: a cada 5 minutos
4. Isso mantém o serviço sempre acordado

---

## 📁 Estrutura do Projeto

```
agendaglass/
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js              # Pool PostgreSQL
│   │   │   └── mailer.js          # Nodemailer config
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── eventTypeController.js
│   │   │   ├── bookingController.js
│   │   │   └── analyticsController.js
│   │   ├── models/
│   │   │   ├── userModel.js
│   │   │   ├── eventTypeModel.js
│   │   │   ├── bookingModel.js
│   │   │   ├── passwordResetModel.js
│   │   │   └── analyticsModel.js
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js
│   │   │   └── validators/
│   │   │       └── authValidators.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── eventTypeRoutes.js
│   │   │   ├── bookingRoutes.js
│   │   │   └── analyticsRoutes.js
│   │   ├── services/
│   │   │   ├── availabilityService.js  # Lógica de slots e conflitos
│   │   │   └── emailService.js
│   │   ├── utils/
│   │   │   ├── jwt.js
│   │   │   └── token.js
│   │   ├── app.js
│   │   └── server.js
│   ├── migrations/
│   │   ├── ..._create-users-table.js
│   │   ├── ..._create-event-types-table.js
│   │   ├── ..._create-bookings-table.js
│   │   ├── ..._create-password-resets-table.js
│   │   └── ..._add-price-to-event-types.js
│   ├── .env.example
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── GlassPanel.jsx
│   │   │   ├── NeonButton.jsx
│   │   │   ├── NavTabs.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── FormField.jsx
│   │   │   ├── PasswordInput.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── DashboardHeader.jsx
│   │   │   ├── PageContainer.jsx
│   │   │   ├── RetroBackground.jsx
│   │   │   ├── AnalyticsCard.jsx
│   │   │   └── TimeSlotChart.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── ForgotPasswordPage.jsx
│   │   │   ├── ResetPasswordPage.jsx
│   │   │   ├── PublicBookingPage.jsx
│   │   │   └── dashboard/
│   │   │       ├── OverviewPage.jsx
│   │   │       ├── EventTypesPage.jsx
│   │   │       ├── NewBookingPage.jsx
│   │   │       ├── BookingsPage.jsx
│   │   │       └── SharePage.jsx
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   ├── styles/
│   │   │   ├── theme.js
│   │   │   ├── GlobalStyle.js
│   │   │   └── media.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── eventTypeService.js
│   │   │   ├── bookingService.js
│   │   │   └── analyticsService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   └── package.json
│
├── .gitignore
├── README.md (este arquivo)
└── package.json (root, se usar monorepo)
```

---

## 🔌 API Endpoints

### Autenticação

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me                    (autenticado)
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

### Tipos de Evento

```
POST   /api/event-types                (autenticado)
GET    /api/event-types                (autenticado)
DELETE /api/event-types/:id            (autenticado)
GET    /api/event-types/public/:username/:slug
GET    /api/event-types/public/:username/:slug/availability?date=YYYY-MM-DD
POST   /api/event-types/public/:username/:slug/bookings
```

### Agendamentos

```
GET    /api/bookings                   (autenticado)
GET    /api/bookings/availability/:eventTypeId?date=YYYY-MM-DD  (autenticado)
POST   /api/bookings                   (autenticado, agendamento manual do host)
PATCH  /api/bookings/:id/cancel        (autenticado)
```

### Analytics

```
GET    /api/analytics                  (autenticado)
  Retorna: {
    attendanceRate: number,
    topSlots: [{ hour, count, label }],
    estimatedRevenueCents: number,
    estimatedRevenue: string
  }
```

---

## 🔐 Variáveis de Ambiente

### Server (.env)

```
# Banco de Dados
DATABASE_URL=postgresql://user:pass@host:5432/db

# JWT
JWT_SECRET=seu-segredo-bem-forte-muitos-caracteres
JWT_EXPIRES_IN=7d

# Aplicação
PORT=4000
NODE_ENV=development|production
CLIENT_URL=http://localhost:5173

# Email (opcional, fallback console em dev)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app
MAIL_FROM=AgendaGlass <no-reply@agendaglass.app>
```

### Client (.env)

```
VITE_API_URL=http://localhost:4000/api
```

---

## 🧪 Testes Manuais Recomendados

1. **Fluxo de Registro**: Crie conta nova, confirme validações de username
2. **Fluxo de Login**: Faça login com credenciais válidas/inválidas
3. **Criação de Evento**: Crie tipo de evento, confirme slug automático
4. **Detecção de Conflito**: Agende dois convidados no mesmo horário (o segundo deve falhar com 409)
5. **Recuperação de Senha**: Solicite reset, confirme link no console/logs do servidor
6. **Analytics**: Verifique se taxa de presença e gráfico calculam corretamente
7. **Responsividade**: Teste em mobile (DevTools) e em dispositivo real
8. **Cold Start**: Aguarde 15min inativo no Render, acesse — confirm delay na primeira requisição

---

## 🤝 Como Contribuir

1. Faça um fork do repositório
2. Crie uma branch (`git checkout -b feature/sua-feature`)
3. Commit suas mudanças (`git commit -m 'feat: descrição da feature'`)
4. Push para a branch (`git push origin feature/sua-feature`)
5. Abra um Pull Request

**Convenção de commits**:
- `feat:` Nova feature
- `fix:` Correção de bug
- `refactor:` Refatoração sem mudança funcional
- `chore:` Tarefas de build, dependências, etc.
- `docs:` Documentação
- `style:` Formatação, sem mudança lógica
- `test:` Testes

---

## 📜 Licença

Este projeto está sob licença **MIT**. Veja o arquivo LICENSE para detalhes.

---

## 📞 Contato & Suporte

- **Issues**: Reporte bugs e sugira features no [GitHub Issues](https://github.com/seu-usuario/agendaglass/issues)
- **Email**: seu-email@exemplo.com
- **Twitter/X**: @seu-handle

---

## 🙌 Agradecimentos

- [Neon](https://neon.tech) — PostgreSQL gerenciado
- [Render](https://render.com) — Deploy de backend
- [Vercel](https://vercel.com) — Deploy de frontend
- [Google Fonts](https://fonts.google.com) — Press Start 2P, VT323, Space Grotesk
- [date-fns](https://date-fns.org) — Manipulação de datas
- [styled-components](https://styled-components.com) — CSS-in-JS

---
