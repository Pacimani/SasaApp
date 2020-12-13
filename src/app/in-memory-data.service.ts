import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BlogContent } from './blogContent';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  // tslint:disable-next-line:typedef
  createDb() {
    const blogs: BlogContent[] = [];
    return { blogs };
  }

  genId(blogs: BlogContent[]): number {
    return blogs.length > 0 ? Math.max(...blogs.map(blog => blog.id)) + 1 : 1;
  }
}
