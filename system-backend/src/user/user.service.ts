import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { DbService } from 'src/db/db.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { User } from './entities/user.entity'
import { LoginUserDto } from './dto/login-user.dto'
@Injectable()
export class UserService {
  @Inject(DbService)
  private dbService: DbService

  async register(registerUserDto: RegisterUserDto) {
    const users: User[] = await this.dbService.read()
    const foundUser = users.find((i) => i.username === registerUserDto.username)
    if (foundUser) throw new BadRequestException('这个用户名已被使用')
    const user = new User()
    user.username = registerUserDto.username
    user.password = registerUserDto.password
    users.push(user)
    await this.dbService.write(users)
    return user
  }

  async login(loginUserDto: LoginUserDto) {
    const users: User[] = await this.dbService.read()
    const foundUser = users.find((i) => i.username === loginUserDto.username)
    if (!foundUser) throw new BadRequestException('不存在该用户')
    if (foundUser.password !== loginUserDto.password)
      throw new BadRequestException('用户密码错误！')
    return foundUser
  }
}
