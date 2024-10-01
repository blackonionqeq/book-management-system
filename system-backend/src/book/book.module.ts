import { Module } from '@nestjs/common'
import { BookService } from './book.service'
import { BookController } from './book.controller'
import { DbModule } from '../db/db.module'

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [
    DbModule.register({
      path: 'book.json',
    }),
  ],
})
export class BookModule {}
