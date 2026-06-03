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
      <link rel="stylesheet" href="https://vulnogram.org/seaview/min.css"/>
      <style>
  .wrap{max-width:880px;margin:0 auto;padding:1.1rem 1rem 3rem}
  .hero{display:flex;align-items:center;gap:.9rem;background-color:var(--wht);
    border:1px solid var(--bor);border-radius:8px;padding:1rem 1.1rem;box-shadow:0 2px 4px rgba(0,0,0,.12)}
  .hero .logo{width:48px;height:48px;border-radius:8px;object-fit:contain;
    background-color:var(--hig);border:1px solid var(--bor);flex-shrink:0}
  .hero .brand{width:46px;height:46px;object-fit:contain;flex-shrink:0}
  .hero-text{min-width:0}
  .badge{display:inline-block;font-size:.68rem;font-weight:bold;letter-spacing:.04em;
    text-transform:uppercase;background-color:#fa582d;color:#fff;padding:.12rem .5rem;border-radius:4px;margin-bottom:.35rem}
  .hero h1{margin:.1rem 0;font-size:1.3rem;line-height:1.2}
  .hero .sub{margin:.25rem 0 0;color:var(--key);font-size:.9rem}
  .card{background-color:var(--wht);border:1px solid var(--bor);border-radius:8px;padding:.9rem 1.1rem;margin-top:1rem}
  .card h2{margin:.1rem 0 .55rem;font-size:1.02rem}
  code{font-family:'SFMono-Regular',Consolas,Menlo,monospace;font-size:.84rem}
  .url{display:block;background-color:var(--hig);border:1px solid var(--bor);color:var(--txt);
    padding:.5rem .65rem;border-radius:5px;overflow-x:auto;white-space:nowrap;margin:.35rem 0;font-size:.84rem}
  .tip{margin:.45rem 0 0;color:var(--key);font-size:.84rem;line-height:1.7}
  .tip code{background-color:var(--hig);border:1px solid var(--bor);border-radius:4px;padding:.05rem .35rem;color:var(--txt)}
  .muted{color:var(--key);font-size:.84rem}
  .item{background-color:var(--wht);border:1px solid var(--bor);border-radius:8px;padding:.75rem .9rem;margin-top:.65rem}
  .item .title{font-weight:bold;font-size:.96rem}
  .cats{margin:.4rem 0 .25rem;display:flex;flex-wrap:wrap;gap:.35rem}
  .cat{font-size:.72rem;font-weight:bold;padding:.12rem .55rem;border-radius:.6em;
    background-color:var(--hig);color:var(--txt);border:1px solid var(--bor)}
  .cat-critical{background-color:#b3261e;color:#fff;border-color:#b3261e}
  .cat-high{background-color:#d9480f;color:#fff;border-color:#d9480f}
  .cat-medium{background-color:#9a7400;color:#fff;border-color:#9a7400}
  .cat-low{background-color:#2b7a4b;color:#fff;border-color:#2b7a4b}
  .desc{margin:.35rem 0 .3rem}
  .meta{color:var(--key);font-size:.78rem}
  .foot{margin-top:1.6rem;text-align:center;color:var(--key);font-size:.8rem}
  .foot p{margin:.35rem 0}
  .copy-logo{height:1.05em;width:auto;vertical-align:-.18em;opacity:.9;margin:0 .15rem}
  #q{width:100%;margin-top:1rem;padding:.55rem .75rem;border:1px solid var(--bor);border-radius:8px;
    background-color:var(--wht);color:var(--txt);font-size:.95rem;box-sizing:border-box}
  .feeds{margin-top:.8rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:.6rem}
  .feed{display:flex;align-items:center;gap:.6rem;background-color:var(--wht);
    border:1px solid var(--bor);border-radius:8px;padding:.6rem .75rem}
  .feed:hover{border-color:var(--lnk);box-shadow:0 2px 8px rgba(0,0,0,.12)}
  .feed .logo{width:28px;height:28px;border-radius:5px;object-fit:contain;background-color:var(--hig);flex-shrink:0}
  .feed-text{display:flex;flex-direction:column;gap:.1rem;min-width:0}
  .feed-name{font-weight:bold;color:var(--txt)}
  .feed-key{font-family:'SFMono-Regular',Consolas,Menlo,monospace;font-size:.74rem;color:var(--key)}
  .feed-meta{font-size:.74rem;color:var(--key)}</style>
    </head>
    <body>
      <input type="checkbox" id="theme-toggle"/><label for="theme-toggle" title="Toggle dark mode"><span class="sun">🌞</span><span class="moon">🌙</span></label>
      <div class="wrap">
        <header class="hero">
          <img class="logo" src="{image/url}" onerror="this.style.display='none'" alt=""/>
          <div class="hero-text">
            <span class="badge">📡 RSS feed</span>
            <h1><xsl:value-of select="title"/></h1>
            <p class="sub"><xsl:value-of select="description"/></p>
          </div>
        </header>

        <section class="card">
          <h2>Subscribe</h2>
          <code class="url"><xsl:value-of select="$feedUrl"/></code>
          <p class="tip"><b>Slack:</b> <code>/feed subscribe <xsl:value-of select="$feedUrl"/></code> · <b>Teams:</b> Workflows ▸ “Post to a channel when a feed item is published” · <b>Any reader:</b> Feedly, Inoreader, NetNewsWire…</p>
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
          <p><a href="https://vulnogram.org/rss/">All CVE feeds</a> · <a href="https://vulnogram.org/cve-index/">CVE Quality Index</a></p>
          <p class="copy">© Chandan B.N, 2026 · <img class="copy-logo" src="https://vulnogram.org/css/logo.svg" alt=""/> Vulnogram Project · Important vulnerability info for humans</p>
        </footer>
      </div>
      <script>(function(){var c=document.getElementById('theme-toggle');var s=localStorage.getItem('theme');var d=s?(s==='dark'):window.matchMedia('(prefers-color-scheme: dark)').matches;function a(x){document.body.setAttribute('data-theme',x?'dark':'light');c.checked=x;}a(d);c.onchange=function(){localStorage.setItem('theme',c.checked?'dark':'light');a(c.checked);};})();</script>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
