import { Routes } from '@angular/router';
import {HomeComponent} from './core/home/home.component';
import {ListSuggestionComponent} from './core/list-suggestion/list-suggestion.component';
import {NotfoundComponent} from './core/notfound/notfound.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'listSuggestion', component: ListSuggestionComponent },
  { path: '**', component: NotfoundComponent },
  {
    path: 'detail/:id',
    component: SuggestionDetailsComponent
  }
];
