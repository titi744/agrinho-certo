// ============================================
// SITE: ARAUCÁRIAS DO PARANÁ
// INTERATIVIDADE E FUNCIONALIDADES
// ============================================

// 1. MENU MOBILE (para telas pequenas)
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Criar botão hambúrguer para mobile
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    
    // Verifica se já existe o botão (para não duplicar)
    if (!document.querySelector('.menu-hamburger')) {
        const hamburger = document.createElement('div');
        hamburger.className = 'menu-hamburger';
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        hamburger.style.cssText = `
            display: none;
            font-size: 1.8rem;
            cursor: pointer;
            color: white;
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
        `;
        
        // Só adiciona em telas pequenas
        if (window.innerWidth <= 700) {
            hamburger.style.display = 'block';
        }
        
        header.appendChild(hamburger);
        
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('nav-active');
            if (nav.classList.contains('nav-active')) {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '70px';
                nav.style.right = '0';
                nav.style.backgroundColor = '#2c5e3f';
                nav.style.width = '200px';
                nav.style.padding = '1rem';
                nav.style.borderRadius = '10px';
                nav.style.zIndex = '1000';
            } else {
                nav.style.display = '';
            }
        });
        
        // Ajustar ao redimensionar
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 700) {
                hamburger.style.display = 'block';
                if (!nav.classList.contains('nav-active')) {
                    nav.style.display = '';
                }
            } else {
                hamburger.style.display = 'none';
                nav.style.display = '';
                nav.classList.remove('nav-active');
            }
        });
    }
});

// 2. ROLAGEM SUAVE PARA OS LINKS (âncoras)
// ============================================
document.querySelectorAll('nav a, .btn, a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        // Verifica se é uma âncora (começa com #)
        if (targetId && targetId.startsWith('#') && targetId !== '#') {
            e.preventDefault();
            const target = document.querySelector(targetId);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Atualiza URL sem recarregar
                history.pushState(null, null, targetId);
            }
        }
    });
});

// 3. FORMULÁRIO DE CONTATO (simulação de envio)
// ============================================
const contactForm = document.querySelector('.contato form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (name && email && message) {
            // Simula envio com feedback visual
            const feedback = document.createElement('div');
            feedback.className = 'feedback-message';
            feedback.innerHTML = `
                <div style="
                    background: #2c5e3f;
                    color: white;
                    padding: 1rem;
                    border-radius: 12px;
                    margin-top: 1rem;
                    text-align: center;
                ">
                    <i class="fas fa-check-circle"></i> Mensagem enviada com sucesso, ${name}!<br>
                    Em breve entraremos em contato com você.
                </div>
            `;
            
            // Remove feedback anterior se existir
            const oldFeedback = this.parentNode.querySelector('.feedback-message');
            if (oldFeedback) oldFeedback.remove();
            
            this.parentNode.appendChild(feedback);
            this.reset();
            
            // Remove feedback após 5 segundos
            setTimeout(() => {
                feedback.remove();
            }, 5000);
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
}

// 4. ANIMAÇÃO DE ELEMENTOS AO ROLAR A PÁGINA
// ============================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.card, .cultura-flex, .galeria-grid img, .hero-content');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight - 100;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        } else {
            // Opcional: resetar animação se sair da tela
            // element.style.opacity = '0';
            // element.style.transform = 'translateY(50px)';
        }
    });
};

// Aplica estado inicial aos elementos
document.querySelectorAll('.card, .cultura-flex, .galeria-grid img, .hero-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease-out';
});

// Força uma verificação inicial
setTimeout(() => {
    animateOnScroll();
}, 100);

// Adiciona evento de scroll
window.addEventListener('scroll', animateOnScroll);

// 5. MODAL DE IMAGENS NA GALERIA (clique para ampliar)
// ============================================
function createModal() {
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        cursor: pointer;
    `;
    
    const modalImg = document.createElement('img');
    modalImg.id = 'modalImage';
    modalImg.style.cssText = `
        margin: auto;
        display: block;
        max-width: 90%;
        max-height: 90%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 12px;
    `;
    
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 35px;
        color: #f1f1f1;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
    `;
    
    modal.appendChild(closeBtn);
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    
    // Fechar modal ao clicar
    modal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        modal.style.display = 'none';
    });
    
    return { modal, modalImg };
}

const { modal, modalImg } = createModal();

// Adiciona evento de clique em todas as imagens da galeria
document.querySelectorAll('.galeria-grid img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
        modalImg.alt = this.alt;
    });
});

// 6. EXIBIR DATA ATUAL NO RODAPÉ
// ============================================
const footer = document.querySelector('footer');
if (footer) {
    const dateElement = document.createElement('p');
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.innerHTML = `<i class="far fa-calendar-alt"></i> Última atualização: ${currentDate.toLocaleDateString('pt-BR', options)}`;
    dateElement.style.marginTop = '0.5rem';
    dateElement.style.fontSize = '0.8rem';
    footer.appendChild(dateElement);
}

// 7. BOTÃO "VOLTAR AO TOPO"
// ============================================
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.id = 'backToTop';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2c5e3f;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        font-size: 1.2rem;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        transition: all 0.3s;
    `;
    
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#ff9f1c';
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#2c5e3f';
        button.style.transform = 'scale(1)';
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
};

createBackToTopButton();

// 8. CONTADOR DE VISITAS (simulação com localStorage)
// ============================================
if (localStorage.getItem('siteVisits')) {
    let visits = parseInt(localStorage.getItem('siteVisits'));
    visits++;
    localStorage.setItem('siteVisits', visits);
    
    // Exibe contador no console (ou pode mostrar em algum lugar)
    console.log(`📊 Visitas ao site: ${visits}`);
} else {
    localStorage.setItem('siteVisits', 1);
    console.log('📊 Primeira visita ao site!');
}

// 9. EFEITO DE DIGITAÇÃO NO TÍTULO (opcional)
// ============================================
const heroTitle = document.querySelector('.hero-content h2');
if (heroTitle && !heroTitle.hasAttribute('data-typed')) {
    const originalText = heroTitle.innerText;
    heroTitle.innerText = '';
    heroTitle.setAttribute('data-typed', 'true');
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            heroTitle.innerHTML += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Ativa digitação apenas uma vez quando o elemento entra em view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && heroTitle.innerText === '') {
                typeWriter();
                observer.unobserve(heroTitle);
            }
        });
    });
    
    observer.observe(heroTitle);
}

// 10. TOOLTIP NAS IMAGENS DA GALERIA (informações ao passar mouse)
// ============================================
const imageDescriptions = {
    'Araucária imponente': '🌲 Araucária com mais de 30 metros',
    'Pinha de araucária': '🌰 Pinha contendo pinhões maduros',
    'Pinhão cozido': '🍲 Pinhão cozido - tradição de inverno',
    'Floresta com araucárias': '🌳 Floresta Ombrófila Mista'
};

document.querySelectorAll('.galeria-grid img').forEach(img => {
    const altText = img.alt;
    if (imageDescriptions[altText]) {
        img.title = imageDescriptions[altText];
    }
});

console.log('✅ Site das Araucárias carregado com sucesso!');