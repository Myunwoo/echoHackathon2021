/*global kakao*/
import React from "react";
import Header_bar from './components/Header_bar';
import "./css/Map_page.css";
import geo from "./geo.json";
import EnergyShow_component from './components/EnergyShow_component';
import GasShow_component from './components/GasShow_component';
import MoneyShow_component from './components/MoneyShow_component';

var areas = [];

function makeAreas(){
    for(var i=0;i<geo.features.length;i++){
        areas.push({name:geo.features[i].properties.CTP_KOR_NM, path:[]});
        for(var j=0;j<geo.features[i].geometry.coordinates.length;j++){
            for(var k=0;k<geo.features[i].geometry.coordinates[j].length;k++){
                areas[i].path.push(new kakao.maps.LatLng(geo.features[i].geometry.coordinates[j][k][1], geo.features[i].geometry.coordinates[j][k][0]));
            }
        }
    }
}

class Map_Page extends React.Component{
    state={

    }

    drawPolygons = (area,map) => {
        // 다각형을 생성합니다 
        var polygon = new kakao.maps.Polygon({
            map: map, // 다각형을 표시할 지도 객체
            path: area.path,
            strokeWeight: 2,
            strokeColor: '#004c80',
            strokeOpacity: 0.8,
            fillColor: '#fff',
            fillOpacity: 0.7 
        });

        // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다 
        // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
        kakao.maps.event.addListener(polygon, 'mouseover', function(mouseEvent) {
            polygon.setOptions({fillColor: '#09f'});
        });

        // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다 
        kakao.maps.event.addListener(polygon, 'mousemove', function(mouseEvent) {
            
        });

        // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
        // 커스텀 오버레이를 지도에서 제거합니다 
        kakao.maps.event.addListener(polygon, 'mouseout', function() {
            polygon.setOptions({fillColor: '#fff'});
        }); 

        // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다 
        kakao.maps.event.addListener(polygon, 'click', function(mouseEvent) {
            
        });
    }

    componentDidMount(){
        const script = document.createElement("script");
        script.async = true;
        script.src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=b288420b3477af11c6c0422bbeb4b27c&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                makeAreas();

                let container = document.getElementById("Mymap");
                let options = {
                    center:new kakao.maps.LatLng(36, 128),
                    level: 13
                };

                let map = new window.kakao.maps.Map(container, options);
                map.setDraggable(false);

                // 지도에 영역데이터를 폴리곤으로 표시합니다 
                for (var i = 0, len = areas.length; i < len; i++) {
                    this.drawPolygons(areas[i],map);
                }
            });
        };
    }

    render(){
        const {location, history} = this.props;
        return(
            <div>
                <Header_bar location={location} history={history}/>
                <div className="map__section">
                    <div id="Mymap"></div>
                    <div className="data__section">
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Map_Page;