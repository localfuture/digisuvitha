import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DigiService {

  constructor(private http: HttpClient) { }

  getTableData() {
    return this.http.get('https://dev.digisuvidhacentre.com/Profile/api/MockUser');
  }
}
