<template>
  <PopupContainer
    :is-open="isOpen"
    @close="$emit('close')"
  >
    <template #header>
      {{ $t('settings_header') }}
    </template>

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
  </PopupContainer>
</template>

<script lang="ts">
import PopupContainer from '@/components/PopupContainer.vue'
import { defineComponent, PropType } from 'vue'
import { Animations, Mode, Settings, Theme } from '@/entities/Settings'

export default defineComponent({
  components: {
    PopupContainer
  },

  emits: [
    'close',
    'save',
    'credits'
  ],

  props: {
    settings: {
      required: true,
      type: Settings as PropType<Settings>
    },
    isOpen: {
      default: false,
      type: Boolean as PropType<boolean>
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
  &__grid {
    display: grid;
    gap: 2rem 4rem;
    align-items: center;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  &__label {
    font-size: 1.5rem;
  }

  &__button {
    all: unset;
    display: inline-block;
    box-shadow: 0 0 0.1rem 0 #0004,
      0 0.1rem 0.3rem 0 #0004;
    align-items: center;
    font-size: 1.5rem;
    background-color: transparent;
    padding: 1rem 2rem;
    border-radius: 99rem;
    transition: background-color calc(0.2s * var(--speed, 1)) linear;
    cursor: pointer;
    place-self: end;
    text-align: center;

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
