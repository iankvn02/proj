import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-adminlog',
  templateUrl: 'adminlog.page.html',
  styleUrls: ['adminlog.page.scss'],
})
export class AdminlogPage {
  username: string;
  password: string;
  loginFailed: boolean = false;

  constructor(private navCtrl: NavController,private router: Router, private http: HttpClient) {}

 

  validateForm(): boolean {
    
    this.http.get('assets/adminuser.xml', { responseType: 'text' }).subscribe(
      (xmlData) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlData, 'text/xml');

        // Extract user data from the XML
        const users = xmlDoc.getElementsByTagName('user');
        let authenticated = false;

        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          const xmlUsername = user.getElementsByTagName('username')[0]?.textContent;
          const xmlPassword = user.getElementsByTagName('password')[0]?.textContent;

          if (this.username === xmlUsername && this.password === xmlPassword) {
            authenticated = true;
            break;
          }
        }

        if (authenticated) {
          // Login successful
          this.router.navigate(['/admin'], { queryParams: { username: this.username} });
          this.username = '';
          this.password = '';
        }  else {
          // Login failed
          this.loginFailed = true;
          console.log('Invalid username or password');
        }
      },
      (error) => {
        // Handle error
        console.log('Error: ', error);
      }
    );
    return true;
  }

}