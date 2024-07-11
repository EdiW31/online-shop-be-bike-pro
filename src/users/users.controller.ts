import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersDto } from './dto/users.dto';



@Controller('users')
// @UseGuards( RolesGuard) NU MERGE SI NU STIU DE CE!!!
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // luam user-ul dupa id
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getMyUser(@Param()params: {id: string}, @Req() req){
    return this.usersService.getMyUser(params.id, req);
  }

  // luam toti userii
  @Get()
  getUsers(@Query('role') role?: 'ADMIN' | 'USER'){
    return this.usersService.getUsers(role);
  }

  // stergem userul dupa id si asta poate sa fie facut numai de catre admin
  @Delete(':id')
  deleteUser(@Param() params: {id: string}){
    return this.usersService.deleteUser(params.id);
  }

  @Post('create')
  createUser(@Body() createNewUserDto: UsersDto ){
    return this.usersService.createUser(createNewUserDto);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UsersDto){
    return this.usersService.updateUser(id, updateUserDto);
  }

}
