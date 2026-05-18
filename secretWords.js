// ========== СЕКРЕТНЫЕ СЛОВА ДЛЯ СБОРА ==========

let collectedWords = JSON.parse(localStorage.getItem('yorha_collected_words') || '[]');

// Правильная последовательность слов
const correctSequence = ["Человечество", "спасти", "не", "удалось"];

function saveCollectedWords() {
    localStorage.setItem('yorha_collected_words', JSON.stringify(collectedWords));
}

function showNotification(message, isError = false) {
    let notif = document.querySelector('.secret-notification');
    if (notif) notif.remove();
    
    notif = document.createElement('div');
    notif.className = 'secret-notification';
    notif.textContent = message;
    notif.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${isError ? '#4E4735' : '#2a2a2a'};
        color: #ACA68E;
        padding: 10px 20px;
        font-family: monospace;
        z-index: 10000;
        border-left: 3px solid #ACA68E;
        border-radius: 4px;
        animation: fadeOut 2s forwards;
    `;
    
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2000);
}

function addSecretWord(word, element) {
    if (!collectedWords.includes(word)) {
        collectedWords.push(word);
        saveCollectedWords();
        
        if (element) {
            element.classList.add('collected');
            element.style.opacity = '0.5';
            element.style.textDecoration = 'line-through';
            element.style.pointerEvents = 'none';
        }
        
        showNotification(`Код в слове "${word}" дешифрован. (${collectedWords.length}/4)`);
    }
}

function activateSecretWords() {
    document.querySelectorAll('.secret-word').forEach(el => {
        if (el.hasAttribute('data-listener')) return;
        
        const word = el.dataset.word;
        
        if (collectedWords.includes(word)) {
            el.classList.add('collected');
            el.style.opacity = '0.5';
            el.style.textDecoration = 'line-through';
            el.style.pointerEvents = 'none';
        }
        
        el.setAttribute('data-listener', 'true');
        el.style.cssText = `
            color: #8a8268;
            background: rgba(172,166,142,0.2);
            cursor: pointer;
            padding: 0 3px;
            border-radius: 3px;
            transition: all 0.2s;
            display: inline-block;
        `;
        
        el.addEventListener('mouseenter', () => {
            if (!el.classList.contains('collected')) {
                el.style.background = '#4E4735';
                el.style.color = '#ACA68E';
                el.style.transform = 'scale(1.02)';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if (!el.classList.contains('collected')) {
                el.style.background = 'rgba(172,166,142,0.2)';
                el.style.color = '#8a8268';
                el.style.transform = 'scale(1)';
            }
        });
        
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            if (el.classList.contains('collected')) return;
            addSecretWord(word, el);
        });
    });
}

// ===== ПОДСКАЗКИ В ПОИСКОВОЙ СТРОКЕ =====

function showSearchSuggestions() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    if (collectedWords.length === 0) {
        searchResults.innerHTML = `
            <div class="result-item no-result" style="text-align: center; padding: 12px; color: #8a8268; font-family: cuyabra">
                Введите искомые данные, а затем выберите нужный вариант...
            </div>
        `;
        searchResults.classList.add('show');
        return;
    }
    
    const suggestionsHtml = collectedWords.map(word => `
        <div class="secret-suggestion-item" data-word="${word}" style="padding: 12px 16px; cursor: pointer; font-family: monospace; color: #8a8268; transition: all 0.2s; border-bottom: 1px solid #4E4735;">
             ${word}
        </div>
    `).join('');
    
    searchResults.innerHTML = `
        <div style="padding: 8px 12px; color: #ACA68E; font-family: monospace; font-size: 12px; letter-spacing: 1px; background: rgba(0,0,0,0.5); border-bottom: 1px solid #4E4735;">
             ДОСТУПНЫЕ СЛОВА (${collectedWords.length}/4):
        </div>
        ${suggestionsHtml}
    `;
    
    searchResults.classList.add('show');
    
    document.querySelectorAll('.secret-suggestion-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.background = '#4E4735';
            item.style.color = '#ACA68E';
        });
        item.addEventListener('mouseleave', () => {
            item.style.background = 'transparent';
            item.style.color = '#8a8268';
        });
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const word = item.dataset.word;
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                const currentValue = searchInput.value;
                if (currentValue) {
                    searchInput.value = currentValue + ' ' + word;
                } else {
                    searchInput.value = word;
                }
                searchResults.classList.remove('show');
            }
        });
    });
}

// Проверка последовательности
function checkAndUnlockSecret() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return false;
    
    const inputValue = searchInput.value.trim();
    if (!inputValue) return false;
    
    const enteredWords = inputValue.split(/\s+/);
    
    if (enteredWords.length !== correctSequence.length) return false;
    
    let isCorrect = true;
    for (let i = 0; i < correctSequence.length; i++) {
        if (enteredWords[i] !== correctSequence[i]) {
            isCorrect = false;
            break;
        }
    }
    
    if (isCorrect) {
        localStorage.setItem('yorha_secret_unlocked', 'true');
        showNotification('Доступ разрешен.');
        showSecretButton();
        return true;
    } else {
        showNotification('! ВНИМАНИЕ ! НЕСАНКЦИОНИРОВАННАЯ ПОПЫТКА ВХОДА! НЕМЕДЛЕННО ПРЕКРАТИТЕ, ИНАЧЕ ДАЛЬНЕЙШИЕ ПОПЫТКИ БУДУТ РАСЦЕНЕНЫ КАК ДЕЙСТВИЯ ПРОТИВ YORHA!', true);
        return false;
    }
}

// Инициализация поиска
function initSearchWithSuggestions() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('focus', () => {
        showSearchSuggestions();
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            checkAndUnlockSecret();
            searchResults.classList.remove('show');
        }
    });
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            checkAndUnlockSecret();
            searchResults.classList.remove('show');
        });
    }
    
    document.addEventListener('click', (e) => {
        if (searchInput && searchResults && !searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });
}

// Показ секретной кнопки
function showSecretButton() {
    const sectorsGrid = document.querySelector('.sectors-grid');
    if (sectorsGrid && !document.querySelector('.secret-sector')) {
        const secretButton = document.createElement('div');
        secretButton.className = 'secret-sector';
        secretButton.style.cssText = `
            width: 300px;
            height: 60px;
            background-color: #a8a8a8;
            text-align: center;
            display: flex;
            border: solid 2px;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            grid-column: span 2;
            margin: 0 auto;
        `;
        secretButton.innerHTML = '<p class="tacText" style="font-family: CocoBikeR; font-size: 20px; color: #520000; margin:0;">СЕКТОР "ПРАВДА"</p>';
        
        secretButton.addEventListener('click', () => {
            window.location.href = 'truth.html';
        });
        
        secretButton.addEventListener('mouseenter', () => {
            secretButton.style.backgroundColor = '#242424';
            secretButton.querySelector('.tacText').style.color = '#a30000';
            secretButton.style.transform = 'scale(1.02)';
        });
        secretButton.addEventListener('mouseleave', () => {
            secretButton.style.backgroundColor = '#a8a8a8';
            secretButton.querySelector('.tacText').style.color = '#520000';
            secretButton.style.transform = 'scale(1)';
        });
        
        sectorsGrid.appendChild(secretButton);
    }
}

// Адаптивная кнопка сброса
function createResetButton() {
    const clearBtn = document.createElement('button');
    clearBtn.id = 'resetProgressBtn';
    clearBtn.innerHTML = 'Сбросить прогресс';
    clearBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #2a2a2a;
        color: #ACA68E;
        border: none;
        padding: 8px 15px;
        font-family: monospace;
        font-size: 12px;
        border-radius: 4px;
        cursor: pointer;
        z-index: 9999;
        transition: all 0.3s ease;
    `;
    
    const resetProgress = () => {
        collectedWords = [];
        saveCollectedWords();
        localStorage.removeItem('yorha_secret_unlocked');
        showNotification('Прогресс сброшен!');
        const secretBtn = document.querySelector('.secret-sector');
        if (secretBtn) secretBtn.remove();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
        
        if (clearBtn.classList.contains('expanded')) {
            clearBtn.classList.remove('expanded');
            clearBtn.innerHTML = 'Сбросить прогресс';
            clearBtn.style.width = '';
        }
    };
    
    function checkMobileAndAdjust() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            clearBtn.innerHTML = '›';
            clearBtn.style.width = '40px';
            clearBtn.style.padding = '8px 0';
            clearBtn.style.fontSize = '20px';
            clearBtn.style.fontWeight = 'bold';
            clearBtn.style.textAlign = 'center';
            clearBtn.style.borderRadius = '50%';
            clearBtn.style.backgroundColor = '#4E4735';
            clearBtn.style.color = '#ACA68E';
            
            clearBtn.onclick = (e) => {
                e.stopPropagation();
                if (clearBtn.classList.contains('expanded')) {
                    resetProgress();
                    clearBtn.classList.remove('expanded');
                    clearBtn.innerHTML = '›';
                    clearBtn.style.width = '40px';
                    clearBtn.style.borderRadius = '50%';
                } else {
                    clearBtn.classList.add('expanded');
                    clearBtn.innerHTML = 'Сбросить прогресс';
                    clearBtn.style.width = 'auto';
                    clearBtn.style.padding = '8px 15px';
                    clearBtn.style.borderRadius = '20px';
                    clearBtn.style.backgroundColor = '#2a2a2a';
                    
                    const closeOnClickOutside = (event) => {
                        if (!clearBtn.contains(event.target)) {
                            clearBtn.classList.remove('expanded');
                            clearBtn.innerHTML = '›';
                            clearBtn.style.width = '40px';
                            clearBtn.style.borderRadius = '50%';
                            clearBtn.style.backgroundColor = '#4E4735';
                            document.removeEventListener('click', closeOnClickOutside);
                        }
                    };
                    setTimeout(() => {
                        document.addEventListener('click', closeOnClickOutside);
                    }, 10);
                }
            };
            
            clearBtn.onmouseenter = () => {
                if (!clearBtn.classList.contains('expanded')) {
                    clearBtn.style.backgroundColor = '#ACA68E';
                    clearBtn.style.color = '#4E4735';
                }
            };
            clearBtn.onmouseleave = () => {
                if (!clearBtn.classList.contains('expanded')) {
                    clearBtn.style.backgroundColor = '#4E4735';
                    clearBtn.style.color = '#ACA68E';
                }
            };
        } else {
            clearBtn.innerHTML = 'Сбросить прогресс';
            clearBtn.style.width = 'auto';
            clearBtn.style.padding = '8px 15px';
            clearBtn.style.fontSize = '12px';
            clearBtn.style.borderRadius = '4px';
            clearBtn.style.backgroundColor = '#2a2a2a';
            clearBtn.style.color = '#ACA68E';
            clearBtn.onclick = resetProgress;
            
            clearBtn.onmouseenter = () => {
                clearBtn.style.backgroundColor = '#ACA68E';
                clearBtn.style.color = '#4E4735';
            };
            clearBtn.onmouseleave = () => {
                clearBtn.style.backgroundColor = '#2a2a2a';
                clearBtn.style.color = '#ACA68E';
            };
        }
    }
    
    window.addEventListener('resize', checkMobileAndAdjust);
    checkMobileAndAdjust();
    
    document.body.appendChild(clearBtn);
}

function startObserver() {
    const observer = new MutationObserver(() => {
        activateSecretWords();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    activateSecretWords();
}

function initMainPage() {
    createResetButton();
    initSearchWithSuggestions();
    
    if (localStorage.getItem('yorha_secret_unlocked') === 'true') {
        showSecretButton();
    }
}

// Функция определения страницы (работает с разными именами файлов)
function getPageName() {
    const path = window.location.pathname;
    const fileName = path.split('/').pop();
    
    // Поддерживаем как старое имя main1.html, так и новое index.html
    if (fileName === 'main1.html' || fileName === 'index.html' || fileName === '' || fileName === '/') {
        return 'index';
    }
    if (fileName === 'command.html') return 'command';
    if (fileName === 'archive.html') return 'archive';
    if (fileName === 'mission.html') return 'mission';
    
    return fileName;
}

document.addEventListener('DOMContentLoaded', () => {
    const page = getPageName();
    
    if (page === 'command') {
        startObserver();
    } else if (page === 'archive') {
        startObserver();
    } else if (page === 'mission') {
        startObserver();
    } else if (page === 'index') {
        initMainPage();
        startObserver();
    }
});