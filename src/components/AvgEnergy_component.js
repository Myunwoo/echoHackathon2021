import React from "react";
import Proptypes from "prop-types";
import "./../css/AvgShow_component.css";

class AvgShow_component extends React.Component{
    //소유 컴포넌트, 초당 사용전력 초기화
    constructor(props){
        super(props);
        this.state={
            
        }
    }

    componentDidMount(){
        
    }

    render(){
        return(
            <div className="avg__component">
                <span className="avg__component--title">평균 전력 소모량</span>
                <span className="avg__component--subtitle">{"kWh"}</span>
            </div>
        );
    }
}

AvgShow_component.propTypes ={
    
}

export default AvgShow_component;