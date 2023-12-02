// ==UserScript==
// @name        Ignore Save on LeetCode
// @namespace   http://tampermonkey.net/
// @version     1.0
// @description On leetcode.com, when pressing "ctrl + s" or "cmd + s", just ignore it, instead of popping up the "save to" window.
// @author      You
// @match       https://leetcode.com/*
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
    // Event listener for keypress
    document.addEventListener('keydown', function(event) {
        // 's' keycode is 83. 'ctrl' keycode is 17. 'cmd' keycode is 91/93.
        // event.ctrlKey for 'ctrl' key, event.metaKey for 'cmd' key.
        if ((event.ctrlKey || event.metaKey) && event.keyCode === 83) {
            // Prevent the default action
            event.preventDefault();
        }
    });
})();
