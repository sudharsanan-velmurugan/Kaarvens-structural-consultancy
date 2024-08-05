import React, { useState, useEffect } from 'react';
import './Slideshow.css';

const images = [
    require('../KaarvenssBGImages/KaarvensBG-1.jpg'),
    require('../KaarvenssBGImages/KaarvensBG-2.jpg'),
    require('../KaarvenssBGImages/KaarvensBG-3.jpg'),
    require('../KaarvenssBGImages/KaarvensBG-4.jpg'),
    require('../KaarvenssBGImages/KaarvensBG-5.jpg'),
];

const Slideshow = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='slideshow'>
            <div
                className='slide active'
                style={{
                    backgroundImage: `url(${images[currentImageIndex]})`,
                }}
            ></div>
        </div>
    );
};

export default Slideshow;
