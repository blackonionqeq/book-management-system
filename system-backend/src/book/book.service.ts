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

  async list(name?: string) {
    const books = (await this.dbService.read()) as Book[]
    if (!name) {
      return books
    }
    return books.filter((i) => i.name.includes(name))
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
    const target = books.find((i) => i.id === updateBookDto.id)
    if (!target)
      throw new BadRequestException('id为' + updateBookDto.id + '的图书不存在')
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
