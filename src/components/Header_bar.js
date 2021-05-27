import React from "react";
import {Link} from 'react-router-dom';
import "./../css/Header_bar.css";

class Header_bar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            location:props.location,
            history:props.history
        }
    }

    render(){
        if(this.state.location.pathname==='/login'){
            return null;
        }else{
            return(
                <nav className="header-bar">
                    <ul className="header-bar__list">
                        <li className="header-bar__list__item">
                            <Link to='/main'>main</Link>
                        </li>
                        <li className="header-bar__list__item">
                            <Link to='/map'>map</Link>
                        </li>
                        <li className="header-bar__list__item">
                            <Link to='/donate'>donate</Link>
                        </li>
                    </ul>
                </nav>
            );
        }
    }
}

export default Header_bar;