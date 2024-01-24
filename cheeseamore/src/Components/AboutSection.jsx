import React from 'react';
import '../CSS/AboutSection.css';
import Divine from "../Assets/The Divine Board.png";
import Love from "../Assets/The Love Board.png";
import Gourmet from "../Assets/The Gourmet Board.png";

const AboutSection = () => {
    return (
        <div className='about-section'>
            <h2 className='about-section-header'> Not your average board...  </h2>
            <div className='about-section-description'>
                <img className="about-image" src={Divine} alt="" srcset="" />
                <div>
                    <p className='about-section-text'> At Cheese Amore, we bring the artistry of Charcuterie to your fingertip </p>
                    <p className='about-section-text'> Our journey began with a simple desire to turn gatherings into extraordinary experiences. Through careful selection and curation, we've perfected the balance of flavors and aesthetics to create boards that not only satisfy the palate but also serve as a captivating centerpiece for your events. </p>
                </div>
            </div>
            <div className='about-section-description'>
                <div>
                    <p className='about-section-text'> Our commitment goes beyond providing a selection of premium cheeses and charcuterie. We believe in the power of culinary expression and the joy it brings to people. </p>
                    <p className='about-section-text'> Explore our collection of handpicked cheeses, carefully cured meats, and an array of accompaniments that cater to diverse tastes. </p>
                </div>
                <img className="about-image" src={Love} alt="" srcset="" />
            </div>
            <div className='about-section-description'>
                <img className="about-image" src={Gourmet} alt="" srcset="" />
                <div>
                    <p className='about-section-text'> Whether you're hosting an intimate gathering with friends, a celebratory event, or a corporate function, our boards are designed to elevate your experience effortlessly, creating a worry-free atmosphere and leaving a lasting impression on your guests. </p>
                    <p className='about-section-text'> Join us on this flavorful journey, where every board is a work of art, and every occasion is an opportunity to indulge in the finest culinary delights. </p>
                </div>
            </div>
        </div >
    );
};

export default AboutSection;