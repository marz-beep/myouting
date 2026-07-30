// Gallery

document.querySelectorAll(".review-card").forEach(card => {

    const main = card.querySelector(".main-image");

    card.querySelectorAll(".thumbs img").forEach(img => {

        img.addEventListener("click", () => {

            main.src = img.src;

        });

    });

});


// Category Filter + Pagination

const buttons = document.querySelectorAll(".category-buttons button[data-category]");
const cards = document.querySelectorAll(".review-card");

const pageContainer = document.getElementById("pageNumbers");
const prev = document.getElementById("prevPage");
const next = document.getElementById("nextPage");


let currentCategory = "all";
let currentPage = 1;

const cardsPerPage = 3;



function updateCards() {

    let filteredCards = [];


    // Filter cards

    cards.forEach(card => {

        card.style.display = "none";


        if (
            currentCategory === "all" ||
            card.classList.contains(currentCategory)
        ) {

            filteredCards.push(card);

        }

    });



    // Calculate pages

    const totalPages = Math.ceil(filteredCards.length / cardsPerPage);


    // If current page doesn't exist after filtering

    if(currentPage > totalPages){

        currentPage = 1;

    }



    // Display cards for current page

    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;


    filteredCards.slice(start, end).forEach(card => {

        card.style.display = "grid";

    });



    // Generate page numbers

    pageContainer.innerHTML = "";


    for(let i = 1; i <= totalPages; i++){

        const button = document.createElement("button");

        button.textContent = i;

        button.classList.add("page-number");


        if(i === currentPage){

            button.classList.add("active");

        }


        button.addEventListener("click", () => {

            currentPage = i;

            updateCards();

        });


        pageContainer.appendChild(button);

    }



    // Enable / disable arrows

    prev.disabled = currentPage === 1;

    next.disabled = currentPage === totalPages;



    // Scroll to cards after changing page/filter

    window.scrollTo({

        top: document.querySelector(".container").offsetTop - 20,

        behavior: "smooth"

    });

}



// Category buttons

buttons.forEach(btn => {


    btn.addEventListener("click", () => {


        buttons.forEach(b => {

            b.classList.remove("active");

        });


        btn.classList.add("active");


        currentCategory = btn.dataset.category;

        currentPage = 1;


        updateCards();


    });


});



// Previous button

prev.addEventListener("click", () => {


    if(currentPage > 1){

        currentPage--;

        updateCards();

    }


});



// Next button

next.addEventListener("click", () => {


    const totalPages = Math.ceil(
        Array.from(cards).filter(card =>
            currentCategory === "all" ||
            card.classList.contains(currentCategory)
        ).length / cardsPerPage
    );


    if(currentPage < totalPages){

        currentPage++;

        updateCards();

    }


});



// Initial load

updateCards();