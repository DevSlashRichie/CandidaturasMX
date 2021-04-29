import React from "react";
// @ts-ignore
import Select from 'react-select';
import Remote from "../logic/Remote";

class ViewerHeader extends React.Component<any, any> {

    constructor(props: { onChange: void }) {
        super(props);
        this.state = {
            estados: [],
            pickedState: -1
        };
    }

    componentDidMount() {
        Remote.getSecciones().then(data => {
            this.setState({
                estados: data.estados
            })
        });
    }

    estados = () => {
        return this.state.estados.map((el: any) => {
            return {
                value: el.idEstado,
                label: el.nombreEstado
            }
        });
    };

    handleChange = (el: any) => {
        this.props.onChange(el);
    }

    handleDistrictChange = (id: any) => {
        this.props.onChangeDistrict(id.target.value);
    }

    render() {
        return (
            <header>
                <div className="viewer-header">
                    <div className="title">
                        <h3>Selecciona tu Estado y Debajo escribe tu sección</h3>
                    </div>
                    <div className="fields">
                        <Select
                            options={this.estados()}
                            onChange={this.handleChange}
                        />
                        <input type="number" onChange={this.handleDistrictChange} placeholder="Tu sección" />
                    </div>
                </div>
            </header>
        )
    }
}

export default ViewerHeader;
