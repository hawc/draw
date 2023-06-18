<template>
  <div class="index-container">
    <h1>draw.hawc.de</h1>
    <p>
      Hi! This is a (work-in-progress) playground for WebGL rendering with user
      input.
    </p>
    <p>
      It's written in TypeScript and Vue, and uses peer-to-peer connections via
      WebSockets. Bonus: Web MIDI API. The MIDI output from your “Maschine Mikro
      MK3” or “Intech Grid PO16” can directly control the rendering. Works best
      for “Object” and “Wave”.
    </p>
    <h2>Where can I try it?</h2>
    <p>
      Go to one of the linked pages below, scan the displayed QR code or click
      on the controller icon. You'll be forwarded to a control page.
    </p>
    <p>Here you can have a look:</p>
    <ul class="content-list">
      <li>
        <a href="/ink" target="_blank">Ink</a>: Digital text thrasher (CSS &
        SVG)
      </li>
      <li>
        <a href="/remote-sky" target="_blank">Remote Sky</a>: Create your own
        planet (p5.js)
      </li>
      <li>
        <a href="/beton" target="_blank">Beton</a>: Build-your-own-Plattenbau
        (Three.js)<br />(WIP: CPU-heavy)
      </li>
      <li>
        <a href="/object" target="_blank">Object</a>: Shiny pyramid stuff
        (Three.js)
      </li>
      <li>
        <a href="/wave" target="_blank">Wave</a>: Many lines form a wave
        (Three.js)
      </li>
    </ul>
    <p>
      You can find the repo for this project on
      <a href="https://github.com/hawc/draw" target="_blank">GitHub</a>.
    </p>
    <hr />
    <p><a href="https://hawc.de/">back to hawc.de</a></p>
  </div>
</template>

<style scoped>
  .index-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  li {
    list-style: none;
  }
</style>
