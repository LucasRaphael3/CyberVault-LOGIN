# 🔐 CyberVault Protocol

> Um sistema de autenticação simulado com estética Cyberpunk/Hacker, focado em Experiência do Usuário (UX) e acessibilidade.

![Project Status](https://img.shields.io/badge/status-concluído-brightgreen)
![HCI](https://img.shields.io/badge/focus-IHC%20%26%20UX-blueviolet)

## 🎮 Inspiração e Conceito
Este projeto foi fortemente inspirado na estética e na interface do jogo **"The Operator"** (Bureau 81). O objetivo foi replicar a sensação de ser um operador de campo ou um investigador digital, utilizando uma interface de terminal (CLI) modernizada.

A interface foge do padrão "Corporativo Minimalista" (Material Design/Flat) para abraçar o **Diegetic UI** (Interface Diegética), onde os elementos na tela tentam pertencer ao mundo fictício da narrativa.

---

## 🎯 Objetivos de IHC (Interação Humano-Computador)

O projeto foi desenvolvido para atender estritamente às Metas de Usabilidade e Experiência propostas, demonstrando que interfaces temáticas podem ser funcionais e acessíveis.

### 1. Metas de Usabilidade (Obrigatórias)
* **Fácil de lembrar (Learnability):** Apesar da estética hacker, o layout segue o modelo mental padrão da web (Rótulo -> Input -> Botão). O usuário sabe intuitivamente o que fazer sem precisar de tutorial.
* **Fácil de entender (Understandability):** O sistema fornece feedback constante. O botão muda de texto ("Aguardando", "Verificando", "Tentar Novamente") para comunicar o estado do sistema.
* **Seguro (Percepção):** Uso de mascaramento de senha (`type="password"`) e, principalmente, o **Modo de Bloqueio (Lockout)** após 3 tentativas falhas, reforçando a sensação de segurança robusta.
* **Eficiente:** O sistema é totalmente navegável via teclado (`Tab` + `Enter`). Em caso de erro, o foco retorna automaticamente ao campo de senha, agilizando a nova tentativa.
* **Útil:** Simula com precisão um portão de acesso (Gatekeeper), bloqueando entradas inválidas e validando as corretas.

### 2. Metas de Experiência
* **Esteticamente Apreciável:** Uso de paleta Neon Green monocromática, fontes monoespaçadas e o efeito de fundo *Matrix Rain* (Chuva Digital) criam uma atmosfera imersiva.
* **Divertido & Interessante:** O uso de vocabulário temático ("Decriptando", "Operador", "Violação Detectada") transforma uma tarefa chata (fazer login) em algo gamificado.
* **Emocionalmente Adequado:** A interface gera tensão proposital através de delays artificiais de processamento e feedback visual agressivo (tremor de tela) ao errar.
* **Satisfatório:** O feedback de sucesso não é apenas uma mensagem, é uma "recompensa visual" onde a interface se limpa, dando sensação de conquista.
* **Incentivador de Criatividade:** A "Caveira ASCII" escondida no erro fatal é um *Easter Egg* que recompensa a curiosidade (ou persistência no erro) do usuário.

---

## ⚙️ Funcionalidades Técnicas

* **Validação Local (Client-Side):** Não requer banco de dados ou internet. Toda a lógica roda no navegador do usuário.
* **Matrix Rain Effect:** Um canvas HTML5 desenha caracteres caindo em tempo real no fundo.
* **Lockout System:** Lógica que conta tentativas falhas. Ao atingir 3 erros, o sistema "trava", exibindo uma arte ASCII gigante e impedindo novas tentativas até o reset manual.
* **Animações CSS:** Uso de *Glitch Effects*, *Shakes* (tremores) e transições de opacidade.

---

## ♿ Acessibilidade (A11y)

Mesmo sendo uma interface "caótica" visualmente, ela foi construída respeitando normas de acessibilidade:

1.  **Leitores de Tela:** Uso correto de `aria-label`, `aria-live` (para anunciar erros automaticamente) e `role="alert"`. O Canvas decorativo é oculto (`aria-hidden`) para não poluir a leitura.
2.  **Navegação por Teclado:** Foco visível (`outline` branco) implementado para quem não usa mouse.
3.  **Redução de Movimento:** O sistema respeita a configuração do sistema operacional `prefers-reduced-motion`. Se o usuário tiver labirintite ou preferir menos animação, a "Chuva Matrix", o efeito de tremor e o glitch são automaticamente desativados via CSS e JS.
4.  **Responsividade:** O tamanho da fonte da Arte ASCII (Caveira) se ajusta via `clamp()` para caber em telas menores sem quebrar o layout.

---

## 🚀 Como Executar

1.  Certifique-se de que os três arquivos estão na mesma pasta:
    * `index.html`
    * `style.css`
    * `script.js`
2.  Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge).
3.  **Credenciais para teste:**
    * **User:** `admin`
    * **Senha:** `1234`

### 🧪 Para testar o Erro Fatal (Caveira)
Erre a senha propositalmente **3 vezes consecutivas**.

---

## 🛠 Tecnologias

* HTML5 (Semântico)
* CSS3 (Variables, Keyframes, Flexbox, Grid)
* JavaScript (ES6+, DOM Manipulation, Canvas API)

---

> *"The system is waiting, Operator."*
