export class FormsCompromissoViewModel {
    id: string
    assunto: string
    data: string
    horaInicio: string
    horaFinal: string
    contatoId: string
    tipoLocal: string
    link: string
    local: string
    
    constructor(
        id: string,
        assunto: string,
        data: string,
        horaInicio: string,
        horaFinal: string,
        contatoId: string,
        tipoLocal: string,
        link: string,
        local: string
    ){
        this.id = id
        this.assunto = assunto
        this.data = data
        this.horaInicio = horaInicio
        this.horaFinal = horaFinal
        this.contatoId = contatoId
        this.tipoLocal = tipoLocal
        this.link = link
        this.local = local
    }
}