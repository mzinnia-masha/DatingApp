import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseURL=environment.apiUrl;
  members:Member[]=[];

  constructor(private http:HttpClient) { }

    getMembers()
    {
      if(this.members.length>0)return of(this.members);
      return this.http.get<Member[]>(this.baseURL+'users').pipe(
        map(members=>
        {
          this.members=members;
        return members;})
      )
    }
    getMember(userName:string)
    {
      const member=this.members.find(x=>x.userName===userName);
      if(member!==undefined) return of(member);
      return this.http.get<Member>(this.baseURL+'users/'+userName);
    }

    updateMember(member:Member)
    {
      return this.http.put<Member>(this.baseURL+'users',member).pipe
         
      (
        map(()=>{

const index=this.members.indexOf(member);
this.members[index]=member;



        })




      )
    }





}

