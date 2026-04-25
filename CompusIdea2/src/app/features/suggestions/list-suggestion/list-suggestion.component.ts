import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-list-suggestion',
  templateUrl: './list-suggestion.component.html',
  styleUrls: ['./list-suggestion.component.css']
})
export class ListSuggestionComponent implements OnInit {
  searchText: string = '';
  suggestions: Suggestion[] = [];
  favorites: Suggestion[] = [];

  constructor(
    private suggestionService: SuggestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions(): void {
    this.suggestionService.getSuggestionsList().subscribe({
      next: (data) => {
        this.suggestions = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des suggestions:', err);
      }
    });
  }

  get filteredSuggestions(): Suggestion[] {
    const search = this.searchText.toLowerCase();
    return this.suggestions.filter(s =>
      s.title.toLowerCase().includes(search) ||
      s.category.toLowerCase().includes(search)
    );
  }

  like(suggestion: Suggestion): void {
    const newNbLikes = suggestion.nbLikes + 1;
    this.suggestionService.updateNbLikes(suggestion.id!, newNbLikes).subscribe({
      next: (updated) => {
        suggestion.nbLikes = updated.nbLikes;
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour des likes:', err);
      }
    });
  }

  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(f => f.id === suggestion.id)) {
      this.favorites.push(suggestion);
    }
  }

  deleteSuggestion(suggestion: Suggestion): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette suggestion?')) {
      this.suggestionService.deleteSuggestion(suggestion.id!).subscribe({
        next: () => {
          this.loadSuggestions();
          this.router.navigate(['/suggestions/list']);
        },
        error: (err) => {
          console.error('Erreur lors de la suppression:', err);
        }
      });
    }
  }
}
