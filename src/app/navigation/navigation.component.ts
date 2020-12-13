import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogContent } from '../blogContent';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  blogs: BlogContent[] = [];
  constructor(private blogService: BlogService, private router: Router) {
    // tslint:disable-next-line:only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function(): boolean {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }
  /**
   * Invoke getBlogs() to request blogContents
   */
  ngOnInit(): void{
    this.getBlogContents();
  }

  /**
   * request blogs from the server if any exists and subscribe to it.
   */
  getBlogContents(): void {
    this.blogService.getBlogContents().subscribe(
      blogContents => this.blogs = blogContents);
  }

  /**
   * @returns current number of blogContent.
   */
  numberOfBlogs(): number {
    return this.blogService.numberOfBlogs();
  }

  /**
   * @returns list of blogContent currently on this server.
   */
  getCurrentBlogContents(): BlogContent[] {
    return this.blogService.getCurrentBlogContents();
  }
}
