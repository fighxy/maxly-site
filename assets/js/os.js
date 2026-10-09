(function () {
  var root = document.documentElement.getAttribute("data-root") || "";
  var ua = navigator.userAgent || "";
  var platform = navigator.platform || "";
  var touch = navigator.maxTouchPoints || 0;
  var os = "other";
  if (/iPad|iPhone|iPod/.test(ua) || (platform === "MacIntel" && touch > 1)) os = "ios";
  else if (/Android/i.test(ua)) os = "android";
  else if (/Win/i.test(ua) || /Win/i.test(platform)) os = "windows";
  else if (/Mac/i.test(ua) || /Mac/i.test(platform)) os = "macos";
  else if (/Linux/i.test(ua) || /Linux/i.test(platform)) os = "linux";
  var dest = {
    ios: { label: "iPhone", href: root + "download/ios/" },
    android: { label: "Android", href: root + "download/android/" },
    macos: { label: "macOS", href: root + "download/desktop/#macos" },
    windows: { label: "Windows", href: root + "download/desktop/#windows" },
    linux: { label: "Linux", href: root + "download/desktop/#linux" }
  };
  if (dest[os]) {
    document.querySelectorAll("[data-os-cta]").forEach(function (a) {
      a.textContent = "Скачать для " + dest[os].label;
      a.href = dest[os].href;
    });
  }
  var tabs = document.querySelectorAll("[data-tab]");
  if (!tabs.length) return;
  var hash = (location.hash || "").replace("#", "");
  var current = dest[os] && dest[os].href.indexOf("#") > -1 && os !== "ios" && os !== "android" ? os : "windows";
  if (hash === "windows" || hash === "macos" || hash === "linux") current = hash;
  function show(id) {
    tabs.forEach(function (btn) {
      var on = btn.getAttribute("data-tab") === id;
      btn.setAttribute("aria-selected", on ? "true" : "false");
      btn.tabIndex = on ? 0 : -1;
    });
    document.querySelectorAll("[data-panel]").forEach(function (panel) {
      panel.hidden = panel.getAttribute("data-panel") !== id;
    });
  }
  tabs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      show(btn.getAttribute("data-tab"));
    });
  });
  show(current);
})();
