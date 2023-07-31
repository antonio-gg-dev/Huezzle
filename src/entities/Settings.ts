export enum Theme {
  auto = 'auto',
  dark = 'dark',
  light = 'light'
}

export enum Animations {
  disabled = 'disabled',
  fast = 'fast',
  normal = 'normal',
  slow = 'slow'
}

export enum Mode {
  both = 'both',
  grab = 'grab',
  touch = 'touch'
}

export interface RawSettings {
  tutorialDone: boolean | undefined
  theme: string | undefined
  language: string | null | undefined
  animations: string | undefined
  mode: string | undefined
}

export class Settings {
  constructor (
    public tutorialDone: boolean,
    public theme: Theme,
    public language: string | null,
    public animations: Animations,
    public mode: Mode
  ) {}

  public resetTutorial (): Settings {
    this.tutorialDone = false

    return this
  }

  public makeTutorial (): Settings {
    this.tutorialDone = true

    return this
  }

  public showTutorial (): boolean {
    return !this.tutorialDone
  }

  public setTheme (theme: Theme): Settings {
    this.theme = theme
    return this
  }

  public getTheme (): Theme {
    return this.theme
  }

  public setLanguage (language: string | null): Settings {
    this.language = language
    return this
  }

  public getLanguage (): string {
    return this.language ?? navigator.language
  }

  public setAnimations (animation: Animations): Settings {
    this.animations = animation
    return this
  }

  public getAnimations (): Animations {
    return this.animations
  }

  public setMode (mode: Mode): Settings {
    this.mode = mode
    return this
  }

  public getMode (): Mode {
    return this.mode
  }

  public toRaw (): RawSettings {
    return {
      tutorialDone: this.tutorialDone,
      theme: this.theme,
      language: this.language,
      animations: this.animations,
      mode: this.mode
    }
  }

  public static fromRaw ({ tutorialDone, theme, language, animations, mode }: RawSettings): Settings {
    return new Settings(
      tutorialDone ?? false,
      theme !== undefined && theme in Theme ? theme as Theme : Theme.auto,
      language ?? null,
      animations !== undefined && animations in Animations ? animations as Animations : Animations.normal,
      mode !== undefined && mode in Mode ? mode as Mode : Mode.both
    )
  }
}
