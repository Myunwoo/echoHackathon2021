import React from "react";
import Header_bar from './components/Header_bar';
import "./css/Donate_Page.css";

let index = 0;

const tagTitles = [
    "석탄 발전 멈춰!",
    "타이틀 2",
    "연탄에서 보일러로"
];

const tagSlogans = [
    "온실가스 주범 석탄 발전소 건설 중단",
    "슬로건 2",
    "국내 15만 가구 아직 연탄 생활"
];

class Donate_Page extends React.Component{
    changeCarouselData = (carousel,title, slogan) => {
        if(index !== 2){
            index += 1;
            carousel.style.transform = `translate3d(-${window.innerWidth * index}px, 0, 0)`;
            title.textContent = tagTitles[index];
            slogan.textContent = tagSlogans[index];   
        }else if(index === 2){
            index = 0;
            carousel.style.transform = `translate3d(-${window.innerWidth * index}px, 0, 0)`;
            title.textContent = tagTitles[index];
            slogan.textContent = tagSlogans[index];   
        }
    }

    componentDidMount(){
        const carousel = document.querySelector('.carousel');  
        const title = document.querySelector('.tag__title');
        const slogan = document.querySelector('.tag__slogan'); 
        title.textContent = tagTitles[0];
        slogan.textContent = tagSlogans[0];     
        setInterval(this.changeCarouselData,3000,carousel,title,slogan);
    }

    render(){
        const {location, history} = this.props;
        return(
            <div>
                <Header_bar location={location} history={history}/>
                <div className="carousel-wrapper">
                    <div className="carousel">
                        <div className="carousel__item">
                            <img src="https://images.pexels.com/photos/929385/pexels-photo-929385.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="" />
                        </div>
                        <div className="carousel__item">
                            <img src="https://cleanvehiclerebate.org/sites/default/files/styles/full/public/images/reduced_environmental_impacts.jpg?itok=dWibkCNN" alt="" />
                        </div>
                        <div className="carousel__item">
                            <img src="http://www.energydaily.co.kr/news/photo/202010/112990_68799_3842.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <div className="tag__component">
                    <div className="tag__highlight"></div>
                    <span className="tag__title"></span>
                    <span className="tag__slogan"></span>
                </div>
            </div>
        );
    }
}

export default Donate_Page;