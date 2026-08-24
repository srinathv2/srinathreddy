(() => {
  const { contributions, highlights, posts, talks, memes } = window.siteContent;
  const list = document.querySelector('#contribution-list');
  const filters = document.querySelector('#role-filters');
  let category = 'committed'; let role = 'all';
  const esc = text => String(text).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
  function entryCard(entry) {
    const star = entry.star ? ['situation','task','action','result'].map(key => `<div><strong>${key}</strong>${esc(entry.star[key])}</div>`).join('') : '';
    const summary = entry.summary ? `<p class="contribution-summary"><strong>Contribution summary</strong>${esc(entry.summary)}</p>` : '';
    const links = entry.links.map(link => `<a href="${link.url}" target="_blank" rel="noreferrer">${esc(link.label)} ↗</a>`).join('');
    const discovery = entry.discovery ? `<p class="discovery"><strong>Discovery during review</strong>${esc(entry.discovery)}</p>` : '';
    return `<article class="entry"><div class="entry-top"><h3>${esc(entry.title)}</h3><span class="badge">${esc(entry.role)}</span></div><div class="entry-meta"><span>${esc(entry.date)}</span><span>${esc(entry.area)}</span><span>${esc(entry.status)}</span></div>${discovery}${summary}${star ? `<div class="star">${star}</div>` : ''}<div class="entry-links">${links}</div></article>`;
  }
  const roleLabel = roleName => ({ all: 'All entries', authored: 'Authored by me', reviewed: 'Reviewed by me', 'co-authored': 'Co-authored by me', credited: 'Attribution note' }[roleName] || roleName);
  function renderFilters(entries) {
    const roles = ['all', ...new Set(entries.map(entry => entry.role))];
    filters.innerHTML = roles.map(item => `<button class="role-filter ${item === role ? 'active' : ''}" data-role="${item}">${roleLabel(item)}</button>`).join('');
    filters.querySelectorAll('button').forEach(button => button.addEventListener('click', () => { role = button.dataset.role; renderContributions(); }));
  }
  function renderContributions() {
    const inCategory = contributions.filter(entry => entry.category === category);
    if (!inCategory.some(entry => entry.role === role) && role !== 'all') role = 'all';
    renderFilters(inCategory);
    const visible = role === 'all' ? inCategory : inCategory.filter(entry => entry.role === role);
    list.innerHTML = visible.length ? visible.map(entryCard).join('') : '<div class="empty-state"><strong>Nothing here yet.</strong><br>Add an entry in <code>data/content.js</code> and it will appear here.</div>';
  }
  function renderCollection(target, entries, kind) {
    const element = document.querySelector(target);
    element.innerHTML = entries.length ? entries.map(entry => {
      const imageSrc = entry.image || (/\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#].*)?$/i.test(entry.url || '') ? entry.url : '');
      const targetUrl = imageSrc === entry.url ? '' : entry.url;
      const tag = targetUrl ? 'a' : 'article';
      const attrs = targetUrl ? ` href="${targetUrl}" target="_blank" rel="noreferrer"` : '';
      const image = imageSrc ? `<img class="content-image" src="${imageSrc}" alt="${esc(entry.alt || entry.title)}" loading="lazy">` : '';
      return `<${tag} class="content-card"${attrs}>${image}<span class="label">${esc(entry.label || kind)}</span><h3>${esc(entry.title)}</h3><p>${esc(entry.description)}</p></${tag}>`;
    }).join('') : `<div class="content-card"><span class="label">${kind}</span><h3>Coming soon</h3><p>Add your first ${kind.toLowerCase()} in data/content.js.</p></div>`;
  }
  document.querySelectorAll('.category-tab').forEach(button => button.addEventListener('click', () => { category = button.dataset.category; role = 'all'; document.querySelectorAll('.category-tab').forEach(tab => { const active = tab === button; tab.classList.toggle('active',active); tab.setAttribute('aria-selected',active); }); renderContributions(); }));
  const committed = contributions.filter(item => item.category === 'committed');
  document.querySelector('[data-stat="authored"]').textContent = committed.filter(item => item.role === 'authored').length;
  document.querySelector('[data-stat="reviewed"]').textContent = committed.filter(item => item.role === 'reviewed').length;
  renderContributions(); renderCollection('#highlight-list', highlights, 'Highlight'); renderCollection('#blog-list', posts, 'Blog'); renderCollection('#talk-list', talks, 'Talk'); renderCollection('#meme-list', memes, 'Meme');
  const quotes = [
    'I ... am ... Iron Man.',
    'With great power comes great responsibility.',
    "It's not who I am underneath, but what I do, that defines me.",
    "I'm Batman.",
    'Why do we fall, Bruce? So we can learn to pick ourselves up.',
    'As the child did. Without the rope. Then fear will find you again.',
    'Hope.',
    'Why so serious?'
  ];
  document.querySelector('#header-quote').textContent = quotes[Math.floor(Math.random() * quotes.length)];
})();
