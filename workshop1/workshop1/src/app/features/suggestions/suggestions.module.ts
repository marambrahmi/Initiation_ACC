import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SuggestionsRoutingModule } from './suggestions-routing.module';
import { FormsModule } from '@angular/forms';
import { SuggestionDetailsComponent } from './suggestion-details/suggestion-details.component';
import { ListSuggestionComponent } from './list-suggestion/list-suggestion.component';
import { SuggestionsComponent } from './suggestions.component';


@NgModule({
  declarations: [
     SuggestionsComponent,
    SuggestionDetailsComponent,
    ListSuggestionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
     RouterModule,
    SuggestionsRoutingModule
  ]
})
export class SuggestionsModule { }
