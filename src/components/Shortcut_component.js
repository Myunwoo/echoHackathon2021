import React from "react";
import "./../css/Shortcut_component.css";
import Proptypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const ALWAYS_MODE = "a";
const AUTOSHUT_MODE = "b";
const SET_MODE = "c";

class Shortcut_component extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id: props.id,
            title: props.title,
            target_compos: props.target_compos,
            target_modes:props.target_modes,
            isOn: false
        }
    }

    componentDidMount(){
        
    }

    componentDidUpdate(){
        
    }

    shortcutClick = () => {
        this.props.notification(this.state);
        this.setState({isOn:true});
    }

    mouseOut = () => {
        this.setState({isOn:false});
    }

    render(){
        const {title,isOn} = this.state;
        return(
            <div className="shortcut__component" onClick={() => this.shortcutClick()} onMouseOut={() => this.mouseOut()}>
                <div className="shortcut__component__column">
                    <span className={"shortcut__icon" + (isOn ? " tag" : "")}>
                        <FontAwesomeIcon icon={faBookmark} className="fa-3x"/>
                    </span>
                </div>
                <div className="shortcut__component__column">
                    <span className={"shortcut__component--title" + (isOn ? " tag" : "")}>{title}</span>
                </div>
            </div>
        );
    }
}

Shortcut_component.propTypes ={
    id: Proptypes.number.isRequired,
    title: Proptypes.string.isRequired,
    target_compos: Proptypes.array.isRequired,
    target_modes: Proptypes.array.isRequired
}

export default Shortcut_component;