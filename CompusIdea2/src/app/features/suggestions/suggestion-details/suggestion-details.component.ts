import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion: Suggestion | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.suggestionService.getSuggestionById(id).subscribe({
      next: (data) => {
        this.suggestion = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de la suggestion:', err);
        this.suggestion = undefined;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/suggestions/list']);
  }

  updateSuggestion(): void {
    if (this.suggestion) {
      this.router.navigate(['/suggestions/update', this.suggestion.id]);
    }
  }
}



