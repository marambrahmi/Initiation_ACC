import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ListSuggestionComponent },
  { path: 'details/:id', component: SuggestionDetailsComponent },
  { path: 'add', component: SuggestionFormComponent },
  { path: 'update/:id', component: SuggestionFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionsRoutingModule { }
