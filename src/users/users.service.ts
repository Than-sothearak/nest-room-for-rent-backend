import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: string, page: number = 1, limit: number = 10) {
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
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count(), // ✅ await executed
    ]);

    const totalPages = Math.ceil(count / limit);
    return {
      data: users,
      meta: {
        totalItems: count,
        itemCount: users.length,
        itemsPerPage: limit,
        totalPages: totalPages,
        currentPage: page,
      },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
    };
    await this.prisma.user.create({ data: createUserDto });
    return newUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      return {
        success: true,
        message: 'User updated successfully',
        data: await this.prisma.user.update({
          where: { id: id },
          data: { ...updateUserDto },
        }),
      };
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
