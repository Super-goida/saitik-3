// Данные тем: название, создатель, время, и массив сообщений (4 сообщения)
const topicsData = [
    {
        id: 1,
        title: "7D: Запрос на подкрепление",
        creator: "7D",
        time: "14:32",
        messages: [
            { author: "7D", text: "Кто находится около, и в секторе L, требуется поддержка со стороны сканеров", side: "received", avatar: "androids/7D.png" },
            { author: "8S", text: "Уже в пути, ждите 7 минут.", side: "received", avatar: "androids/8S.png" },
            { author: "7D", text: "Благодарю", side: "received", avatar: "androids/7D.png" }
        ]
    },
    {
        id: 2,
        title: "12H: Помощь в сборе материалов",
        creator: "12H",
        time: "09:15",
        messages: [
            { author: "12H", text: "Говорит 12H, кто может помочь в сборе и транспортировке материалов?", side: "received", avatar: "androids/12H.jpg" },
            { author: "7D", text: "Эй! А меня тебе значит мало?!", side: "received", avatar: "androids/7D.png" },
            { author: "12H", text: "Ни в коем случае, Ди, мне просто нужна дополнительная компания!", side: "received", avatar: "androids/12H.jpg" },
            { author: "7D", text: "Я ревную...", side: "received", avatar: "androids/7D.png" },
            { author: "9B", text: "Эмоции запрещены, 7D.", side: "received", avatar: "androids/9B.jpg" },
            { author: "Вы", text: "Через 15 минут буду около вашего сектора", side: "sent", avatar: "androids/5S.png" },
            { author: "7D", text: "9B зануда!", side: "received", avatar: "androids/7D.png" },
            { author: "9B", text: "Совсем как взрослые... Или, как там люди говорили...", side: "received", avatar: "androids/9B.jpg" },
            { author: "12H", text: "Правильно будет 'совсем как дети', 9B", side: "received", avatar: "androids/12H.jpg" },
            { author: "9B", text: "Тем не менее, это не отменяет сказанного. Соберитесь и завершите задание. Я, если получится, позже присоединюсь.", side: "received", avatar: "androids/9B.jpg" },
            { author: "12H", text: "Спасибо 5S! Спасибо 9B!", side: "received", avatar: "androids/12H.jpg" },
            { author: "Вы", text: "Не за что", side: "sent", avatar: "androids/5S.png" }
        ]
    },
    {
        id: 3,
        title: "43G: Постреляем?",
        creator: "43G",
        time: "11:20",
        messages: [
            { author: "43G", text: "В парке развлечений, в 12:00 будем играть в тир. Есть желающие?", side: "received", avatar: "androids/43G.jpg" },
            { author: "9D", text: "Играем на награду?", side: "received", avatar: "androids/9D.jpg" },
            { author: "43G", text: "Ага, на твой меч.", side: "received", avatar: "androids/43G.jpg" },
            { author: "Вы", text: "Я в деле!", side: "sent", avatar: "androids/5S.png" },
            { author: "9D", text: "Э! Я ПРОТИВ, Я ПРОТИВ!", side: "received", avatar: "androids/9D.jpg" },
            { author: "43G", text: "Успокойся, играем просто на интерес", side: "received", avatar: "androids/43G.jpg" },
            { author: "9D", text: "Тогда я приду. Но я так, посмотрю", side: "received", avatar: "androids/9D.jpg" },
            { author: "Вы", text: "Со мной ещё два сканера будет, они могут участвовать?", side: "sent", avatar: "androids/5S.png" },
            { author: "43G", text: "Конечно, но вам я дам фору", side: "received", avatar: "androids/43G.jpg" },
            { author: "Вы", text: "То что мы, сканеры, предназначены для разведки, а не для боя, ещё ничего не значит! Может, это Я тебе дам фору!", side: "sent", avatar: "androids/5S.png" },
            { author: "43G", text: "Ну-ну. А давай так: 1 пуля. 1 пуля на быстро движущуюся цель, что скажешь?", side: "received", avatar: "androids/43G.jpg" },
            { author: "Вы", text: "По рукам! Посмотрим, кто посмеется последним!", side: "sent", avatar: "androids/5S.png" },
            { author: "20B", text: "Я буду снимать, не даром камеру из старого мира починила. За тебя всей горой, 5S!", side: "received", avatar: "androids/20B.jpg" },
            { author: "9D", text: "Теперь я точно приду!", side: "received", avatar: "androids/9D.jpg" }
        ]
    },
    {
        id: 4,
        title: "9B: Совместная тренировка",
        creator: "9B",
        time: "16:45",
        messages: [
            { author: "9B", text: "Говорит боевая модель 9B. Необходимы дополнительные единицы для совместной тренировки с целью обмена опытом и повышения боевых навыков", side: "received", avatar: "androids/9B.jpg" },
            { author: "20B", text: "Какая ты формальная, 9B, это просто ужас!", side: "received", avatar: "androids/20B.jpg" },
            { author: "9B", text: "Я не формальная, 20B. Я лишь следую общим нормам комунникации среди андроидов YoRHa.", side: "received", avatar: "androids/9B.jpg" },
            { author: "20B", text: "Ещё и такая зануда! Тебе определённо нужно расслабляться после миссий, а то так и с ума сойдешь!", side: "received", avatar: "androids/20B.jpg" },
            { author: "9B", text: "Ты присоеденишься к тренировке, или нет?", side: "received", avatar: "androids/9B.jpg" },
            { author: "20B", text: "Конечно присоединюсь! Просто не будь такой формальной, ты ведь не с Коммандер Уайт разговариваешь", side: "received", avatar: "androids/20B.jpg" },
            { author: "9B", text: "Я думаю, что твое времяпрепровождение со сканерами надо ограничить, они плохо на тебя вляют своим неуставным поведением", side: "received", avatar: "androids/9B.jpg" },
            { author: "Вы", text: "Э", side: "sent", avatar: "androids/5S.png" },
            { author: "Вы", text: "А мы тут причём?", side: "sent", avatar: "androids/5S.png" },
            { author: "9B", text: "ты тоже присоединишься?", side: "received", avatar: "androids/9B.jpg" },
            { author: "Вы", text: "Может быть, но сначала ответь на мой вопрос", side: "sent", avatar: "androids/5S.png" },
            { author: "9B", text: "Принято", side: "received", avatar: "androids/9B.jpg" },
            { author: "Вы", text: "Ответь на мой вопрос", side: "sent", avatar: "androids/5S.png" },
            { author: "Вы", text: "9B!", side: "sent", avatar: "androids/5S.png" },
        ]
    },
    {
        id: 5,
        title: "Член Сопротивления: Штурм Лесной Зоны",
        creator: "Член Сопротивления",
        time: "22:10",
        messages: [
            { author: "Член Сопротивления", text: "Запрашиваю подкрепление среди отрядов YoRHa, все подробности оглашу при личной встрече", side: "received", avatar: "androids/resist-member.jpg" },
            { author: "9B", text: "Я готова, передайте координаты", side: "received", avatar: "androids/9B.jpg" },
            { author: "Вы", text: "Передайте координаты", side: "sent", avatar: "androids/5S.png" },
            { author: "9D", text: "Я готов, ожидаю координаты", side: "received", avatar: "androids/9D.jpg" },
        ]
    },
    {
        id: 6,
        title: "8S: Парк Развлечений!",
        creator: "8S",
        time: "0:17",
        messages: [
            { author: "8S", text: "Хей! Есть кто погулять в Парк Развлечений в свободное от миссий время?!", side: "received", avatar: "androids/8S.png" },
            { author: "6S", text: "Не могу, но принеси сувенир какой-нибудь, на Pod’а приклею.", side: "received", avatar: "androids/6S.png" },
            { author: "Вы", text: "Если повезёт, я смогу прийти.", side: "sent", avatar: "androids/5S.png" },
            { author: "7D", text: "У вас прогулка тут только среди сканеров?", side: "received", avatar: "androids/7D.png" }
        ]
    },
    {
        id: 7,
        title: "19S: ВАЖНО: ОБНОВЛЕНИЕ “ДОСКИ ОБЪЯВЛЕНИЙ”",
        creator: "19S",
        time: "18:55",
        messages: [
            { author: "19S", text: "Говорит 19S, учредитель доски объявлений. Я оптимизировал канал (надеюсь, он не будет перегружен при активных боевых действиях), обновил интерфейс, теперь он будет похож на раздел командования, а также я обновил базу личных данных, теперь при общении вы будете видеть с кем общаетесь", side: "received", avatar: "androids/19S.jpg" },

        ]
    },
    {
        id: 8,
        title: "Член Сопротивления: Кто на рыбалку?",
        creator: "Член Сопротивления",
        time: "13:00",
        messages: [
            { author: "Член Сопротивления", text: "Слышала, вы YoRHa любите порыбачить. Кто пойдет на рыбалку в затопленный город?", side: "received", avatar: "androids/resist-member2.jpg" },
            { author: "20B", text: "О, я тебя как раз вижу, сейчас присоеденюсь!", side: "received", avatar: "androids/20B.jpg" },
            { author: "7D", text: "Мы с 12H к тебе скоро подойдем", side: "received", avatar: "androids/7D.png" },
            { author: "Вы", text: "Сейчас к тебе спущусь", side: "sent", avatar: "androids/5S.png" },
        ]
    },
    {
        id: 9,
        title: "7D: Состязание из старого мира",
        creator: "7D",
        time: "03:17",
        messages: [
            { author: "7D", text: "Недавно вычитал в архивах, что люди измеряли силу путём 'армрестлинга'. Кто хочет опробовать?", side: "received", avatar: "androids/7D.png" },
            { author: "43G", text: "Куда приходить?", side: "received", avatar: "androids/43G.jpg" },
            { author: "7D", text: "В лагере сопротивления, около 10 утра", side: "received", avatar: "androids/7D.png" },
            { author: "9B", text: "Я приду", side: "received", avatar: "androids/9B.jpg" },
            { author: "43G", text: "О, отлично, мне как раз туда надо сходить по заданию, как раз успею к вам на состязание", side: "received", avatar: "androids/43G.jpg" },
            { author: "Вы", text: "Я зайду, если получится", side: "sent", avatar: "androids/5S.png" },
        ]
    },
    {
        id: 10,
        title: "1S: Прогулка по Затопленному Городу",
        creator: "1S",
        time: "12:30",
        messages: [
            { author: "1S", text: "Есть кто в округе свободный от заданий для прогулки по Затопленному Городу? порыбачим, пообщаемся", side: "received", avatar: "androids/1S.jpg" },
            { author: "8S", text: "Конечно! Я приду туда как можно скорее!", side: "received", avatar: "androids/8S.png" },
            { author: "Вы", text: "Почему бы нет", side: "sent", avatar: "androids/5S.png" },
            { author: "19S", text: "Я нашел книгу из старого мира, будем расшифровывать?", side: "received", avatar: "androids/19S.jpg" }
        ]
    }
];

// Функция отображения темы в правой части (БЕЗ принудительного форматирования)
function loadTopic(topicId) {
    const topic = topicsData.find(t => t.id === topicId);
    if (!topic) return;

    const chatMain = document.querySelector('.chatMain');
    if (!chatMain) return;

    let html = `
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
        <div class="topic-creator">
            <span class="creator-label">СОЗДАТЕЛЬ ТЕМЫ:</span>
            <span class="creator-name">${escapeHtml(topic.creator)}</span>
        </div>
        <div class="topic-divider"></div>
        <div class="messages-container">
    `;

    // Добавляем сообщения (текст НЕ форматируется, только экранируется)
topic.messages.forEach(msg => {
    // Функция проверки: если avatar содержит путь к изображению (/.+\./ - есть точка или слэш)
    const isImagePath = msg.avatar && (msg.avatar.includes('/') || msg.avatar.includes('.'));
    
    let avatarHtml = '';
    if (isImagePath) {
        // Если это путь к изображению
        avatarHtml = `<div class="message-avatar" style="background-image: url('${escapeHtml(msg.avatar)}'); background-size: cover; background-position: center;"></div>`;
    } else {
        // Если это буква (fallback)
        const avatarLetter = msg.avatar || msg.author.charAt(0);
        avatarHtml = `<div class="message-avatar" style="background-color: #2a2a2a; display: flex; align-items: center; justify-content: center;">
                        <span style="color:#ACA68E; font-size:20px;">${escapeHtml(avatarLetter)}</span>
                      </div>`;
    }
    
    html += `
        <div class="message ${msg.side}">
            ${avatarHtml}
            <div class="message-content">
                <span class="message-author">${escapeHtml(msg.author)}</span>
                <div class="message-text">${escapeHtml(msg.text)}</div>
            </div>
        </div>
    `;
});

    html += `
        </div>
        <div class="chat-input-disabled">
            Канал перегружен. Отправка сообщений ограничена.
        </div>
    `;

    chatMain.innerHTML = html;

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

    if (topics.length > 0) {
        topics[0].click();
    }
});