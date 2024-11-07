let allMovies = [];

// Завантаження даних з movies.json
fetch('movies.json')
    .then(response => response.json())
    .then(data => {
        allMovies = data;
        initializeUI();
    })
    .catch(error => console.error('Помилка завантаження даних:', error));

// Ініціалізація інтерфейсу
function initializeUI() {
    displayMovies(allMovies);
    populateFilters();
    document.querySelectorAll('#filters select, #filters input').forEach(elem => 
        elem.addEventListener('input', applyFilters)
    );
}

// Відображення фільмів
function displayMovies(movies) {
    const moviesList = document.getElementById('movies-list');
    moviesList.innerHTML = movies.length ? '' : '<p>Нічого не знайдено</p>';

    movies.forEach(({ poster, title, director, genre, releaseYear, language, rating, description }) => {
        const movieCard = document.createElement('div');
        movieCard.className = 'card';
        movieCard.innerHTML = `
            <img src="${poster}" alt="${title} Poster">
            <div class="card-content">
                <h3>${title}</h3>
                <p>Режисер: ${director}</p>
                <p>Жанр: ${genre}</p>
                <p>Рік: ${releaseYear}</p>
                <p>Мова: ${language}</p>
                <p>Рейтинг: ${'⭐'.repeat(rating)}</p>
                <p>${description.slice(0, 100)}...</p>
            </div>
        `;
        movieCard.addEventListener('click', () => openModal(title, description));
        moviesList.appendChild(movieCard);
    });
}

// Модальне вікно
function openModal(title, description) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = description;
    modal.style.display = 'flex';
}

document.getElementById('close-modal').onclick = () => {
    document.getElementById('modal').style.display = 'none';
};

// Застосування фільтрів та сортування
function applyFilters() {
    const searchQuery = document.getElementById('search').value.toLowerCase();
    const genre = document.getElementById('genre-filter').value;
    const director = document.getElementById('director-filter').value.toLowerCase();
    const yearFrom = parseInt(document.getElementById('year-from').value) || 0;
    const yearTo = parseInt(document.getElementById('year-to').value) || new Date().getFullYear();
    const language = document.getElementById('language-filter').value;
    const sortOption = document.getElementById('sort-options').value;

    const filteredMovies = allMovies
        .filter(movie => 
            movie.title.toLowerCase().includes(searchQuery) &&
            (!genre || movie.genre === genre) &&
            (!director || movie.director.toLowerCase().includes(director)) &&
            movie.releaseYear >= yearFrom && movie.releaseYear <= yearTo &&
            (!language || movie.language === language)
        )
        .sort((a, b) => {
            if (sortOption.includes('title')) return sortOption === 'title-asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            if (sortOption.includes('rating')) return sortOption === 'rating-asc' ? a.rating - b.rating : b.rating - a.rating;
            if (sortOption.includes('year')) return sortOption === 'year-asc' ? a.releaseYear - b.releaseYear : b.releaseYear - a.releaseYear;
        });

    displayMovies(filteredMovies);
}

// Заповнення фільтрів
function populateFilters() {
    ['genre', 'director', 'language'].forEach(type => {
        const options = Array.from(new Set(allMovies.map(movie => movie[type])));
        const select = document.getElementById(`${type}-filter`);
        select.innerHTML = '<option value="">Всі</option>' + options.map(opt => `<option value="${opt}">${opt}</option>`).join('');
    });
}
