# Srinath Reddy — portfolio

A no-build static portfolio for GitHub Pages. Edit one file and GitHub Pages publishes the update.

## Update contributions

Open [`data/content.js`](data/content.js) on GitHub, click the pencil, copy an entry, update it, and commit to `main`.

```js
{ category:'committed', role:'authored', status:'Committed', date:'Aug 2026', area:'Logical replication', title:'A concise title', star:{ situation:'How you found it.', task:'What needed solving.', action:'What you did.', result:'How it helps users.' }, links:[{label:'View commit',url:'https://github.com/postgres/postgres/commit/COMMIT_SHA'}] }
```

Use `committed`, `wip`, or `ideas` for `category`; use `authored` or `reviewed` for `role`. Review cards can link to the commit and the corresponding PostgreSQL mailing-list thread.

### Findings made during a review

Do not change the official `role` just because your testing or patch work began during review. Keep `role: 'reviewed'`, add a concise `discovery` field, and link the downstream patch/commit alongside the review thread. This lets interviewers see both the official credit and your real investigative contribution without overstating authorship.

## Blogs, talks, and memes

In that same file, add records to `posts`, `talks`, or `memes`:

```js
{ label:'Blog', title:'Title', description:'One-line summary', url:'https://example.com' }
```

For a meme image, add the image file under `images/`, then use:

```js
{ label:'Postgres meme', title:'When the test passes', description:'Me, pretending I expected it.', image:'images/my-meme.png', alt:'Description of the meme' }
```

`url` is optional; add it only if the card should open an external link.

## Publish

In **Settings → Pages**, use **Deploy from a branch**, select `main`, and choose `/ (root)`. The site will publish at `https://srinathv2.github.io/srinathreddy/`.
