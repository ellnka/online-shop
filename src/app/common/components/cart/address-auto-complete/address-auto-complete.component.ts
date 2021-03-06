import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AddressComponent } from 'ngx-google-places-autocomplete/objects/addressComponent';


@Component({
  selector: 'app-address-auto-complete',
  templateUrl: './address-auto-complete.component.html',
  styleUrls: ['./address-auto-complete.component.sass']
})
export class AddressAutoCompleteComponent {
    @ViewChild('places') places: GooglePlaceDirective | null = null;
    @Input()  address!: string;
    @Output() addressChange = new EventEmitter<string>();

    public onChange(address: Address) {
        if(address.photos && address.photos.length > 0){
            console.dir(address.photos[0].getUrl({maxHeight:500, maxWidth:500}));
        }
        this.addressChange.emit(this.places?.place?.formatted_address || "");
    }

    public getComponentByType(address: Address, type: string): AddressComponent | null {
        if(!type)
            return null;

        if (!address || !address.address_components || address.address_components.length == 0)
            return null;

        type = type.toLowerCase();

        for (let comp of address.address_components) {
            if(!comp.types || comp.types.length == 0)
                continue;

            if(comp.types.findIndex(x => x.toLowerCase() == type) > -1)
                return comp;
        }

        return null;
    }

}
