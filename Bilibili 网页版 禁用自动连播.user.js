// ==UserScript==
// @name        Bilibili 网页版 禁用自动连播
// @match       *://*.bilibili.com/*
// @author      PkuCuipy with GPT-4
// ==/UserScript==

// Create the banner element
const banner = document.createElement('div');
banner.style.cssText = `
    position: absolute;
    font-size: 0.8rem;
    padding: 3px 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border-bottom-right-radius: 5px;
    z-index: 1000;
    display: none;
    opacity: 0;
    transition: opacity 0.2s ease-in, visibility 0s linear 3s;
`;
banner.textContent = "已取消自动连播";
document.body.appendChild(banner);


// Function to show the banner
function showBanner() {
    const videoElem = document.getElementById('bilibili-player');
    if (videoElem) {
        const rect = videoElem.getBoundingClientRect();
        banner.style.top = `${rect.top}px`;
        banner.style.left = `${rect.left}px`;
    }

    banner.style.display = 'block';
    banner.style.opacity = '1';
    banner.style.visibility = 'visible';

    // Hide the banner after 3 seconds
    setTimeout(() => {
        banner.style.opacity = '0';
        banner.style.visibility = 'hidden';
    }, 3000);
}


// Every second, check for the cancel button's existence. if exists, click it to cancel auto-play
setInterval(() => {
    const cancelButton = document.querySelector(".bpx-player-ending-related-item-cancel");
    if (cancelButton && cancelButton.style.display !== "none") {
        cancelButton.click();
        showBanner();
    }
}, 2000);


// Hide the "取消连播" button and the countdown animation
const style = document.createElement('style');
style.type = 'text/css';
const css = `
    .bpx-player-ending-related-item-countdown { display: none !important; }
    .bpx-player-ending-related-item-cancel { display: none !important; }
`;
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
