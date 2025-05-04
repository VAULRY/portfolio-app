 // mouvement.js

// Fonction pour initialiser les particules
export function initializeParticles() {
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 80;

    // Créer les particules
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    function createParticle() {
        console.log("Nouvelle particule créée !");

        const particle = document.createElement('div');
        particle.className = 'particle';

        // Taille aléatoire des particules
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Position initiale
        resetParticle(particle);

        // Ajouter la particule au conteneur
        particlesContainer.appendChild(particle);

        // Animer la particule
        animateParticle(particle);
    }

    function resetParticle(particle) {
        // Position aléatoire
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;

        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = '0';

        return {
            x: posX,
            y: posY
        };
    }

    function animateParticle(particle) {
        console.log("Animation lancée pour une particule !");

        // Obtenir la position initiale
        const pos = resetParticle(particle);

        // Définir la durée et le délai aléatoires
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        setTimeout(() => {
            particle.style.transition = `all ${duration}s linear`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;

            // Déplacement léger
            const moveX = pos.x + (Math.random() * 20 - 10);
            const moveY = pos.y - Math.random() * 30; // Monter doucement

            particle.style.left = `${moveX}%`;
            particle.style.top = `${moveY}%`;

            // Réinitialiser après la fin de l'animation
            setTimeout(() => {
                animateParticle(particle);
            }, duration * 1000);
        }, delay * 1000);
    }
}

// Fonction pour gérer l'interaction avec la souris
export function handleMouseInteraction() {
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 100;
        const mouseY = (e.clientY / window.innerHeight) * 100;

        // Créer une particule temporaire
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Taille de la particule
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Positionner la particule à la position de la souris
        particle.style.left = `${mouseX}%`;
        particle.style.top = `${mouseY}%`;
        particle.style.opacity = '0.6';

        const particlesContainer = document.getElementById('particles-container');
        particlesContainer.appendChild(particle);

        // Animation de la particule
        setTimeout(() => {
            particle.style.transition = 'all 2s ease-out';
            particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
            particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
            particle.style.opacity = '0';

            // Supprimer la particule après l'animation
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }, 10);

        // Mouvement subtil des sphères
        const spheres = document.querySelectorAll('.gradient-sphere');
        const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
        const moveY = (e.clientY / window.innerHeight - 0.5) * 5;

        spheres.forEach((sphere) => {
            sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}
