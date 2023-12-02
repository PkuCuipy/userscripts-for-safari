// ==UserScript==
// @name         Baidu Redirect
// @description  Redirect from baike.baidu.com to www.baidu.com
// @author       ChatGPT
// @match        https://baike.baidu.com/
// @grant        none
// ==/UserScript==

console.log(123);

(function() {
    'use strict';
    if (window.location.href === "https://baike.baidu.com/") {
        window.location.href = "https://www.baidu.com";
    }
})();
