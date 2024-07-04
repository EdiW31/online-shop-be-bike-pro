import { IsNotEmpty, IsString, IsEmail, Length } from "class-validator";

export class UsersDto{
    //aceste @ doar verifica daca campul este gol and etc
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email: string;

    //verificam daca parola este string si are intre 3 si 20 de caractere
    @IsNotEmpty()
    @IsString()
    public password: string;

    @IsNotEmpty()
    @IsString()
    public role: string;
}