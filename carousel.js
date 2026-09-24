// Turns any [data-carousel] container into a horizontal, snap-scrolling
// carousel with previous/next buttons, but only when it holds more than
// MAX_GRID_ITEMS children. Smaller sets stay as a plain grid.
(function () {
  var MAX_GRID_ITEMS = 3;

  function button(label, glyph) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "carousel-btn";
    b.setAttribute("aria-label", label);
    b.textContent = glyph;
    return b;
  }

  document.querySelectorAll("[data-carousel]").forEach(function (track) {
    if (track.children.length <= MAX_GRID_ITEMS) return;

    track.classList.remove("grid-2");
    track.classList.add("carousel-track");
    track.setAttribute("tabindex", "0");
    track.setAttribute("aria-label", track.getAttribute("data-carousel") || "Carousel");

    var wrap = document.createElement("div");
    wrap.className = "carousel";
    track.parentNode.insertBefore(wrap, track);
    wrap.appendChild(track);

    var controls = document.createElement("div");
    controls.className = "carousel-controls";
    var prev = button("Previous", "‹");
    var next = button("Next", "›");
    controls.appendChild(prev);
    controls.appendChild(next);
    wrap.appendChild(controls);

    function step() {
      var first = track.children[0];
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return first.getBoundingClientRect().width + gap;
    }

    function update() {
      var max = track.scrollWidth - track.clientWidth;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max - 1;
    }

    prev.addEventListener("click", function () {
      track.scrollBy({ left: -step(), behavior: "smooth" });
    });
    next.addEventListener("click", function () {
      track.scrollBy({ left: step(), behavior: "smooth" });
    });

    var pending = false;
    track.addEventListener("scroll", function () {
      if (pending) return;
      pending = true;
      requestAnimationFrame(function () { pending = false; update(); });
    });
    window.addEventListener("resize", update);
    update();
  });
})();
