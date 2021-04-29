import axios from "axios";

class Remote {

    public static async getSecciones() {
        const res = await axios.get("https://candidaturas.ine.mx/documentos/json/catalogoEstadosSecciones.json");
        return res.data;
    }

    public static async getDiputados() {
        const res = await axios.get("https://candidaturas.ine.mx/documentos/json/diputadosFederalesRP.json");

        const partidos: any[] =  res.data.actoresPoliticos;

        return res.data.candidatos.map((el: any) => {

            const partido: any = partidos.find(p => el.idAsociacion === p.idAsociacion);

            return {
                candidato: el.nombreCandidato,
                candidatura: el.nombreCorto,
                partido: el.nombreAsociacion,
                distrito: el.nombreDistrito,
                idCandidato: el.idCandidato,
                fotoPartido: "https://candidaturas.ine.mx/img/" + partido.emblema,
                idEstado: el.entidadFederativa
            }
        });
    }


    public static async getDiputadosMR() {
        const res = await axios.get("https://candidaturas.ine.mx/documentos/json/diputadosFederalesMR.json");

        const partidos: any[] =  res.data.actoresPoliticos;

        return res.data.candidatos.map((el: any) => {

            const partido: any = partidos.find(p => el.idAsociacion === p.idAsociacion);

            return {
                candidato: el.nombreCandidato,
                candidatura: el.nombreCorto,
                partido: el.nombreAsociacion,
                distrito: el.nombreEstado + " " + el.nombreDistrito,
                idCandidato: el.idCandidato,
                fotoPartido: "https://candidaturas.ine.mx/img/" + partido.emblema,
                idEstado: el.entidadFederativa,
                nombreEstado: el.nombreEstado,
                idDistrito: el.idDistritoEleccion
            }
        });
    }

    public static async getSenadores() {
        const res = await axios.get("https://candidaturas.ine.mx/documentos/json/senadoresFederalesMR.json");
        const partidos: any[] =  res.data.actoresPoliticos;

        return res.data.candidatos.map((el: any) => {
            const partido: any = partidos.find(p => el.idAsociacion === p.idAsociacion);
            return {
                candidato: el.nombreCandidato,
                candidatura: el.nombreCorto,
                partido: el.nombreAsociacion,
                distrito: el.nombreEstado + " " + el.nombreDistrito,
                idCandidato: el.idCandidato,
                fotoPartido: "https://candidaturas.ine.mx/img/" + partido.emblema,
                idEstado: el.idEstadoEleccion,
                idDistrito: el.distritoEleccion
            }
        });
    }

    public static async getData() {
        const senadores = await this.getSenadores();
        const diputados = await this.getDiputados();
        const a = await this.getDiputadosMR();

        return a.concat(diputados).concat(senadores);
    }

}

export default Remote;