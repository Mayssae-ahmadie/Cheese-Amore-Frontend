// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import "../CSS/Testimonial.css";
// import PopUp from "./PopUp";

// function Testimonials() {
//     const [testimonialsData, setTestimonialsData] = useState([]);
//     const [buttonPopup, setButtonPopup] = useState(false);
//     const [Review, setReview] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');

//     const userId = localStorage.getItem('userId');
//     const isLoggedIn = !!userId;

//     const [userFullName, setUserFullName] = useState('');
//     const fetchUserDetailsAndFullName = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_URL}/user/getById/${userId}`);
//             const userData = response.data;
//             console.log(userData);
//             if (response.status === 200 && userData.success) {
//                 const { firstName, lastName } = userData.data;
//                 setUserFullName(`${firstName} ${lastName}`);
//             } else {
//                 console.error('Error fetching user details:', userData.message);
//                 setUserFullName('');
//             }
//         } catch (error) {
//             console.error('An error occurred while fetching user details:', error);
//             setUserFullName('Unknown Usr');
//         }
//     };

//     const fetchTestimonials = async () => {
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_URL}/testimonial/getAll`);
//             const data = response.data;

//             if (response.status === 200) {
//                 const approvedTestimonials = data.data.filter(testimonial => testimonial.approve === true);
//                 setTestimonialsData(approvedTestimonials);
//             } else {
//                 console.error('Error fetching testimonials:', data.message);
//             }
//         } catch (error) {
//             console.error('An error occurred while fetching testimonials:', error);
//         }
//     };

//     useEffect(() => {
//         if (isLoggedIn) {
//             fetchUserDetailsAndFullName();
//         }

//         fetchTestimonials();
//     }, [isLoggedIn]);

//     const handleContactInfo = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append('review', Review);
//         formData.append('userId', userId);

//         try {
//             const response = await axios.post(`${process.env.REACT_APP_URL}/testimonial/add`, formData);

//             if (response.status === 200) {
//                 const data = response.data;
//                 if (data.success) {
//                     console.log('Data added successfully:', data.data);
//                     setErrorMessage('Thanks For Your Review.');
//                     setReview('');

//                     // Fetch updated testimonials after adding a new one
//                     fetchTestimonials();

//                     // Fetch user details only if the user is logged in
//                     if (isLoggedIn) {
//                         fetchUserDetailsAndFullName();
//                     }

//                     setTimeout(() => {
//                         setErrorMessage('');
//                         setButtonPopup(false);
//                     }, 5000);
//                 } else {
//                     console.error('Error adding Testimonial:', data.message);
//                     setErrorMessage('Error adding testimonial: ' + data.message);
//                 }
//             } else {
//                 console.error('HTTP error! Status:', response.status);
//                 console.error('Response:', response);
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//         } catch (error) {
//             console.error('An error occurred while adding testimonial:', error);
//             setErrorMessage('Error adding testimonial.');
//         }
//     };

//     const [currentIndex, setCurrentIndex] = useState(0);

//     const handleNextSlide = () => {
//         setCurrentIndex((prevIndex) =>
//             prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
//         );
//     };

//     const handlePrevSlide = () => {
//         setCurrentIndex((prevIndex) =>
//             prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
//         );
//     };

//     return (
//         <div className="TestimonialSection" id="TestimonialSection">
//             <div className="TestimonialContainer">
//                 <div className="TestimonialTitles">
//                     <b className="TheTestimonial">Testimonials</b>
//                 </div>
//                 <div id="testimonials" className="testimonial-container">
//                     {testimonialsData.length > 0 ? (
//                         <>
//                             <button id="left-btn" onClick={handlePrevSlide}>
//                                 <i className="arrow left-arrow"></i>
//                             </button>
//                             {testimonialsData.map((testimonial, index) => (
//                                 <div key={index} className={`testimonial-slide ${index === currentIndex ? 'active' : ''}`}>
//                                     <p className="testimonial-description">
//                                         {testimonial?.review}
//                                     </p>
//                                     <p className="testimonial-author">
//                                         By: {testimonial?.userId ? userId.fullName : 'Unknown User'}
//                                     </p>
//                                 </div>
//                             ))}
//                             <button id="right-btn" onClick={handleNextSlide}>
//                                 <i className="arrow right-arrow"></i>
//                             </button>
//                         </>
//                     ) : (
//                         <p>No testimonials available.</p>
//                     )}
//                 </div>

//                 {isLoggedIn && (
//                     <button
//                         id="openBtn"
//                         className="testimonial-button"
//                         onClick={() => setButtonPopup(true)}
//                     >
//                         Leave a Review !!
//                     </button>
//                 )}

//                 <PopUp trigger={buttonPopup} setTrigger={setButtonPopup}>
//                     <div>
//                         <h2 className="leave-review">Leave a Review</h2>
//                         <form id="reviewForm" className="testimonial-form" onSubmit={handleContactInfo} encType='multipart/form-data'>
//                             <div className='title-form'>Your Opinion:</div>
//                             <br />
//                             <textarea className='input-form-review' id="review" required
//                                 placeholder='Enter Your Review'
//                                 value={Review}
//                                 onChange={(e) => setReview(e.target.value)}
//                             ></textarea>
//                             <br />
//                             {errorMessage && <p style={{ color: 'white' }}>{errorMessage}</p>}
//                             <button type="submit" className="send-button">
//                                 Send
//                             </button>
//                         </form>
//                     </div>
//                 </PopUp>
//             </div>
//         </div>
//     );
// }

// export default Testimonials;

// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import "../CSS/Testimonial.css";

// // const Testimonials = ({ loggedIn }) => {
// //     const [testimonials, setTestimonials] = useState([]);
// //     const [showModal, setShowModal] = useState(false);
// //     const [review, setReview] = useState('');

// //     const fetchTestimonials = async () => {
// //         try {
// //             const response = await axios.get('${process.env.REACT_APP_URL}/testimonial/getAll');
// //             setTestimonials(response.data);
// //         } catch (error) {
// //             console.error('Error fetching testimonials:', error);
// //         }
// //     };

// //     const handleShowModal = () => {
// //         setShowModal(true);
// //     };

// //     const handleCloseModal = () => {
// //         setShowModal(false);
// //     };

// //     const handleReviewChange = (e) => {
// //         setReview(e.target.value);
// //     };

// //     const handleAddTestimonial = async () => {
// //         try {
// //             const response = await axios.post(
// //                 '${process.env.REACT_APP_URL}/testimonial/add',
// //                 { review },
// //                 { headers: { 'Content-Type': 'application/json' } }
// //             );

// //             if (response.data.success) {
// //                 handleCloseModal();
// //                 fetchTestimonials();
// //             } else {
// //                 console.error('Testimonial submission failed:', response.data.message);
// //             }
// //         } catch (error) {
// //             console.error('Error adding testimonial:', error);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchTestimonials();
// //     }, []);

// //     return (
// //         <div>
// //             <div className="testimonial-carousel">
// //                 {Array.isArray(testimonials) && testimonials.length > 0 ? (
// //                     testimonials.map((testimonial) => (
// //                         testimonial.approve && (
// //                             <div key={testimonial._id} className="testimonial-item">
// //                                 <p>{testimonial.review}</p>
// //                                 <p>User: {testimonial.userId.fullName}</p>
// //                             </div>
// //                         )
// //                     ))
// //                 ) : (
// //                     <p>No testimonials available.</p>
// //                 )}
// //             </div>

// //             {loggedIn && (
// //                 <button className="add-testimonial-button" onClick={handleShowModal}>
// //                     Add Testimonial
// //                 </button>
// //             )}

// //             {showModal && (
// //                 <div className="modal">
// //                     <div className="modal-content">
// //                         <span className="close" onClick={handleCloseModal}>
// //                             &times;
// //                         </span>
// //                         <textarea
// //                             rows={3}
// //                             placeholder="Write your review here"
// //                             onChange={handleReviewChange}
// //                         />
// //                         <button onClick={handleAddTestimonial}>Submit Review</button>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default Testimonials;