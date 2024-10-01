import { Module } from '@nestjs/common'
import { ConfigurableModuleClass } from './db.module-definition'
import { DbService } from './db.service'

@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule extends ConfigurableModuleClass {}
