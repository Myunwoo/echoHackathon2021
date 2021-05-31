import React from "react";
import "./../css/EnergyShow_component.css";
import Proptypes from "prop-types";

const GAS_FOR_SEC = 0.45;

class GasShow_component extends React.Component{
    constructor(props){
        super(props);
        this.state={
            components:props.components,
            totalGas:0,
            gasPerSec:0
        }
    }

    updateGasText = () => {
        const gps = this.calcGps();
        const currentGas = this.state.totalGas;
        const showGas = (Number(gps) + Number(currentGas)).toFixed(3);

        this.setState({totalGas: String(showGas)});
    }

    componentDidMount(){
        setInterval(this.updateGasText,1000);
    }

    calcGps = () => {
        const {components} = this.state;
        let gps = 0;
        {components.map(component => (
            component.always_mode ?
            gps += parseInt(component.power_consumption) :
            gps += 0
        ))}
        return gps * GAS_FOR_SEC;
    }

    render(){        
        const {totalGas} = this.state;
        return(
            <div className="energy__component">
                <span className="energy__component--title">누적 온실가스 발생량</span>
                <span className="energy__component--subtitle">{totalGas+"kgCO2"}</span>
            </div>
        );
    }
}

GasShow_component.propTypes ={
    components:Proptypes.array.isRequired
}

export default GasShow_component;