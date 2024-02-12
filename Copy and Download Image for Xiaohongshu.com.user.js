// ==UserScript==
// @name         Copy and Download Image for Xiaohongshu.com
// @description  Copy post image to clipboard with Cmd+C (macOS) / Ctrl+C (Windows/Linux); download image with Cmd+S / Ctrl+S
// @author       Pengyu Cui
// @match        *://*.xiaohongshu.com/*
// @date         2024-02-12
// ==/UserScript==


// Copy Image
document.addEventListener('copy', async (event) => {
    event.preventDefault();
    document.querySelector(".context-menu-container").children[1].click();
});


// Download Image
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 's' || e.metaKey && e.key === 's') {
    e.preventDefault();
    document.querySelector(".context-menu-container").children[0].click();
  }
});
