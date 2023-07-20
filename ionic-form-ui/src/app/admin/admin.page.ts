import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

interface Plant {
  common: string;
  botanical: string;
  zone: string;
  light: string;
  price: string;
  availability: string;
  profile: string;
  profilePic?: string;
}
interface Users {

  profilePic?: string;

}


@Component({
  selector: 'app-admin',
  templateUrl: 'admin.page.html',
  styleUrls: ['admin.page.scss'],
})
export class AdminPage {
  common: string;
  botanical: string;
  zone: string;
  light: string;
  price: string;
  availability: string;
  profile:string; 
  users: Users = {};
  plants: Plant[] = []; // Declare and initialize the 'plants' property with an empty array
  xmlDoc: Document | null;
  selectedRow: HTMLTableRowElement | null;

  
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,

    private router: Router,
    private dataService: DataService,

  ) {}

  loadPlantCatalog(): void {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4 && xhttp.status === 200) {
        this.xmlDoc = xhttp.responseXML;
        this.displayPlantCatalog();
      }
    };
    xhttp.open('GET', 'assets/plant_catalog.xml', true);
    xhttp.send();
  }

  displayPlantCatalog(): void {
    this.http.get('assets/users.xml', { responseType: 'text' }).subscribe((xmlData) => {
    const table = document.getElementById('plantTable') as HTMLTableElement;
    const plants = this.xmlDoc?.getElementsByTagName('PLANT');
    

    if (plants) {
      for (let i = 0; i < plants.length; i++) {
        const botanical = plants[i].getElementsByTagName('BOTANICAL')[0]?.childNodes[0]?.nodeValue ?? '';
        const zone = plants[i].getElementsByTagName('ZONE')[0]?.childNodes[0]?.nodeValue ?? '';
        const light = plants[i].getElementsByTagName('LIGHT')[0]?.childNodes[0]?.nodeValue ?? '';
        const price = plants[i].getElementsByTagName('PRICE')[0]?.childNodes[0]?.nodeValue ?? '';
        const availability = plants[i].getElementsByTagName('AVAILABILITY')[0]?.childNodes[0]?.nodeValue ?? '';
        const profilePicNode = plants[i].getElementsByTagName('profilePic')[0]?.textContent;

        
        const row = table.insertRow(table.rows.length);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        let profilePic = profilePicNode || '';
        const fallbackImage = 'assets/userpic.png';
        if (!profilePic) {
          profilePic = fallbackImage;
        }
        cell1.innerHTML = plants[i].getElementsByTagName('COMMON')[0]?.childNodes[0]?.nodeValue ?? '';
        cell2.innerHTML = botanical;
        cell3.innerHTML = zone;
        cell4.innerHTML = light;
        cell5.innerHTML = price;
        cell6.innerHTML = availability;
        
        row.onclick = () => {
          this.displayPlantData(row);
          this.users = {
            profilePic,
          }
        };
        
      }
    }
  });
}

  displayPlantData(row: HTMLTableRowElement): void {
    if (this.selectedRow) {
      this.selectedRow.classList.remove('selected');
    }
    row.classList.add('selected');
    this.selectedRow = row;

    this.common = row.cells[0]?.innerHTML ?? '';
    this.botanical = row.cells[1]?.innerHTML ?? '';
    this.zone = row.cells[2]?.innerHTML ?? '';
    this.light = row.cells[3]?.innerHTML ?? '';
    this.price = row.cells[4]?.innerHTML ?? '';
    this.availability = row.cells[5]?.innerHTML ?? '';
  }

  logout() {
    // Clear user data from local storage or session storage
    localStorage.removeItem('userToken');
  sessionStorage.clear();
  
  // Redirect the user to the login page and replace the current history entry
  this.router.navigate(['/landing'], { replaceUrl: true });
  }

  updatePlantData(): void {
    if (!this.selectedRow) {
      alert('Please select a plant from the table.');
      return;
    }

    this.selectedRow.cells[0].innerHTML = 'Accepted';
    this.selectedRow.cells[1].innerHTML = this.botanical;
    this.selectedRow.cells[2].innerHTML = this.zone;
    this.selectedRow.cells[3].innerHTML = this.light;
    this.selectedRow.cells[4].innerHTML = this.price;
    this.selectedRow.cells[5].innerHTML = this.availability;
  }

  clearForm(): void {
    if (!this.selectedRow) {
      alert('Please select a plant from the table.');
      return;
    }
    this.selectedRow.cells[0].innerHTML = 'Declined';
    this.selectedRow.cells[1].innerHTML = this.botanical;
    this.selectedRow.cells[2].innerHTML = this.zone;
    this.selectedRow.cells[3].innerHTML = this.light;
    this.selectedRow.cells[4].innerHTML = this.price;
    this.selectedRow.cells[5].innerHTML = this.availability;
  }

  ngOnInit() {
    this.loadPlantCatalog();
  }
}