import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IconDirective } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { IconSetService } from '@coreui/icons-angular';
@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  standalone: true,
  imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  title = 'Compilart DashBoard';

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService:IconSetService
    
  ) {
    this.titleService.setTitle(this.title);
    this.iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
