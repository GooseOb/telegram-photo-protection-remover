// ==UserScript==
// @name         Telegram Photo Protection Remover
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Removes photo protection in Telegram
// @author       GooseOb
// @match        https://web.telegram.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=telegram.org
// @license      MIT
// @grant        none
// ==/UserScript==

(function() {
    const v = window.location.pathname[1];
    if (v === 'k') {
        const listener = e => {
            const img = e.target.querySelector('img');
            if (img) img.style.pointerEvents = 'auto';
        };
        document.addEventListener('contextmenu', listener, {capture: true});
    } else if (v === 'z' || v === 'a') {
        const PROTECTION_CLASS = '.is-protected';
        setInterval(() => {
            const mediaViewer = document.getElementById('MediaViewer');
            if (mediaViewer) {
                mediaViewer.querySelector('.protector')?.remove();
                for (const el of mediaViewer.querySelectorAll('.' + PROTECTION_CLASS)) {
                    el.classList.remove(PROTECTION_CLASS);
                    el.draggable = true;
                }
            };
        }, 200)
    }
})();