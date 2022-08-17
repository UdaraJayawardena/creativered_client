import {Component, OnInit} from '@angular/core';
import {GalleryServiceService} from '../../services/gallery-service.service';
import {Gallery} from '../../dto/Gallery';
import {CrystalLightbox} from 'ngx-crystal-gallery';
// @ts-ignore
import key from '../../../../key.json';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

    imgBaseUrl = key.baseUrl;
    galleryImage: Array<any> = [];

    constructor(private galleryService: GalleryServiceService, private lightbox: CrystalLightbox) {
    }

    ngOnInit() {
        this.getAllImages();
    }

    getAllImages() {
        this.galleryService.getAllImages()
            .subscribe((result: Array<Gallery>) => {
                for (let i = 0; i < result.length; i++) {
                    result[i].url = this.imgBaseUrl + result[i].url;
                    const myImages = {
                        path: result[i].url
                    };
                    this.galleryImage.push(myImages);
                }
            }, error1 => {
                console.log(error1);
            });
    }
}
