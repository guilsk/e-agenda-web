import { Component } from '@angular/core';
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso.view-model';
import { CompromissosService } from '../services/compromisso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-excluir-compromisso',
  templateUrl: './excluir-compromisso.component.html',
  styleUrls: ['./excluir-compromisso.component.css']
})
export class ExcluirCompromissoComponent {
  compromissoVM: VisualizarCompromissoViewModel;
  idSelecionado: string | null = null;

  constructor(
    private compromissoService: CompromissosService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.compromissoVM = new VisualizarCompromissoViewModel('', '', '', '', '', '', '', '');
  }

  ngOnInit(): void {
    this.idSelecionado = this.route.snapshot.paramMap.get('id');

    if (!this.idSelecionado) return;

    this.compromissoService
      .selecionarCompromissoCompletoPorId(this.idSelecionado)
      .subscribe((res) => {
        this.compromissoVM = res;
      });
  }

  gravar() {
    this.compromissoService.excluir(this.idSelecionado!).subscribe((res) => {
      this.router.navigate(['/compromissos', 'listar']);
    });

    this.toastService.warning('Nenhum campo foi modificado.')
  }
}
