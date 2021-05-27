import React from "react";
import "./../css/EnergyShow_component.css";
import Proptypes from "prop-types";

class EnergyShow_component extends React.Component{
    //소유 컴포넌트, 초당 사용전력 초기화
    constructor(props){
        super(props);
        this.state={
            components:props.components,
            totalEnergy:0,
            energyPerSec:0
        }
    }

    calcEps = () => {
        const {components} = this.state;
        let eps = 0;
        {components.map(component => (
            component.always_mode ?
            eps += parseInt(component.power_consumption) :
            eps += 0
        ))}
        return eps;
    }

    //1초에 한 번 에너지를 계산.
    updateEnergyText = () => {
        const eps = this.calcEps();
        const currentEnergy = this.state.totalEnergy;
        const showEnergy = (Number(eps) + Number(currentEnergy)).toFixed(2);
        this.setState({totalEnergy: showEnergy});
    }

    componentDidMount(){
        setInterval(this.updateEnergyText,1000);
    }

    render(){
        const {totalEnergy} = this.state;
        return(
            <div className="energy__component">
                <span className="energy__component--title">총 전력 소모량</span>
                <span className="energy__component--subtitle">{totalEnergy+"kWh"}</span>
            </div>
        );
    }
}

EnergyShow_component.propTypes ={
    components:Proptypes.array.isRequired
}

export default EnergyShow_component;