const API_KEY = "QZDlp6z5xY6lnZ1Oi9lmqhraZGibTWNko4Nof7KAYe8";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button"); // Corrected the id here

let inputData = "";
let page = 1;

async function searchImage() {
    try {
        inputData = inputEl.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;

        if (page === 1) {
            searchResults.innerHTML = "";
        }

        if (results.length === 0) {
            searchResults.innerHTML = "<h1>Oops, data not found.</h1>";
        } else {
            results.forEach((result) => {
                const imageWrapper = document.createElement("div");
                imageWrapper.classList.add("search-result");
                const image = document.createElement("img");
                image.src = result.urls.small;
                image.alt = result.alt_description;
                const imageLink = document.createElement("a");
                imageLink.href = result.links.html;
                imageLink.target = "_blank";
                imageLink.textContent = result.alt_description;

                imageWrapper.appendChild(image);
                imageWrapper.appendChild(imageLink);
                searchResults.appendChild(imageWrapper);
            });

            showMore.style.display = "block";
        }
        
        page++;
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImage();
});

showMore.addEventListener("click", () => {
    searchImage();
});