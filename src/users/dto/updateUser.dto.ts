import {UsersDto} from './users.dto';

export class UpdateUsersDto implements Partial<UsersDto>{
    public email: string;
    public name: string;
    public role: string;
}