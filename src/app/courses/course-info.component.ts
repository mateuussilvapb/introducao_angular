import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import Swal from "sweetalert2";
import { Course } from "./course";
import { CourseService } from "./course.service";

@Component({
    templateUrl: './course-info.component.html'
})
export class CourseInfoComponent implements OnInit {

    course: Course;

    constructor(private activatedRoute: ActivatedRoute, private courseService: CourseService) { }

    ngOnInit(): void {
        this.courseService.retriveById(+this.activatedRoute.snapshot.paramMap.get('id')).subscribe({
            next: course => this.course = course,
            error: err => console.log('Error', err)
        });
    }

    save(): void {

        Swal.fire({
            title: 'Do you want to save changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Return`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.courseService.save(this.course).subscribe({
                    next: course => {
                        Swal.fire(
                            'Save',
                            'Changes made successfully!',
                            'success'
                        )
                        console.log('Saved with success', course)
                    },
                    error: err => {
                        Swal.fire(
                            'Error',
                            'Unexpected error saving changes!',
                            'error'
                        )
                        console.log('Error', err)
                    }
                });
            } else if (result.isDenied) {
                Swal.fire('Changes not saved!', '', 'info')
            }
        })
    }
}