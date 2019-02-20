import { Injectable, EventEmitter } from "@angular/core";

import Dexie from 'dexie';

import { Address } from './model';


@Injectable()
export class AddressService{
    private addresses: Address[] = [];

onNewAddress = new EventEmitter<Address>();

contactDB: Dexie;

    constructor() {
        this.contactDB= new Dexie('contact');
        this.contactDB.version(1).stores({
            address:'phone,name,email'
        })
    }

    addAddressWithPromise(addr: Address): Promise<any>{
        //return (this.contactDB.table('address').put(addr));
        return (
            this.contactDB.table('address').put(addr)
            .then((result)=> {
                this.onNewAddress.next(addr);
                return (result);
            })
        )
        
    }

    getAddressWithPromise(): Promise<Address[]>{
        return(this.contactDB.table('address').toArray());
    }

    getAddresses(): Address[]{
        //you may want to clone the address and not return the actual object
        return(this.addresses)
    }

    addAddress(addr: Address){
        console.log('AddressService: ', addr);
        this.addresses.push(addr);
        this.onNewAddress.next(addr);
    }
}