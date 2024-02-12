// ==UserScript==
// @name         Arrow Navigation for Xiaohongshu.com
// @description  Use arrow keys to navigate the multi-image posts.
// @author       Pengyu Cui with ChatGPT
// @match        *://*.xiaohongshu.com/*
// @date         2024-02-11
// ==/UserScript==

(() => {
    'use strict';
    document.addEventListener('keydown', (event) => {
        // Only proceed if the event does not originate from input, textarea, or contenteditable elements
        const target = event.target;
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA" && !target.isContentEditable) {
            let selector = '';
            switch (event.key) {
                case "ArrowLeft": selector = ".arrow-controller.left"; break;
                case "ArrowRight": selector = ".arrow-controller.right"; break;
                default: return;
            }
            event.preventDefault();
            document.querySelector(selector).click();
        }
    });
})();
