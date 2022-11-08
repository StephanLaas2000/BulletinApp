import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../post-service.service';
// import {moment} from 'moment';
import { faFilm, faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css'],
})
export class PostDisplayComponent implements OnInit {
  filmIcon = faTrash;

  posts: {
    _id: string;
    title: string;
    status: string;
    department: string;
    description: string;
    username: string;
    createdAt: string;
    __v: string;
  }[] = [];

  constructor(public postservice: PostServiceService) {}
  private postSubscription!: Subscription;

  ngOnInit() {
    this.postservice.getpost_service();
    this.postSubscription = this.postservice.getUpdateListener().subscribe(
      (
        posts: {
          _id: string;
          title: string;
          status: string;
          department: string;
          description: string;
          username: string;
          createdAt: string;
          __v: string;
        }[]
      ) => {
        this.posts = posts;
      }
    );
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  ondelete(postid: string) {
    if (confirm('Are you sure to delete the post ?')) {
      this.postservice.deletepost_service(postid);
    }
  }
}
