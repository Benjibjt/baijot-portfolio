// Function to add the "navbarDark" class to the navbar on scroll
function handleNavbarScroll() {
    const header = document.querySelector(".navbar");
    window.onscroll = function () {
        const top = window.scrollY;
        if (top >= 100) {
            header.classList.add("navbar-dark", "bg-dark");
        } else {
            header.classList.remove("navbar-dark", "bg-dark");
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
            document.querySelector("#about-image").src = data.image;
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
                            <img src="./images/${item.image}" />
                            <h4 class="card-title mt-3">${item.title}</h4>
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
        });
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
                    <img class="card-img-top" src="images/${item.image}" style="width:100%">
                    <div class="card-body">
                        <h4 class="card-title">${item.title}</h4>
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
        });
}

// Contact
function createContactFromJSON() {
    fetch("data/contact.json")
        .then(response => response.json())
        .then(data => {
            document.querySelector("#contact-phone").textContent = data.phone;
            document.querySelector("#contact-email").textContent = data.email;
            document.querySelector("#contact-linkedin").innerHTML = `<a href="${data.linkedin}" target="_blank">Voir mon profil</a>`;
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