import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateProductDto } from './dtos/update-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { removed: false },
      orderBy: { id: 'asc' },
    });
  }

  async searchByName(name: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: {
        removed: false,
        name: {
          contains: name,
          mode: Prisma.QueryMode.insensitive,
        },
      },
      orderBy: { id: 'asc' },
    });
  }

  async create(data: CreateProductDto): Promise<Product> {
    try {
      return this.prisma.product.create({ data });
    } catch (error) {
      throw new BadRequestException('SKU ya existe o datos inválidos');
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    try {
      return this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      throw new BadRequestException('Producto no encontrado o datos inválidos');
    }
  }

  async remove(id: number): Promise<Product> {
    try {
      return this.prisma.product.update({
        where: { id },
        data: { removed: true },
      });
    } catch (error) {
      throw new BadRequestException('Producto no encontrado');
    }
  }
}
