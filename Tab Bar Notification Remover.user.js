// ==UserScript==
// @name        Tab Bar Notification Remover
// @description 某些网站会在标签栏的标题中显示通知数量, which is annoying, 本程序意在检测到这类前缀时自动去除它.
// @match       *://blog.csdn.net/*
// @match       *://www.zhihu.com/*
// @match       *://www.youtube.com/*
// @run-at      document-start
// @grant       none
// @update-time 2022-09-25, 2022-10-08, 2024-02-22, 2025-10-05
// ==/UserScript==

(function() {
    const hostname = window.location.hostname;

    // Define patterns for each site
    const patterns = {
        "csdn.net": /^\(\d+条消息\)\s*/,
        "zhihu.com": /^\(.*(?:私信|消息).*\)\s*/,
        "youtube.com": /^\(\d+\)\s*/
    };

    // Determine the current site's pattern
    const patternID = Object.keys(patterns).find(domain => hostname.includes(domain));
    if (!patternID) return;
    
    const pattern = patterns[patternID];
    
    // Function to clean the title
    function cleanTitle() {
        const currentTitle = document.title;
        if (pattern.test(currentTitle)) {
            document.title = currentTitle.replace(pattern, "");
        }
    }

    // Clean initial title
    cleanTitle();

    // MutationObserver callback
    const observerCallback = (mutations) => {
        cleanTitle();
    };
    
    // Set up the observer
    const observer = new MutationObserver(observerCallback);
    
    // Wait for title element to exist
    const setupObserver = () => {
        const titleElement = document.querySelector('title');
        if (titleElement) {
            observer.observe(titleElement, {
                childList: true,
                characterData: true,
                subtree: true
            });
        }
    };
    
    // Try to set up immediately or wait for DOM
    if (document.querySelector('title')) {
        setupObserver();
    } else {
        document.addEventListener('DOMContentLoaded', setupObserver);
    }
})();
