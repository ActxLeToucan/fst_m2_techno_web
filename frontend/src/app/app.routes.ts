import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListTruckComponent } from './components/list-truck/list-truck.component';
import { AddTruckComponent } from './components/add-truck/add-truck.component';
import { MainComponent } from './components/main/main.component';

export const routes: Routes = [
    { path: '', redirectTo: 'application/lister-camions', pathMatch: 'full' },
    {
        path: 'application',
        component: MainComponent, 
        children: [
            { path: '', component: NavbarComponent }, 
            { path: 'lister-camions', component: ListTruckComponent },
            { path: 'ajouter-camion', component: AddTruckComponent }
        ]
    }
];
