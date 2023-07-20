import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';



@Component({
  selector: 'app-espes',
  templateUrl: './espes.page.html',
  styleUrls: ['./espes.page.scss'],
})
export class EspesPage implements OnInit {
  username: string;
  user: User = {}; // Initialize with an empty object
  safeProfilePicUrl: SafeResourceUrl;
  showFormsDropdown = false;
  isClassDisabled = true;
  name: string;
  email: string;
  phone: string;
  bday: string;
  age: string;
  add: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,

    private router: Router,
    private dataService: DataService,

  ) {}

  submitForm() {
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Phone:', this.phone);
    console.log('add:', this.add);
    console.log('age:', this.age);
    console.log('bday:', this.bday);
    // You can perform further actions with the form data here
  }
  
  toggleClass(event: Event) {
    event.stopPropagation(); // Prevent the event from propagating

    this.isClassDisabled = !this.isClassDisabled;
  }
 
    
  

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.username = params['username'];
      this.dataService.setUsername(this.username);

      const { name, college, year, profilePic } = params;
      this.user = { name, college, year, profilePic };

      if (this.username) {
        this.displayUserInfo();
      }
    });
  }

  file() {
    this.router.navigate(['/espes'], { queryParams: { username: this.username } });
  }

  toggleFormsDropdown() {
    this.showFormsDropdown = !this.showFormsDropdown;
  }
 
  logout() {
    // Clear user data from local storage or session storage
    localStorage.removeItem('userToken');
  sessionStorage.clear();

  // Reset any user-related variables to their default values
  this.username = '';

  // Redirect the user to the login page and replace the current history entry
  this.router.navigate(['/landing'], { replaceUrl: true });
  }

  displayUserInfo() {
   
    this.http.get('assets/users.xml', { responseType: 'text' }).subscribe((xmlData) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, 'application/xml');

      const users = xmlDoc.getElementsByTagName('user');

      for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        const currentUsername = currentUser.getElementsByTagName('username')[0]?.textContent;

        if (currentUsername === this.username) {
          const nameNode = currentUser.getElementsByTagName('name')[0]?.textContent;
          const collegeNode = currentUser.getElementsByTagName('college')[0]?.textContent;
          const yearNode = currentUser.getElementsByTagName('year')[0]?.textContent;
          const profilePicNode = currentUser.getElementsByTagName('profilePic')[0]?.textContent;

          const name = nameNode || '';
          const college = collegeNode || '';
          const year = yearNode || '';
          const profilePic = profilePicNode || '';

          this.user = {
            name,
            college,
            year,
            profilePic,
          };
          break;
        }
      }
    });
  }
}

interface User {
  name?: string;
  college?: string;
  year?: string;
  profilePic?: string;
}
