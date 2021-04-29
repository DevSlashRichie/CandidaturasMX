import React from "react";
import ViewerHeader from "./ViewerHeader";
import ViewerBody from "./ViewerBody";

class Viewer extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = {
            selectedState: undefined,
            selectedDistirct: undefined
        };
    }

    changeEstado = (id) => {
        this.setState({
            selectedState: id
        });
    }

    changeDistrict = (id: number) => {
        this.setState({
            selectedDistrict: id
        })
    };

    render() {
        return (
            <div>
                <ViewerHeader onChange={this.changeEstado} onChangeDistrict={this.changeDistrict} />
                <ViewerBody estado={this.state.selectedState} seccion={this.state.selectedDistrict} />
            </div>
        )
    }
}

export default Viewer;