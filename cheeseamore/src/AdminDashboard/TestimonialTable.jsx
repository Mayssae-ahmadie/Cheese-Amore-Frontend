import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

const TestimonialTable = () => {
    const [testimonials, setTestimonials] = useState([]);
    const { addToast } = useToasts();

    useEffect(() => {
        fetchTestimonials();
        fetchUserName();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/testimonial/getAll`);
            const testimonialData = response.data.data;

            // Fetch userFullName for each testimonial
            const testimonialsWithUserNames = await Promise.all(
                testimonialData.map(async (testimonial) => {
                    const userFullName = await fetchUserName(testimonial.userId);
                    return { ...testimonial, userFullName };
                })
            );

            setTestimonials(testimonialsWithUserNames);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

    const fetchUserName = async (userId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/user/getById/${userId}`);
            const userData = response.data.data;
            if (userData && userData.fullName && userData.fullName.firstName && userData.fullName.lastName) {
                const { firstName, lastName } = userData.fullName;
                return `${firstName} ${lastName}`;
            } else {
                console.error('User full name is not properly defined in the response:', userData);
                return 'Unknown User';
            }
        } catch (error) {
            console.error('Error fetching user name:', error);
            return '';
        }
    };

    const handleDelete = async (testimonialID) => {
        try {
            await axios.delete(`${process.env.REACT_APP_URL}/testimonial/delete/${testimonialID}`);
            fetchTestimonials();
            addToast('Testimonial deleted successfully', {
                appearance: 'success',
                autoDismiss: true,
            });
        } catch (error) {
            console.error('Error deleting testimonial:', error);
            addToast('Unable to delete testimonial', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    };

    const handleApproveChange = async (approvedID, newApproveValue) => {
        try {
            await axios.put(`${process.env.REACT_APP_URL}/testimonial/update/${approvedID}`,
                { approve: newApproveValue });
            setTestimonials((prevTestimonials) =>
                prevTestimonials.map((testimonial) =>
                    testimonial._id === approvedID ? { ...testimonial, approve: newApproveValue } : testimonial
                )
            );
            addToast('Testimonial approved successfully', {
                appearance: 'success',
                autoDismiss: true,
            });
        } catch (error) {
            console.error('Testimonial not approved', error);
            addToast('Unable to approve testimonials', {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    };

    return (
        <div className="card-main">
            <h1 className="dashboard-title">Testimonials Table</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Review</th>
                        <th>User</th>
                        <th>Approve</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testimonials.map((testimonial) => (
                        <tr key={testimonial._id}>
                            <td>{testimonial.review}</td>
                            <td>{testimonial.userFullName}</td>
                            <td>{testimonial.approve}
                                <input
                                    type="checkbox"
                                    checked={testimonial.approve}
                                    onChange={(e) => handleApproveChange(testimonial._id, e.target.checked)}
                                />
                            </td>
                            <td>
                                <button className="button delete-button" onClick={() => handleDelete(testimonial._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TestimonialTable;