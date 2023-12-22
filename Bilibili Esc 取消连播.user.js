// ==UserScript==
// @name        Bilibili Esc 取消连播
// @description 当视频结尾时有 [自动连播] 按钮时, 按 Esc 取消自动连播, 相当于设置了一个快捷键. (如果 ALWAYS_CANCEL 为 true, 则一旦检测到这个按钮就自动点掉)
// @match       *://*.bilibili.com/*
// @author      PkuCuipy with GPT-4
// ==/UserScript==

const ALWAYS_CANCEL = true;    // 改成 false 则用 Esc 手动取消; 否则默认永远取消连播

// Create the banner element
const banner = document.createElement('div');
banner.style.cssText = `
    position: fixed;
    top: 50%;
    left: 40%;
    font-size: 1.3rem;
    transform: translateX(-50%);
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border-radius: 5px;
    z-index: 1000;
    display: none;
    opacity: 0;
    transition: opacity 0.2s ease-in, visibility 0s linear 3s;
`;
banner.textContent = "已取消自动连播";
document.body.appendChild(banner);

// Function to show the banner
function showBanner() {
    banner.style.display = 'block';
    banner.style.opacity = '1';
    banner.style.visibility = 'visible';

    // Hide the banner after 3 seconds
    setTimeout(() => {
        banner.style.opacity = '0';
        banner.style.visibility = 'hidden';
    }, 3000);
}

function cancelAutoPlay() {
    const cancelButton = document.querySelector(".bpx-player-ending-related-item-cancel");
    if (cancelButton && cancelButton.style.display !== "none") {
        cancelButton.click();
        showBanner();
    }
}

if (ALWAYS_CANCEL) {
    const intervalId = setInterval(cancelAutoPlay, 1000);
    window.addEventListener('beforeunload', () => {
        clearInterval(intervalId);
    });
} 
else {
    document.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            cancelAutoPlay();
        }
    });
}
