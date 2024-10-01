import { Inject, Injectable } from '@nestjs/common'
import { DbModuleOptions, MODULE_OPTIONS_TOKEN } from './db.module-definition'
import { access, readFile, writeFile } from 'fs/promises'

@Injectable()
export class DbService {
  @Inject(MODULE_OPTIONS_TOKEN)
  private options: DbModuleOptions

  async read() {
    const filePath = this.options.path
    try {
      await access(filePath)
    } catch {
      return []
    }
    const content = await readFile(filePath, { encoding: 'utf-8' })
    if (!content) return []

    return JSON.parse(content)
  }

  async write(content: Record<string, any>) {
    await writeFile(this.options.path, JSON.stringify(content || [], null, 2), {
      encoding: 'utf-8',
    })
  }
}
