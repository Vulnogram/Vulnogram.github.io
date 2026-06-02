<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:atom="http://www.w3.org/2005/Atom"
    exclude-result-prefixes="atom">
  <xsl:output method="html" encoding="UTF-8" indent="yes"
    doctype-system="about:legacy-compat"/>
  <xsl:template match="/rss/channel">
    <xsl:variable name="feedUrl" select="atom:link[@rel='self']/@href"/>
    <html lang="en">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title><xsl:value-of select="title"/></title>
      <style>
  :root{--bg:#f6f7fb;--card:#fff;--ink:#1a1a2e;--muted:#5c6270;--line:#e6e8ef;
    --accent:#3b5bdb;--crit:#b3261e;--high:#d9480f;--med:#9a7400;--low:#2b7a4b}
  *{box-sizing:border-box}
  body{margin:0;font:15px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;color:var(--ink);background:var(--bg)}
  a{color:var(--accent);text-decoration:none}a:hover{text-decoration:underline}
  .wrap{max-width:880px;margin:0 auto;padding:1.5rem 1.1rem 3rem}
  .hero{background:linear-gradient(135deg,#1a1a2e,#26305c);color:#fff;border-radius:14px;
    padding:1.5rem 1.4rem;box-shadow:0 6px 24px rgba(20,24,60,.18)}
  .hero .badge{display:inline-block;font-size:.72rem;font-weight:600;letter-spacing:.04em;
    text-transform:uppercase;background:rgba(255,255,255,.16);padding:.2rem .55rem;border-radius:999px;margin-bottom:.6rem}
  .hero h1{margin:.1rem 0;font-size:1.5rem;line-height:1.2}
  .hero .sub{margin:.35rem 0 0;color:rgba(255,255,255,.85);font-size:.95rem}
  .card{background:var(--card);border:1px solid var(--line);border-radius:12px;
    padding:1.1rem 1.2rem;margin-top:1.1rem;box-shadow:0 1px 3px rgba(20,24,60,.05)}
  .card h2{margin:.1rem 0 .7rem;font-size:1.05rem}
  code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.86rem}
  .url,.tip code{display:block;background:#0f1226;color:#e8ebff;padding:.55rem .7rem;
    border-radius:8px;overflow-x:auto;white-space:nowrap;margin:.3rem 0}
  .tips{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:.9rem;margin-top:.6rem}
  .tip{border:1px solid var(--line);border-radius:10px;padding:.8rem .85rem;background:#fbfcff}
  .tip h3{margin:0 0 .35rem;font-size:.92rem}
  .tip p{margin:.3rem 0;font-size:.86rem;color:var(--muted)}
  .muted{color:var(--muted);font-size:.82rem}
  .item{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:.8rem .95rem;margin-top:.7rem}
  .item .title{font-weight:600;font-size:.98rem}
  .cats{margin:.4rem 0 .25rem;display:flex;flex-wrap:wrap;gap:.35rem}
  .cat{font-size:.72rem;font-weight:600;padding:.13rem .5rem;border-radius:999px;
    background:#eef0f7;color:#3a4256;border:1px solid var(--line)}
  .cat-critical{background:#fdecea;color:var(--crit);border-color:#f3c2bd}
  .cat-high{background:#fdeede;color:var(--high);border-color:#f5cda6}
  .cat-medium{background:#fbf4d9;color:var(--med);border-color:#ecd98c}
  .cat-low{background:#e7f6ec;color:var(--low);border-color:#b9e3c6}
  .desc{margin:.35rem 0 .3rem;color:#333}
  .meta{color:var(--muted);font-size:.78rem}
  .foot{margin-top:1.6rem;text-align:center;color:var(--muted);font-size:.8rem}
  #q{width:100%;margin-top:1.1rem;padding:.6rem .8rem;border:1px solid var(--line);border-radius:10px;font-size:.95rem}
  .feeds{margin-top:.8rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:.6rem}
  .feed{display:flex;flex-direction:column;gap:.12rem;background:var(--card);
    border:1px solid var(--line);border-radius:10px;padding:.7rem .85rem}
  .feed:hover{border-color:var(--accent);text-decoration:none;box-shadow:0 2px 10px rgba(59,91,219,.12)}
  .feed-name{font-weight:600;color:var(--ink)}
  .feed-key{font-family:ui-monospace,monospace;font-size:.76rem;color:var(--muted)}
  .feed-meta{font-size:.76rem;color:var(--muted);margin-top:.15rem}</style>
    </head>
    <body>
      <div class="wrap">
        <header class="hero">
          <span class="badge">📡 RSS feed</span>
          <h1><xsl:value-of select="title"/></h1>
          <p class="sub"><xsl:value-of select="description"/></p>
        </header>

        <section class="card">
          <h2>Subscribe</h2>
          <p class="muted">Feed URL</p>
          <code class="url"><xsl:value-of select="$feedUrl"/></code>
          <div class="tips">
            <div class="tip">
              <h3>Slack</h3>
              <p>In any channel, run:</p>
              <code>/feed subscribe <xsl:value-of select="$feedUrl"/></code>
              <p class="muted">Slack enables the built-in RSS app on first use.</p>
            </div>
            <div class="tip">
              <h3>Microsoft Teams</h3>
              <p>Channel ▸ <b>+</b> ▸ <b>Workflows</b> ▸ template <b>“Post to a channel when a feed item is published”</b>, then paste the feed URL above.</p>
              <p class="muted">Legacy tenants: ⋯ ▸ Connectors ▸ RSS.</p>
            </div>
            <div class="tip">
              <h3>Any reader</h3>
              <p>Paste the URL into Feedly, Inoreader, Thunderbird, NetNewsWire, …</p>
            </div>
          </div>
        </section>

        <section>
          <xsl:for-each select="item">
            <article class="item">
              <a class="title" href="{link}"><xsl:value-of select="title"/></a>
              <div class="cats">
                <xsl:for-each select="category">
                  <span>
                    <xsl:attribute name="class">cat cat-<xsl:value-of select="translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ', 'abcdefghijklmnopqrstuvwxyz-')"/></xsl:attribute>
                    <xsl:value-of select="."/>
                  </span>
                </xsl:for-each>
              </div>
              <p class="desc"><xsl:value-of select="description"/></p>
              <div class="meta"><xsl:value-of select="pubDate"/></div>
            </article>
          </xsl:for-each>
        </section>

        <footer class="foot">
          <a href="https://vulnogram.org/rss/">All CVE feeds</a> ·
          <a href="https://vulnogram.org/cve-index/">CVE Quality Index</a>
        </footer>
      </div>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
