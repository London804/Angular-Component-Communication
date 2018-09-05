import { Component, OnInit, ViewChild, AfterViewInit, ElementRef} from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

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

    @ViewChild('filterElement') filterElementRef:ElementRef; // this allows you to use access the DOM HTML properties/methods on the element

    ngAfterViewInit(): void {
        // It's good to check for existence before using 
        if(this.filterElementRef.nativeElement) {
           this.filterElementRef.nativeElement.focus();
        }    
        console.log('filterElementRef', this.filterElementRef);
    }
    // the getter setter method allows you to filter the products 
    private _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.performFilter(this.listFilter);
    }

    constructor(private productService: ProductService) { 
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
                console.log('listFilter', this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
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
    }
}
