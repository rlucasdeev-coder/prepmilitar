/**
 * PrepMilitar - Sistema de Mentoria e Estudos
 * Arquivo: script.js
 * 
 * ESTRUTURA MODULAR:
 * - Cada módulo tem responsabilidade única
 * - Fácil de entender e modificar
 * - Pronto para integração com backend
 */

// =====================================================
// MÓDULO: Navegação e Tabs
// =====================================================

const TabManager = {
    /**
     * Inicializa o gerenciador de abas
     */
    init() {
        this.setupEventListeners();
        console.log('✓ TabManager inicializado');
    },

    /**
     * Configura os event listeners dos botões de navegação
     */
    setupEventListeners() {
        const navButtons = document.querySelectorAll('.nav-btn');
        
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.switchTab(button.dataset.tab);
            });
        });
    },

    /**
     * Alterna entre abas
     * @param {string} tabName - Nome da aba (mentoria ou estudos)
     */
    switchTab(tabName) {
        // Remove active de todos os botões e abas
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });

        // Adiciona active apenas ao selecionado
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(tabName).classList.add('active');

        // Log para debug
        console.log(`Abra alternada para: ${tabName}`);
    }
};

// =====================================================
// MÓDULO: Gerenciamento de Mentores
// =====================================================

const MentorManager = {
    /**
     * Armazena dados dos mentores
     * NOTA: Em produção, estes dados viriam do backend
     */
    mentores: [
        {
            id: 1,
            nome: 'Tenente Carvalho',
            especialidade: 'Especialista em ENEM Militar',
            descricao: '12 anos de experiência. Aprovou mais de 150 alunos para a Aeronáutica.',
            tags: ['Aeronáutica', 'Tática'],
            avaliacao: 4.9,
            preco: 'R$ 150/hora'
        },
        {
            id: 2,
            nome: 'Capitão Silva',
            especialidade: 'Especialista em Exército',
            descricao: '8 anos ensinando. Focado em Física, Química e Estratégia Militar.',
            tags: ['Exército', 'Ciências'],
            avaliacao: 4.8,
            preco: 'R$ 140/hora'
        },
        {
            id: 3,
            nome: 'Sargento Paula',
            especialidade: 'Especialista em Marinha',
            descricao: 'Especialista em redação militar e português. Taxa de aprovação 95%.',
            tags: ['Marinha', 'Português'],
            avaliacao: 5.0,
            preco: 'R$ 130/hora'
        },
        {
            id: 4,
            nome: 'Tenente Costa',
            especialidade: 'Especialista em Polícia Militar',
            descricao: 'Mais de 20 anos de experiência. Diretor de preparação para PM.',
            tags: ['Polícia Militar', 'Direito'],
            avaliacao: 4.7,
            preco: 'R$ 120/hora'
        }
    ],

    /**
     * Inicializa o gerenciador de mentores
     */
    init() {
        this.setupEventListeners();
        console.log('✓ MentorManager inicializado');
    },

    /**
     * Configura event listeners para botões de mentor
     */
    setupEventListeners() {
        document.querySelectorAll('.btn-agendar').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.agendar(this.mentores[index]);
            });
        });
    },

    /**
     * Abre modal ou formulário para agendar sessão
     * @param {object} mentor - Dados do mentor
     */
    agendar(mentor) {
        alert(`Agendando sessão com ${mentor.nome}\n\nEm produção, isso abrirá um formulário de agendamento.\nPreço: ${mentor.preco}`);
        
        // INTEGRAÇÃO FUTURA:
        // console.log('Enviando para backend:', mentor);
        // fetch('/api/agendamentos', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         mentor_id: mentor.id,
        //         data: novaData,
        //         hora: novaHora
        //     })
        // });
    },

    /**
     * Retorna mentor por ID
     * @param {number} id
     */
    getMentorById(id) {
        return this.mentores.find(m => m.id === id);
    },

    /**
     * Filtra mentores por especialidade
     * @param {string} especialidade
     */
    filtrarPorEspecialidade(especialidade) {
        return this.mentores.filter(m => 
            m.tags.some(tag => tag.toLowerCase().includes(especialidade.toLowerCase()))
        );
    }
};

// =====================================================
// MÓDULO: Gerenciamento de Conteúdos de Estudo
// =====================================================

const ConteudoManager = {
    /**
     * Armazena dados dos conteúdos
     * NOTA: Em produção, estes dados viriam do backend
     */
    conteudos: [
        {
            id: 1,
            titulo: 'Interpretação de Texto - Nível Avançado',
            descricao: 'Aprenda as melhores técnicas para resolver questões de interpretação em concursos militares.',
            tipo: 'aula',
            disciplina: 'Português',
            concurso: 'Aeronáutica',
            duracao: '45 min',
            visualizacoes: 1250,
            url: '#',
            completo: false
        },
        {
            id: 2,
            titulo: 'Simulado Completo - ENEM Militar',
            descricao: 'Teste seus conhecimentos com 180 questões similares ao ENEM Militar.',
            tipo: 'simulado',
            disciplina: 'Múltiplas',
            concurso: 'Aeronáutica',
            duracao: '3h',
            questoes: 180,
            url: '#',
            completo: false
        },
        {
            id: 3,
            titulo: 'Apostila: Matemática Militar',
            descricao: 'Resumo completo de matemática focado nas questões mais comuns em provas militares.',
            tipo: 'material',
            disciplina: 'Matemática',
            concurso: 'Geral',
            paginas: 120,
            url: '#',
            completo: true,
            downloads: 450
        },
        {
            id: 4,
            titulo: 'Física para Exército e Aeronáutica',
            descricao: 'Aula completa sobre mecânica, termodinâmica e óptica com exercícios resolvidos.',
            tipo: 'aula',
            disciplina: 'Física',
            concurso: 'Exército',
            duracao: '90 min',
            visualizacoes: 820,
            url: '#',
            completo: false
        },
        {
            id: 5,
            titulo: 'Prova de Direito Constitucional',
            descricao: 'Simulado focado em direito constitucional para Polícia Militar.',
            tipo: 'simulado',
            disciplina: 'Direito',
            concurso: 'Polícia Militar',
            duracao: '2h',
            questoes: 100,
            url: '#',
            completo: false
        },
        {
            id: 6,
            titulo: 'Caderno de Exercícios - História',
            descricao: '500 questões de história do Brasil e Geral com gabarito comentado.',
            tipo: 'material',
            disciplina: 'História',
            concurso: 'Geral',
            paginas: 200,
            url: '#',
            completo: true,
            downloads: 380
        }
    ],

    /**
     * Inicializa o gerenciador de conteúdos
     */
    init() {
        this.setupEventListeners();
        console.log('✓ ConteudoManager inicializado');
    },

    /**
     * Configura filtros e event listeners
     */
    setupEventListeners() {
        // Event listeners para filtros
        document.getElementById('filtro-concurso').addEventListener('change', () => {
            this.aplicarFiltros();
        });
        document.getElementById('filtro-disciplina').addEventListener('change', () => {
            this.aplicarFiltros();
        });
        document.getElementById('filtro-tipo').addEventListener('change', () => {
            this.aplicarFiltros();
        });

        // Event listeners para botões de acesso
        document.querySelectorAll('.btn-acessar').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.acessarConteudo(this.conteudos[index]);
            });
        });
    },

    /**
     * Aplica filtros aos conteúdos
     */
    aplicarFiltros() {
        const concurso = document.getElementById('filtro-concurso').value.toLowerCase();
        const disciplina = document.getElementById('filtro-disciplina').value.toLowerCase();
        const tipo = document.getElementById('filtro-tipo').value.toLowerCase();

        const conteudosFiltrados = this.conteudos.filter(c => {
            return (
                (concurso === '' || c.concurso.toLowerCase().includes(concurso)) &&
                (disciplina === '' || c.disciplina.toLowerCase().includes(disciplina)) &&
                (tipo === '' || c.tipo.toLowerCase() === tipo)
            );
        });

        this.exibirConteudos(conteudosFiltrados);
        console.log(`Filtros aplicados: ${conteudosFiltrados.length} conteúdos encontrados`);
    },

    /**
     * Exibe conteúdos na grid
     * @param {array} conteudos - Array de conteúdos a exibir
     */
    exibirConteudos(conteudos) {
        const grid = document.querySelector('.conteudos-grid');
        
        if (conteudos.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">Nenhum conteúdo encontrado com os filtros selecionados.</p>';
            return;
        }

        // Aqui você teria a renderização dos conteúdos
        // Em uma aplicação real, você reconstruiria a grid com os itens filtrados
        console.log('Conteúdos a exibir:', conteudos);
    },

    /**
     * Acessa um conteúdo específico
     * @param {object} conteudo - Dados do conteúdo
     */
    acessarConteudo(conteudo) {
        alert(`Acessando: ${conteudo.titulo}\n\nTipo: ${conteudo.tipo}\nDisciplina: ${conteudo.disciplina}`);
        
        // INTEGRAÇÃO FUTURA:
        // console.log('Enviando requisição para backend:', conteudo);
        // fetch(`/api/conteudos/${conteudo.id}/acessar`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' }
        // });
    },

    /**
     * Retorna conteúdo por ID
     * @param {number} id
     */
    getConteudoById(id) {
        return this.conteudos.find(c => c.id === id);
    },

    /**
     * Filtra conteúdos por disciplina
     * @param {string} disciplina
     */
    filtrarPorDisciplina(disciplina) {
        return this.conteudos.filter(c => 
            c.disciplina.toLowerCase().includes(disciplina.toLowerCase())
        );
    },

    /**
     * Filtra conteúdos por tipo
     * @param {string} tipo
     */
    filtrarPorTipo(tipo) {
        return this.conteudos.filter(c => c.tipo === tipo);
    }
};

// =====================================================
// MÓDULO: Gerenciamento de Usuário
// =====================================================

const UserManager = {
    /**
     * Dados do usuário logado
     */
    usuario: null,

    /**
     * Inicializa o gerenciador de usuário
     */
    init() {
        this.setupEventListeners();
        this.verificarStatusLogin();
        console.log('✓ UserManager inicializado');
    },

    /**
     * Configura event listeners dos botões de login/registro
     */
    setupEventListeners() {
        document.querySelector('.btn-login').addEventListener('click', () => {
            this.abrirLoginModal();
        });
        document.querySelector('.btn-register').addEventListener('click', () => {
            this.abrirRegistroModal();
        });
    },

    /**
     * Verifica se há usuário logado (por agora, localStorage)
     */
    verificarStatusLogin() {
        // INTEGRAÇÃO FUTURA:
        // const token = localStorage.getItem('token_auth');
        // if (token) {
        //     fetch('/api/user/profile', { headers: { 'Authorization': `Bearer ${token}` } })
        //         .then(r => r.json())
        //         .then(data => this.usuario = data);
        // }
    },

    /**
     * Abre modal de login
     */
    abrirLoginModal() {
        const email = prompt('Informe seu email:');
        const senha = prompt('Informe sua senha:');
        
        if (email && senha) {
            this.login(email, senha);
        }
    },

    /**
     * Abre modal de registro
     */
    abrirRegistroModal() {
        const nome = prompt('Informe seu nome completo:');
        const email = prompt('Informe seu email:');
        const senha = prompt('Informe uma senha:');
        
        if (nome && email && senha) {
            this.registrar(nome, email, senha);
        }
    },

    /**
     * Realiza login do usuário
     * @param {string} email
     * @param {string} senha
     */
    login(email, senha) {
        console.log(`Login solicitado para: ${email}`);
        
        // INTEGRAÇÃO FUTURA:
        // fetch('/api/auth/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, senha })
        // })
        // .then(r => r.json())
        // .then(data => {
        //     localStorage.setItem('token_auth', data.token);
        //     this.usuario = data.usuario;
        //     this.atualizarUI();
        // });
    },

    /**
     * Registra novo usuário
     * @param {string} nome
     * @param {string} email
     * @param {string} senha
     */
    registrar(nome, email, senha) {
        console.log(`Registro solicitado para: ${nome} (${email})`);
        
        // INTEGRAÇÃO FUTURA:
        // fetch('/api/auth/registrar', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ nome, email, senha })
        // })
        // .then(r => r.json())
        // .then(data => {
        //     alert('Cadastro realizado com sucesso!');
        //     this.login(email, senha);
        // });
    },

    /**
     * Atualiza UI após login
     */
    atualizarUI() {
        // Atualizar interface baseado no status de login
        if (this.usuario) {
            console.log('Interface atualizada para usuário logado');
        }
    }
};

// =====================================================
// MÓDULO: Notificações e Feedback
// =====================================================

const NotificationManager = {
    /**
     * Exibe notificação de sucesso
     * @param {string} mensagem
     */
    sucesso(mensagem) {
        this.mostrarNotificacao(mensagem, 'sucesso');
    },

    /**
     * Exibe notificação de erro
     * @param {string} mensagem
     */
    erro(mensagem) {
        this.mostrarNotificacao(mensagem, 'erro');
    },

    /**
     * Exibe notificação de aviso
     * @param {string} mensagem
     */
    aviso(mensagem) {
        this.mostrarNotificacao(mensagem, 'aviso');
    },

    /**
     * Exibe notificação genérica
     * @param {string} mensagem
     * @param {string} tipo
     */
    mostrarNotificacao(mensagem, tipo = 'info') {
        // Criar elemento de notificação
        const notif = document.createElement('div');
        notif.className = `notificacao notificacao-${tipo}`;
        notif.textContent = mensagem;
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${tipo === 'sucesso' ? '#27ae60' : tipo === 'erro' ? '#e74c3c' : tipo === 'aviso' ? '#f39c12' : '#3498db'};
            color: white;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notif);

        // Remover após 3 segundos
        setTimeout(() => {
            notif.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }
};

// =====================================================
// MÓDULO: Analytics e Rastreamento
// =====================================================

const AnalyticsManager = {
    /**
     * Rastreia evento
     * @param {string} categoria
     * @param {string} acao
     * @param {object} dados
     */
    rastrearEvento(categoria, acao, dados = {}) {
        console.log(`[ANALYTICS] ${categoria} > ${acao}`, dados);
        
        // INTEGRAÇÃO FUTURA:
        // fetch('/api/analytics/evento', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         categoria,
        //         acao,
        //         dados,
        //         timestamp: new Date(),
        //         pagina: window.location.pathname
        //     })
        // });
    },

    /**
     * Rastreia visualização de página
     */
    rastrearPagina() {
        this.rastrearEvento('Navegação', 'Visualização de página', {
            url: window.location.href,
            titulo: document.title
        });
    }
};

// =====================================================
// INICIALIZAÇÃO GLOBAL
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 PrepMilitar - Iniciando aplicação');
    console.log('====================================');

    // Inicializar todos os módulos
    TabManager.init();
    MentorManager.init();
    ConteudoManager.init();
    UserManager.init();
    AnalyticsManager.rastrearPagina();

    console.log('====================================');
    console.log('✓ Aplicação inicializada com sucesso!');
    console.log('');
    console.log('Módulos disponíveis:');
    console.log('- TabManager');
    console.log('- MentorManager');
    console.log('- ConteudoManager');
    console.log('- UserManager');
    console.log('- NotificationManager');
    console.log('- AnalyticsManager');
    console.log('');
    console.log('Use no console para testar:');
    console.log('  MentorManager.filtrarPorEspecialidade("Aeronáutica")');
    console.log('  ConteudoManager.filtrarPorDisciplina("Português")');
    console.log('  NotificationManager.sucesso("Teste de notificação")');
});

// =====================================================
// UTILITÁRIOS GLOBAIS
// =====================================================

/**
 * Função auxiliar para fazer requisições HTTP
 * Facilita integração com backend
 */
const API = {
    baseURL: 'http://localhost:3000/api', // Configurar conforme necessário
    
    async get(endpoint) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`);
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição GET:', error);
            NotificationManager.erro('Erro ao carregar dados');
        }
    },

    async post(endpoint, dados) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição POST:', error);
            NotificationManager.erro('Erro ao enviar dados');
        }
    },

    async put(endpoint, dados) {
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            });
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição PUT:', error);
            NotificationManager.erro('Erro ao atualizar dados');
        }
    }
};

// Exportar para uso global (para debug/testes)
window.PrepMilitar = {
    TabManager,
    MentorManager,
    ConteudoManager,
    UserManager,
    NotificationManager,
    AnalyticsManager,
    API
};
