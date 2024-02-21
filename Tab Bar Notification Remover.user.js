// ==UserScript==
// @name        Tab Bar Notification Remover
// @description 某些网站会在标签栏的标题中显示通知数量, which is annoying, 本程序意在检测到这类前缀时自动去除它.
// @match       *://blog.csdn.net/*
// @match       *://www.zhihu.com/*
// @match       *://www.youtube.com/*
// @update-time 2022-09-25, 2022-10-08, 2024-02-22
// ==/UserScript==

(function() {
    const hostname = window.location.hostname;

    // Define patterns for each site
    const patterns = {
        "csdn.net": /\(\d+条消息\) /,
        "zhihu.com": /\(.*(?:私信|消息).*\) /,
        "youtube.com": /\(\d+\) /
    };

    // Determine the current site's pattern
    const patternID = Object.keys(patterns).find(domain => hostname.includes(domain));
    if (!patternID) return; // Exit if the site is not in the list

    // MutationObserver callback to handle title changes
    const observerCallback = (mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === "childList") {
                let curr_title = document.title;
                let match = curr_title.match(patterns[patternID]);
                if (match) {
                    document.title = curr_title.replace(match[0], "");
                }
            }
        });
    };

    // Set up the observer
    const observer = new MutationObserver(observerCallback);
    const config = { childList: true, subtree: true };
    const target = document.querySelector('head > title');
    if (target) {
        observer.observe(target.parentNode, config);
    } else {
        console.log("The <title> element does not exist.");
    }
})();
