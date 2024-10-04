// ==UserScript==
// @name         Disable Copy Behaviour on Xiaohongshu
// @version      0.1
// @description  Try to take over the world!
// @author       ChatGPT
// @match        https://www.xiaohongshu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to stop the propagation of the copy event
    function overrideCopyEvent(e) {
        e.stopPropagation();  // Stop the event from propagating
        e.stopImmediatePropagation(); // Stops other listeners of the same event from being called
    }

    // Add the event listener in the capturing phase (true)
    document.addEventListener('copy', overrideCopyEvent, true);

    // Alternatively, to remove an event listener, you would need to know the function name:
    // document.removeEventListener('copy', theFunctionToRemove, true);
})();
