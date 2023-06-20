<template>
  <div class="body">
    <style>
      :root {
      --root-filter: {{ rootFilter }};
      --root-background-image: {{ rootBackgroundImage }};
      --content-blur: {{ contentBlur }};
      --content-text-shadow: {{ contentTextShadow }};
      --content-opacity: {{ contentOpacity }};
      --content-color: {{ contentColor }};
      --content-blend-mode: {{ contentBlendMode }};
      }
    </style>
    <div ref="main" class="main">
      <div ref="content" class="content">
        <div class="content-inner">
          <div contenteditable>
            <h1>Hi there!</h1>
            <p>
              This tool is for emulating the worst printer you ever had. It uses
              CSS and SVG to add an unholy amount of grain and smudge to a text
              like you read right now. Of course, it is being applied to any
              other type of HTML content as well - like the picture of a
              notebook below. If you want to play around with it, there is a
              bunch of controls in the upper right corner. Also, the content you
              are looking at right now is editable, so you are free to do
              whatever you want. Works best in Chrome.
            </p>
            <p>
              <img
                src="https://picsum.photos/id/8/500/300"
                alt="Placeholder Image"
                width="500"
              />
            </p>
            <p>
              Here comes some more text content to see how the page behaves when
              being scrolled. As I am a software developer and not an essayist,
              I'll stick to the good old Lorem Ipsum: Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
              sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p>
            <hr />
            <div class="exportStyle">
              <pre>
:root {
  --content-blur: {{ contentBlur }};
  --content-text-shadow: {{ contentTextShadow }};
  --content-opacity: {{ contentOpacity }};
  --content-color: {{ contentColor }};
  --content-blend-mode: {{ contentBlendMode }};
  --root-filter: {{ rootFilter }};
  --root-background-image: {{ rootBackgroundImage }};
}
.wrapper {
  mix-blend-mode: multiply;
  will-change: filter, background-image;
  background-color: rgb(255, 255, 255);
  background-size: contain;
  filter: var(--root-filter);
  background-image: var(--root-background-image);
}
.content {
  max-width: 900px;
  margin: 0 auto;
  mix-blend-mode: var(--content-blend-mode);
  text-shadow: var(--content-text-shadow);
  color: var(--content-color);
  opacity: var(--content-opacity);
  filter: var(--content-blur);
}
.content * {
  color: var(--content-color);
  border-color: var(--content-color);
}
.content img {
  filter: var(--content-blur);
}
</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapState } from 'vuex';

  const RGB_FULL = 255;
  const GRAIN_IMG_BASE_SIZE_PX = 500;

  const roundToTwoDecimals = (number) => Math.round(number * 100) / 100;

  export default Vue.extend({
    data() {
      return {
        isDev: process.env.NODE_ENV === 'development',
        MAIN_ROOT: this.$refs.main,
        CONTROLS_ROOT: this.$refs.controls,
        CONTENT_ROOT: this.$refs.content,
        OVERLAY_ROOT: this.$refs.overlay,
        rootFilter: '',
        rootBackgroundImage: '',
        contentOpacity: 1,
        contentColor: 'rgba(0,0,0,1)',
        contentTextShadow: '',
        contentBlur: '',
        contentBlendMode: '',
      };
    },
    computed: {
      ...mapState(['settings']),
    },
    watch: {
      'settings.blur'(blur) {
        this.setContentStyle(
          blur,
          this.settings.textLightness,
          this.settings.brightness,
        );
      },
      'settings.grain'(grain) {
        this.setRenderStyle(
          grain,
          this.settings.smudge,
          this.settings.brightness,
        );
      },
      'settings.brightness'(brightness) {
        this.setContentStyle(
          this.settings.blur,
          this.settings.textLightness,
          brightness,
        );
        this.setRenderStyle(
          this.settings.grain,
          this.settings.smudge,
          brightness,
        );
      },
      'settings.smudge'(smudge) {
        this.setRenderStyle(
          this.settings.grain,
          smudge,
          this.settings.brightness,
        );
      },
      'settings.textLightness'(textLightness) {
        this.setContentStyle(
          this.settings.blur,
          textLightness,
          this.settings.brightness,
        );
      },
    },
    mounted(): void {
      this.setContentStyle(
        this.settings.blur,
        this.settings.textLightness,
        this.settings.brightness,
      );
      this.setRenderStyle(
        this.settings.grain,
        this.settings.smudge,
        this.settings.brightness,
      );
    },
    methods: {
      setContentStyle(blur, textLightness, brightness) {
        const MAX_SHADOW_SPREAD = 0.35;
        const shadow = roundToTwoDecimals(MAX_SHADOW_SPREAD * blur);
        const color = brightness > 0.5 ? 0 : RGB_FULL;
        const transparency = roundToTwoDecimals(textLightness / RGB_FULL);
        this.contentBlendMode = brightness > 0.5 ? 'darken' : 'lighten';
        this.contentOpacity = transparency;
        this.contentColor = `rgba(${color}, ${color}, ${color}, 1)`;
        this.contentTextShadow = `0 0 ${shadow}rem rgba(${color}, ${color}, ${color}, ${transparency}), 0 0 ${
          shadow / 2
        }rem rgba(${color}, ${color}, ${color}, ${transparency})`;
        this.contentBlur = `blur(${roundToTwoDecimals(blur)}px)`;
      },
      setRenderStyle(grain: number, smudge: number, brightness: number) {
        const grainValue = roundToTwoDecimals(1 - grain);
        const brightnessValue = roundToTwoDecimals(brightness);
        const smudgeValue =
          GRAIN_IMG_BASE_SIZE_PX +
          roundToTwoDecimals(smudge) * (GRAIN_IMG_BASE_SIZE_PX * 16);
        const grainImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${GRAIN_IMG_BASE_SIZE_PX}' height='${GRAIN_IMG_BASE_SIZE_PX}'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='${grainValue}' numOctaves='3' stitchTiles='stitch'/%3E%3CfeBlend mode='multiply'/%3E%3C/filter%3E%3Cg style='filter:brightness(${brightnessValue})'%3E%3Crect height='${smudgeValue}' width='${GRAIN_IMG_BASE_SIZE_PX}' filter='url(%23noise)' opacity='1' transform='scale(1 ${
          smudgeValue / GRAIN_IMG_BASE_SIZE_PX
        })'/%3E%3C/g%3E%3C/svg%3E")`;
        this.rootBackgroundImage = grainImage;
        this.rootFilter = `brightness(${
          50 * brightnessValue + 65
        }%) grayscale(100%) contrast(5000%)`;
      },
    },
  });
</script>

<style lang="css" scoped>
  h1 {
    font-size: 7rem;
    margin: 1rem 0 0.75rem;
    line-height: 1.1;
  }
  p {
    margin: 0.75rem 0;
  }
  img {
    max-width: 100%;
  }
  .body {
    background: rgb(255, 255, 255);
    line-height: 1.5;
    font-size: 1.5rem;
  }
  .main {
    padding: 0 2rem;
    mix-blend-mode: multiply;
    will-change: filter, background-image;
    background-color: rgb(255, 255, 255);
    background-size: contain;
    filter: var(--root-filter);
    background-image: var(--root-background-image);
  }
  .content {
    max-width: 900px;
    margin: 0 auto;
    mix-blend-mode: var(--content-blend-mode);
    text-shadow: var(--content-text-shadow);
    color: var(--content-color);
    opacity: var(--content-opacity);
    filter: var(--content-blur);
  }
  .content * {
    color: var(--content-color);
    border-color: var(--content-color);
  }
  .content img {
    filter: var(--content-blur);
  }
  .content-inner {
    overflow: auto;
  }
  .exportStyle {
    width: 100%;
    height: max-content;
    background: rgb(255, 255, 255) !important;
    text-align: left;
    font-size: 1rem;
    padding: 0.001rem 1rem;
    margin-bottom: 1rem;
    border-radius: 6px;
    box-shadow: 0 0 10px white;
  }
  .exportStyle * {
    color: rgb(0, 0, 0) !important;
  }
</style>
