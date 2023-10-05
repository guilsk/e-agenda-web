import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCompromissosComponent } from './listar-compromissos/listar-compromissos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { EditarCompromissoComponent } from './editar-compromisso/editar-compromisso.component';
import { ExcluirCompromissoComponent } from './excluir-compromisso/excluir-compromisso.component';
import { InserirCompromissoComponent } from './inserir-compromisso/inserir-compromisso.component';
import { CompromissosService } from './services/compromisso.service';
import { InputFormComponent } from 'src/app/core/input-form/input-form.component';

@NgModule({
  declarations: [ListarCompromissosComponent, EditarCompromissoComponent, ExcluirCompromissoComponent, InserirCompromissoComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NgxMaskDirective],
  providers: [CompromissosService, provideNgxMask()]
})
export class CompromissosModule { }
