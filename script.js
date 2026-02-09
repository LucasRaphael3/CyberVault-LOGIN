const MatrixEffect = {
    canvas: document.getElementById('matrixCanvas'),
    ctx: null,
    columns: 0,
    drops: [],
    interval: null,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,

    init: function() {
        if (this.prefersReducedMotion) return;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    },

    resize: function() {
        if (this.prefersReducedMotion) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = this.canvas.width / 16;
        this.drops = [];
        for(let x = 0; x < this.columns; x++) this.drops[x] = 1;
    },

    start: function() {
        if (this.prefersReducedMotion) {
            document.body.style.backgroundColor = '#001100';
            return;
        }
        this.init();
        this.canvas.style.opacity = '1';
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリグズブヅプウゥクスツヌフムユュル';
        const nums = '0123456789';
        const alphabet = katakana + nums;
        this.interval = setInterval(() => {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#0F0';
            this.ctx.font = '16px monospace';
            for(let i = 0; i < this.drops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                this.ctx.fillText(text, i * 16, this.drops[i] * 16);
                if(this.drops[i] * 16 > this.canvas.height && Math.random() > 0.975){
                    this.drops[i] = 0;
                }
                this.drops[i]++;
            }
        }, 33);
    }
};

// --- Módulo de Login  ---
const LoginSystem = {
    // --- Configurações e Estado ---
    mockUser: { user: "admin", pass: "1234" },
    failedAttempts: 0, // contador de falhas
    maxAttempts: 3,    // limite de tentativas

    // --- Elementos DOM ---
    form: document.getElementById('loginForm'),
    usernameInput: document.getElementById('username'),
    passwordInput: document.getElementById('password'),
    submitBtn: document.getElementById('submitBtn'),
    feedback: document.getElementById('feedback-area'),
    container: document.querySelector('.container'),
    lockoutScreen: document.getElementById('lockout-screen'),
    resetBtn: document.getElementById('resetBtn'),


    init: function() {
        this.usernameInput.addEventListener('input', () => this.validateInputs());
        this.passwordInput.addEventListener('input', () => this.validateInputs());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Ouvinte para o botão de reiniciar na tela da caveira
        this.resetBtn.addEventListener('click', () => this.resetSystem());

        this.validateInputs();
    },

    validateInputs: function() {
        if (this.usernameInput.value.length > 0 && this.passwordInput.value.length > 0) {
            this.submitBtn.disabled = false;
            this.submitBtn.innerText = "EXECUTAR LOGIN";
            this.submitBtn.style.opacity = "1";
            this.submitBtn.setAttribute('aria-disabled', 'false');
        } else {
            this.submitBtn.disabled = true;
            this.submitBtn.innerText = "AGUARDANDO DADOS...";
            this.submitBtn.style.opacity = "0.7";
            this.submitBtn.setAttribute('aria-disabled', 'true');
        }
    },

    handleSubmit: function(e) {
        e.preventDefault();
        const user = this.usernameInput.value.trim();
        const pass = this.passwordInput.value.trim();

        this.setLoadingState();

        setTimeout(() => {
            if (user === this.mockUser.user && pass === this.mockUser.pass) {
                // Sucesso: Zera o contador de falhas
                this.failedAttempts = 0;
                this.handleSuccess();
            } else {
                // Erro: Incrementa o contador
                this.failedAttempts++;
                
                // Verifica se atingiu o limite de 3 erros
                if (this.failedAttempts >= this.maxAttempts) {
                    this.triggerLockout();
                } else {
                    this.handleError();
                }
            }
        }, 1000); 
    },

    setLoadingState: function() {
        this.feedback.className = '';
        this.feedback.innerText = "PROCESSANDO...";
        this.submitBtn.disabled = true;
        this.submitBtn.innerText = "VERIFICANDO...";
    },

    handleSuccess: function() {
        this.feedback.innerText = "ACESSO CONCEDIDO. BEM-VINDO.";
        this.feedback.className = "success";
        this.usernameInput.disabled = true;
        this.passwordInput.disabled = true;
        this.submitBtn.style.display = 'none';
        MatrixEffect.start();
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            setTimeout(() => {
                this.container.style.opacity = '0';
            }, 1500);
        }
    },

    // Lida com erro normal (tentativas 1 e 2)
    handleError: function() {
        const attemptsLeft = this.maxAttempts - this.failedAttempts;
        this.feedback.innerText = `ERRO: Credenciais inválidas. Tentativas restantes: ${attemptsLeft}`;
        this.feedback.className = "error";
        
        this.submitBtn.disabled = false;
        this.submitBtn.innerText = "TENTAR NOVAMENTE";
        
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            this.container.style.transform = "translateX(10px)";
            setTimeout(() => this.container.style.transform = "translateX(-10px)", 100);
            setTimeout(() => this.container.style.transform = "translateX(5px)", 200);
            setTimeout(() => this.container.style.transform = "translateX(0)", 300);
        }
        
        this.passwordInput.value = '';
        this.validateInputs();
        this.passwordInput.focus();
    },

    // Aciona o modo "Caveira Vermelha" (tentativa 3)
    triggerLockout: function() {
        // Esconde o container de login
        this.container.style.display = 'none';
        
        // Mostra a tela de bloqueio vermelha
        this.lockoutScreen.style.display = 'flex';
        this.lockoutScreen.setAttribute('aria-hidden', 'false');
        
        this.resetBtn.focus();
    },

    // Reinicia o sistema para tentar novamente
    resetSystem: function() {
         // Zera o contador
         this.failedAttempts = 0;
         
         // Traz de volta o container de login
         this.container.style.display = 'block';
         
         // Esconde a tela de bloqueio
         this.lockoutScreen.style.display = 'none';
         this.lockoutScreen.setAttribute('aria-hidden', 'true');
         
         // Limpa os campos e reseta o estado visual
         this.feedback.innerText = '';
         this.passwordInput.value = '';
         this.usernameInput.value = '';
         this.validateInputs();
         this.usernameInput.focus();
    }
};

LoginSystem.init();