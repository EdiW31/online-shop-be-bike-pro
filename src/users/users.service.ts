import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';
import { UsersDto } from './dto/users.dto';
import { UpdateUsersDto } from './dto/updateUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}

    // luam user-ul dupa id
    async getMyUser(id: string, req:Request) { 
        const user = await this.prisma.user.findUnique({where: {id: id}});
        if(!user){
            throw new NotFoundException('User not found');
        }
        return {user}; 
    }
    // luam toti userii
    async getUsers(role?: 'ADMIN' | 'USER') {
        if(role) return await this.prisma.user.findMany({
            where: {
                role: role
            },
            select: {
                id: true,
                email: true
            }
        });
        return await this.prisma.user.findMany(); // returneaza toti userii numa cu id si email
    }
    // stergem userul dupa id si asta poate sa fie facut numai de catre admin
    async deleteUser(id: string){
        const user = await this.prisma.user.findUnique({where: {id: id}});
        if(!user){
            throw new NotFoundException('User not found');
        }
        await this.prisma.user.delete({where: {id: id}});
        return {message: 'User was deleted'};
    }
    // creem user
    async createUser(createNewUserDto: UsersDto) {
        const {email, password, name} = createNewUserDto;
        return await this.prisma.user.create({data:{
            email: email,
            name: name,
            hashedPassword: await bcrypt.hash(password, 10),
            role: 'USER'
        }});
    }
    // update user
    async updateUser(id: string, updateUserDto: UpdateUsersDto) {
        // vedem daca exista user ul
        const {email, name, role } = updateUserDto;
        const user = await this.prisma.user.findUnique({where: {id: id}});
        // procedeasa cu update daca email nu exista, aici poti adauga cate campuri vrei sa fie updatate
        return await this.prisma.user.update({
            where: { id: id },
            data: {
                name: name,
                email: email,
            },
        });
    }
}