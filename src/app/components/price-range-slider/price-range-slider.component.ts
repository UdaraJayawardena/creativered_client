import {Component, OnInit} from '@angular/core';
import {LabelType, Options} from 'ng5-slider';
import {ItemServiceService} from '../../services/item-service.service';
import {Items} from '../../dto/Items';

@Component({
    selector: 'app-price-range-slider',
    templateUrl: './price-range-slider.component.html',
    styleUrls: ['./price-range-slider.component.css']
})
export class PriceRangeSliderComponent implements OnInit {

    public a: Items;

    minValue: number;
    maxValue: number;

    public optionsOfSlider;

    constructor(private itemService: ItemServiceService) {
    }

    ngOnInit() {
        this.getAllItem();
    }

    public getAllItem() {
        this.itemService.getAllItems()
            .subscribe((result) => {
                this.a = result;
                this.findMaxValue(result);
                this.findMinValue(result);

                const options: Options = {
                    floor: this.minValue,
                    ceil: this.maxValue,
                    translate: (value: number, label: LabelType): string => {
                        switch (label) {
                            case LabelType.Low:
                                return '<b>Min price:</b> LKR' + value;
                            case LabelType.High:
                                return '<b>Max price:</b> LKR' + value;
                            default:
                                return 'LKR' + value;
                        }
                    }
                };
                this.optionsOfSlider = options;
            });
    }


    public findMaxValue(items) {
        let maxVal = items[0].price;
        for (let i = 0; i < items.length; i++) {
            if (maxVal < items[i].price) {
                maxVal = items[i].price;
            }
        }
        this.maxValue = maxVal;
    }

    public findMinValue(items) {
        let minVal = items[0].price;
        for (let i = 0; i < items.length; i++) {
            if (minVal > items[i].price) {
                minVal = items[i].price;
            }
        }
        this.minValue = minVal;
    }

    public end(changeContext) {
        this.itemService.changeMaxMinPrice([changeContext.value, changeContext.highValue]);
    }
}
