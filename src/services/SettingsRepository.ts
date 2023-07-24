import { Settings } from '@/entities/Settings'

export class SettingsRepository {
  private readonly storageKey = 'settings'

  constructor (
    private readonly storage: Storage
  ) {}

  public get (): Settings {
    return Settings.fromRaw(JSON.parse(this.storage.getItem(this.storageKey) ?? '{}'))
  }

  public store (settings: Settings): void {
    this.storage.setItem(this.storageKey, JSON.stringify(settings.toRaw()))
  }
}
