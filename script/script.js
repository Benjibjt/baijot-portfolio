function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    const navbarName = document.querySelector(".navbarName"); // Sélectionner le nom
    const navLinks = document.querySelectorAll(".navLinks");

    window.onscroll = function () {
        const top = window.scrollY;
        
        if (top >= 700) {
            header.classList.add("navbar-dark", "bg-dark");
            
            // Changer la couleur du lien en blanc
            navbarName.style.color = "white";

            // Changer la couleur de tous les liens en blanc
            navLinks.forEach(link => {
                link.style.color = "white";
            });

        } else {
            header.classList.remove("navbar-dark", "bg-dark");
            
            // Réinitialiser la couleur du lien
            navbarName.style.color = ""; // Revenir à la couleur d'origine définie en CSS

            // Réinitialiser la couleur de tous les liens
            navLinks.forEach(link => {
                link.style.color = ""; // Revenir à la couleur d'origine
            });
        }
    };
}


// Function to handle navbar collapse on small devices after a click
function handleNavbarCollapse() {
    const navLinks = document.querySelectorAll(".nav-item");
    const menuToggle = document.getElementById("navbarSupportedContent");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            new bootstrap.Collapse(menuToggle).toggle();
        });
    });
}

// About
function createAboutFromJSON() {
    fetch("data/about.json")
        .then(response => response.json())
        .then(data => {
            const aboutImage = document.querySelector("#about-image");
            aboutImage.src = data.image;
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


// Function to dynamically create HTML elements from the JSON file
function createSkillsFromJSON() {
    const container = document.querySelector("#skills .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/skills.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card skillsText">
                        <div class="card-body">
                            <img src="./images/${item.image}" alt="${item.alt}" />
                            <h3 class="card-title mt-3">${item.title}</h3>
                            <p class="card-text mt-3">${item.text}</p>
                        </div>
                    </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        })
        .catch(error => console.error("Erreur de chargement des compétences :", error));
}

// Function to dynamically create HTML elements from the JSON file
function createPortfolioFromJSON() {
    const container = document.querySelector("#portfolio .container");
    let row = document.createElement("div");
    row.classList.add("row");

    // Load the JSON file
    fetch("data/portfolio.json")
        .then((response) => response.json())
        .then((data) => {
            // Iterate through the JSON data and create HTML elements
            data.forEach((item, index) => {
                const card = document.createElement("div");
                card.classList.add("col-lg-4", "mt-4");
                card.innerHTML = `
                    <div class="card portfolioContent">
                        <img class="card-img-top" src="images/${item.image}" alt="${item.alt}" style="width:100%">
                        <div class="card-body">
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-text">${item.text}</p>
                            <div class="text-center">
                                <a href="${item.link}" class="btn btn-success">Lien</a>
                            </div>
                        </div>
                    </div>
                `;

                // Append the card to the current row
                row.appendChild(card);

                // If the index is a multiple of 3 or it's the last element, create a new row
                if ((index + 1) % 3 === 0 || index === data.length - 1) {
                    container.appendChild(row);
                    row = document.createElement("div");
                    row.classList.add("row");
                }
            });
        })
        .catch(error => console.error("Erreur de chargement du portfolio :", error));
}

// Contact
function createContactFromJSON() {
    fetch("data/contact.json")
        .then(response => response.json())
        .then(data => {
            const contactContainer = document.querySelector("#contact .container .row");
            const contactTitle = document.querySelector("#contact h2");

            // Met à jour le titre de la section
            contactTitle.textContent = data.title;

            // Vide le contenu existant avant d'ajouter les nouvelles données
            contactContainer.innerHTML = "";

            // Ajoute chaque contact dynamiquement
            data.contacts.forEach(contact => {
                const contactColumn = document.createElement("div");
                contactColumn.classList.add("col-lg-4", "mt-4", "contactColumn");

                contactColumn.innerHTML = `
                    <i class="${contact.icon} fa-4x" aria-label="${contact.type}"></i>
                    <h3>${contact.type}</h3>
                    <p>${contact.info}</p>
                `;

                contactContainer.appendChild(contactColumn);
            });
        })
        .catch(error => console.error("Erreur de chargement des contacts :", error));
}

// Call the functions to execute the code
document.addEventListener("DOMContentLoaded", function () {
    handleNavbarScroll();
    handleNavbarCollapse();
    createAboutFromJSON();
    createSkillsFromJSON();
    createPortfolioFromJSON();
    createContactFromJSON(); 
});