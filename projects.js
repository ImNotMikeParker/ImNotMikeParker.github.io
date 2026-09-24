// Personal projects shown on the Projects section.
// Add, remove, or reorder entries here. Each entry:
//   name        - display name
//   icon        - path to a square icon image (optional)
//   description - one or two sentences
//   tags        - short tech labels
//   repo        - GitHub URL (optional; leave empty while the repo is private)
//   demo        - live URL (optional)
const projects = [
  {
    name: "Simply Spotify",
    icon: "img/simply-spotify.png",
    description:
      "A Spotify plugin for Elgato Stream Deck and Stream Deck +, built on Elgato's official Node.js SDK. " +
      "Live album art with a progress bar on every key, a Like button that checks your library on each track change, " +
      "and dials for volume and scrubbing on the touch strip. Designed around Spotify's per-developer daily API quota: " +
      "on Windows it watches the Spotify window title and only calls the API when something changed, cutting usage " +
      "from roughly 900 calls an hour to 60. PKCE sign-in with no client secret; nothing leaves your machine but calls to Spotify.",
    tags: ["TypeScript", "Node.js", "Stream Deck SDK", "Spotify Web API", "OAuth PKCE"],
    repo: "https://github.com/ImNotMikeParker/spotify-streamdeck",
    demo: ""
  },
  {
    name: "StashLog",
    icon: "img/stashlog.png",
    description:
      "A personal cannabis product journal, installable as a progressive web app. Scan a package QR code, " +
      "paste a dispensary link, or photograph the label, and the Claude API extracts strain, brand, potency, " +
      "and terpene profile. Rate and tag each entry, track what works over time, and share with friends. " +
      "Passwordless Supabase auth, Vercel serverless functions, push notifications, and a Vitest suite gated by CI. " +
      "Built end to end through the Claude Code workflow described above.",
    tags: ["React", "Vite", "Supabase", "Vercel", "Claude API", "PWA"],
    repo: "",
    demo: "https://stashlog-ten.vercel.app"
  }
];

(function renderProjects() {
  var list = document.getElementById("project-list");
  if (!list) return;

  projects.forEach(function (p) {
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

    var desc = document.createElement("p");
    desc.textContent = p.description;
    card.appendChild(desc);

    if (p.repo || p.demo) {
      var links = document.createElement("div");
      links.className = "links";
      if (p.repo) {
        var r = document.createElement("a");
        r.href = p.repo; r.textContent = "Source"; r.rel = "noopener"; r.target = "_blank";
        links.appendChild(r);
      }
      if (p.demo) {
        var d = document.createElement("a");
        d.href = p.demo; d.textContent = "Live app"; d.rel = "noopener"; d.target = "_blank";
        links.appendChild(d);
      }
      card.appendChild(links);
    }

    list.appendChild(card);
  });
})();
