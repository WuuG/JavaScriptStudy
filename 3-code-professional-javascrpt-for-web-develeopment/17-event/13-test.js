(function () {
  let showcount = 0;
  window.addEventListener("load", () => {
    console.log("load fired");
  });
  window.addEventListener("pageshow", (event) => {
    showcount++;
    console.log(
      `show has ben fired ${showcount} times. persisted: ${event.persisted}`
    );
    console.log(Date.now());
  });
})();

window.addEventListener("pagehide", (event) => {
  console.log("Hiding. Persisted?" + event.persisted);
});

window.addEventListener("hashchange", (event) => {
  console.log(`old URL: ${event.oldURL}, New URL: ${event.newURL}`);
  // 可以通过 location.hash直接获取当前的散列值
  console.log(`current hash: ${location.hash}`);
});
