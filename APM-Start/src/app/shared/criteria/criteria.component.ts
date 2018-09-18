import { Component, ElementRef, Input, OnInit, OnChanges, ViewChild, AfterViewInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
	listFilter: string;
	@Input() displayDetail: boolean;
	@Input() hitCount: number;

	@ViewChild('filterElement') filterElementRef: ElementRef; // this allows you to use access the DOM HTML properties/methods on the element

  	constructor() { }

  	ngOnInit() {
  	}

  	ngAfterViewInit(): void {
        // It's good to check for existence before using
        if(this.filterElementRef.nativeElement) {
           this.filterElementRef.nativeElement.focus();
        }
        console.log('filterElementRef', this.filterElementRef);
    }

    ngOnChanges(changes: SimpleChanges): void {
    	// this isn't Firing
    	console.log('changes', changes);

    }

}
