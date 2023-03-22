import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeleportService {
  private ports = new Map<string, ViewContainerRef>();
  private outlets = new BehaviorSubject<string[]>([]);
  private asObservable = this.outlets.asObservable();

  outlet$(name: string) {
    return this.asObservable.pipe(map(_ => this.ports.get(name)));
  }

  newOutlet(name: string, vcr: ViewContainerRef) {
    this.ports.set(name, vcr);
    this.outlets.next([ ...this.outlets.value, name]);
  }
  
  deleteOutlet(name: string) {
    this.ports.delete(name);
    this.outlets.next(this.outlets.value.filter(n => n !== name));
  }

}
