import Carousel from "../carousel/carousel";
import CarouselMenu from "../carouselMenu/CarouselMenu";
import AllCategories from "../categories/AllCategories";
import InformativeList from "../informative/InformativeList";
import Miscellaneous from "../miscellaneous/Miscellaneous";
import SeasonAdvertisement from "../seasonAdvertisement/SeasonAdvertisement";

const Home = () => {
    return (
        <div className="container">
            <br></br>
            <Carousel>
                <p>Carousel 1</p>
            </Carousel>
            <br></br>
            <CarouselMenu>
                <p>Carousel with menu</p>
            </CarouselMenu>
            <br></br>
            <SeasonAdvertisement />
            <br></br>
            <AllCategories />
            <br></br>
            <Miscellaneous />
            <br></br>
            <InformativeList />
            <br></br>
        </div>
    );
}

export default Home;