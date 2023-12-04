const accessKey = "gcfaVZndkQdXlUOZ3UYyqdoPYD-j4USAmpTaSf25I10";

const fromEl = document.querySelector("form");
const inputEl = document.getElementById("search_input");
const searchResults = document.querySelector(".search_results");
const showMore = document.getElementById("show_more_btn");

let inputData = "";
let pageNo = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${pageNo}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (pageNo === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageWraper = document.createElement("div");
    imageWraper.classList.add("search_result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.text = result.alt_description;

    imageWraper.appendChild(image);
    imageWraper.appendChild(imageLink)
    searchResults.appendChild(imageWraper);
  });
  pageNo++;

  if (pageNo > 1) {
    showMore.style.display = "block";
  }
}

fromEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});
