// ==UserScript==
// @name        Notion.app Safari-Export-PDF Helper
// @description 在 Notion Safari 网页端, 运行本脚本, 然后可以方便地导出网页 PDF.
// @match       *://www.notion.so/*
// ==/UserScript==


// 监听用户的 command + F1 按键, 触发本脚本
let in_export_mode = false;
document.addEventListener('keydown', (e) => {
    // console.log(e); test = e;
    if (e.metaKey && e.key === 'F1') {  
        if (!in_export_mode) {
            if (confirm("确定要进入`导出模式`吗? 请确保当前页面已保存!")) {
                in_export_mode = true;
                enter_export_mode();
            }
        }
        else {   // 已经在`导出模式`了, 恢复正常模式需要刷新页面
            if (confirm("确定要退出`导出模式`吗? 网页会刷新重启!")) {
                window.location.reload();
            }
        }
    }
});


const enter_export_mode = () => {
    // 关闭侧边栏
    if (document.querySelector("div.notion-sidebar-container").style.width !== "0px") {
        document.dispatchEvent(new KeyboardEvent("keydown", {
            keyCode: 220,   // `\`
            metaKey: true,
            bubbles: true,  // 设置为 true 就能一路向上地 dispatch 给 DOM 上层节点 (虽然我不太清楚为啥这里必须这样.. 但不这样就不 work)
        }));
    }
    // 关闭顶栏
    document.querySelector("div.notion-topbar").style.display = 'none';
    // 设置 html.notion-html, body.notion-body, #notion-app 的 style 均为 height: auto, overflow: scroll
    document.querySelectorAll('html.notion-html, body.notion-body, #notion-app').forEach((e) => {
        e.style.height = 'auto';
        e.style.overflow = 'scroll';
    });
    // 设置 .notion-app-inner { height: 100% }
    document.querySelector('.notion-app-inner').style.height = 'auto';
    // 设置 class = "notion-scroller vertical" 的 overflow 为 scroll
    document.querySelector('div.notion-scroller.vertical').style.overflow = 'visible';
    // 设置 class = "notion-frame" 的 height 为 100%
    document.querySelector('div.notion-frame').style.height = "100%";
    document.querySelector('div.notion-frame').style.maxHeight = "100%";
}
