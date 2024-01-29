import { useEffect, useState } from 'react';
import "../CSS/Testimonial.css";
import Popup from '../Components/PopUp';

function Testimonials() {
    const [testimonialData, setTestimonialData] = useState([]);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [Review, setReview] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [fullName, setFullName] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchApprovedTestimonials();
        fetchUserFullName();
    }, []);

    const fetchApprovedTestimonials = () => {
        fetch('http://localhost:5000/testimonial/getAll')
            .then((response) => response.json())
            .then((data) => {
                const approvedTestimonials = data.data.filter(testimonial => testimonial.approve === true);
                setTestimonialData(approvedTestimonials);
                console.log(data.data)
            })
            .catch((error) => console.log(error));
    };

    const fetchUserFullName = async (testimonialId) => {
        try {
            const response = await fetch(`http://localhost:5000/testimonial/getByID/${testimonialId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setFullName(data.userFullName.firstName);
            console.log(data.userFullName.firstname);
        } catch (error) {
            console.error('Error fetching user full name:', error);
        }
    };
    console.log(testimonialData);

    const handleReview = async (reviewContent) => {
        try {
            // Check if the review content is empty
            if (!reviewContent.trim()) {
                return { success: false, message: 'Please enter your review.' };
            }

            const newReview = {
                Review: reviewContent,
            };

            const response = await fetch('http://localhost:5000/testimonial/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
            });

            if (!response.ok) {
                console.error('HTTP error! Status:', response.status);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.success) {
                console.log('Review added successfully:', data.data);
                return { success: true, message: 'Thanks for your review.' };
            } else {
                console.error('Error adding review:', data.message);
                return { success: false, message: 'Error adding review: ' + data.message };
            }
        } catch (error) {
            console.error('An error occurred while adding review:', error);
            return { success: false, message: 'Error adding review.' };
        }
    };

    const handleNextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonialData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonialData.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="TestimonialSection" id="TestimonialSection">
            <div className="TestimonialContainer">
                <div className="TestimonialTitles">
                    <b className="TheTestimonial">Testimonials</b>
                </div>
                <div id="testimonials" className="testimonial-container">
                    <div className="testimonial-slide">
                        <div className="Testimonial-content">
                            {setReview}
                        </div>
                        <p className="testimonial-description">
                            {setFullName}
                        </p>
                    </div>
                </div>

                {loggedIn && (
                    <button
                        id="openBtn"
                        className="testimonial-button"
                        onClick={() => setButtonPopup(true)}
                    >
                        Leave a Review !!
                    </button>
                )}

                <p className='transition-footer'>You can also contact me and visit my social media</p>

                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                    <div>
                        <h2 className="leave-review">Leave a Review</h2>
                        <form id="reviewForm" className="testimonial-form" onSubmit={handleReview} encType='multipart/form-data'>
                            <div className='title-form' >Your Opinion:</div>
                            <br />
                            <textarea className='input-form-review' id="review" required
                                placeholder='Enter Your Review'
                                value={Review}
                                onChange={(e) => setReview(e.target.value)}
                            ></textarea>
                            <br />
                            {errorMessage && <p style={{ color: 'white' }}>{errorMessage}</p>}
                            <button type="submit" className="send-button">
                                Send
                            </button>
                        </form>
                    </div>
                </Popup>
            </div>
        </div>
    );
}

export default Testimonials;