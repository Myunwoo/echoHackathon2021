import React from "react";
import "./../css/EnergyShow_component.css";
import Proptypes from "prop-types";

const MONEY_FOR_SEC = 100;

class MoneyShow_component extends React.Component{
    //소유 컴포넌트, 초당 사용전력 초기화
    constructor(props){
        super(props);
        this.state={
            components:props.components,
            totalMoney:0,
            moneyPerSec:0
        }
    }

    calcMps = () => {
        const {components} = this.state;
        let mps = 0;
        {components.map(component => (
            component.always_mode ?
            mps += parseInt(component.power_consumption) :
            mps += 0
        ))}
        return mps * MONEY_FOR_SEC;
    }

    //1초에 한 번 에너지를 계산.
    updateMoneyText = () => {
        const mps = this.calcMps();
        const currentMoney = this.state.totalMoney;
        this.setState({totalMoney: currentMoney+mps});
    }

    componentDidMount(){
        setInterval(this.updateMoneyText,1000);
    }

    render(){        
        const {totalMoney} = this.state;
        return(
            <div className="energy__component">
                <span className="energy__component--title">총 비용</span>
                <span className="energy__component--subtitle">{totalMoney+"원"}</span>
            </div>
        );
    }
}

MoneyShow_component.propTypes ={
    components:Proptypes.array.isRequired
}

export default MoneyShow_component;