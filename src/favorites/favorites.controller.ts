import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard) // Add the JwtAuthGuard to the controller
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post('addfav')
  addNewFav(@Body() createFavoriteDto: CreateFavoriteDto, @Request() req: any){
    console.log(req.user)
    return this.favoritesService.addFavorite(createFavoriteDto, req.user);
  }

  @Get('showfav')
  async showFav(@Req() req) {
    const userId = req.user; // Assuming the user object has an id field
    return this.favoritesService.showAllFavorite(userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.favoritesService.removeFavorite(+id);
  }
}
