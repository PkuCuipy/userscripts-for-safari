// ==UserScript==
// @name         Toggle Opacity of div.runtime-preview
// @version      1.0
// @description  Toggle the opacity of div.runtime-preview on Apple developer tutorial pages
// @author       Pengyu Cui with ChatGPT
// @match        https://developer.apple.com/tutorials/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let opacityState = 1.0; // 1.0 means fully opaque, 0.5 means semi-transparent

    document.addEventListener('keydown', function(event) {
        if (event.key === 'F3') {
            opacityState = opacityState === 1.0 ? 0.5 : 1.0;
            let previewDivs = document.querySelectorAll('div.runtime-preview');
            previewDivs.forEach(div => {
                div.style.opacity = opacityState;
            });
        }
    });
})();
