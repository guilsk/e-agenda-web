import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map, tap } from 'rxjs'
import { environment } from 'src/environments/environment'
import { ListarCompromissoViewModel } from '../models/listar-compromisso.view-model'
import { FormsCompromissoViewModel } from '../models/forms-compromisso.view-model'
import { VisualizarCompromissoViewModel } from '../models/visualizar-compromisso.view-model'


@Injectable()
export class CompromissosService {
  private endpoint: string =
    'https://e-agenda-web-api.onrender.com/api/Compromissos/'

  constructor(private http: HttpClient) {}

  public inserir(Compromisso: FormsCompromissoViewModel): Observable<FormsCompromissoViewModel> {
    return this.http.post<any>(
      this.endpoint,
      Compromisso,
      this.obterHeadersAutorizacao()
    )
  }

  public editar(id: string, Compromisso: FormsCompromissoViewModel) {
    return this.http
      .put<any>(this.endpoint + id, Compromisso, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados))
  }

  public excluir(id: string): Observable<any> {
    return this.http.delete(this.endpoint + id, this.obterHeadersAutorizacao())
  }

  public selecionarTodos(): Observable<ListarCompromissoViewModel[]> {
    return this.http
      .get<any>(this.endpoint, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados))
  }

  public selecionarPorId(id: string): Observable<FormsCompromissoViewModel> {
    return this.http
      .get<any>(this.endpoint + id, this.obterHeadersAutorizacao())
      .pipe(map((res) => res.dados))
  }

  public selecionarCompromissoCompletoPorId(id: string): Observable<VisualizarCompromissoViewModel> {
    return this.http
      .get<any>(
        this.endpoint + 'visualizacao-completa/' + id,
        this.obterHeadersAutorizacao()
      ).pipe(map((res) => res.dados))
  }

  private obterHeadersAutorizacao() {
    const token = environment.apiKey

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    }
  }
}