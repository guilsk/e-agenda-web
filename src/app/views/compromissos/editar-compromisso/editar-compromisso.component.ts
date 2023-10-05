import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view-model';
import { CompromissosService } from '../services/compromisso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-compromisso',
  templateUrl: './editar-compromisso.component.html',
  styleUrls: ['./editar-compromisso.component.css']
})
export class EditarCompromissoComponent {
  form!: FormGroup
  compromissoVM!: FormsCompromissoViewModel
  idSelecionado: string | null = null
  camposModificados = false
  
  assunto = new FormControl('', [Validators.required, Validators.minLength(3)])
  tipoCompromisso = new FormControl('',[Validators.required])
  link = new FormControl('',[Validators.required, Validators.minLength(3)])
  local =  new FormControl('',[Validators.required, Validators.minLength(3)])
  data = new FormControl('',[Validators.required])
  horaInicio = new FormControl('',[Validators.required])
  horaFinal = new FormControl('',[Validators.required])
  contato = new FormControl('',[Validators.required])

  constructor(private formBuilder: FormBuilder, private compromissoService: CompromissosService, private router: Router, private route: ActivatedRoute, private toastService: ToastrService){}

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
    
    this.idSelecionado = this.route.snapshot.paramMap.get('id')

    if(!this.idSelecionado) return

    this.compromissoService.selecionarPorId(this.idSelecionado).subscribe((res)=>{
      this.form.patchValue(res)
    })

    this.camposModificados = false
   
  }

  gravar() {
    const campoModificado = Object.keys(this.form.controls).some((control) =>
      this.form.get(control)?.dirty
    )
  
    if (!campoModificado) {
      this.toastService.warning('Nenhum campo foi modificado.')
      console.log('Nenhum campo foi modificado.')
      this.camposModificados = true
      return
    }
  
    if (this.form.invalid) {
      console.log('Formulário inválido.')
      return
    }
  
    this.compromissoVM = this.form.value
  
    this.compromissoService.editar(this.idSelecionado!, this.compromissoVM).subscribe((res) => {
      console.log(res)
      this.router.navigate(['/compromissos/listar'])
    })
  }
}
