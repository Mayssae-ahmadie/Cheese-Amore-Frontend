import React, { useState } from "react";
import axios from 'axios';

function ReviewModal({ closeModal, submitReview }) {
    const [reviewContent, setReviewContent] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Get the user ID from localStorage
        const userId = localStorage.getItem('userId');

        // Call the submitReview function with reviewContent and userId
        const result = await submitReview(reviewContent, userId);

        if (result.success) {
            closeModal(); // Close the modal after successful submission
        } else {
            setErrorMessage(result.message);
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-black opacity-25"></div>
                <div className="bg-white rounded-lg overflow-hidden shadow-xl relative w-2/3">
                    <span className="absolute top-0 right-0 cursor-pointer text-gray-500 hover:text-gray-800 mr-4 mt-2" onClick={closeModal}>&times;</span>
                    <h2 className="text-xl font-bold text-center p-4 border-b">Leave a Review</h2>
                    <form className="p-4" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <textarea
                                className="w-full border rounded-lg p-2"
                                id="review"
                                required
                                placeholder="Enter Your Review"
                                value={reviewContent}
                                onChange={(e) => setReviewContent(e.target.value)}
                            ></textarea>
                        </div>
                        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                        <div className="flex justify-end p-4 bg-gray-100">
                            <button className="bg-white text-black font-bold py-1 px-2 w-32 text-lg inline-block  mr-4" onClick={closeModal}>
                                CANCEL
                            </button>
                            <button type="submit" className="bg-[#E6C068] text-black font-bold py-1 px-2 w-32 text-lg inline-block ">
                                CONFIRM
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReviewModal;