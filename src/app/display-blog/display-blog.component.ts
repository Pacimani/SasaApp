import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogComment } from '../blogComment';
import { BlogContent } from '../blogContent';


@Component({
  selector: 'app-display-blog',
  templateUrl: './display-blog.component.html',
  styleUrls: ['./display-blog.component.css']
})
export class DisplayBlogComponent implements OnInit {

  commentForm = new FormGroup({
    message: new FormControl('')
  });
  blogContent!: BlogContent;
  control = false;
  blogID!: number;
  successComment = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    private router: Router){ }

  /**
   * Invoke the blogContent on this route.
   */
  ngOnInit(): void{
    this.activatedRoute.params.subscribe(params => {
      this.blogID = +params.id;
      this.blogService.getBlogContent(this.blogID).subscribe(blog => this.blogContent = blog);
    });
    if (this.numberOfBlogs() === 0) {
      this.router.navigate(['./home']);
    }
  }

  /**
   * Request the blogContent currently on this route from the server.
   */
  newComment(): void{
    const comment = this.commentForm.value.message.trim();
    if (!comment) {
      return;
    }
    const newComment: BlogComment = {
      time: new Date(),
      message: comment
    };
    this.blogContent.blog.comments.push(newComment);
    this.blogService.updateBlogContent(this.blogContent).subscribe(
      () => this.successComment = true
    );
    this.commentForm.reset();
  }

  /**
   * Control the Display of blogContent's comments' thread.
   */
  commentControl(): void{
    this.control = !this.control;
  }

  /**
   * @returns list of comment associated with this given blogContent.
   */
  getBlogComments(): BlogComment[]{
    return this.blogContent.blog.comments;
  }

  /**
   * @return the number of blogContents.
   */
  numberOfBlogs(): number{
    return this.blogService.numberOfBlogs();
  }
}
