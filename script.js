// --- LOGIKA WHATSAPP ---
function sendWhatsApp() {
    const name = document.getElementById('waName').value;
    const product = document.getElementById('waProduct').value;
    const phone = "62882003072007";

    if (!name) {
        // Menggunakan UI feedback sederhana pengganti alert
        document.getElementById('waName').classList.add('border-2', 'border-red-500');
        return;
    }

    const text = `Halo Lisa Bouquet! Nama saya ${name}. Saya tertarik untuk memesan produk ${product}. Bisa dibantu informasinya?`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, '_blank');
}

// --- LOGIKA SLIDESHOW GAMBAR BERANDA ---
const heroImages = [
    'asett\\buket uang.jpg',
    'asett\\palsu.webp',
    'asett\\bebas.webp'
];
let currentImageIndex = 0;
const slideshowEl = document.getElementById('slideshow-image');

function changeHeroImage() {
    // Animasi fade out
    if (slideshowEl) {
        slideshowEl.style.opacity = '0';

        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            slideshowEl.src = heroImages[currentImageIndex];

            // Setelah gambar dimuat (atau delay singkat), fade in kembali
            slideshowEl.style.opacity = '1';
        }, 800); // Harus sinkron dengan CSS transition durasi
    }
}

// Jalankan slideshow setiap 4 detik
setInterval(changeHeroImage, 4000);

// --- SISTEM PARTIKEL ---
const particleContainer = document.getElementById('particle-container');
const particleCount = 40;

function createParticle() {
    if (!particleContainer) return;
    
    const particle = document.createElement('div');
    particle.className = 'particle';

    const size = Math.random() * 10 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.top = `${Math.random() * 100}vh`;

    const colors = ['rgba(255,182,193,0.3)', 'rgba(255,215,0,0.2)', 'rgba(255,255,255,0.4)'];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.filter = `blur(${Math.random() * 2}px)`;

    particleContainer.appendChild(particle);

    let posX = parseFloat(particle.style.left);
    let posY = parseFloat(particle.style.top);
    let speedX = (Math.random() - 0.5) * 0.3;
    let speedY = Math.random() * 0.3 + 0.1;

    function move() {
        posX += speedX;
        posY += speedY;

        if (posY > 100) {
            posY = -5;
            posX = Math.random() * 100;
        }
        if (posX > 100) posX = 0;
        if (posX < 0) posX = 100;

        particle.style.left = `${posX}vw`;
        particle.style.top = `${posY}vh`;

        requestAnimationFrame(move);
    }
    move();
}

if (particleContainer) {
    for (let i = 0; i < particleCount; i++) {
        setTimeout(createParticle, i * 150);
    }
}

// --- SCROLL REVEAL ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
