import React from "react";
import Header_bar from './components/Header_bar';
import "./css/Donate_Page.css";

let index = 0;

const tagTitles = [
    "온실가스 주범 석탄발전소 건설중단에 함께해주세요!",
    "타이틀 2",
    "타이틀 3"
];

const tagSlogans = [
    "2050년까지 탄소중립을 선언한 현 정부, 그런데...",
    "슬로건 2",
    "슬로건 3"
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
                            <img src="https://happybean-phinf.pstatic.net/20201117_182/1605588703341AR9Jq_PNG/1.png?type=w720" alt="" />
                        </div>
                        <div className="carousel__item">
                            <img src="https://images.unsplash.com/photo-1583434987437-1b9dcbe44c9e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                        </div>
                        <div className="carousel__item">
                            <img src="https://images.unsplash.com/photo-1603052227529-e8ed43c7af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" alt="" />
                        </div>
                    </div>
                </div>
                <div className="tag__component">
                    <div className="tag__highlight"></div>
                    <span className="tag__title"></span>
                    <span className="tag__slogan"></span>
                    <button className="tag__btn">기부하기</button>
                </div>
            </div>
        );
    }
}

export default Donate_Page;