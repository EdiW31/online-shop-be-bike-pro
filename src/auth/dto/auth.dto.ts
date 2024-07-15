import { IsNotEmpty, IsString, IsEmail, Length } from "class-validator";

export class AuthDto{
    //aceste @ doar verifica daca campul este gol and etc
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    public email: string;

    //verificam daca parola este string si are intre 3 si 20 de caractere
    @IsNotEmpty()
    @IsString()
    @Length(3, 20,{message: 'Password must be between 3 and 20 characters'})
    public password: string;

    public name: string;
}