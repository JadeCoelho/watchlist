import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Item } from '../item';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../item.service';
import { MsgService } from '../msg/msg.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css'],
})
export class ModalFormComponent {
  form!: FormGroup;
  item!: Item;
  id = this.route.snapshot.paramMap.get('id');
  hidden: boolean = false

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private itemsService: ItemService,
    private msgService: MsgService
  ) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, this.noWhitespaceValidator]],
      category: [null, [Validators.required]],
      status: [null, [Validators.required]],
      review: null,
    });
    if (this.id) {
      this.itemsService.readItemById(this.id).subscribe((i) => {
        this.form = this.formBuilder.group({
          name: [i.name, [Validators.required, this.noWhitespaceValidator]],
          category: [i.category, [Validators.required]],
          status: [i.status, [Validators.required]],
          review: i.review,
        });
      });
    }
  }

  cancel(): void {
    this.router.navigate(['']);
  }

  save(form: FormGroup): void {
    let newItem = form.value;

    this.item = {
      name: newItem.name,
      category: newItem.category,
      status: newItem.status,
      review: newItem.review,
      id: Number(this.id),
    };

    if (this.id) {
      this.itemsService.updateItem(this.item).subscribe({
        next: () =>
          this.msgService.setMsg('Item editado com sucesso!', 'var(--success)'),
        error: () =>
          this.msgService.setMsg('Erro ao editar item', 'var(--error)'),
        complete: () => this.cancel(),
      });
    } else {
      this.itemsService.createItem(this.item).subscribe({
        next: () =>
          this.msgService.setMsg('Item criado com sucesso!', 'var(--success)'),
        error: () =>
          this.msgService.setMsg('Erro ao criar item', 'var(--error)'),
        complete: () => this.cancel(),
      });
    }

    this.hidden = true
    console.log(this.item);

  }

  noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { whitespace: true };
  }
}
