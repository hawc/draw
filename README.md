# draw.hawc.de

Hi! This is a (work-in-progress) playground for WebGL rendering with user input.

https://draw.hawc.de

### What is this?

This application is a proof of concept for using different web technologies for remotely manipulating WebGL rendered website content.

E.g. you can control a 3D globe via a MIDI device attached to your computer. Or you can control it with your smartphone, just scan the displayed QR code.

Basically draw.hawc.de visualizations consist of three main parts:

- a p5.js/Three.js canvas for rendering content with WebGL
- a client side peerjs instance + a peerjs server for setting properties via a websocket connection
- a MIDI API for setting properties via external MIDI devices

### What can I expect?

This project is WIP. So this is generally far from bug-free.

The rendering application currently only works on non-mobile Chrome browsers. Mostly because of bad WebGL performance and the incomplete implementation of CSS rendering properties by the other browser vendors.

MIDI controls are implemented very static right now. This means you can pobably only use a "Intech Grid PO16", it's only tested with a single device.

You'll stumble upon code for creating GIF files and email sending when you look through the repo. This stuff is not ready yet and I should move it to a dedicated feature branch. :)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

#eventually you need to add some environment variables for using legacy SSL settings in node before running the dev server:
$ export NODE_OPTIONS=--openssl-legacy-provider
```

For detailed explanation on how things work, check out the Nuxt.js [documentation](https://nuxtjs.org).

## Special Infos

On production we use port 443 also for the websocket connection. The nginx proxy redirects the websocket traffic (identified by subroute "/peer") to the internal port 9001.
