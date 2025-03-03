import { Injectable } from '@angular/core';
import { throwError as observableThrowError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainMenuService {

  constructor(private http: HttpClient) {}

	public getData() {
		const URL: string = 'assets/data/main-menu.json';
		return this.http.get(URL);
	}

  public handleError(error: any) {
    return observableThrowError(error.error || 'Server Error');
  }
}
