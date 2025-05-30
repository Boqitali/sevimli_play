import { PartialType } from '@nestjs/mapped-types';
import { CreateVideoDto } from './create-video.dto';

export class UpdateVideoDto extends PartialType(CreateVideoDto) {
    // title: string;

    // description: string;
  
    // url: string;
  
    // thumbnail_url: string;
  
    // views: number;
  
    // country_movie: string;
  
    // userId: number;
  
    // categoryId: number;
}
