// ==UserScript==
// @name        CSDN Dynamic Background Remover
// @description CSDN 的动态星空背景会导致 Safari 下 GPU 占用极大, 发热且耗电. 此脚本移除动态背景. (事实上任何背景都会被移除...)
// @match       *://blog.csdn.net/*
// update-time  2022-10-08
// ==/UserScript==


document.querySelector("body").style.cssText="background-image:url() !important";
console.log("检测到是 CSDN, 背景已被移除.")

