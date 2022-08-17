import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'app-image-slider',
    templateUrl: './image-slider.component.html',
    styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit {

    constructor() {
    }

    public img1 = '../../assets/img_1.jpg';
    public img2 = '../../assets/img_2.jpg';
    public img3 = '../../assets/img_3.jpg';
    public img4 = '../../assets/img_4.jpg';
    public img5 = '../../assets/img_5.jpg';
    public sub_text = 'World no 1 camera seller';

    ngOnInit() {
        localStorage.removeItem('remember');
    }

    divhide() {
        const itsr1 = document.getElementById('searchitemdiv2') as HTMLElement;
        itsr1.style.display = 'none';
    }
}
