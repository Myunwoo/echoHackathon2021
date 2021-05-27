import React from "react";
import Header_bar from './components/Header_bar';

class Donate_Page extends React.Component{
    state={

    }
    render(){
        const {location, history} = this.props;
        return(
            <div>
                <Header_bar location={location} history={history}/>
                기부 페이지
            </div>
        );
    }
}

export default Donate_Page;