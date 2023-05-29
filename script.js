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
	function sleep(time) {
		return new Promise(resolve => {
			const timeout = window.setTimeout(() => {
				resolve();
				clearTimeout(timeout);
			}, time);
		});
	}

	async function f() {
		// 避免鼠标移出页面视频暂停
		window.addEventListener("mouseout", event => event.stopPropagation(), true);
		const frame_1 = document.querySelector(".course_main iframe");
		const frame_2 = frame_1.contentWindow.document.querySelector("iframe");
		// 单标题无视频页面直接跳转下一章
		if (!frame_2) {
			let btn = document.querySelector("#right0");
			if (!btn) {
				btn = document.querySelector("#right1");
			}
			btn.click();
			await sleep(10000);
			f();
		} else {
			const btn = document.querySelector("#right1"); // 下一章按钮
			if (!btn) return; // 不存在下一章即全部播放完成
			const video = frame_2.contentWindow.document.querySelector("video");
			if (!video) {
				btn.click();
				await sleep(3000);
				const next = document.querySelector(".wconter .nextChapter");
				next.click();
				await sleep(10000);
				f();
			} else {
				video.muted = true; // 设置静音播放
				video.playbackRate = 2; // 设置2倍播放速度
				video.play();
				await sleep(3000);
				video.muted = false;
			}
			video.addEventListener("ended", async () => {
				btn.click();
				await sleep(10000);
				f();
			});
		}
	}

	sleep(5000).then(() => {
		f();
	});
})();
