import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  addNewFav(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.addFavorite(createFavoriteDto);
  }

  @Get()
  showFav() {
    return this.favoritesService.showAllFavorite();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritesService.removeFavorite(+id);
  }
}
