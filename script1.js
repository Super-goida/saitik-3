// База данных для поиска секторов
const searchData = [
    { title: "СЕКТОР ТАКТИКА", content: "Тактическая информация, боевые задания, оперативные сводки", element: ".tac", url: "tac.html" },
    { title: "СЕКТОР ТЕХНИКА", content: "Техническая документация, ремонт, вооружение андроидов", element: ".tec" },
    { title: "СЕКТОР ИСТОРИЯ", content: "Исторические данные, архивы человечества, хронология событий", element: ".his" },
    { title: "СЕКТОР СВЯЗЬ", content: "Коммуникационные протоколы, связь с Бункером, передача данных", element: ".com", url: "com.html" },
    { title: "Идентификатор системы", content: "ARK-YoRHa-Main, уровень доступа: стандартный" },
    { title: "Мнемозина", content: "Межстанцевая Сеть Обмена Данными" },
    { title: "YoRHa", content: "Боевые единицы, андроиды, проект по защите человечества" },
    { title: "Бункер", content: "Орбитальная станция, центр управления проектом YoRHa" }
];

// Данные для поиска страниц
const pageSearchData = [
    { 
        title: "Картография", 
        content: "Карта местности, локации, заброшенная фабрика, пустынная зона, деревня Паскаля, руины города",
        url: "map.html",
        keywords: ["карта", "картография", "локации", "местность", "фабрика", "пустыня", "деревня", "руины", "парк", "лес", "город"]
    },
    { 
        title: "Архив Миссий", 
        content: "Список миссий, улучшение связи, память 06 11B, предатели YoRHa, отряд разведки",
        url: "archive.html",
        keywords: ["миссия", "миссии", "архив", "задания", "операции"]
    },
    { 
        title: "Командование", 
        content: "Стратегическое совещание, приказы, отчёты, план Возрождение, чёрный ящик",
        url: "command.html",
        keywords: ["командование", "командир", "совещание", "приказ", "отчёт"]
    },
    { 
        title: "Доска Объявлений", 
        content: "Объявления, новости, оповещения, системные сообщения",
        url: "newsList.html",
        keywords: ["доска", "объявления", "новости", "объявление", "оповещение"]
    }
];

// Функция поиска страниц
function searchPages(query) {
    const lowerQuery = query.toLowerCase();
    const results = [];
    
    pageSearchData.forEach(page => {
        let score = 0;
        
        if (page.title.toLowerCase().includes(lowerQuery)) score += 10;
        if (page.content.toLowerCase().includes(lowerQuery)) score += 5;
        
        page.keywords.forEach(keyword => {
            if (keyword.toLowerCase().includes(lowerQuery) || lowerQuery.includes(keyword.toLowerCase())) {
                score += 8;
            }
        });
        
        if (score > 0) {
            results.push({
                title: " " + page.title,
                content: page.content.substring(0, 80) + "...",
                url: page.url,
                score: score
            });
        }
    });
    
    results.sort((a, b) => b.score - a.score);
    return results;
}

// Создание поисковой строки
function createSearchBar() {
    if (document.querySelector('.search-wrapper')) {
        return;
    }
    
    const searchHTML = `
        <div class="search-wrapper">
            <div class="search-container">
                <input type="text" id="searchInput" placeholder="ПОИСК ПО АРХИВУ..." autocomplete="off">
                <button id="searchBtn" class="search-btn">
                    <img class="search-icon" src="Group 5.png">
                </button>
            </div>
            <div id="searchResults" class="search-results"></div>
        </div>
    `;
    
    const lineElement = document.querySelector('.line');
    if (lineElement && !document.querySelector('.search-wrapper')) {
        lineElement.outerHTML = searchHTML;
    }
    
    initSearch();
}

// Инициализация поиска
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    const searchWrapper = document.querySelector('.search-wrapper');
    
    if (!searchInput || !searchBtn) return;
    
    // Добавляем адаптивные стили для результатов поиска
    function applyResponsiveStyles() {
        if (!searchResults) return;
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            searchResults.style.maxWidth = '280px';
            searchResults.style.width = 'auto';
            searchResults.style.left = '50%';
            searchResults.style.transform = 'translateX(-50%)';
            searchResults.style.right = 'auto';
        } else {
            searchResults.style.maxWidth = '';
            searchResults.style.width = '';
            searchResults.style.left = '0';
            searchResults.style.transform = '';
            searchResults.style.right = '0';
        }
    }
    
    window.addEventListener('resize', applyResponsiveStyles);
    applyResponsiveStyles();
    
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();
        
        if (!query) {
            searchResults.classList.remove('show');
            return;
        }
        
        const localResults = searchData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.content.toLowerCase().includes(query)
        ).map(item => ({
            title: item.title,
            content: item.content.substring(0, 60) + "...",
            element: item.element,
            url: item.url
        }));
        
        const pageResults = searchPages(query);
        const allResults = [...pageResults, ...localResults];
        
        displayResults(allResults);
    }
    
    function displayResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="result-item no-result" style="text-align: center; padding: 16px; color: #ACA68E; font-family: 'cuyabra', monospace; font-size: 14px; border-bottom: none;">
                    НИЧЕГО НЕ НАЙДЕНО
                </div>
            `;
        } else {
            searchResults.innerHTML = results.map(result => `
                <div class="result-item" data-title="${result.title.replace('', '')}" data-url="${result.url || ''}" data-element="${result.element || ''}">
                    <div class="result-title">${result.title}</div>
                    <div class="result-preview">${result.content}</div>
                </div>
            `).join('');
        }
        searchResults.classList.add('show');
        applyResponsiveStyles();
    }
    
    function selectResult(title, url, elementSelector) {
        searchInput.value = title;
        searchResults.classList.remove('show');
        
        if (url) {
            searchBtn.style.transform = 'scale(0.95)';
            searchBtn.style.opacity = '0.8';
            setTimeout(() => {
                window.location.href = url;
            }, 150);
            return;
        }
        
        if (elementSelector) {
            const element = document.querySelector(elementSelector);
            if (element) {
                element.style.animation = 'pulse 0.5s ease';
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => {
                    element.style.animation = '';
                }, 500);
            }
        }
    }
    
    searchBtn.onclick = performSearch;
    searchInput.onkeyup = (e) => {
        if (e.key === 'Enter') performSearch();
        if (e.key === 'Escape') searchResults.classList.remove('show');
    };
    
    searchInput.oninput = () => {
        if (searchInput.value.trim() === '') {
            searchResults.classList.remove('show');
        }
    };
    
    searchResults.onclick = (e) => {
        const resultItem = e.target.closest('.result-item');
        if (resultItem) {
            const title = resultItem.dataset.title;
            const url = resultItem.dataset.url;
            const element = resultItem.dataset.element;
            selectResult(title, url, element);
        }
    };
    
    document.addEventListener('click', (e) => {
        if (searchWrapper && !searchWrapper.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });
}

// Анимация пульсации
function addPulseAnimation() {
    if (document.querySelector('#pulse-style')) return;
    
    const style = document.createElement('style');
    style.id = 'pulse-style';
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); background-color: #ACA68E; }
            50% { transform: scale(1.05); background-color: #c4be9e; box-shadow: 0 0 20px rgba(172,166,142,0.8); }
            100% { transform: scale(1); background-color: #ACA68E; }
        }
    `;
    document.head.appendChild(style);
}

// Переходы на страницы
document.addEventListener('DOMContentLoaded', () => {
    addPulseAnimation();
    createSearchBar();
    
    const tacSector = document.querySelector('.tac');
    if (tacSector) {
        tacSector.addEventListener('click', () => {
            tacSector.style.transform = 'scale(0.95)';
            tacSector.style.opacity = '0.8';
            setTimeout(() => {
                window.location.href = 'tac.html';
            }, 150);
        });
    }
    
    const commSector = document.querySelector('.sector-comm, .com');
    if (commSector) {
        commSector.addEventListener('click', () => {
            commSector.style.transform = 'scale(0.95)';
            commSector.style.opacity = '0.8';
            setTimeout(() => {
                window.location.href = 'com.html';
            }, 150);
        });
    }
});