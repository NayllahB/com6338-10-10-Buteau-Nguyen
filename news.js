/* Update the copyright year automatically */
function copyright () {
    const date = document.getElementById("date");
    const year = new Date; 

    if (date) {
        date.textContent = year.getFullYear();
    }
}

window.onload = () => {
    copyright();
}

/* Get Japanese news */
const apiKey = 'fbc98af32c6c060e8a1ad40cdd6269cc';
const form = document.querySelector('form');
const newsContainer = document.getElementById('news-container');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchInput = document.getElementById('news-search');
    const keyword = searchInput.value.trim();
    const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=${keyword}&countries=jp&languages=en&limit=10`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        newsContainer.innerHTML = ''; // Clear previous news
        if (data.data) {
           localStorage.setItem('japanNews', JSON.stringify(data.data)); // Store news in local storage
           const uniqueArticles = [];
           const articleUrls = new Set();
           data.data.forEach(article => {
           if (!articleUrls.has(article.url)) {
             uniqueArticles.push(article);
             articleUrls.add(article.url);
            }
            });
           uniqueArticles.slice(0, 6).forEach(article => {
           const newsCard = document.createElement('div');
           newsCard.classList.add('news-card');
           newsCard.innerHTML = `
              <h2>${article.title}</h2>
              <p>${article.description}</p>
              <p>Source: ${article.source}</p>
              <p>Published at: ${article.published_at}</p>
              <a href="${article.url}" target="_blank">Read more</a>
            `;
           newsContainer.appendChild(newsCard);
           });
         if (uniqueArticles.length === 0) {
             newsContainer.innerHTML = '<p>No news found about Japan.</p>';
           }
        } else {
        newsContainer.innerHTML = '<p>No news found.</p>';
        }
    })
    .catch(error => console.error(error));
});

// Retrieve news from local storage when page loads
window.addEventListener('load', () => {
  const storedNews = localStorage.getItem('japanNews');
  if (storedNews) {
    const japanNews = JSON.parse(storedNews);
    const uniqueArticles = [];
    const articleUrls = new Set();
    japanNews.forEach(article => {
      if (!articleUrls.has(article.url)) {
        uniqueArticles.push(article);
        articleUrls.add(article.url);
      }
    });
    uniqueArticles.slice(0, 6).forEach(article => {
      const newsCard = document.createElement('div');
      newsCard.classList.add('news-card');
      newsCard.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        <p>Source: ${article.source}</p>
        <p>Published at: ${article.published_at}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
      newsContainer.appendChild(newsCard);
    });
  }
});
  
 

  
