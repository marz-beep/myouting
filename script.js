// Gallery

document.querySelectorAll(".review-card").forEach(card => {

    const main = card.querySelector(".main-image");

    card.querySelectorAll(".thumbs img").forEach(img => {

        img.addEventListener("click", () => {

            main.src = img.src;

        });

    });

});


// Category Filter

const buttons = document.querySelectorAll(".category-buttons button");

buttons.forEach(btn => {

    btn.addEventListener("click", () => {

        buttons.forEach(b => b.classList.remove("active"));

        btn.classList.add("active");

        const category = btn.dataset.category;

        document.querySelectorAll(".review-card").forEach(card => {

            if (category === "all") {

                card.style.display = "grid";

            } else {

                card.style.display =
                    card.classList.contains(category)
                        ? "grid"
                        : "none";

            }

        });

    });

});