import { Book } from './book';
import { BookRaw} from './book-raw';



export class BookFactory {
  static empty(): Book {
    return  {
      isbn: '',
      title: 'TEst',
      authors:[],
      published: new Date(),
      description: '',
      rating: 0,
      subtitle: '',
      thumbnails: []
    }
  }
  static fromRaw(b:BookRaw):Book{
    return {
      ...b,
      published: new Date(b.published)
    }
  }
}
