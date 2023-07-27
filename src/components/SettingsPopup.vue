<template>
  <div
    class="settings-popup__backdrop"
    @click="$emit('close')"
  >
    <div
      class="settings-popup__popup"
      @click.stop
    >
      <h1 class="settings-popup__header">
        {{ $t('settings_header') }}
      </h1>

      <div class="settings-popup__grid">
        <div class="settings-popup__label">
          {{ $t('settings_language_label') }}
        </div>

        <button
          @click="switchLanguage"
          class="settings-popup__button"
        >
          {{ $t(settings.language === null ? 'settings_language_auto' : 'settings_language_name') }}
        </button>

        <div class="settings-popup__label">
          {{ $t('settings_mode_label') }}
        </div>

        <button
          @click="switchMode"
          class="settings-popup__button"
        >
          {{ $t('settings_mode_button.' + settings.getMode()) }}
        </button>

        <div class="settings-popup__label">
          {{ $t('settings_animations_label') }}
        </div>

        <button
          @click="switchAnimations"
          class="settings-popup__button"
        >
          {{ $t('settings_animations_button.' + settings.getAnimations()) }}
        </button>

        <div class="settings-popup__label">
          {{ $t('settings_theme_label') }}
        </div>

        <button
          @click="switchTheme"
          class="settings-popup__button"
        >
          {{ $t('settings_theme_button.' + settings.getTheme()) }}
        </button>

        <div class="settings-popup__label">
          {{ $t('settings_tutorial_label') }}
        </div>

        <button
          @click="resetTutorial"
          class="settings-popup__button"
          :disabled="settings.showTutorial()"
        >
          {{ $t('settings_tutorial_button') }}
        </button>

        <div class="settings-popup__label">
          {{ $t('settings_credits_label') }}
        </div>

        <button
          @click="$emit('credits')"
          class="settings-popup__button"
        >
          {{ $t('settings_credits_button') }}
        </button>

        <div class="settings-popup__label">
          {{ $t('settings_support_label') }}
        </div>

        <a
          class="settings-popup__button"
          target="_blank"
          href="https://ko-fi.com/antoniogg"
        >
          Ko-fi
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Animations, Mode, Settings, Theme } from '@/entities/Settings'

export default defineComponent({
  emits: [
    'close',
    'save',
    'credits'
  ],

  props: {
    settings: {
      required: true,
      type: Settings as PropType<Settings>
    }
  },

  methods: {
    switchLanguage () {
      const available = this.$i18n.availableLocales
      const current = this.$i18n.locale
      const next = available[available.findIndex(language => current === language) + 1] ?? null

      this.settings.setLanguage(next)
      this.$emit('save')
    },

    switchMode () {
      const available = [
        Mode.both,
        Mode.grab,
        Mode.touch
      ]
      const current = this.settings.getMode()
      const next = available[available.findIndex(mode => current === mode) + 1] ?? Mode.both

      this.settings.setMode(next)
      this.$emit('save')
    },

    switchTheme () {
      const available = [
        Theme.auto,
        Theme.dark,
        Theme.light
      ]
      const current = this.settings.getTheme()
      const next = available[available.findIndex(theme => current === theme) + 1] ?? Theme.auto

      this.settings.setTheme(next)
      this.$emit('save')
    },

    switchAnimations () {
      const available = [
        Animations.normal,
        Animations.slow,
        Animations.disabled,
        Animations.fast
      ]
      const current = this.settings.getAnimations()
      const next = available[available.findIndex(animations => current === animations) + 1] ?? Animations.normal

      this.settings.setAnimations(next)
      this.$emit('save')
    },

    resetTutorial () {
      this.settings.resetTutorial()
      this.$emit('save')
    }
  }
})
</script>

<style scoped lang="scss">
.settings-popup {
  &__backdrop {
    cursor: pointer;
    position: fixed;
    inset: 0;
    background-color: #fff5;
    backdrop-filter: blur(4px);
    animation: fade calc(0.1s * var(--speed, 1)) linear;
    z-index: 3;
    overflow: hidden;

    @keyframes fade {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 100%;
      }
    }

    @media (prefers-color-scheme: dark) {
      background-color: #1115;
    }

    .dark & {
      background-color: #1115;
    }

    .light & {
      background-color: #fff5;
    }
  }

  &__popup {
    position: fixed;
    bottom: 50%;
    right: 50%;
    transform: translate(50%, 50%);
    cursor: default;
    background-color: #fff;
    padding: 3rem 4rem;
    border-radius: 0.1rem;
    box-shadow: 0 0.1rem 0.2rem 0 #0006;
    z-index: 4;
    max-height: 70vh;
    overflow-x: hidden;
    overflow-y: auto;

    @media (prefers-color-scheme: dark) {
      background-color: #222;
    }

    .dark & {
      background-color: #222;
    }

    .light & {
      background-color: #fff;
    }

    &:before {
      content: "";
      display: block;
      position: sticky;
      height: 5rem;
      background: linear-gradient(0deg, #fff0 0%, #ffff 100%);
      margin-bottom: -5rem;
      transform: translateY(-3rem);
      top: -1px;
      pointer-events: none;

      @media (prefers-color-scheme: dark) {
        background: linear-gradient(0deg, #2220 0%, #222f 100%);
      }

      .dark & {
        background: linear-gradient(0deg, #2220 0%, #222f 100%);
      }

      .light & {
        background: linear-gradient(0deg, #fff0 0%, #ffff 100%);
      }
    }

    &:after {
      content: "";
      display: block;
      position: sticky;
      height: 5rem;
      background: linear-gradient(0deg, #ffff 0%, #fff0 100%);
      margin-top: -5rem;
      transform: translateY(3rem);
      bottom: -1px;
      pointer-events: none;

      @media (prefers-color-scheme: dark) {
        background: linear-gradient(0deg, #222f 0%, #2220 100%);
      }

      .dark & {
        background: linear-gradient(0deg, #222f 0%, #2220 100%);
      }

      .light & {
        background: linear-gradient(0deg, #ffff 0%, #fff0 100%);
      }
    }
  }

  &__grid {
    display: grid;
    gap: 2rem 4rem;
    align-items: center;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__header {
    all: unset;
    display: block;
    text-align: center;
    font-size: 3rem;
    font-weight: 300;
    margin-bottom: 2rem;
  }

  &__label {
    font-size: 1.5rem;
  }

  &__button {
    all: unset;
    display: inline-block;
    box-shadow: 0 0.1rem 0.2rem 0 #0006;
    align-items: center;
    font-size: 1.5rem;
    background-color: transparent;
    padding: 1rem 2rem;
    border-radius: 99rem;
    transition: background-color calc(0.2s * var(--speed, 1)) linear;
    cursor: pointer;
    place-self: end;

    @media (prefers-color-scheme: dark) {
      color: #fff;
    }

    .dark & {
      color: #fff;
    }

    .light & {
      color: #000;
    }

    &:hover, &focus {
      background-color: #eee;

      @media (prefers-color-scheme: dark) {
          background-color: #333;
      }

      .dark & {
        background-color: #333;
      }

      .light & {
        background-color: #eee;
      }
    }

    &:disabled {
      cursor: default;
      background-color: transparent;
      opacity: 0.6;
      box-shadow: none;
    }
  }
}
</style>
