// ==UserScript==
// @name         Bilibili Subtitle Fetcher
// @description  Fetches AI-generated subtitles from Bilibili videos and logs them to the console.
// @match        https://www.bilibili.com/*
// ==/UserScript==




(function() {
    'use strict';
    
    
    function convertToSrt(subtitles) {
        let srtContent = '';
        for (let i = 0; i < subtitles.length; i++) {
            let subtitle = subtitles[i];
            let fromTime = secondsToSrtTime(subtitle.from);
            let toTime = secondsToSrtTime(subtitle.to);
            srtContent += `${i + 1}\n${fromTime} --> ${toTime}\n${subtitle.content}\n\n`;
        }
        return srtContent;
    }

    function secondsToSrtTime(seconds) {
        let date = new Date(null);
        date.setSeconds(seconds); // specify value for SECONDS here
        let timeString = date.toISOString().substr(11, 12);
        return timeString.replace('.', ',');
    }


    // Function to handle the response from the subtitle API
    function handleSubtitleResponse(responseText) {
        var response = JSON.parse(responseText);
        const subtitleContents = response.body.map(subtitle => subtitle.content);
        const wholeString = subtitleContents.join(' ');
        console.log(wholeString);
        
        const srtFormatStr = convertToSrt(response.body);
        console.log(srtFormatStr);
    }

    // Hook into the GET event for AI-generated subtitles
    var originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
//         console.log("debug: ", method, url);
        if (url.includes('aisubtitle.hdslb.com')) {
            var originalOnReadyStateChange = this.onreadystatechange;
            this.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    handleSubtitleResponse(this.responseText);
                }
                if (originalOnReadyStateChange) {
                    originalOnReadyStateChange.apply(this, arguments);
                }
            };
        }
        originalOpen.apply(this, arguments);
    };
})();







