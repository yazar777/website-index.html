document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const menuIcon = document.getElementById("menuIcon");
    const navLinks = document.getElementById("navLinks");
    const navItems = document.querySelectorAll(".nav-item, .mobile-app-btn");
    const backToTop = document.getElementById("backToTop");
    const yearSpan = document.getElementById("year");

    // 1. Année automatique dans le footer
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Menu Mobile (Ouverture / Fermeture)
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", isOpen);

        if (isOpen) {
            menuIcon.classList.remove("fa-bars");
            menuIcon.classList.add("fa-xmark");
        } else {
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }
    });

    // 3. Fermer le menu mobile après un clic sur un lien
    navItems.forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        });
    });

    // 4. Fermer le menu mobile si l'utilisateur clique en dehors
    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuIcon.classList.remove("fa-xmark");
            menuIcon.classList.add("fa-bars");
        }
    });

    // 5. Ombre de la barre de navigation et lien actif au défilement
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        let currentSection = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        document.querySelectorAll(".nav-item").forEach((item) => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${currentSection}`) {
                item.classList.add("active");
            }
        });
    });

    // 6. Animation douce à l'apparition des sections (Scroll Reveal)
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // 7. Bouton retour en haut
    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }
});
