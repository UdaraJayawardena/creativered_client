import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-sub-category-view',
    templateUrl: './sub-category-view.component.html',
    styleUrls: ['./sub-category-view.component.css']
})
export class SubCategoryViewComponent implements OnInit {
    subCategories = ['Action Camera      (200)', 'DSLR      (200)', 'Digital Cameras      (200)', 'Action Camera      (200)'];

    constructor() {
    }

    ngOnInit() {
    }

}
