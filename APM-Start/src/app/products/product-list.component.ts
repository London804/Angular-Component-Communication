import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, ElementRef, QueryList} from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    // listFilter: string;
    showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    includeDetail: boolean = true;

    // first way to filter the input
    // @ViewChild('filterElement') filterElementRef:ElementRef; // this allows you to use access the DOM HTML properties/methods on the element
    // @ViewChildren(NgModel) inputElementRefs: QueryList<ElementRef>; // same thing just several

    // the third way to filter the input is to use viewChild with ngModel
    // @ViewChild(NgModel) filterInput:NgModel;

    // the getter setter method also allows you to filter the products
    private _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.performFilter(this.listFilter);
    }

    // ngAfterViewInit(): void {
    //     // It's good to check for existence before using
    //     if(this.filterElementRef.nativeElement) {
    //        this.filterElementRef.nativeElement.focus();
    //     }
    //     console.log('filterElementRef', this.filterElementRef);

    //     // works with the @ViewChild(NgModel)
    //     // this.filterInput.valueChanges.subscribe(() =>
    //     //     this.performFilter(this.listFilter)
    //     // );
    // }

    constructor(private productService: ProductService) {
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                console.log(this.products);
                this.performFilter(this.listFilter);
                console.log('listFilter', this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );


    }

    onValueChange(value: string): void {
        this.performFilter(value);
    }

    // Angular does this for you behind the scenes
    // onFilterChange(filter: string): void {
    //     this.listFilter = filter;
    //     this.performFilter(this.listFilter);
    // }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
        console.log('filteredProducts', this.filteredProducts);
    }
}
