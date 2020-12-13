import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { BlogService } from '../blog.service';
import { Blog } from '../blog';
import { BlogContent } from '../blogContent';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  blogForm = new FormGroup({
    title: new FormControl(''),
    message: new FormControl('')
  });
  blogContent!: BlogContent;
  alert = false;

  constructor(
    private blogService: BlogService,
    private location: Location){ }

  ngOnInit(): void { }

  /**
   * Creates a new blog.
   */
  submitData(): void{

    const rawTitle = this.blogForm.value.title.trim();
    const rawMessage = this.blogForm.value.message.trim();
    if (!rawTitle || !rawMessage) {
      return;
    }
    const blog: Blog = {
      title: rawTitle,
      time: new Date(),
      message: rawMessage,
      comments: []
    };

    this.blogService.addBlog({ blog } as BlogContent)
      .subscribe(() => {
        this.blogForm.reset();
        this.alert = true;
      });
  }

  /**
   * Return to the previous page.
   */
  back(): void {
    this.location.back();
  }
}
