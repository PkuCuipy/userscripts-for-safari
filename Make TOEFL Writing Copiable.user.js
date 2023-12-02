// ==UserScript==
// @name        Make TOEFL Writing Copiable
// @match       https://ibt2-toefl-pt.ets.org/*
// ==/UserScript==

const container = $("#stimulus-reference > div")[0];
container.removeChild(container.children[3]);
container.removeChild(container.children[3]);