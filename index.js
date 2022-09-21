// ==UserScript==
// @name         Telegram Photo Protection Remover
// @namespace    http://tampermonkey.net/
// @version      1.2.2
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
        const aspecters = document.getElementsByClassName('media-viewer-aspecter');
        new MutationObserver(([{addedNodes: [addedNode]}]) => {
            if (addedNode) setTimeout(() => {
                aspecters[0].getElementsByTagName('img')[0].style.pointerEvents = 'auto';
            });
        }).observe(document.getElementById('page-chats'), { childList: true });
    } else if (v === 'z') {
        const PROTECTION_CLASS = 'is-protected';
        setInterval(() => {
            const mediaViewer = document.getElementById('MediaViewer');
            if (mediaViewer) {
                mediaViewer.querySelector('.protector')?.remove();
                Array.from(mediaViewer.getElementsByClassName(PROTECTION_CLASS)).forEach(el => {
                    el.classList.remove(PROTECTION_CLASS);
                });
            };
        }, 200)
    };
})();
