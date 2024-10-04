// ==UserScript==
// @name        xhslink.com -> xiaohongshu.com
// @match       *://xhslink.com/*
// ==/UserScript==

if (window.location.href.includes("xhslink")) {
    window.open("https://www.xiaohongshu.com/explore","_self");
}

