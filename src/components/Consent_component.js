import React from 'react';
import './../css/Consent_component.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlug } from "@fortawesome/free-solid-svg-icons";
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";
import Proptypes from "prop-types";

const ALWAYS_MODE = "a";
const AUTOSHUT_MODE = "b";
const SET_MODE = "c";

class Consent_component extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id:props.id,
            always_mode:props.always_mode,
            autoshut_mode:props.autoshut_mode,
            setting_mode:props.setting_mode,
            title:props.title,
            power_consumption:props.power_consumption,
            shower_text: 0
        }
    }

    changeMode = (mode) => {
        if(mode===ALWAYS_MODE){
            this.setState({always_mode:true, autoshut_mode:false, setting_mode: false});
            this.props.notification(this.state.id, {always_mode:true, autoshut_mode:false, setting_mode: false});
        }else if(mode===AUTOSHUT_MODE){
            this.setState({always_mode:false, autoshut_mode:true, setting_mode: false});
            this.props.notification(this.state.id, {always_mode:false, autoshut_mode:true, setting_mode: false});
        }else if(mode===SET_MODE){
            this.setState({always_mode:false, autoshut_mode:false, setting_mode: true});
            this.props.notification(this.state.id, {always_mode:false, autoshut_mode:false, setting_mode: true});
        }
    }

    //1초에 한 번 에너지를 계산.
    updateShowerText = () => {
        let eps = this.state.power_consumption;
        if(this.state.always_mode===false){
            eps=0;
        }
        const currentText = this.state.shower_text;
        this.setState({shower_text:currentText+eps});
    }

    componentDidMount(){
        setInterval(this.updateShowerText,1000);
    }

    componentDidUpdate(){
        if(
        this.state.always_mode != this.props.always_mode ||
        this.state.autoshut_mode != this.props.autoshut_mode ||
        this.state.setting_mode != this.props.setting_mode){
            this.propsChanged();
        }
    }

    propsChanged = () => {
        this.state.always_mode = this.props.always_mode;
        this.state.autoshut_mode = this.props.autoshut_mode;
        this.state.setting_mode = this.props.setting_mode;
    }

    render(){
        const {always_mode, autoshut_mode, setting_mode, title,shower_text} = this.state;
        const consentBtnClass = "consent__component__button";
        const consentShowerClass = "consent__component--shower";

        return(
            <div className="consent__component">
                <div className="consent__component__column">
                    <span className="consent__icon"><FontAwesomeIcon icon={faPlug} className="fa-4x"/></span>
                </div>
                <div className="consent__component__column">
                <span className="consent__component--title">{title}</span>
                    <form className="consent_form">
                        <div className={always_mode ? consentBtnClass+" lightning_color" : consentBtnClass} onClick={() => this.changeMode(ALWAYS_MODE)}>
                            <FontAwesomeIcon icon={faBolt} className="consent__component__subicon"/>
                            <span>전력이 항상 공급됩니다</span>
                        </div>
                        <div className={autoshut_mode ? consentBtnClass+" leaf_color" : consentBtnClass} onClick={() => this.changeMode(AUTOSHUT_MODE)}>
                            <FontAwesomeIcon icon={faLeaf} className="consent__component__subicon"/>
                            <span>대기 전력을 차단합니다</span>
                        </div>
                        <div className={setting_mode ? consentBtnClass+" setting_color" : consentBtnClass} onClick={() => this.changeMode(SET_MODE)}>
                            <FontAwesomeIcon icon={faSlidersH} className="consent__component__subicon"/>
                            <span>전력 설정</span>
                        </div>
                    </form>
                </div>
                <div className="consent__component__column">
                    <div className="consent__component--divider"></div>
                    <div className={consentShowerClass 
                    + (always_mode ? " lightning_shower" : "") 
                    + (autoshut_mode ? " leaf_shower" : "") 
                    + (setting_mode ? " setting_shower" : "")}>
                        <span>{shower_text+"kWh"}</span>
                    </div>
                </div>
            </div>
        );
    }
}

Consent_component.propTypes ={
    id: Proptypes.number.isRequired,
    title: Proptypes.string.isRequired,
    always_mode: Proptypes.bool.isRequired,
    autoshut_mode:Proptypes.bool.isRequired,
    setting_mode:Proptypes.bool.isRequired,
    power_consumption:Proptypes.number.isRequired
}

export default Consent_component;