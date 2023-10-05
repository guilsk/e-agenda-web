import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { ContatosService } from '../services/contatos.service'
import { Router } from '@angular/router'
import { FormsContatoViewModel } from '../models/forms-contato.view-model'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-inserir-contato',
  templateUrl: './inserir-contato.component.html',
  styleUrls: ['./inserir-contato.component.css'],
})
export class InserirContatoComponent implements OnInit {
  form!: FormGroup
  contatoVM!: FormsContatoViewModel

      nome = new FormControl('', [Validators.required, Validators.minLength(3)])
      email = new FormControl('',[Validators.required, Validators.email])
      telefone = new FormControl('',[Validators.required, Validators.minLength(3)])
      cargo =  new FormControl('',[Validators.required, Validators.minLength(3)])
      empresa = new FormControl('',[Validators.required, Validators.minLength(3)])

  constructor(private formBuilder: FormBuilder, private contatoService: ContatosService, private router: Router, private toastrService: ToastrService){}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      cargo: this.cargo,
      empresa: this.empresa,
    })
  }

  gravar() {
    if (this.form.invalid) {
   
      Object.keys(this.form.controls).forEach((campo) => {
        this.form.get(campo)?.markAsTouched()
      })
      return 
    }

    this.contatoVM = this.form.value

    this.contatoService.inserir(this.contatoVM).subscribe((res) => {
      console.log(res)
      this.toastrService.warning('Contato Inserido com Sucesso')

      this.router.navigate(['/contatos/listar'])
    })
  }
}