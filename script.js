document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        burger.classList.toggle('toggle');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (nav.classList.contains('nav-active')) {
                burger.click();
            }
            
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    const languageCards = document.querySelectorAll('.language-card');
    
    languageCards.forEach(card => {
        const exploreBtn = card.querySelector('.btn-small');
        
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                const targetId = exploreBtn.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                alert(`Merci ${name} pour votre message! Nous vous contacterons bientôt.`);
                contactForm.reset();
            } else {
                alert('Veuillez remplir tous les champs du formulaire.');
            }
        });
    }
    
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            const id = section.getAttribute('id');
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    const codeBlocks = document.querySelectorAll('.code-example code');
    
    codeBlocks.forEach(block => {
        const content = block.innerHTML;
        
        let highlighted = content
            .replace(/(--[^\n]*)/g, '<span style="color: #6A9955;">$1</span>')
            .replace(/(\/\/[^\n]*)/g, '<span style="color: #6A9955;">$1</span>')
            .replace(/(['"])(.*?)\1/g, '<span style="color: #CE9178;">$1$2$1</span>')
            .replace(/\b(function|local|if|else|elseif|end|then|for|while|do|return|break|and|or|not|in)\b/g, 
                     '<span style="color: #569CD6;">$1</span>')
            .replace(/\b(\d+)\b/g, '<span style="color: #B5CEA8;">$1</span>');
            
        block.innerHTML = highlighted;
    });
});