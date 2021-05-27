import React from "react";
import Proptypes from "prop-types";
import "./../css/AvgShow_component.css";

class AvgShow_component extends React.Component{
    //소유 컴포넌트, 초당 사용전력 초기화
    constructor(props){
        super(props);
        this.state = {
            showName: props.showName,
            showAvg: props.showAvg
        }
    }

    componentDidMount(){
        
    }

    componentDidUpdate(){
        
    }

    render(){
        this.state.showName = this.props.showName;
        this.state.showAvg = this.props.showAvg;

        const {showName, showAvg} = this.state;
        var showString = "";
        var fixedAvg=0;
        if(showName==="khw"){
            showString="평균 전력 소모량";
            fixedAvg = String(Number(showAvg).toFixed(3));
        }else if(showName==="co2"){
            showString="평균 온실가스 배출량";
            fixedAvg = String(Number(showAvg).toFixed(3));
        }else if(showName==="won"){
            showString="평균 비용";
            fixedAvg = String(Number(showAvg).toFixed(0));
        }
        
        return(
            <div className="avg__component">
                <span className="avg__component--title">{showString}</span>
                <span className="avg__component--subtitle">{fixedAvg+" "+showName}</span>
            </div>
        );
    }
}

AvgShow_component.propTypes ={
    showName: Proptypes.string.isRequired,
    showAvg: Proptypes.number.isRequired
}

export default AvgShow_component;