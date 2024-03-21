// ==UserScript==
// @name         PKU Treehole Crawler
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Check for specific keyword on PKU Treehole and send notification if found
// @author       You
// @match        https://treehole.pku.edu.cn/web/*
// @grant        none
// ==/UserScript==

const keywords = ["信科", "洞", "好"];
const minInterval = 60_000; // 1 minutes in milliseconds
const maxInterval = 180_000; // 3 minutes in milliseconds

(function() {
    'use strict';

    function sendNotification(message) {
        fetch(`https://api.day.app/YYQt6RRYGiPE6aMFAzVGRa/keyword_found/${encodeURIComponent(message)}`)
//             .then(response => console.log('Notification sent:', response))
//             .catch(error => console.error('Error sending notification:', error));
    }

    function checkForKeyword() {
        const items = document.querySelectorAll("div.flow-item");
        if (items.length > 0) {
            console.log("页面已加载好.")
            let flag_found = false;
            items.forEach(item => {
                keywords.forEach(keyword => {
                    if (item.innerText.includes(keyword)) {
                        sendNotification(item.innerText);
                        console.log("found! sendNotification: ", item.innerText);
                        flag_found = true;
                    }
                });
            });
            if (!flag_found) {
                console.log("no keyword found!");
            }
            clearInterval(checkInterval); // Stop checking once we found the elements
        }
        else {
            console.log("页面尚未加载好!")
        }
    }

    function setTimer() {
        const randomTime = Math.floor(Math.random() * (maxInterval - minInterval) + minInterval); // Random time between minInterval and maxInterval
        setTimeout(() => {
            location.reload();
        }, randomTime);
        console.log(`Next check in ${(randomTime / 60_000).toFixed(2)} minutes`);
    }

    const checkInterval = setInterval(checkForKeyword, 100); // Check every 100 ms whether page is loaded completely
    setTimer();
})();
