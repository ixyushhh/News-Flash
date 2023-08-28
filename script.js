const API_KEY = "5fba1e9ad2674f55870c6b7b012d4c9c";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener( 'load', () => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews (query) {
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
   const data = await res.json(); // converting data into json formate.
   console.log(data);
   bindData(data.articles);
}
// fetch is a async operation, as news is present on a particular server and it takes time to get the news from there.
// as we does not get the news immediately we get a promise related to it. In which we can await.

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const cardsTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = ''; // we have to empty it so that again & again stack of those 100 news do not form.

    articles.forEach(article => {
        if(!article.urlToImage) return; // if no image in article then return.
        const cardClone = cardsTemplate.content.cloneNode(true); // To clone all elements of the card, which is present inside template.
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDescription = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDescription.innerHtml = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone : "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name}  ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let currentSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove('active');
    currentSelectedNav = null;
})