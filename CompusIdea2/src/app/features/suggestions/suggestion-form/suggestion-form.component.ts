import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  templateUrl: './suggestion-form.component.html',
  styleUrls: ['./suggestion-form.component.css']
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  isEditMode: boolean = false;
  suggestionId: number | null = null;
  
  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required, 
        Validators.minLength(5),
        Validators.pattern(/^[A-Z][a-zA-Z\s]*$/)
      ]],
      description: ['', [
        Validators.required, 
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      status: [{ value: 'en_attente', disabled: true }]
    });

    // Vérifier si on est en mode modification
    this.suggestionId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.suggestionId && !isNaN(this.suggestionId)) {
      this.isEditMode = true;
      this.loadSuggestion();
    }
  }

  loadSuggestion(): void {
    if (this.suggestionId) {
      this.suggestionService.getSuggestionById(this.suggestionId).subscribe({
        next: (data) => {
          this.suggestionForm.patchValue({
            title: data.title,
            description: data.description,
            category: data.category,
            date: new Date(data.date).toISOString().split('T')[0],
            status: data.status
          });
        },
        error: (err) => {
          console.error('Erreur lors du chargement de la suggestion:', err);
        }
      });
    }
  }

  get title() {
    return this.suggestionForm.get('title');
  }

  get description() {
    return this.suggestionForm.get('description');
  }

  get category() {
    return this.suggestionForm.get('category');
  }

  onSubmit(): void {
    if (this.suggestionForm.valid) {
      const formValue = this.suggestionForm.getRawValue();
      
      if (this.isEditMode && this.suggestionId) {
        // Mode modification
        const updatedSuggestion: Suggestion = {
          id: this.suggestionId,
          title: formValue.title,
          description: formValue.description,
          category: formValue.category,
          date: new Date(formValue.date),
          status: formValue.status,
          nbLikes: 0
        };

        this.suggestionService.updateSuggestion(this.suggestionId, updatedSuggestion).subscribe({
          next: () => {
            this.router.navigate(['/suggestions/list']);
          },
          error: (err) => {
            console.error('Erreur lors de la mise à jour:', err);
          }
        });
      } else {
        // Mode ajout
        const newSuggestion: Suggestion = {
          title: formValue.title,
          description: formValue.description,
          category: formValue.category,
          date: new Date(),
          status: 'en_attente',
          nbLikes: 0
        };

        this.suggestionService.addSuggestion(newSuggestion).subscribe({
          next: () => {
            this.router.navigate(['/suggestions/list']);
          },
          error: (err) => {
            console.error('Erreur lors de l\'ajout:', err);
          }
        });
      }
    }
  }
}
