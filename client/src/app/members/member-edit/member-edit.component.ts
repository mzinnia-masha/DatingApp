import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

@ViewChild('editform') editform:NgForm;
member:Member;
user:User;
@HostListener('window:beforeunload',['$event']) unloadNotification($event: any)
{
if(this.editform.dirty)
{
$event.returnValue=true;
}
}

  constructor(private accountService:AccountService,private memberService:MembersService,private toasterService:ToastrService) 
  
  {

this.accountService.currentUser$.pipe(take(1)).subscribe(user=>this.user=user);

   }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember()
  {
  this.memberService.getMember(this.user.userName).subscribe(
  member=>{this.member=member;})
}


  updateMember()
  {

      this.memberService.updateMember(this.member).subscribe(() => {
      this.toasterService.success('Updated Successfully');
      this.editform.reset(this.member);

  })
   
  
  
 
}








}
