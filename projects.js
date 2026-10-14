// Personal projects shown on the Projects section.
// Add, remove, or reorder entries here. Each entry:
//   name     - display name
//   icon     - path to a square icon image (optional)
//   summary  - one or two sentences, always visible
//   details  - the longer story, shown when the reader clicks "More" (optional)
//   tags     - short tech labels; keep to about four
//   links    - list of { label, href } shown at the bottom of the card
const projects = [
  {
    name: "Simply Spotify",
    icon: "img/simply-spotify.png",
    summary:
      "Spotify control for Elgato Stream Deck and Stream Deck +: live album art on every key, " +
      "a Like button that actually knows, and dials for volume and scrubbing.",
    details:
      "Built on Elgato's official Node.js SDK and designed around Spotify's per-developer daily API quota. " +
      "On Windows it watches the Spotify window title and only calls the API when something changed, " +
      "cutting usage from roughly 900 calls an hour to 60. PKCE sign-in with no client secret; " +
      "nothing leaves your machine but calls to Spotify.",
    tags: ["TypeScript", "Stream Deck SDK", "Spotify Web API", "OAuth PKCE"],
    links: [
      { label: "Marketplace", href: "https://marketplace.elgato.com/product/simply-spotify-b6f6cf53-5229-4040-afc2-c1d604b0df9b" },
      { label: "Source", href: "https://github.com/ImNotMikeParker/spotify-streamdeck" }
    ]
  },
  {
    name: "Simply Peak",
    icon: "img/simply-peak.png",
    summary:
      "Controls a Puffco Peak Pro from a Stream Deck over Bluetooth LE, with no official API to lean on. " +
      "Profile keys show live temperature and colour, and on the Stream Deck + a four-dial bar fills as the chamber heats.",
    details:
      "Re-implements the device's Lorax protocol in TypeScript from community reverse-engineering: a sequence-matched " +
      "command channel, a SHA-256 unlock handshake, typed reads and writes over the device's virtual file paths, and a " +
      "CBOR decoder for profile colours. Start is hold-to-start by design. Native Bluetooth via a prebuilt Node-API " +
      "binding, with pairing handled through WinRT.",
    tags: ["TypeScript", "Stream Deck SDK", "Bluetooth LE", "Reverse engineering"],
    links: [
      { label: "Source", href: "https://github.com/ImNotMikeParker/simply-peak" }
    ]
  },
  {
    name: "StashLog",
    icon: "img/stashlog.png",
    summary:
      "A personal cannabis product journal, installable as a progressive web app. Scan the package QR code or " +
      "snap the label and the Claude API pulls out strain, brand, potency, and terpene profile.",
    details:
      "Paste a dispensary link instead if there's no label handy. Rate and tag each entry, track what works over time, " +
      "and share with friends. Passwordless Supabase auth, Vercel serverless functions, push notifications, and a " +
      "Vitest suite gated by CI. Built end to end through the Claude Code workflow described above.",
    tags: ["React", "Supabase", "Claude API", "PWA"],
    links: [
      { label: "stashlog.com", href: "https://stashlog.com" }
    ]
  }
];

(function renderProjects() {
  var list = document.getElementById("project-list");
  if (!list) return;

  projects.forEach(function (p, i) {
    var card = document.createElement("article");
    card.className = "card project";

    var head = document.createElement("div");
    head.className = "project-head";
    if (p.icon) {
      var img = document.createElement("img");
      img.className = "project-icon";
      img.src = p.icon;
      img.alt = "";
      img.width = 44;
      img.height = 44;
      img.loading = "lazy";
      head.appendChild(img);
    }
    var h3 = document.createElement("h3");
    h3.textContent = p.name;
    head.appendChild(h3);
    card.appendChild(head);

    if (p.tags && p.tags.length) {
      var tags = document.createElement("ul");
      tags.className = "tags";
      p.tags.forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        tags.appendChild(li);
      });
      card.appendChild(tags);
    }

    var summary = document.createElement("p");
    summary.className = "summary";
    summary.textContent = p.summary;
    card.appendChild(summary);

    var details = null;
    if (p.details) {
      details = document.createElement("p");
      details.className = "details";
      details.id = "project-details-" + i;
      details.textContent = p.details;
      details.hidden = true;
      card.appendChild(details);
    }

    var foot = document.createElement("div");
    foot.className = "links";
    (p.links || []).forEach(function (l) {
      var a = document.createElement("a");
      a.href = l.href; a.textContent = l.label; a.rel = "noopener"; a.target = "_blank";
      foot.appendChild(a);
    });

    if (details) {
      var more = document.createElement("button");
      more.type = "button";
      more.className = "more";
      more.textContent = "More";
      more.setAttribute("aria-expanded", "false");
      more.setAttribute("aria-controls", details.id);
      more.addEventListener("click", function () {
        var open = details.hidden;
        details.hidden = !open;
        more.textContent = open ? "Less" : "More";
        more.setAttribute("aria-expanded", String(open));
      });
      foot.appendChild(more);
    }

    card.appendChild(foot);
    list.appendChild(card);
  });
})();
