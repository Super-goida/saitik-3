// chat.js - загрузка тем сообщений для страницы command.html

const topicsData = [
    {
        id: 1,
        title: "Оператор 1О: Плановая проверка связи",
        sender: "Оператор 1О",
        receiver: "5S",
        time: "14:32",
        message: "Говорит Оператор 1О.\n\n Это плановая проверка связи с единицей типа 'сканер' 5S.\n Канал передачи устойчив, помех нет. Запрашиваю ответный вызов в течении следующих 15 минут для проверки обратной связи."
    },
    {
        id: 2,
        title: "Коммандер Уайт: Всем постам!",
        sender: "Командир YoRHa",
        receiver: "Все наземные единицы",
        time: "09:15",
        message: "ВНИМАНИЮ ВСЕМ ПОСТАМ, ПАТРУЛИРУЮЩИМ ТЕРРИТОРИИ ОКОЛО РУИН ГОРОДА!\n\nСРОЧНО ТРЕБУЕТСЯ ПОДДЕРЖКА ЕДИНИЦАМ 2B И 9S В СРАЖЕНИИ С ГОЛИАФОМ КЛАССА “ЭНГЕЛЬС”!\n\nПОВТОРЯЮ, СРОЧНО ТРЕБУЕТСЯ ПОДДЕРЖКА ЕДИНИЦАМ 2B И 9S В СРАЖЕНИИ С ГОЛИАФОМ КЛАССА “ЭНГЕЛЬС”!\nКООРДИНАТЫ МЕСТНОСТИ: 689.503982 65.1208943 -328.982643"
    },
    {
        id: 3,
        title: "Совет Человечества: Прогресс войны",
        sender: "Совет Человечества",
        receiver: "Все единицы",
        time: "22:40",
        message: "Говорит Совет Человечества.\n\n Долгие годы мы сражаемся с гнусными пришельцами, и их солдатами машинами, однако мы добились существенных успехов. Ваши жертвы не были, и никогда не будут напрасны! осталось совсем чуть-чуть, и половина Земли будет под нашим контролем!\n\n СЛАВА ЧЕЛОВЕЧЕСТВУ!"
    },
    {
        id: 4,
        title: "Оператор 1О: Плановая проверка связи",
        sender: "Оператор 1О",
        receiver: "5S",
        time: "07:20",
        message: "Говорит Оператор 1О.\n\n Это плановая проверка связи с единицей типа 'сканер' 5S.\n Канал передачи устойчив, помех нет. Запрашиваю ответный вызов в течении следующих 15 минут для проверки обратной связи."
    },
    {
        id: 5,
        title: "Коммандер Уайт: Обновление патрулей",
        sender: "Коммандер Уайт",
        receiver: "Все единицы",
        time: "12:05",
        message: "В связи с учащением появления более опасных машин в определённых участках битвы, Командование скоординировало новые маршруты патрулирования. Более подробную информацию вы можете узнать у Операторов."
    },
    {
        id: 6,
        title: "Коммандер Уайт: Срочное сообщение!",
        sender: "Коммандер Уайт",
        receiver: "Все единицы",
        time: "16:30",
        message: "ВСЕМ ЕДИНИЦАМ!\n\n НЕМЕДЛЕННО ОСТАНОВИТЕ ОТПРАВКУ СВОИХ ДАННЫХ НА СЕРВЕР БУНКЕРА! ВОЗНИКЛА СЕРЬЁЗНАЯ ОШИБКА, ВАШИ ДАННЫЕ МОГУТ НЕ СОХРАНИТСЯ!\n\n МЫ УВЕДОМИМ ВАС О ПОЧИНКЕ СЕРВЕРА КАК ТОЛЬКО ПРОБЛЕМА БУДЕТ РЕШЕНА"
    },
    {
        id: 7,
        title: "Оператор 1О: Плановая проверка связи",
        sender: "Оператор 1О",
        receiver: "5S",
        time: "18:45",
        message: "Говорит Оператор 1О.\n\n Это плановая проверка связи с единицей типа 'сканер' 5S.\n Канал передачи устойчив, помех нет. Запрашиваю ответный вызов в течении следующих 15 минут для проверки обратной связи."
    },
    {
        id: 8,
        title: "Совет Человечества: Мы победим!",
        sender: "Совет Человечества",
        receiver: "Все единицы",
        time: "11:00",
        message: "Говорит Совет Человечества.\n\nНедавняя самоотверженная выходка боевых единиц 2B и 9S существенно подорвала боевой дух врага, во всех смыслах. Даже несмотря на угрозу полной потери данных, наши герои подорвали свои чёрные ящики, тем самым, сразив сразу 4 противников класса 'голиаф'. Мы, <span class='secret-word' data-word='Человечество'>Человечество</span>, твёрдо уверены в ваш успех. Эта война скоро закончится, благодаря вам, нашим защитникам, андроидам! Мы победим!\n\n СЛАВА ЧЕЛОВЕЧЕСТВУ!"
    },
    {
        id: 9,
        title: "Коммандер Уайт: Важное напоминание",
        sender: "Коммандер Уайт",
        receiver: "Все единицы",
        time: "03:17",
        message: "При обнаружении новой машинной формы жизни, или странного поведения среди машин, немедленно сообщайте, и передавайте эти данные вашему оператору! Своевременная передача данных может <span class='secret-word' data-word='спасти'>спасти</span> не одну сотню андроидов.\n\n Помните: прежде чем инициировать сражение, узнайте о своем враге всё."
    },
    {
        id: 10,
        title: "Оператор 1О: Плановая проверка связи",
        sender: "Оператор 1О",
        receiver: "5S",
        time: "23:59",
        message: "Говорит Оператор 1О.\n\n Это плановая проверка связи с единицей типа 'сканер' 5S.\n Канал передачи устойчив, помех нет. Запрашиваю ответный вызов в течении следующих 15 минут для проверки обратной связи."
    }
];

function loadTopic(topicId) {
    const topic = topicsData.find(t => t.id === topicId);
    if (!topic) return;
    const chatMain = document.querySelector('.chatMain');
    if (!chatMain) return;

    // Для тем с секретными словами НЕ экранируем HTML
    const isSecretTopic = (topicId === 8 || topicId === 9);
    
    let messageHtml = topic.message;
    if (!isSecretTopic) {
        messageHtml = escapeHtml(topic.message);
    }
    
    const messageHTML = `
        <div class="message-header">
            <div class="header-left">
                <div class="square-message"></div>
                <span class="message-title">${escapeHtml(topic.title)}</span>
            </div>
            <div class="header-right">
                <div class="message-time">${topic.time}</div>
                <button class="close-topic" title="Закрыть тему">✕</button>
            </div>
        </div>
        <div class="message-info">
            <div class="sender">ОТПРАВИТЕЛЬ: ${escapeHtml(topic.sender)}</div>
            <div class="receiver">ПОЛУЧАТЕЛЬ: ${escapeHtml(topic.receiver)}</div>
        </div>
        <div class="message-divider"></div>
        <div class="message-body">
            ${messageHtml}
        </div>
    `;

    chatMain.innerHTML = messageHTML;
    const closeBtn = chatMain.querySelector('.close-topic');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            clearChatMain();
        });
    }
}

function clearChatMain() {
    const chatMain = document.querySelector('.chatMain');
    if (chatMain) {
        chatMain.innerHTML = '';
        // Восстанавливаем логотип после очистки
        const logoImg = document.createElement('img');
        logoImg.src = 'YoRHa_Logo.webp';
        logoImg.classList.add('chatMain-logo');
        chatMain.appendChild(logoImg);
    }
    document.querySelectorAll('.topic').forEach(t => t.classList.remove('active-topic'));
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Добавляем логотип в пустой chatMain при загрузке
    const chatMain = document.querySelector('.chatMain');
    if (chatMain && !chatMain.querySelector('.chatMain-logo')) {
        const logoImg = document.createElement('img');
        logoImg.src = 'YoRHa_Logo.webp';
        logoImg.classList.add('chatMain-logo');
        chatMain.appendChild(logoImg);
    }

    const topics = document.querySelectorAll('.topic');
    topics.forEach((topic, index) => {
        const topicId = index + 1;
        topic.dataset.id = topicId;
        topic.addEventListener('click', () => {
            document.querySelectorAll('.topic').forEach(t => t.classList.remove('active-topic'));
            topic.classList.add('active-topic');
            loadTopic(topicId);
        });
    });
});