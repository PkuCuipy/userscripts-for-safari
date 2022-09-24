// ==UserScript==
// @name        Tab Bar Notification Remover
// @description 知乎和 CSDN 在登录账户后, 如果有新通知, 则会在标签栏的标题中作为前缀显示. 这个脚本可以检测到这类前缀, 并自动去除它.
// @match       *://*/*
// @datetime    2022-09-25
// ==/UserScript==

if (window.location.hostname.match(/csdn\.net/) !== null) {
    // 去除 CSDN 类似 "(4条消息) " 的前缀
    let curr_title = document.title;
    let latent_prefix = curr_title.match(/\(\d+条消息\) /);
    if (latent_prefix !== null) {
        latent_prefix = latent_prefix[0];
        let new_title = curr_title.replace(latent_prefix, "");
        document.title = new_title;
    }
}

if (window.location.hostname.match(/zhihu\.com/) !== null) {
    console.log("打开了 ｢知乎｣ 的页面");
    // 去除 ｢知乎｣ 类似 "(4 封私信 / 1 条消息) " 的前缀
    let curr_title = document.title;
    let latent_prefix = curr_title.match(/\(.*\) /);
    if (latent_prefix !== null) {
        latent_prefix = latent_prefix[0];
        if (latent_prefix.match("私信") || latent_prefix.match("消息")) {
            let new_title = curr_title.replace(latent_prefix, "");
            document.title = new_title;
        }
    }
}
