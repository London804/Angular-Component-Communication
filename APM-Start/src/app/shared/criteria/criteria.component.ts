import { Component, ElementRef, EventEmitter, Input, Output, OnInit, OnChanges, ViewChild, AfterViewInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
	// listFilter: string;
	@Input() displayDetail: boolean;
	@Input() hitCount: number;
	@Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

	@ViewChild('filterElement') filterElementRef: ElementRef; // this allows you to use access the DOM HTML properties/methods on the element


	private _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.valueChange.emit(value);
    }
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
    	console.log('changes', changes);

    }

}
