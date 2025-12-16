import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  private readonly ITEM_PER_PAGE = 10;
  constructor(private prisma: PrismaService) {}

  async findAll(
    query?: string,
    page: number = 1,
    ITEM_PER_PAGE: number = this.ITEM_PER_PAGE,
  ) {
    const where = query
      ? {
          OR: [
            { username: { contains: query, mode: undefined } }, // optional: remove mode
            { email: { contains: query, mode: undefined } }, // optional: remove mode
          ],
        }
      : {};

    const [users, count] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * ITEM_PER_PAGE,
        take: ITEM_PER_PAGE,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(), // ✅ await executed
    ]);

    return { users, count, page, ITEM_PER_PAGE };
  }

  // findOne(id: string) {
  //   const user = this.users.find((user) => user.id === id);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return user;
  // }
  async create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
    };
    await this.prisma.user.create({ data: createUserDto });
    return newUser;
  }

  // update(id: string, updateUserDto: UpdateUserDto) {
  //   const userIndex = this.users.findIndex((user) => user.id === id);
  //   if (userIndex !== -1) {
  //     return (this.users[userIndex] = {
  //       ...this.users[userIndex],
  //       ...updateUserDto,
  //     });
  //   } else {
  //     throw new NotFoundException('User not found');
  //   }
  // }
}
