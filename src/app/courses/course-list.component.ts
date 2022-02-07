import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { Course } from "./course";
import { CourseService } from "./course.service";

@Component({
    templateUrl: './course-list.component.html',
})
export class CourseListComponent implements OnInit {


    /*
    * Utilizar um '_' antes do nome da variável indica
    * para outro programador que essa variável deve ser
    * utilizada somente dentro do contexto desse componente
    *  
    */
    _filterBy: string;
    _courses: Course[] = [];
    filteredCourses: Course[] = [];

    constructor(private courseService: CourseService) { }

    ngOnInit(): void {
        this.retriveAll();
    }

    retriveAll(): void {
        this.courseService.retriveAll().subscribe({
            next: courses => {
                this._courses = courses;
                this.filteredCourses = this._courses;
            },
            error: err => console.log('Error', err)
        });
    }

    deleteById(courseId: number): void {
        Swal.fire({
            title: 'Do you want to delete the course?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Return`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.courseService.deleteById(courseId).subscribe({
                    next: () => {
                        console.log('Deleted with success');
                        Swal.fire(
                            'Deleted',
                            'Course successfully deleted!',
                            'success'
                        )
                        this.retriveAll();
                    },
                    error: err => {
                        Swal.fire(
                            'Error',
                            'Unexpected error when deleting!',
                            'error'
                        )
                        console.log('Error', err)
                    }
                })
            } else if (result.isDenied) {
                Swal.fire('Deletion canceled', '', 'info')
            }
        })
    }

    /*
    * Os métodos abaixo (get e set) servem para realizar
    * o 'two way data biding'.
    * 
    */
    set filter(value: string) {
        this._filterBy = value;
        //Filtra os nomes dos cursos de acordo com o que é digitado
        this.filteredCourses = this._courses.filter((course: Course) => course.name.toLowerCase().indexOf(this._filterBy.toLowerCase()) > -1);
    }
    get filter() {
        return this._filterBy;
    }
}