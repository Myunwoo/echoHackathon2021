/*global kakao*/
import React from "react";
import Header_bar from './components/Header_bar';
import "./css/Map_page.css";
import AvgShow_component from './components/AvgEnergy_component';
import cities from './cities.json';
import avgs from './avgs.json';
import centers from './center.json';

var markers = [];
const GAS_FOR_SEC = 0.45;

class Map_Page extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cityNames:[],
            cityAvgs:[],
            cityHouseCounts:[],
            cityBills: [],
            onShowName:"",
            onShowAvg:"",
            onShowCount:"",
            onShowBill:""
        }
    }

    makeMarkers = (map) => {
        for(var i=0;i<centers.length;i++){
            markers.push({content:'<div>'+centers[i].name+'</div>'
                ,position:new kakao.maps.LatLng(centers[i].center[0],centers[i].center[1])
                ,name:centers[i].name});
        }
    
        for (var i = 0; i < markers.length; i ++) {
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: markers[i].position // 마커의 위치
            });
        
            // 마커에 표시할 인포윈도우를 생성합니다 
            var infowindow = new kakao.maps.InfoWindow({
                content: markers[i].content // 인포윈도우에 표시할 내용
            });
        
            kakao.maps.event.addListener(marker, 'mouseover', this.makeOverListener(map, marker, infowindow));
            kakao.maps.event.addListener(marker, 'mouseout', this.makeOutListener(infowindow));
            kakao.maps.event.addListener(marker, 'click', this.makeClickListener(markers[i].name));
        }
    }

    makeOverListener = (map, marker, infowindow) => {
        return function() {
            infowindow.open(map, marker);
        };
    }

    makeOutListener = (infowindow) => {
        return function() {
            infowindow.close();
        };
    }

    makeClickListener = (name) => {
        const func = this.updateAvgShowCompos;
        return function(){
            func(name);
        };
    }

    updateAvgShowCompos = (name) => {
        const thisState = this.state;
        for(var i=0;i<thisState.cityNames.length;i++){
            if(name === thisState.cityNames[i]){
                this.state.onShowName = thisState.cityNames[i];
                this.state.onShowBill = thisState.cityBills[i];
                this.state.onShowAvg = thisState.cityAvgs[i];
                this.state.onShowCount = thisState.cityHouseCounts[i];
                break;
            }
        }
        this.forceUpdate();
    }

    initCities = () => {
        for(var i=0;i<cities.data.length;i++){
            if(cities.data[i].codeNm != '세종특별자치시'){
                this.state.cityNames.push(cities.data[i].codeNm);
            }        
        }
    }

    initAvgs = () => {
        for(var i=0;i<avgs.length;i++){
            this.state.cityAvgs.push(0);
            this.state.cityHouseCounts.push(0);
            this.state.cityBills.push(0);
            for(var j=0;j<avgs[i].data.length;j++){
                this.state.cityAvgs[i] += (avgs[i].data[j].powerUsage / avgs[i].data.length);
                this.state.cityHouseCounts[i] += avgs[i].data[j].houseCnt;
                this.state.cityBills[i] += avgs[i].data[j].bill / avgs[i].data.length;
            }
        }
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

                let map = new window.kakao.maps.Map(container, options);
                map.setDraggable(false);

                this.makeMarkers(map);
            });
        };

        this.initCities();
        this.initAvgs();
    }

    render(){
        const {location, history} = this.props;
        const {onShowName, onShowAvg, onShowCount, onShowBill} = this.state;
        const onShowCO2 = (this.state.onShowAvg * GAS_FOR_SEC).toFixed(3);

        return(
            <div>
                <Header_bar location={location} history={history}/>
                <div className="map__section">
                    <div id="Mymap"></div>
                    <div className="data__section">
                        <div className="data__section__column">
                            <AvgShow_component key={"khw"} showName={"khw"} showAvg={Number(onShowAvg)}/>
                            <AvgShow_component key={"co2"} showName={"co2"} showAvg={Number(onShowCO2)}/>
                            <AvgShow_component key={"won"} showName={"won"} showAvg={Number(onShowBill)}/>
                        </div>
                        <div className="data__section__column">
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Map_Page;