import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';
import { Item } from '../item';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  items: Item[] = [];
  constructor(private itemService: ItemService, private router: Router) {}

  ngOnInit(): void {
    this.itemService.readItems().subscribe((items) => {
      this.items = items;
    });
  }

  edit(id: any) {
    this.router.navigate([`form/${id}`]);
  }
  remove(id: any) {
    this.itemService.readItemById(id).subscribe((i) => {
      if (confirm(`Tem certeza que deseja excluir ${i.name}?`)) {
        this.itemService.deleteItemById(id).subscribe({
          next: () => console.log('excluiu'),
          error: () => console.log('erro'),
          complete: () => location.reload(),
        });
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
