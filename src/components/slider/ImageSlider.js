import React, { useEffect, useState } from "react";
import { getBannersApi } from "../../api/baseAPI";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await getBannersApi();
        if (Array.isArray(response.data.data)) {
          setImages(
            response.data.data.map((banner, index) => ({
              src: banner.banner_image,
              id: `banner${index}`,
            }))
          );
        } else {
          console.error("Expected an array but got:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="">
      <h2 className="text-base font-semibold mb-2">Temukan Promo Menarik</h2>
      <div className="overflow-hidden">
        <div className="flex overflow-x-auto space-x-8 scrollbar-hidden">
          {images.map((image) => (
            <div key={image.id} className="p-8 flex-shrink-0">
              <img
                src={image.src}
                alt={`Banner ${image.id}`}
                className="w-[250px] h-full object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
