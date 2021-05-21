/*global kakao*/
import React from "react";
import Header_bar from './components/Header_bar';
import "./css/Map_page.css";

class Map_Page extends React.Component{
    state={

    }

    componentDidMount(){
        const script = document.createElement("script");
        script.async = true;
        script.src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=b288420b3477af11c6c0422bbeb4b27c&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                let container = document.getElementById("Mymap");
                let options = {
                    center:new kakao.maps.LatLng(36, 128),
                    level: 13
                };

                const map = new window.kakao.maps.Map(container, options);
            });
        };
    }

    render(){
        const {location, history} = this.props;
        return(
            <div>
                <Header_bar location={location} history={history}/>
                <div id="Mymap"></div>
            </div>
        );
    }
}

export default Map_Page;