import { Pipe, PipeTransform } from '@angular/core';
import { MoviesGenres } from './tmdb-data/Movie';
@Pipe({
  name: 'idToGenre'
})
export class IdToGenrePipe implements PipeTransform {

  transform(genresMovie: number[], genre: MoviesGenres): string[] {
    const retour: string[] = [];
    genresMovie.forEach(value => {
      genre.genres.forEach(value1 => {
        if (value1.id === value) {
          retour.push(value1.name);
        }
        if (retour.length === 4) {
          return retour;
        }
      });
    });
    return retour;
  }

}
