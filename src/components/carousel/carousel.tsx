import { ChildrenProps } from "../../interfaces/childrenElements";

const Carousel = ({ children }: ChildrenProps) => {
  return (
    <div className="row border">
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://dam.thdstatic.com/contentful/heroflattenimage/03OCT2024-HP-MW36-HERO5-HALLOWEEN3-DSK.jpg"
              className="d-block w-100"
              alt="HERO5-HALLOWEEN3"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://dam.thdstatic.com/contentful/heroflattenimage/03OCT2024-HP-MW36-HERO1-DD8-DSK.jpg"
              className="d-block w-100"
              alt="HERO1-DD8-DSK"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://dam.thdstatic.com/contentful/heroflattenimage/03OCT2024-HP-MW36-HERO2-BATH-DD9-DSK.jpg"
              className="d-block w-100"
              alt="HERO2-BATH-DD9-DSK"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://dam.thdstatic.com/contentful/heroflattenimage/03OCT2024-HP-MW36-HERO4-APPLIANCES8-DSK.jpg"
              className="d-block w-100"
              alt="HERO4-APPLIANCES8-DSK"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
