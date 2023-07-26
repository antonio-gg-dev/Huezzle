export const enum Theme {
  auto = 'auto',
  dark = 'dark',
  light = 'light'
}

export const enum Animations {
  disabled = 'disabled',
  fast = 'fast',
  normal = 'normal',
  slow = 'slow'
}

export interface RawSettings {
  tutorialDone: boolean | undefined,
  theme: Theme | undefined,
  language: string | null | undefined
  animations: Animations | undefined
}

export class Settings {
  constructor (
    public tutorialDone: boolean,
    public theme: Theme,
    public language: string | null,
    public animations: Animations
  ) {}

  resetTutorial (): Settings {
    this.tutorialDone = false

    return this
  }

  makeTutorial (): Settings {
    this.tutorialDone = true

    return this
  }

  showTutorial (): boolean {
    return !this.tutorialDone
  }

  setTheme (theme: Theme): Settings {
    this.theme = theme
    return this
  }

  getTheme (): Theme {
    return this.theme
  }

  setLanguage (language: string | null): Settings {
    this.language = language
    return this
  }

  getLanguage (): string {
    return this.language ?? navigator.language
  }

  setAnimations (animation: Animations): Settings {
    this.animations = animation
    return this
  }

  getAnimations (): Animations {
    return this.animations
  }

  toRaw (): RawSettings {
    return {
      tutorialDone: this.tutorialDone,
      theme: this.theme,
      language: this.language,
      animations: this.animations
    }
  }

  static fromRaw ({ tutorialDone, theme, language, animations }: RawSettings): Settings {
    return new Settings(
      tutorialDone ?? false,
      theme ?? Theme.auto,
      language ?? null,
      animations ?? Animations.normal
    )
  }
}
