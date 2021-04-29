import React from "react";
import Remote from "../logic/Remote";

class ViewerBody extends React.Component<any, any> {

    constructor(props: { estado: number, seccion: number }) {
        super(props);

        this.state = {
            senadores: [],
            estados: {
                estados: [],
                secciones: []
            }
        }
    }

    componentDidMount() {
        Remote.getData().then(data => {
            this.setState({
                senadores: data
            });
        });

        Remote.getSecciones().then(data => {
            this.setState({
                estados: data
            })
        })
    }

    buildCells = () => {

        let estado = this.state.estados.estados.find(es => {
            if (!this.props.estado)
                return undefined;
            return this.props.estado.value === es.idEstado || (es.idEstado === this.props.estado.label);
        });

        let seccion = this.state.estados.secciones.find(sec => {
            if(!estado) return undefined;

            const needSec = Number(this.props.seccion);
            if (sec.idEstado === estado.idEstado && sec.seccion === needSec) {
                return sec;
            }


            return undefined;
        });

        const selected = this.state.senadores.filter(el => {
            if (!this.props.estado)
                return undefined;

            if(!!seccion) {
                const distritoEval = el.idDistrito === seccion.idDistritoFederal || !el.idDistrito;
                const estadoEval = el.nombreEstado === estado.nombreEstado || el.idEstado === estado.idEstado;

                return distritoEval && estadoEval;
            } else if(!this.props.seccion){
                return el.nombreEstado === estado.nombreEstado;
            }

            return undefined;
        }) || [];

        return selected.map(el => {
            return (
                <div className="cell" key={el.idCandidato}>
                    <div className="partido">
                        <div className="image">
                            <img src={el.fotoPartido}
                                 alt="PAN"/>
                        </div>
                    </div>
                    <div className="candidato">
                        <div className="distrito">
                            {el.distrito}
                        </div>
                        <div className="image">
                            <img src={"https://candidaturas.ine.mx/img/fotocandidato/" + el.idCandidato + ".jpg"}
                                 alt=""/>
                        </div>
                        <div className="name" style={{
                            borderRight: "1px solid black",
                            paddingRight: "2px"
                        }}>
                            {el.candidato}
                        </div>
                        <div className="candidatura">
                            {el.candidatura}
                        </div>
                    </div>
                </div>
            )
        });
    };

    render() {
        return (
            <div className="viewer-body">
                <div className="viewer-body-header">
                    <div className="cells">
                        <div className="cell">
                            <div className="partido">
                                <div className="image">
                                    <span>PARTIDO</span>
                                </div>
                            </div>
                            <div className="candidato">
                                <div className="distrito">
                                    DISTRITO
                                </div>
                                <div className="image">
                                    FOTO
                                </div>
                                <div className="name">
                                    ASPIRANTE
                                </div>
                                <div className="candidatura">
                                    CANDIDATURA
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="cells">
                    {this.buildCells()}
                </div>
            </div>
        );
    }
}

export default ViewerBody;