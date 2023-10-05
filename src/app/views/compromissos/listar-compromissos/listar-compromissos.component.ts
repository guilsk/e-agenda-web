import { Component } from '@angular/core';
import { CompromissosService } from '../services/compromisso.service';
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model';

@Component({
  selector: 'app-listar-compromissos',
  templateUrl: './listar-compromissos.component.html',
  styleUrls: ['./listar-compromissos.component.css']
})
export class ListarCompromissosComponent {
  compromissos: ListarCompromissoViewModel[] = [];

  constructor(private compromissosService: CompromissosService) {}

  ngOnInit(): void {
    this.compromissosService.selecionarTodos().subscribe((res) => {
      this.compromissos = res.sort((a, b) => {
        return a.assunto.localeCompare(b.assunto)
      }) 
    })
  }
}
