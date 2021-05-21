import React from "react";
import Header_bar from './components/Header_bar';

class Login_Page extends React.Component{
    state={

    }
    render(){
        const {location, history} = this.props;
        return(
            <div>
                <Header_bar location={location} history={history}/>
                로그인 페이지
            </div>
        );
    }
}

export default Login_Page;