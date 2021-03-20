import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DigiService {

  constructor(private http: HttpClient) { }

  createMockUser(data: any) {
    return this.http.post('https://dev.digisuvidhacentre.com/Profile/api/MockUser', data);
  }

  displayAllMockUser() {
    return this.http.get('https://dev.digisuvidhacentre.com/Profile/api/MockUser');
  }

  displaySingleMockUser(userId: any) {
    return this.http.get('https://dev.digisuvidhacentre.com/Profile/api/MockUser/'+ userId);
  }

  deleteMockUser(userId: any) {
    return this.http.delete('https://dev.digisuvidhacentre.com/Profile/api/MockUser/Delete/'+ userId);
  }
}
