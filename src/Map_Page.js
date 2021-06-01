/*global kakao*/
import React from "react";
import Header_bar from './components/Header_bar';
import "./css/Map_page.css";
import AvgShow_component from './components/AvgEnergy_component';
import cities from './cities.json';
import avgs from './avgs.json';
import centers from './center.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { faIndustry } from "@fortawesome/free-solid-svg-icons";

var markers = [];
const GAS_FOR_SEC = 0.45;
const GOOD_EXAMPLE = 0;
const BAD_EXAMPLE = 1;
const GOOD_AVG = 150;
const BAD_AVG = 300;

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
            onShowBill:"",
            onShowGrade:"",
            onShowTree:"",
            onShowReducedCo2:""
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

    showExample = (type) => {
        if(this.state.onShowName===""){
            alert("지역을 먼저 선택해 주세요.");
            return;
        }
        if(type === GOOD_EXAMPLE){
            //이게 Co2 발생량임, 단위:톤
            const totalCo2 = ((Number(this.state.onShowAvg) - GOOD_AVG) * Number(this.state.onShowCount) * 0.000424).toFixed(0);
            const totalTree = (totalCo2 * 2 / 3).toFixed(0);
            this.setState({onShowGrade: "A+",onShowReducedCo2:totalCo2,onShowTree:totalTree});
        }else if(type === BAD_EXAMPLE){
            const totalCo2 = ((BAD_AVG - Number(this.state.onShowAvg)) * Number(this.state.onShowCount) * 0.000424).toFixed(0);
            const totalTree = (totalCo2 * 2 / 3).toFixed(0);
            this.setState({onShowGrade: "C",onShowReducedCo2:totalCo2,onShowTree:totalTree});
        }
    }

    render(){
        const {location, history} = this.props;
        const {onShowName, onShowAvg, onShowCount, onShowBill, onShowGrade, onShowReducedCo2, onShowTree} = this.state;
        const onShowCO2 = (this.state.onShowAvg * GAS_FOR_SEC).toFixed(3);
        console.log(onShowGrade);
        return(
            <div>
                <Header_bar location={location} history={history}/>
                <div className="map__section">
                    <div id="Mymap"></div>
                    <div className="data__section">            
                        <div className="data__section__column">
                            <AvgShow_component key={"khw"} showName={"khw"} showAvg={Number(onShowAvg)} />
                            <AvgShow_component key={"co2"} showName={"co2"} showAvg={Number(onShowCO2)} />
                            <AvgShow_component key={"won"} showName={"won"} showAvg={Number(onShowBill)} />
                        </div>
                        <div className="data__section__column">
                            <span>{"2020년 11월 기준 "+onShowName}</span>
                        </div>
                        <div className="data__section__column">
                            <span className="data__section__btn btn--grn" onClick={() => this.showExample(GOOD_EXAMPLE)}>우수사례 보기!</span>
                            <span className="data__section__btn btn--red" onClick={() => this.showExample(BAD_EXAMPLE)}>과소비사례 보기!</span>
                        </div>
                        <div className="data__section__result">
                            <span id="firstline">당신의 등급은 <b>{onShowGrade}</b> 에요</span>
                            <span id="secondline"><b>{onShowName}</b> 의 모든 사람이 비슷하게 에너지를 소비한다면</span>
                            <span id="thirdline"><b>나무{onShowTree}그루</b> {onShowGrade==="C" ? "뽑" : "심"}는 것과 같아질 거에요</span>
                            <span id="fourthline"><b>Co2 {onShowReducedCo2}t</b> 을 {onShowGrade==="C" ? "더 만드" : "없애"}는 것이죠!</span>
                            <FontAwesomeIcon id="treeone" icon={faTree} className="fa-2x greentree"/>
                            <FontAwesomeIcon id="treetwo" icon={faTree} className="fa-2x greentree"/>
                            <FontAwesomeIcon id="treethr" icon={faTree} className="fa-2x greentree"/>
                            <FontAwesomeIcon id="treefour" icon={faTree} className="fa-2x greentree"/>
                            <FontAwesomeIcon id="treefive" icon={faTree} className="fa-2x greentree"/>
                            <FontAwesomeIcon id="industry" icon={faIndustry} className="fa-2x"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Map_Page;