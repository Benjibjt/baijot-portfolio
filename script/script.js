// Version pour le cache (change "2.0" par "3.0" quand nécessaire)
const cacheVersion = "2.0";

/**
 * Ajoute une version aux images pour éviter les problèmes de cache
 * @param {string} imagePath - Chemin de l'image
 * @returns {string} - Chemin modifié avec version
 */
function addCacheVersion(imagePath) {
    return `${imagePath}?v=${cacheVersion}`;
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    const navbarName = document.querySelector(".navbarName");
    const navLinks = document.querySelectorAll(".navLinks");

    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 536) {
            header.classList.add("navbar-dark", "bg-dark");
            navbarName.style.color = "white";
            navLinks.forEach(link => link.style.color = "white");
        } else {
            header.classList.remove("navbar-dark", "bg-dark");
            navbarName.style.color = "";
            navLinks.forEach(link => link.style.color = "");
        }
    };
}

// Navbar Collapse on Small Screens
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

// About Section
function createAboutFromJSON() {
    fetch("data/about.json")
        .then(response => response.json())
        .then(data => {
            const aboutImage = document.querySelector("#about-image");
            
            // Correction : Utilisation directe du chemin sans ajouter "images/"
            aboutImage.src = addCacheVersion(data.image);
            aboutImage.alt = data.alt || "Image de profil";

            document.querySelector("#about-description").textContent = data.description;

            const details = Object.entries(data.details);
            const leftList = document.querySelector("#about-details-left");
            const rightList = document.querySelector("#about-details-right");

            leftList.innerHTML = "";
            rightList.innerHTML = "";

            details.forEach(([key, value], index) => {
                const li = document.createElement("li");
                li.innerHTML = `<strong>${key}:</strong> ${value}`;
                (index % 2 === 0 ? leftList : rightList).appendChild(li);
            });
        })
        .catch(error => console.error("Erreur de chargement du about :", error));
}

// Skills Section
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");

    fetch("data/skills.json")
        .then(response => response.json())
        .then(data => {
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="${addCacheVersion('images/' + item.image)}" alt="${item.alt}" />
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;

                row.appendChild(card);
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        })
        .catch(error => console.error("Erreur de chargement des compétences :", error));
}

// Portfolio Section
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    let row = document.createElement("div");
    row.classList.add("row");

    fetch("data/portfolio.json")
        .then(response => response.json())
        .then(data => {
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card portfolioContent">
                        <img class="card-img-top" src="${addCacheVersion('images/' + item.image)}" alt="${item.alt}" style="width:100%">
                        <div class="card-body">
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-text">${item.text}</p>
                            <div class="text-center">
                                <a href="${item.link}" class="btn btn-success">Lien</a>
                            </div>
                        </div>
                    </div>
                `;

                row.appendChild(card);
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        })
        .catch(error => console.error("Erreur de chargement du portfolio :", error));
}

// Contact Section
function createContactFromJSON() {
    fetch("data/contact.json")
        .then(response => response.json())
        .then(data => {
            const contactContainer = document.querySelector("#contact .container .row");
            const contactTitle = document.querySelector("#contact h2");

            contactTitle.textContent = data.title;
            contactContainer.innerHTML = "";

            data.contacts.forEach(contact => {
                const contactColumn = document.createElement("div");
                contactColumn.classList.add("col-lg-4", "mt-4", "contactColumn");

                // Déterminer si l'info doit être un lien cliquable
                let contactInfo = `<p class="contact-info">${contact.info}</p>`;
                if (contact.type === "Téléphone") {
                    contactInfo = `<p><a href="tel:${contact.info.replace(/-/g, '')}" class="contact-info">${contact.info}</a></p>`;
                } else if (contact.type === "Adresse email") {
                    contactInfo = `<p><a href="mailto:${contact.info}" class="contact-info">${contact.info}</a></p>`;
                } else if (contact.type === "LinkedIn") {
                    contactInfo = `<p><a href="https://www.linkedin.com/in/${contact.info}" target="_blank" rel="noopener noreferrer" class="contact-info">${contact.info}</a></p>`;
                }

                contactColumn.innerHTML = `
                    <i class="${contact.icon} fa-4x"></i>
                    <h3>${contact.type}</h3>
                    ${contactInfo}
                `;

                contactContainer.appendChild(contactColumn);
            });
        })
        .catch(error => console.error("Erreur de chargement des contacts :", error));
}

// Exécuter les fonctions après le chargement de la page
document.addEventListener("DOMContentLoaded", function () {
    handleNavbarScroll();
    handleNavbarCollapse();
    createAboutFromJSON();
    createSkillsFromJSON();
    createPortfolioFromJSON();
    createContactFromJSON();
});