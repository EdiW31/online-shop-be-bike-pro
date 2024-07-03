import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService){}
    async getMyUser(id: string, req:Request) {
        const user = await this.prisma.user.findUnique({where: {id: id}});

        // daca userul nu exista, aruncam o exceptie
        if(!user){
            throw new NotFoundException('User not found');
        }
        // daca userul nu este cel care face requestul, aruncam o exceptie ca nu are voie sa vada userul
        const decodedUser = req.user as {id: string, email: string};
        if(decodedUser.id !== user.id){
            throw new ForbiddenException('You are not allowed to see this user!');
        }
        // stergem parola hashuita din raspuns
        delete user.hashedPassword;

        return {user};
    }
    async getUsers() {
        return await this.prisma.user.findMany({select: {id: true, email:true}}); // returneaza toti userii numa cu id si email
    }
}