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
    const navbarTogglerIcon = document.querySelector(".navbar-toggler-icon");

    // Forcer la couleur noire au chargement
    navbarTogglerIcon.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(0, 0, 0, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")";

    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 536) {
            header.classList.add("navbar-dark", "bg-dark");
            navbarName.style.color = "white";
            navLinks.forEach(link => link.style.color = "white");

            // Changer les traits du bouton en blanc
            navbarTogglerIcon.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")";
        } else {
            header.classList.remove("navbar-dark", "bg-dark");
            navbarName.style.color = "";
            navLinks.forEach(link => link.style.color = "");

            // Remettre les traits en noir
            navbarTogglerIcon.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba(0, 0, 0, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E\")";
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
            document.querySelector("#about .container").innerHTML = `
                <h2 class="text-center">À propos</h2>
                <div class="row mt-4">
                    <div class="col-lg-4">
                        <img id="about-image" src="${data.image}" class="imageAboutPage" alt="${data.alt || 'Image de profil'}">
                    </div>
                    <div class="col-lg-8">
                        <div class="row mt-3">
                            <div class="col-md-6"><ul id="about-details-left"></ul></div>
                            <div class="col-md-6"><ul id="about-details-right"></ul></div>
                            <p id="about-description">${data.description}</p>
                        </div>
                    </div>
                </div>
            `;

            const detailsLists = [document.querySelector("#about-details-left"), document.querySelector("#about-details-right")];
            Object.entries(data.details).forEach(([key, value], index) => {
                detailsLists[index % 2].innerHTML += `<li><strong>${key}:</strong> ${value}</li>`;
            });

            document.querySelector("#about-image").onerror = function () {
                this.src = "images/photo-profil.webp"; // Image par défaut en cas d'erreur
            };
        })
        .catch(error => console.error("Erreur de chargement du about.json :", error));
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
                card.classList.add("col-lg-3", "col-md-6", "col-sm-12", "mt-4"); // 4 par ligne sur grand écran

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
                
                // Ajouter la ligne après 4 éléments au lieu de 3
                if ((index + 1) % 4 === 0 || index === data.length - 1) {
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

                // Vérifie si le projet est dans les 3 premiers
                const links = index < 3 
                    ? `  
                        <a href="${item.link}" class="btn btn-success" target="_blank" rel="noopener noreferrer">Projet Github</a>
                        <a href="${item.link2}" class="btn btn-primary ms-2" target="_blank" rel="noopener noreferrer">Site Github Pages</a>
                    ` 
                    : `<a href="${item.link}" class="btn btn-success" target="_blank" rel="noopener noreferrer">Projet Github</a>`;

                card.innerHTML = `
                    <div class="card portfolioContent">
                        <img class="card-img-top" src="${addCacheVersion('images/' + item.image)}" alt="${item.alt}" style="width:100%">
                        <div class="card-body">
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-text">${item.text}</p>
                            <div class="text-center">
                                ${links}
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
                    contactInfo = `<p><a href="tel:${contact.info.replace(/-/g, '')}" class="contact-info" target="_blank" rel="noopener noreferrer">${contact.info}</a></p>`;
                } else if (contact.type === "Adresse email") {
                    contactInfo = `<p><a href="mailto:${contact.info}" class="contact-info" target="_blank" rel="noopener noreferrer">${contact.info}</a></p>`;
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