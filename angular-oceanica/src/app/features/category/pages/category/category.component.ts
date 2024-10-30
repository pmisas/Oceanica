import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryName!: string; 

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log("holiiiiii")
    // Captura el parámetro de la ruta
    this.route.paramMap.subscribe(params => {
      this.categoryName = params.get('category') || ''; 
    });
  }
}
