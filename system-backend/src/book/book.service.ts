import { UpdateBookDto } from './dto/update-book.dto'
import { CreateBookDto } from './dto/create-book.dto'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { DbService } from '../db/db.service'
import { Book } from './entities/book.entity'
import { v4 as uuidV4 } from 'uuid'

@Injectable()
export class BookService {
  @Inject(DbService)
  private dbService: DbService

  async list() {
    return (await this.dbService.read()) as Book[]
  }

  async findById(id: string) {
    const books = (await this.dbService.read()) as Book[]
    const target = books.find((i) => i.id === id)
    if (!target) throw new BadRequestException('id为' + id + '的图书不存在')
    return target
  }

  async create(createBookDto: CreateBookDto) {
    const newBook = new Book()
    Object.entries(createBookDto).forEach(([key, val]) => {
      newBook[key] = val
    })
    newBook.id = uuidV4()
    const books = (await this.dbService.read()) as Book[]
    books.push(newBook)
    await this.dbService.write(books)
    return newBook
  }

  async update(updateBookDto: UpdateBookDto) {
    const books = (await this.dbService.read()) as Book[]
    const target = books.find((i) => i.name === updateBookDto.name)
    if (!target)
      throw new BadRequestException(
        '名字叫' + updateBookDto.name + '的图书不存在',
      )
    Object.entries(updateBookDto).forEach(([key, val]) => {
      target[key] = val
    })
    await this.dbService.write(books)
    return target
  }

  async delete(id: string) {
    const books = (await this.dbService.read()) as Book[]
    const idx = books.findIndex((i) => i.id === id)
    if (idx !== -1) books.splice(idx, 1)
    await this.dbService.write(books)
  }
}
