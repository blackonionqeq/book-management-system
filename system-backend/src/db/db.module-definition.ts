import { ConfigurableModuleBuilder } from '@nestjs/common'

export interface DbModuleOptions {
  path: string
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DbModuleOptions>().build()
