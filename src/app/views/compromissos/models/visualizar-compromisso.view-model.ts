export class VisualizarCompromissoViewModel {
    id: string;
    assunto: string;
    tipoCompromisso: string;
    link: string;
    local: string;
    horaInicio: string;
    horaFinal: string;
    contato: string;

    constructor(
        id: string,
        assunto: string,
        tipoCompromisso: string,
        link: string,
        local: string,
        horaInicio: string,
        horaFinal: string,
        contato: string,
    ) {
        this.id = id
        this.assunto = assunto
        this.tipoCompromisso = tipoCompromisso
        this.link = link
        this.local = local
        this.horaInicio = horaInicio
        this.horaFinal = horaFinal
        this.contato = contato
    }
}
