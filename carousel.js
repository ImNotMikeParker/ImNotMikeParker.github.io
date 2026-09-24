// Turns any [data-carousel] container into a horizontal, snap-scrolling
// carousel with looping previous/next buttons, but only when it holds more
// than MAX_GRID_ITEMS children. Smaller sets stay as a plain grid.
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

    function maxScroll() {
      return track.scrollWidth - track.clientWidth;
    }

    // Snap positions sit inside the track's padding, so allow that much slack
    // when deciding whether we're at either end.
    function slack() {
      return (parseFloat(getComputedStyle(track).paddingLeft) || 0) + 1;
    }

    // Loops: stepping past either end wraps around to the other.
    prev.addEventListener("click", function () {
      var atStart = track.scrollLeft <= slack();
      track.scrollTo({ left: atStart ? maxScroll() : track.scrollLeft - step(), behavior: "smooth" });
    });
    next.addEventListener("click", function () {
      var atEnd = track.scrollLeft >= maxScroll() - slack();
      track.scrollTo({ left: atEnd ? 0 : track.scrollLeft + step(), behavior: "smooth" });
    });
  });
})();
