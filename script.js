// ==UserScript==
// @name         E-leaning-script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Neekko33
// @match        http://mooc1-2.chaoxing.com/mycourse/studentstudy?*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chaoxing.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  function f() {
    const frame_1 = document.querySelector(".course_main iframe");
    const frame_2 = frame_1.contentWindow.document.querySelector("iframe");
    // 单标题无视频页面直接跳转下一章
    if (!frame_2) {
      const btn = document.querySelector("#right0");
      btn.click();
      window.setTimeout(() => {
        f();
      }, 10000);
    } else {
      const btn = document.querySelector("#right1"); // 下一章按钮
      if (!btn) return; // 不存在下一章即全部播放完成
      const video = frame_2.contentWindow.document.querySelector("video");
      video.muted = true; // 设置静音播放
      video.playbackRate = 2; // 设置2倍播放速度
      video.play();
      window.setTimeout(() => {
        video.muted = false;
      }, 3000);

      video.addEventListener("ended", () => {
        btn.click();
        window.setTimeout(() => {
          f();
        }, 10000);
      });
    }
  }
  // TODO:第一次需要手动运行避免报错
  window.setTimeout(() => {
    f();
  }, 5000);
})();
