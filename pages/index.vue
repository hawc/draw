<template>
  <div class="index-container">
    <h1>draw.hawc.de</h1>
    <p>Hi! This is a (work-in-progress) playground for WebGL rendering with user input.</p>
    <h2>How does it work?</h2>
    <p>
      Scan the displayed QR code or click on the controller icon.
      You'll be forwarded to a control page.
      The connection is provided by peer.js (based on websocket connections).
    </p>
    <p>
      Bonus: Web MIDI API also works. Connect your "Intech Grid PO16" and have much more fun tweaking the output!
    </p>
    <h2>Where can I try it?</h2>
    <p>Here you can have a look:</p>
    <ul>
      <li>
        <a href="/remote-sky">Remote Sky</a>: Create your own planet. (p5.js)
      </li>
      <li>
        <a href="/object">Object</a>: Shiny pyramid stuff. (Three.js)
      </li>
      <li>
        <a href="/wave">Wave</a>: Many lines form a wave. (Three.js)
      </li>
    </ul>
    <p>
      You can find the repo for this project on <a
        href="https://github.com/hawc/draw"
        target="_blank">GitHub</a>.
    </p>
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
