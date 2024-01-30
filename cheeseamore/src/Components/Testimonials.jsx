import { useEffect, useState } from 'react';
import "../CSS/Testimonial.css";
import ReviewModal from '../Components/ReviewModal';
import axios from 'axios';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'; // Import icons from Heroicons v2

function Testimonials() {
    const [testimonialData, setTestimonialData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [Review, setReview] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchApprovedTestimonials();
        checkLoggedInStatus();
    }, []);

    const fetchApprovedTestimonials = async () => {
        try {
            const response = await axios.get('http://localhost:5000/testimonial/getAll');
            const data = response.data;
            const approvedTestimonials = data.data.filter(testimonial => testimonial.approve === true);
            setTestimonialData(approvedTestimonials);
        } catch (error) {
            console.error('Error fetching approved testimonials:', error);
        }
    };

    const checkLoggedInStatus = () => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            setLoggedIn(true);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User ID not found in localStorage');
            return;
        }
        const result = await handleReview(Review, userId);
        if (result.success) {
            setIsModalOpen(false);
            fetchApprovedTestimonials();
        } else {
            setErrorMessage(result.message);
        }
    };

    const handleReview = async (reviewContent, userId) => {
        try {
            if (!reviewContent.trim()) {
                return { success: false, message: 'Please enter your review.' };
            }
            const newReview = {
                userId: userId,
                review: reviewContent,
            };
            const response = await axios.post('http://localhost:5000/testimonial/add', newReview);
            if (response.data.success) {
                console.log('Review added successfully:', response.data.data);
                return { success: true, message: 'Thanks for your review.' };
            } else {
                console.error('Error adding review:', response.data.message);
                return { success: false, message: 'Error adding review: ' + response.data.message };
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
                    <h1 className="TheTestimonial">Testimonials</h1>
                </div>
                <div className="testimonial-container">
                    {/* Use ChevronLeftIcon and ChevronRightIcon here */}
                    <button className="prev" onClick={handlePrevSlide}>
                        <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                    <div className="testimonial-slide">
                        <div className="Testimonial-content">
                            {testimonialData.map((testimonial, index) => (
                                <div key={index} className={index === currentIndex ? "active" : "inactive"}>
                                    {testimonial.review}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="next" onClick={handleNextSlide}>
                        <ChevronRightIcon className="h-6 w-6" />
                    </button>
                </div>


                {loggedIn && (
                    <button
                        id="openBtn"
                        className="testimonial-button"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Leave a Review !!
                    </button>
                )}

                {/* Render ReviewModal component if isModalOpen is true */}
                {isModalOpen && (
                    <ReviewModal closeModal={() => setIsModalOpen(false)} submitReview={handleReviewSubmit} />
                )}
            </div>
        </div>
    );
}

export default Testimonials;