import { Save } from '@/entities/Save'

export class SaveRepository {
  private readonly storageKey = 'save'

  constructor (
    private readonly storage: Storage
  ) {}

  public save (save: Save) {
    this.storage.setItem(this.storageKey, JSON.stringify(save.toRaw()))
  }

  public get (): Save | null {
    const raw = JSON.parse(this.storage.getItem(this.storageKey) ?? 'null')

    if (!raw) {
      return null
    }

    return Save.fromRaw(raw)
  }
}
