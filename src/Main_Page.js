import React, {useRef} from "react";
import Header_bar from './components/Header_bar';
import Consent_component from './components/Consent_component';
import Shortcut_component from './components/Shortcut_component';
import EnergyShow_component from './components/EnergyShow_component';
import GasShow_component from './components/GasShow_component';
import MoneyShow_component from './components/MoneyShow_component';
import "./css/Main_page.css";

class Main_page extends React.Component{
    state={
        shortcuts:[
            {id:1, title:"출근", target_compos:[1,2,3,4,5,6,7,8], target_modes:["b","b","b","b","b","b","b","b"]},
            {id:2, title:"다켜", target_compos:[1,2,3,4,5,6,7,8], target_modes:["a","a","a","a","a","a","a","a"]},
            {id:3, title:"안방 독서", target_compos:[1,2,3,4,5,6,7,8], target_modes:['b','b','a','b','b','b','b','a']},
            {id:4, title:"거실 TV시청", target_compos:[1,2,3,4,5,6,7,8], target_modes:['b','b','b','b','a','b','a','b']}
        ],
        components:[
            {id:1, title:"에어컨", always_mode:true, autoshut_mode:false, setting_mode:false, power_consumption:1},
            {id:2, title:"세탁기", always_mode:false, autoshut_mode:true, setting_mode:false, power_consumption:1},
            {id:3, title:"공기 청정기", always_mode:false, autoshut_mode:false, setting_mode:true, power_consumption:1},
            {id:4, title:"전자레인지", always_mode:false, autoshut_mode:false, setting_mode:true, power_consumption:1},
            {id:5, title:"온풍기", always_mode:false, autoshut_mode:false, setting_mode:true, power_consumption:1},
            {id:6, title:"제습기", always_mode:false, autoshut_mode:false, setting_mode:true, power_consumption:1},
            {id:7, title:"거실조명", always_mode:false, autoshut_mode:false, setting_mode:true, power_consumption:1},
            {id:8, title:"안방조명", always_mode:false, autoshut_mode:false, setting_mode:true, power_consumption:1}
        ]
    }

    componentDidMount(){
        
    }

    componentModeChange = (id, modes) => {
        const compos =  this.state.components;
        for(var i=0;i<compos.length;i++){
            if(compos[i].id === id){
                this.state.components[i].always_mode = modes.always_mode;
                this.state.components[i].autoshut_mode = modes.autoshut_mode;
                this.state.components[i].setting_mode = modes.setting_mode;
            }
        }
        this.forceUpdate();
    }

    componentDidUpdate(){
    
    }

    doShortcut = (childState) => {
        const targetCompos = childState.target_compos;
        const targetModes = childState.target_modes;

        const stateCompos = this.state.components;
        for(var i=0;i<stateCompos.length;i++){
            for(var j=0;j<targetCompos.length;j++){
                //targetModes[j]의 값을 stateCompos.mode값으로``
                if(stateCompos[i].id === targetCompos[j]){
                    if(targetModes[j] === "a"){
                        this.state.components[i].always_mode = true;
                        this.state.components[i].autoshut_mode = false;
                        this.state.components[i].setting_mode = false;
                    }else if(targetModes[j] === "b"){
                        this.state.components[i].always_mode = false;
                        this.state.components[i].autoshut_mode = true;
                        this.state.components[i].setting_mode = false;
                    }else if(targetModes[j] === "c"){
                        this.state.components[i].always_mode = false;
                        this.state.components[i].autoshut_mode = false;
                        this.state.components[i].setting_mode = true;
                    }
                }
            }
        }
        
        this.forceUpdate();
    }

    render(){
        const {shortcuts, components} = this.state;
        const {location, history} = this.props;
        return(
            <section className="app__section">
                <Header_bar location={location} history={history}/>
                <div className="main__section">
                    <div className="main__section__column">
                        <div className="shortcut__section">
                            {shortcuts.map(shortcut => (
                                <Shortcut_component
                                    key={shortcut.id}
                                    id={shortcut.id}
                                    title={shortcut.title}
                                    target_compos={shortcut.target_compos}
                                    target_modes={shortcut.target_modes}
                                    notification={this.doShortcut}
                                />
                            ))}
                        </div>

                        <div className="components__section">
                            {components.map(component => (
                                <Consent_component
                                    key={component.id}
                                    id={component.id}
                                    title={component.title}
                                    always_mode={component.always_mode}
                                    autoshut_mode={component.autoshut_mode}
                                    setting_mode={component.setting_mode}
                                    power_consumption={component.power_consumption}
                                    notification={this.componentModeChange}
                                />
                            ))}
                        </div>    
                    </div>
                    <div className="main_divider"></div>
                    <div className="main__section__column">
                        <div className="show__section">
                            <EnergyShow_component components={components}/>
                            <GasShow_component components={components}/>
                            <MoneyShow_component components={components}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Main_page;