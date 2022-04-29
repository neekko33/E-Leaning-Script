(function f() {
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

    video.addEventListener("ended", () => {
      btn.click();
      window.setTimeout(() => {
        f();
      }, 10000);
    });
  }
})();
