import {BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import {jwtSecret} from '../Utils/constant';
import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService){}

    async signup(dto:AuthDto){
        //primesc email si password de la dto
        const {email, password}=dto;
        //verific daca exista un user cu emailul primit
        const foundUser = await this.prisma.user.findUnique({where: {email}});
        if(foundUser){
            throw new BadRequestException('Email already exists!');
        }
        const hashedPassword = await this.hashPassword(password);
        
        await this.prisma.user.create({
            data: {
                email: email,
                //hashedPassword este parola hashuita care o creem noi, restu paramatrilor sunt creati de prisma
                hashedPassword
            }
        
        })
        //daca exista, returnez un mesaj
        return {message: 'signup was succsessful'}
    }

    async signin(dto:AuthDto, req:Request, res: Response){
        const {email, password}=dto;

        //verific daca exista un user cu emailul primit
        const foundUser = await this.prisma.user.findUnique({where: {email}});
        if(!foundUser){
            throw new BadRequestException('Wrong credentials!');
        }

        //verific daca parola primita este aceeasi cu parola hashuita
        const isMatch = await this.comparePasswords({password, hash: foundUser.hashedPassword});
        if(!isMatch){
            throw new BadRequestException('Wrong credentials!');
        }
        
        // jwt token
        const token = await this.signToken({userId: foundUser.id, email: foundUser.email});
        
        if(!token){
            throw new BadRequestException('Something went wrong!');
        }
        //setez tokenul in cookie
        res.cookie('token', token, {httpOnly: true});
        return res.send({message: 'signin was successful'});
    }

    //stergem cookie-ul cu token si este logout
    async logout(req: Request, res: Response){
        res.clearCookie('token');
        return res.send({message: 'logout was successful'});
    }

    //hashuiesc parola primita
    async hashPassword(password: string){
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
    }
    async comparePasswords(args:{password: string, hash: string}){
        //compar parola primita cu parola hashuita
        return await bcrypt.compare(args.password, args.hash);
    }
    async signToken(args:{userId: string, email: string}){
        const payload = args;
        return this.jwt.sign(payload, {secret: jwtSecret, expiresIn: '1h'});
    }

    async validateUser(email: string, password: string){
        //verific daca exista un user cu emailul primit
        const foundUser = await this.prisma.user.findUnique({where: {email}});
        if(!foundUser){
            throw new BadRequestException('Wrong credentials!');
        }
        //verific daca parola primita este aceeasi cu parola hashuita
        const isMatch = await this.comparePasswords({password, hash: foundUser.hashedPassword});
        if(!isMatch){
            throw new BadRequestException('Wrong credentials!');
        }
        return foundUser;
    }
}
