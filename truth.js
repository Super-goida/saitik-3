// Заставка перед показом контента
document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splashOverlay');
    const splashText = document.getElementById('splashText');
    const mainContent = document.getElementById('mainContent');
    
    let clickCount = 0;
    let timer = null;
    
    function changeTextAndFade() {
        splashText.textContent = 'ЧЕЛОВЕЧЕСТВО МЕРТВО.';
        splashText.classList.add('changed');
        
        setTimeout(() => {
            splash.classList.add('fade-out');
            setTimeout(() => {
                splash.style.display = 'none';
                mainContent.classList.remove('hidden');
            }, 800);
        }, 2000);
    }
    
    splash.addEventListener('click', () => {
        if (timer) return;
        clickCount++;
        if (clickCount === 1) {
            timer = setTimeout(() => {
                changeTextAndFade();
            }, 200);
        }
    });
});