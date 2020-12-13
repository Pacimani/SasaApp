import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { BlogContent } from './blogContent';

@Injectable({
  providedIn: 'root'
})

/**
 * A class handling blog service
 */
export class BlogService {

  blogContents: BlogContent[] = [];
  private blogsUrl = 'api/blogs';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient){ }

  addBlog(blogContent: BlogContent): Observable<BlogContent>{

    return this.http.post<BlogContent>(this.blogsUrl, blogContent,
      this.httpOptions).pipe(tap((newblogContent: BlogContent) => {
        this.blogContents.push(newblogContent);
      }),
      catchError(this.handleError<BlogContent>('new blogContent added'))
    );
  }

  /**
   * @returns an abservable list of blogContents from the server.
   */
  getBlogContents(): Observable<BlogContent[]>{

    return this.http.get<BlogContent[]>(this.blogsUrl).pipe(
      catchError(this.handleError<BlogContent[]>('getBlogs', []))
    );
  }

  /** PUT: update the hero on the server */
  updateBlogContent(blogContent: BlogContent): Observable<any>{

    return this.http.put(this.blogsUrl, blogContent, this.httpOptions).pipe(
      catchError(this.handleError<any>('updated Blog'))
    );
  }

  /**
   * @param id to fetch a given blogContent
   * @returns an observable of the blogContent associated with the given id
   */
  getBlogContent(id: number): Observable<BlogContent>{

    const url = `${this.blogsUrl}/${id}`;
    return this.http.get<BlogContent>(url).pipe(
      catchError(this.handleError<BlogContent>(`getHero id=${id}`))
    );
  }

  /**
   * @returns current number of blogContent
   */
  numberOfBlogs(): number {
    return this.blogContents.length;
  }

  /**
   * @returns list of blogContent currently on this server.
   */
  getCurrentBlogContents(): BlogContent[]{
    return this.blogContents;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET blogContent by id. Return `undefined` when id not found */
  getBlogContentNo404<Data>(id: number): Observable<BlogContent> {
    const url = `${this.blogsUrl}/?id=${id}`;
    return this.http.get<BlogContent[]>(url)
      .pipe(
        map(blogs => blogs[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<BlogContent>(`getBlog id=${id}`))
      );
  }
}
