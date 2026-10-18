// Applies the saved light/dark choice before first paint (loaded in <head>).
try { const t = localStorage.getItem('theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) {}
