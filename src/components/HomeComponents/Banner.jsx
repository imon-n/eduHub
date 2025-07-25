import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImg1 from "../../assets/images/banner1.jpg";
import bannerImg2 from "../../assets/images/banner2.jpg";
import bannerImg3 from "../../assets/images/banner3.png";

const images = [bannerImg1, bannerImg2, bannerImg3];

const Banner = () => {
  return (
    <div className="max-h-[400px] overflow-hidden rounded-xl mt-10">
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false}>
        {images.map((img, idx) => (
          <div key={idx}>
            <img
              src={img}
              alt={`Banner ${idx + 1}`}
              className="w-full h-[300px] object-cover md:h-[400px]"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
