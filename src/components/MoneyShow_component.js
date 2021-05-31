import React from "react";
import "./../css/EnergyShow_component.css";
import Proptypes from "prop-types";

let sumOfMoney = 0;
let sumOfEnergy = 0;
let baseTax = 0;

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

    calcEps = () => {
        const {components} = this.state;
        let eps = 0;
        {components.map(component => (
            component.always_mode ?
            eps += parseInt(component.power_consumption) :
            eps += 0
        ))}
        sumOfEnergy += eps;
        return eps;
    }

    calcTaxOnSummer = (eps) => {
        if(sumOfEnergy <= 300){
            baseTax = 910;
            return eps * 93.3;
        }else if(sumOfEnergy > 300 && sumOfEnergy <= 450){
            baseTax = 1600;
            return eps * 187.9;
        }else{
            baseTax = 7300;
            return eps * 280.6;
        }
    }

    calcTaxOffSummer = (eps) => {
        if(sumOfEnergy <= 200){
            baseTax = 910;
            return eps * 93.3;
        }else if(sumOfEnergy > 200 && sumOfEnergy <= 400){
            baseTax = 1600;
            return eps * 187.9;
        }else{
            baseTax = 7300;
            return eps * 280.6;
        }
    }

    calcTax = (eps) => {
        const now = new Date();
        const month = now.getMonth + 1;
        let tax = 0;
        //하계 계산
        if(month === 7 || month === 8){
            tax = this.calcTaxOnSummer(eps);
        }
        //이외 계절 계산
        else{
            tax = this.calcTaxOffSummer(eps);
        }
        
        return tax;
    }

    //1초에 한 번 에너지를 계산.
    updateMoneyText = () => {
        const eps = this.calcEps();
        const tax = this.calcTax(eps);

        //누적된 전기세
        sumOfMoney += tax;

        const showTax = (sumOfMoney + baseTax).toFixed(2);

        this.setState({totalMoney: showTax});
    }

    componentDidMount(){
        setInterval(this.updateMoneyText,1000);
    }

    render(){        
        const {totalMoney} = this.state;
        return(
            <div className="energy__component">
                <span className="energy__component--title">누적 전기세</span>
                <span className="energy__component--subtitle">{totalMoney+"원"}</span>
            </div>
        );
    }
}

MoneyShow_component.propTypes ={
    components:Proptypes.array.isRequired
}

export default MoneyShow_component;