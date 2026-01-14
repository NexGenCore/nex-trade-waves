import { Injectable, ConflictException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "./entities/user.entity"
import * as bcrypt from "bcryptjs"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: any) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: userData.email },
    })

    if (existingUser) {
      throw new ConflictException("Email already exists")
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
      simulationBalance: 10000, // Initial simulation balance
    })

    return this.usersRepository.save(user)
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } })
  }

  async findById(id: string) {
    return this.usersRepository.findOne({ where: { id } })
  }

  async update(id: string, updateData: any) {
    // Don't allow updating the password through this method
    if (updateData.password) {
      delete updateData.password
    }
    
    await this.usersRepository.update(id, updateData)
    return this.findById(id)
  }

  async findAll() {
    return this.usersRepository.find()
  }
}