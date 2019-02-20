import { Component, OnInit, Input } from '@angular/core';

import { Address } from '../model';
import { AddressService } from '../address.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-addresses',
  templateUrl: './list-addresses.component.html',
  styleUrls: ['./list-addresses.component.css']
})
export class ListAddressesComponent implements OnInit {

  @Input()
  addresses: Address[] = []


  onNewAddress$:Subscription;

  constructor(private addrSvc: AddressService) { }

  //Subscription is an Observable type which is a utility that asynchronously 
  //or synchronously streams data to a variety of components or services that
  // have subscribed to the observable.
  ngOnInit(){
    this.onNewAddress$ = this.addrSvc.onNewAddress.subscribe(
    (addr: Address) =>{
      //this.addresses= this.addrSvc.getAddresses();
     this.loadAddress();
    }
  )
  this.loadAddress();
}

private loadAddress() {
  this.addrSvc.getAddressWithPromise()
  .then(
    (result: Address[]) => {
      console.info('result: ', result)
    this.addresses = result;
  })//then
  .catch(error => {
    console.error('Error: ',error);
  })
}

  ngOnDestory(){
    this.onNewAddress$.unsubscribe();
  }

}