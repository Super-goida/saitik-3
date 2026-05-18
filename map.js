// Данные локаций
const locationsData = {
    "ЗАБРОШЕННАЯ ФАБРИКА": {
        image: "factory.webp",
        title: "ЗАБРОШЕННАЯ ФАБРИКА",
        territory: "Под контролем машин",
        machines: "Маленький коротышка, Средняя двуногая, Многоступенчатая модель",
        danger: "Очень высокий"
    },
    "ПУСТЫННАЯ ЗОНА": {
        image: "desert.webp",
        title: "ПУСТЫННАЯ ЗОНА",
        territory: "Под контролем андроидов",
        machines: "Средняя четвероногая, Маленькая двуногая, Большая многоступенчатая",
        danger: "Ниже среднего"
    },
    "ДЕРЕВНЯ ПАСКАЛЯ": {
        image: "village.webp",
        title: "ДЕРЕВНЯ ПАСКАЛЯ",
        territory: "Под контролем андроидов",
        machines: "Мирные машины, Маленький коротышка",
        danger: "Очень низкий"
    },
    "РУИНЫ ГОРОДА": {
        image: "ruins.webp",
        title: "РУИНЫ ГОРОДА",
        territory: "Оспориваемая территория",
        machines: "Маленький коротышка, Многоступенчатая модель, Маленькая двуногая, Средняя двуногая, Средняя четвероногая, Средняя многожак",
        danger: "Высокий"
    },
    "ПАРК РАЗВЛЕЧЕНИЙ": {
        image: "park.webp",
        title: "ПАРК РАЗВЛЕЧЕНИЙ",
        territory: "Оспариваемая территория",
        machines: "Маленькие двуногие, Маленький коротышка",
        danger: "низкий"
    },
    "ЛЕСНАЯ ЗОНА": {
        image: "forest.webp",
        title: "ЛЕСНАЯ ЗОНА",
        territory: "Под контролем машин",
        machines: "Средняя четвероногая, Маленькая двуногая",
        danger: "Высокий"
    },
    "ЗАТОПЛЕННЫЙ ГОРОД": {
        image: "flood-city.webp",
        title: "ЗАТОПЛЕННЫЙ ГОРОД",
        territory: "Под контролем андроидов",
        machines: "Водные машины, Средняя четвероногая",
        danger: "Ниже среднего"
    }
};

let isAnimating = false;

document.addEventListener('DOMContentLoaded', () => {
    const mapImage = document.querySelector('.map-image');
    const locationTitle = document.querySelector('.location-title');
    const infoContainer = document.querySelector('.info-container');
    const extraLine = document.querySelector('.extra-line');
    const territoryStatus = document.getElementById('territory-status');
    const machineList = document.getElementById('machine-list');
    const dangerLevel = document.getElementById('danger-level');
    
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach(card => {
        card.addEventListener('click', () => {
            if (isAnimating) return;
            
            locationCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            
            const locationName = card.querySelector('.location-name').textContent;
            changeLocation(locationName);
        });
    });
    
    function changeLocation(locationName) {
        const location = locationsData[locationName];
        if (!location) return;
        
        isAnimating = true;
        
        // Показываем дублируемый line
        if (extraLine.classList.contains('visible') === false) {
            extraLine.classList.add('visible');
        }
        
        // АНИМАЦИЯ FADE: плавное исчезновение
        mapImage.style.transition = "opacity 0.3s ease-out";
        mapImage.style.opacity = "0";
        
        setTimeout(() => {
            // Меняем изображение
            mapImage.src = location.image;
            
            // АНИМАЦИЯ FADE: плавное появление
            setTimeout(() => {
                mapImage.style.opacity = "1";
            }, 50);
            
            locationTitle.textContent = location.title;
            locationTitle.classList.add('visible');
            
            territoryStatus.textContent = location.territory;
            machineList.textContent = location.machines;
            dangerLevel.textContent = location.danger;
            
            if (infoContainer.classList.contains('hidden')) {
                infoContainer.classList.remove('hidden');
                infoContainer.classList.add('visible');
            } else {
                infoContainer.classList.remove('visible');
                void infoContainer.offsetWidth;
                infoContainer.classList.add('visible');
            }
            
            setTimeout(() => {
                isAnimating = false;
            }, 400);
        }, 300);
    }
});
// Упрощённая пошаговая анимация
async function changeLocation(locationName) {
    const location = locationsData[locationName];
    if (!location) return;
    
    isAnimating = true;
    
    // ШАГ 1: Схлопывание карты (300ms)
    mapImage.classList.add('collapse');
    await delay(300);
    
    // ШАГ 2: Смена картинки + появление line + сдвиг контента
    mapImage.src = location.image;
    mapImage.classList.remove('collapse');
    mapImage.style.opacity = "0";
    
    if (!extraLine.classList.contains('visible')) {
        extraLine.classList.add('visible');
    }
    document.querySelector('.center-column').classList.add('content-shift');
    
    await delay(400);
    
    // ШАГ 3: Появление карты + название локации (через 200ms)
    mapImage.style.opacity = "1";
    mapImage.classList.add('expand');
    
    await delay(200);
    
    locationTitle.textContent = location.title;
    locationTitle.classList.add('visible');
    
    territoryStatus.textContent = location.territory;
    machineList.textContent = location.machines;
    dangerLevel.textContent = location.danger;
    
    await delay(200);
    
    // ШАГ 4: Появление текста
    if (infoContainer.classList.contains('hidden')) {
        infoContainer.classList.remove('hidden');
        infoContainer.classList.add('visible');
    } else {
        infoContainer.classList.remove('visible');
        void infoContainer.offsetWidth;
        infoContainer.classList.add('visible');
    }
    
    await delay(500);
    
    mapImage.classList.remove('expand');
    isAnimating = false;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}