import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionFormComponent } from '../suggestion-form/suggestion-form.component';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  searchText: string = '';

  suggestions: Suggestion[] = [];

  favorites: Suggestion[] = [];

  ngOnInit(): void {
    // Charger les suggestions depuis le composant de formulaire
    this.suggestions = [...SuggestionFormComponent.suggestions];
  }

  get filteredSuggestions(): Suggestion[] {
    const search = this.searchText.toLowerCase();
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(search) ||
      s.category.toLowerCase().includes(search)
    );
  }

  like(suggestion: Suggestion): void {
    suggestion.nbLikes++;
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(f => f.id === suggestion.id)) {
      this.favorites.push(suggestion);
    }
  }
}
