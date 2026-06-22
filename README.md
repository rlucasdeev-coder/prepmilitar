# 📚 PrepMilitar - Documentação Completa

## 🎯 Visão Geral

**PrepMilitar** é uma plataforma web completa para mentoria e preparação para concursos militares. O projeto foi construído com HTML5, CSS3 e JavaScript vanilla, priorizando:

- ✅ **Código limpo e modular**
- ✅ **Fácil de entender e modificar**
- ✅ **Pronto para integração com backend**
- ✅ **Design responsivo e profissional**
- ✅ **Performance otimizada**

---

## 📁 Estrutura de Arquivos

```
/
├── index.html          # Estrutura HTML principal
├── styles.css          # Estilos CSS (incluindo responsividade)
├── script.js           # Lógica JavaScript (módulos)
└── README.md          # Este arquivo
```

---

## 🏗️ Arquitetura e Módulos

### JavaScript Modular

O `script.js` é organizado em **módulos independentes**, cada um com responsabilidade única:

#### 1. **TabManager** - Gerenciamento de Abas
```javascript
// Alternando entre abas programaticamente
TabManager.switchTab('mentoria');  // Muda para aba Mentoria
TabManager.switchTab('estudos');   // Muda para aba Estudos
```

**Responsabilidades:**
- Alternar entre as abas (Mentoria e Estudos)
- Gerenciar estado ativo/inativo
- Animar transições

**Como modificar:**
```javascript
// Adicionar nova aba
// 1. No HTML: <button class="nav-btn" data-tab="nova-aba">Nova Aba</button>
// 2. No HTML: <section class="tab-content" id="nova-aba">...</section>
// 3. TabManager funcionará automaticamente!
```

---

#### 2. **MentorManager** - Gestão de Mentores
```javascript
// Métodos disponíveis
MentorManager.agendar(mentor);
MentorManager.getMentorById(1);
MentorManager.filtrarPorEspecialidade('Aeronáutica');
```

**Responsabilidades:**
- Armazenar dados dos mentores
- Agendar sessões de mentoria
- Filtrar mentores por especialidade

**Como modificar para adicionar dados dinâmicos:**
```javascript
// Atualmente: dados hardcoded em MentorManager.mentores
// Para integrar com backend:

MentorManager.carregarMentores = async function() {
    const response = await API.get('/mentores');
    this.mentores = response.data;
}

// Chamar na inicialização:
document.addEventListener('DOMContentLoaded', async function() {
    await MentorManager.carregarMentores();
    MentorManager.init();
});
```

---

#### 3. **ConteudoManager** - Gestão de Conteúdos
```javascript
// Métodos disponíveis
ConteudoManager.acessarConteudo(conteudo);
ConteudoManager.getConteudoById(1);
ConteudoManager.filtrarPorDisciplina('Português');
ConteudoManager.filtrarPorTipo('simulado');
```

**Responsabilidades:**
- Armazenar dados dos conteúdos
- Aplicar filtros (concurso, disciplina, tipo)
- Rastrear acesso aos conteúdos

**Como adicionar novo filtro:**
```javascript
// 1. No HTML, adicionar um novo select:
<select class="filtro-select" id="filtro-nivel">
    <option value="">Todos</option>
    <option value="basico">Básico</option>
    <option value="intermediario">Intermediário</option>
    <option value="avancado">Avançado</option>
</select>

// 2. No script.js, adicionar listener:
document.getElementById('filtro-nivel').addEventListener('change', () => {
    ConteudoManager.aplicarFiltros();
});

// 3. Modificar método aplicarFiltros():
aplicarFiltros() {
    const nivel = document.getElementById('filtro-nivel').value.toLowerCase();
    
    const conteudosFiltrados = this.conteudos.filter(c => {
        return (
            // ... outros filtros ...
            (nivel === '' || c.nivel === nivel)
        );
    });
    
    this.exibirConteudos(conteudosFiltrados);
}
```

---

#### 4. **UserManager** - Gerenciamento de Usuário
```javascript
// Métodos disponíveis
UserManager.login(email, senha);
UserManager.registrar(nome, email, senha);
UserManager.verificarStatusLogin();
```

**Responsabilidades:**
- Gerenciar autenticação
- Armazenar dados do usuário logado
- Atualizar UI baseado no status

**Integração com backend:**
```javascript
UserManager.login = async function(email, senha) {
    const response = await API.post('/auth/login', { email, senha });
    
    if (response.success) {
        localStorage.setItem('token_auth', response.token);
        this.usuario = response.usuario;
        this.atualizarUI();
        NotificationManager.sucesso('Login realizado com sucesso!');
    } else {
        NotificationManager.erro(response.message);
    }
}
```

---

#### 5. **NotificationManager** - Sistema de Notificações
```javascript
// Usar em qualquer lugar da aplicação
NotificationManager.sucesso('Ação realizada com sucesso!');
NotificationManager.erro('Ocorreu um erro');
NotificationManager.aviso('Atenção: operação importante');
```

**Responsabilidades:**
- Exibir notificações na tela
- Animar entrada/saída
- Auto-remover após tempo

---

#### 6. **AnalyticsManager** - Rastreamento e Análise
```javascript
// Rastrear eventos personalizados
AnalyticsManager.rastrearEvento('Mentoria', 'Agendamento', {
    mentor_id: 1,
    timestamp: new Date()
});
```

**Responsabilidades:**
- Rastrear ações dos usuários
- Coletar dados de engajamento
- Enviar para serviço de analytics

---

#### 7. **API Helper** - Requisições HTTP
```javascript
// GET
const mentores = await API.get('/mentores');

// POST
const resultado = await API.post('/agendamentos', {
    mentor_id: 1,
    data: '2026-07-01',
    hora: '19:00'
});

// PUT
const atualizado = await API.put('/usuario/perfil', {
    nome: 'Novo Nome'
});
```

**Configurar URL base do backend:**
```javascript
API.baseURL = 'https://seu-backend.com/api';
```

---

## 🎨 Estrutura CSS

### Variáveis de Tema

Tudo está centralizado em variáveis CSS para fácil customização:

```css
:root {
    --primary-color: #1a3a52;      /* Azul marinho */
    --secondary-color: #d4a574;    /* Dourado */
    --accent-color: #2d5a80;       /* Azul claro */
    
    /* ... mais cores, espaçamentos, etc */
}
```

**Para mudar o tema da aplicação:**
```css
:root {
    --primary-color: #2c3e50;      /* Novo azul */
    --secondary-color: #e74c3c;    /* Novo destaque */
    /* ... resto das cores */
}
```

### Classes Utilitárias

```css
/* Espaçamento */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-xxl: 48px;

/* Sombras */
--shadow-light: 0 2px 8px rgba(0, 0, 0, 0.1);
--shadow-medium: 0 4px 16px rgba(0, 0, 0, 0.15);
--shadow-dark: 0 8px 24px rgba(0, 0, 0, 0.2);
```

### Grid Responsivo

O design usa CSS Grid e Flexbox:

```css
/* Desktop: 4 colunas */
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

/* Tablet: 2 colunas */
@media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* Mobile: 1 coluna */
@media (max-width: 480px) {
    grid-template-columns: 1fr;
}
```

---

## 🔌 Integração com Backend

### 1. Estrutura de API Esperada

```javascript
// Endpoints necessários:

// Mentores
GET    /api/mentores
GET    /api/mentores/:id
POST   /api/agendamentos

// Conteúdos
GET    /api/conteudos
GET    /api/conteudos/:id
POST   /api/conteudos/:id/acessar

// Usuário
POST   /api/auth/login
POST   /api/auth/registrar
GET    /api/user/profile
PUT    /api/user/profile

// Analytics
POST   /api/analytics/evento
```

### 2. Exemplo: Integração com Node.js/Express

```javascript
// backend/routes/mentores.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Buscar do banco de dados
    const mentores = [
        { id: 1, nome: 'Tenente Carvalho', ... },
        // ...
    ];
    res.json(mentores);
});

module.exports = router;
```

```javascript
// frontend/script.js
MentorManager.carregarMentores = async function() {
    this.mentores = await API.get('/mentores');
    this.setupEventListeners();
}
```

### 3. Exemplo: Integração com MongoDB

```javascript
// Modelo de Mentor
const mentorSchema = new Schema({
    nome: String,
    especialidade: String,
    tags: [String],
    preco: Number,
    // ...
});
```

---

## 📱 Responsividade

O projeto é **100% responsivo** com breakpoints:

- **Desktop**: > 768px
- **Tablet**: 481px a 768px
- **Mobile**: < 480px

**Testar responsividade:**
```javascript
// Abrir DevTools (F12)
// Ctrl+Shift+M (ou Cmd+Shift+M no Mac)
// Selecionar diferentes dispositivos
```

---

## 🚀 Como Adicionar Novas Funcionalidades

### Exemplo: Adicionar Filtro por Avaliação

**1. HTML:**
```html
<div class="filtro-group">
    <label>Avaliação Mínima:</label>
    <select class="filtro-select" id="filtro-avaliacao">
        <option value="">Todas</option>
        <option value="4">4+ estrelas</option>
        <option value="4.5">4.5+ estrelas</option>
        <option value="5">5 estrelas</option>
    </select>
</div>
```

**2. JavaScript:**
```javascript
// Em MentorManager.init()
document.getElementById('filtro-avaliacao').addEventListener('change', () => {
    this.aplicarFiltros();
});

// Em MentorManager.aplicarFiltros()
const avaliacao = document.getElementById('filtro-avaliacao').value;

const mentoresFiltrados = this.mentores.filter(m => {
    return (avaliacao === '' || m.avaliacao >= parseFloat(avaliacao));
});
```

---

### Exemplo: Adicionar Carrossel de Depoimentos

**1. HTML:**
```html
<section class="depoimentos">
    <h3>Depoimentos dos Alunos</h3>
    <div class="carrossel">
        <div class="depoimento">
            <p>"Passei no concurso com sucesso!"</p>
            <p class="autor">- João Silva</p>
        </div>
        <!-- Mais depoimentos -->
    </div>
    <button class="btn-prev">❮</button>
    <button class="btn-next">❯</button>
</section>
```

**2. CSS:**
```css
.carrossel {
    display: flex;
    overflow: hidden;
    position: relative;
}

.depoimento {
    min-width: 100%;
    transition: transform 0.3s ease;
}
```

**3. JavaScript:**
```javascript
const CarrosselManager = {
    atual: 0,
    
    init() {
        document.querySelector('.btn-prev').addEventListener('click', () => this.anterior());
        document.querySelector('.btn-next').addEventListener('click', () => this.proximo());
    },
    
    proximo() {
        this.atual = (this.atual + 1) % document.querySelectorAll('.depoimento').length;
        this.renderizar();
    },
    
    anterior() {
        this.atual = (this.atual - 1 + document.querySelectorAll('.depoimento').length) % document.querySelectorAll('.depoimento').length;
        this.renderizar();
    },
    
    renderizar() {
        const offset = -this.atual * 100;
        document.querySelector('.carrossel').style.transform = `translateX(${offset}%)`;
    }
};

CarrosselManager.init();
```

---

## 🧪 Testing e Debug

### Console do Navegador

Todos os módulos estão acessíveis globalmente:

```javascript
// Testar MentorManager
PrepMilitar.MentorManager.mentores
PrepMilitar.MentorManager.filtrarPorEspecialidade('Aeronáutica')

// Testar ConteudoManager
PrepMilitar.ConteudoManager.filtrarPorDisciplina('Português')
PrepMilitar.ConteudoManager.filtrarPorTipo('simulado')

// Testar NotificationManager
PrepMilitar.NotificationManager.sucesso('Teste!')
PrepMilitar.NotificationManager.erro('Erro de teste')

// Usar API
PrepMilitar.API.get('/mentores').then(data => console.log(data))
```

---

## 📊 Performance

### Otimizações Já Implementadas

✅ CSS modular com variáveis  
✅ JavaScript vanilla (sem dependências)  
✅ Lazy loading ready  
✅ Event delegation onde aplicável  
✅ Transições GPU-aceleradas  
✅ Images otimizadas (placeholders)  

### Dicas de Otimização Futura

1. **Lazy Load de Imagens:**
```html
<img src="..." loading="lazy" alt="...">
```

2. **Service Workers para Offline:**
```javascript
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}
```

3. **Code Splitting com Dynamic Imports:**
```javascript
// Carregar módulo sob demanda
document.getElementById('btn-chat').addEventListener('click', async () => {
    const ChatModule = await import('./chat.js');
    ChatModule.iniciar();
});
```

---

## 🔐 Segurança

### Implementado

✅ Sem exposição de dados sensíveis no frontend  
✅ API ready com autenticação via token  
✅ Sanitização básica de inputs  

### Recomendado para Produção

1. **HTTPS obrigatório**
2. **CORS configurado corretamente**
3. **Validação no servidor**
4. **Proteção CSRF**
5. **Rate limiting**
6. **Input sanitization com biblioteca (DOMPurify)**

---

## 📚 Recursos Úteis

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [Web.dev](https://web.dev/)

---

## 🎓 Conclusão

Este projeto fornece uma base **sólida, escalável e profissional** para uma plataforma de mentoria militar. A estrutura modular torna fácil:

- ✅ Entender o código
- ✅ Modificar funcionalidades
- ✅ Adicionar novas features
- ✅ Integrar com backend
- ✅ Manter a performance

**Bom desenvolvimento! 🚀**

---

**Última atualização:** 21/06/2026
**Versão:** 1.0.0
**Licença:** MIT
