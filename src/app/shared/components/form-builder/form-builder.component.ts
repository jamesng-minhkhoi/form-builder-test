import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class FormBuilderComponent {
  answers: string[] = [];
  questionTypeOptions = [
    { value: 'Checkbox', label: 'Checkbox' },
    { value: 'Paragraph', label: 'Paragraph' },
  ];
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      questionType: ['', [Validators.required, Validators.minLength(3)]],
      question: ['', [Validators.required, Validators.minLength(3)]],
      questionAnswers: this.fb.array([]),
    });
    this.addQuestionAnswer(); // first answer reserved for paragraph type
    this.addQuestionAnswer(); // init answer for checkbox type
  }
  questionTypeValue(): string {
    return this.formGroup.controls['questionType'].value;
  }

  // questionAnswer getter
  get questionAnswers(): FormArray {
    return this.formGroup.controls['questionAnswers'] as FormArray;
  }

  newQuestionAnswer(): FormGroup {
    return this.fb.group({
      answer: '',
    });
  }

  addQuestionAnswer(): void {
    this.questionAnswers.push(this.newQuestionAnswer()); //ultilize questionAnswer getter above - get questionAnswers()
    console.log(this.formGroup.value);
  }

  rmQuestionAnswer(index: number): void {
    this.questionAnswers.removeAt(index); //ultilize questionAnswer getter above - get questionAnswers()
    console.log(this.formGroup.value);
  }

  onSubmit(): void {
    // Submit form data
    // console.log(this.formGroup.value);
  }
}
