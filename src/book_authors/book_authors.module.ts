import { Module } from '@nestjs/common';
import { BookAuthorsService } from './book_authors.service';

@Module({
  providers: [BookAuthorsService]
})
export class BookAuthorsModule {}
