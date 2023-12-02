// ==UserScript==
// @name        better scientificamerican.com
// @match       *://www.scientificamerican.com/*
// ==/UserScript==

// disable `space` and `tab`'s default behavior
document.addEventListener('keydown', function(e) {
  if (e.key === ' ' || e.key === 'Tab') {
    e.preventDefault();
  }
});



let downloadLink = document.querySelector('a.podcast-download');
if (downloadLink) {
    var fileUrl = downloadLink.getAttribute('href');
    let titleElem = document.getElementsByClassName("podcasts-header__title t_feature-title")[0];
//     downloadLink.setAttribute('download', `_${titleElem.innerText}.mp3`);
//     console.log(titleElem.innerText);
    downloadLink.addEventListener('click', function() {
        setTimeout(()=>{
            alert(titleElem.innerText);  
        }, 100)
    });
}
