import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionsComponent } from './suggestions.component';
import { SuggestionFormComponent } from './suggestion-form/suggestion-form.component';


@NgModule({
  declarations: [
     SuggestionsComponent,
    SuggestionDetailsComponent,
    ListSuggestionComponent,
    SuggestionFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
     RouterModule,
    SuggestionsRoutingModule
  ]
})
export class SuggestionsModule { }
