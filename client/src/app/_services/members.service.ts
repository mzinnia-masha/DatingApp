import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseURL=environment.apiUrl;

  constructor(private http:HttpClient) { }

    getMembers()
    {
      return this.http.get<Member[]>(this.baseURL+'users');
    }
    getMember(userName:string)
    {
      return this.http.get<Member>(this.baseURL+'users/'+userName);
    }





}

