import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostServiceService } from '../post-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  constructor(public postService: PostServiceService, private router: Router) {
    const tokens = localStorage.getItem('user auth');
  }

  onaddpost(postform: NgForm) {
    if (postform.invalid) {
      alert('Invalid!');
      return;
    }

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    let username = localStorage.getItem('user name');

    this.postService.addpost_service(
      postform.value.enteredTitle,
      postform.value.enteredStatus,
      postform.value.enteredDepartment,
      postform.value.enteredDescription,
      username!!,
      currentDate.toString()
    );

    if (postform.submitted != null) {
    }

    postform.reset();

    alert('Post Created !');
  }
}
