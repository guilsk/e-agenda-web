import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompromissosService } from '../services/compromisso.service';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view-model';

@Component({
  selector: 'app-inserir-compromisso',
  templateUrl: './inserir-compromisso.component.html',
  styleUrls: ['./inserir-compromisso.component.css']
})
export class InserirCompromissoComponent {
  form!: FormGroup
  compromissoVM!: FormsCompromissoViewModel

  assunto = new FormControl('', [Validators.required, Validators.minLength(3)])
  tipoCompromisso = new FormControl('',[Validators.required])
  link = new FormControl('',[Validators.required, Validators.minLength(3)])
  local =  new FormControl('',[Validators.required, Validators.minLength(3)])
  data = new FormControl('',[Validators.required])
  horaInicio = new FormControl('',[Validators.required])
  horaFinal = new FormControl('',[Validators.required])
  contato = new FormControl('',[Validators.required])

  constructor(private formBuilder: FormBuilder, private compromissoService: CompromissosService, private router: Router, private toastrService: ToastrService){}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
      assunto: this.assunto,
      tipoCompromisso: this.tipoCompromisso,
      link: this.link,
      local: this.local,
      horaInicio: this.horaInicio,
      horaFinal: this.horaFinal,
      contato: this.contato,
    })
  }

  gravar() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((campo) => {
        this.form.get(campo)?.markAsTouched()
      })
      return 
    }

    this.compromissoVM = this.form.value

    this.compromissoService.inserir(this.compromissoVM).subscribe((res) => {
      console.log(res)
      this.toastrService.warning('Compromisso Inserido com Sucesso')

      this.router.navigate(['/compromissos/listar'])
    })
  }
}
