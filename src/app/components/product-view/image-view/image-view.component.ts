import {Component, OnInit} from '@angular/core';
import {ItemServiceService} from '../../../services/item-service.service';
import {Items} from '../../../dto/Items';
import {NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions} from 'ngx-gallery';
import {ProductServiceService} from '../../../services/product-service.service';
// @ts-ignore
import key from '../../../../../key.json';

@Component({
    selector: 'app-image-view',
    templateUrl: './image-view.component.html',
    styleUrls: ['./image-view.component.css']
})
export class ImageViewComponent implements OnInit {

    imgBaseUrl = key.baseUrl;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

    constructor(private itemService: ItemServiceService, private productService: ProductServiceService) {
    }

    ngOnInit() {
        this.productService.currentProductId
            .subscribe((result) => {
                this.getItemId();
            });
        this.getItemId();

        this.galleryOptions = [
            {
                width: '200px',
                height: '200px',
                thumbnailsColumns: 3,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            {
                breakpoint: 2560,
                width: '500px',
                height: '500px'
            },
            {
                breakpoint: 1500,
                width: '325px',
                height: '325px'
            },
            {
                breakpoint: 1024,
                width: '250px',
                height: '250px'
            },
            {
                breakpoint: 767,
                width: '500px',
                height: '500px'
            },
            {
                breakpoint: 550,
                width: '380px',
                height: '380px'
            },
            {
                breakpoint: 400,
                width: '280px',
                height: '280px'
            }
        ];
    }

    public getItemId() {
        if (JSON.parse(localStorage.getItem('productViewItem')) !== null) {
            const itemId = JSON.parse(localStorage.getItem('productViewItem'));
            this.itemService.getItemById(itemId)
                .subscribe((result: Items) => {
                    this.setImages(result);
                });
        }
    }

    public setImages(item: Items) {
        const images = item.image.split(',');
        const temp: Array<NgxGalleryImage> = [];
        for (let i = 0; i < images.length - 1; i++) {
            temp.push({
                small: this.imgBaseUrl + images[i],
                medium: this.imgBaseUrl + images[i],
                big: this.imgBaseUrl + images[i]
            });
        }
        this.galleryImages = temp;
    }
}
