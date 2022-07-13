import {Component, OnInit} from '@angular/core';
import {ComparisonService} from '../../services/comparison.service';
import {Items} from '../../dto/Items';
import {ItemServiceService} from '../../services/item-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
// @ts-ignore
import key from '../../../../key.json';

@Component({
    selector: 'app-comparison',
    templateUrl: './comparison.component.html',
    styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {

    imgBaseUrl = key.baseUrl;
    itemarray: Items[];
    public compare_image_1;
    public compare_image_2;
    public name;
    public name_2;
    public brand;
    public brand_2;
    public price;
    public price_2;
    public hilights;
    public hilights_2;
    public specification;
    public specification_2;
    public colors;
    public rating;
    public rating_2;
    public discount;
    public discount_2;
    public isSelect = false;
    public isSelect_2 = false;
    showSpinner = true;
    setName: string;
    setName2: string;

    constructor(private comparisonservice: ComparisonService, private itemService: ItemServiceService, private spinner: NgxSpinnerService) {
    }

    ngOnInit() {
        this.getCurrentItemId();
        this.getIsSelectOrNot();
    }

    public getIsSelectOrNot() {
        this.comparisonservice.currentIsSelectItem
            .subscribe((result: boolean) => {
                this.isSelect = result;
            });
    }

    maindivv() {
        const itsr = document.getElementById('searchitemdiv') as HTMLElement;
        itsr.style.display = 'none';
        const itsr1 = document.getElementById('searchitemdiv1') as HTMLElement;
        itsr1.style.display = 'none';
    }

    searchkeyup(val) {
        if (val === '') {
            const itsr = document.getElementById('searchitemdiv') as HTMLElement;
            itsr.style.display = 'none';
        } else {
            const itsr = document.getElementById('searchitemdiv') as HTMLElement;
            itsr.style.display = 'block';
            const tempval = val.toLowerCase();
            this.comparisonservice.getAllItemDetail().subscribe((result) => {
                const itarray1: Array<Items> = [];
                const ittarray: Array<Items> = result;
                for (let i = 0; i < ittarray.length; i++) {
                    const tempname = ittarray[i].name.toLowerCase();
                    if (tempname.includes(tempval)) {
                        const itobj = new Items(ittarray[i].name);
                        itarray1.push(itobj);
                    }
                }
                this.itemarray = itarray1;
            });
        }
    }

    getItemValue(itemv) {
        setTimeout(() => this.spinner.show(), 0);
        this.isSelect = true;
        this.comparisonservice.getAllItemDetail().subscribe((result) => {
            const itarray2: Array<Items> = result;
            for (let i = 0; i < itarray2.length; i++) {
                if (itarray2[i].name === itemv) {
                    const strings = itarray2[i].image.split(',');
                    this.compare_image_1 = this.imgBaseUrl + strings[0];
                    this.name = itemv;
                    this.brand = itarray2[i].brand;
                    this.price = itarray2[i].price;
                    this.hilights = itarray2[i].highlights;
                    this.rating = itarray2[i].rate;
                    this.discount = itarray2[i].discount;
                    this.specification = itarray2[i].specification;
                    setTimeout(() => this.spinner.hide(), 500);
                }
            }
            this.showSpinner = false;
        });
        this.setName = itemv;
    }

    searchkeyup2(val) {
        if (val === '') {
            const itsr1 = document.getElementById('searchitemdiv1') as HTMLElement;
            itsr1.style.display = 'none';
        } else {
            const itsr1 = document.getElementById('searchitemdiv1') as HTMLElement;
            itsr1.style.display = 'block';
            const tempval = val.toLowerCase();
            this.comparisonservice.getAllItemDetail().subscribe((result) => {
                const itarray1: Array<Items> = [];
                const ittarray: Array<Items> = result;
                for (let i = 0; i < ittarray.length; i++) {
                    const tempname = ittarray[i].name.toLowerCase();
                    if (tempname.includes(tempval)) {
                        const itobj = new Items(ittarray[i].name);
                        itarray1.push(itobj);
                    }
                }
                this.itemarray = itarray1;
            });
        }
    }

    getItemValue1(itemv) {
        setTimeout(() => this.spinner.show(), 0);
        this.isSelect_2 = true;
        this.comparisonservice.getAllItemDetail().subscribe((result) => {
            const itarray2: Array<Items> = result;
            for (let i = 0; i < itarray2.length; i++) {
                if (itarray2[i].name === itemv) {
                    const strings = itarray2[i].image.split(',');
                    this.compare_image_2 = this.imgBaseUrl + strings[0];
                    this.name_2 = itemv;
                    this.brand_2 = itarray2[i].brand;
                    this.price_2 = itarray2[i].price;
                    this.hilights_2 = itarray2[i].highlights;
                    this.rating_2 = itarray2[i].rate;
                    this.discount_2 = itarray2[i].discount;
                    this.specification_2 = itarray2[i].specification;
                    setTimeout(() => this.spinner.hide(), 500);
                }
            }
        });
        this.setName2 = itemv;
    }

    public getCurrentItemId() {
        this.itemService.currentItemId.subscribe((result) => {
            console.log(result);
            if (Number(result) !== 0) {
                setTimeout(() => this.spinner.show(), 0);
                this.getItemById(result);
            } else {
                this.spinner.hide();
            }
        });
    }

    public getItemById(id) {
        console.log('result');
        console.log(id);
        this.itemService.getItemById(id).subscribe((result) => {
            console.log(result);
            this.setDetailToitemOne(result);
            setTimeout(() => this.spinner.hide(), 500);
        });
    }

    public setDetailToitemOne(item: Items) {
        this.compare_image_1 = this.imgBaseUrl + item.image.split(',')[0];
        this.name = item.name;
        this.brand = item.brand;
        this.price = item.price;
        this.hilights = item.highlights;
        this.colors = item.color.split(',');
        this.rating = item.rate;
        this.discount = item.discount;
        this.specification = item.specification;
    }
}
