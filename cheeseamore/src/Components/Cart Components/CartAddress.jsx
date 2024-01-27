import React, { useState, useEffect } from "react";
import axios from 'axios';

function CartAddress({ closeModal, cartData, updateCartData }) {
    const token = localStorage.getItem('token');
    const fullAddress = cartData.user.fullAddress;
    const userID = cartData.user._id
    const [floor, setFloor] = useState(fullAddress.floor || '');
    const [city, setCity] = useState(cartData.user.city || '');
    const [building, setBuilding] = useState(fullAddress.building || '');
    const [description, setDescription] = useState(fullAddress.description || '');
    const [street, setStreet] = useState(fullAddress.street || '');

    const editAddress = async (userID, newAddress) => {
        console.log('User ID to be updated:', userID);
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/update/${userID}`, newAddress, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('User updated successfully');
        } catch (error) {
            console.error('Error updating team member address: ', error);
            if (error.response) {
                console.log(`Error while updating user's address`)
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updateCartData = {
            city: city !== cartData.user.city ? city : cartData.user.city,
            fullAddress: {
                floor: floor !== fullAddress.floor ? floor : fullAddress.floor,
                building: building !== fullAddress.building ? building : fullAddress.building,
                description: description !== fullAddress.description ? description : fullAddress.description,
                street: street !== fullAddress.street ? street : fullAddress.street,
            }
        };

        console.log("Updated fields: ", updateCartData);

        try {
            await editAddress(userID, updateCartData);
            closeModal();
            updateCartData(updateCartData);
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        setFloor(cartData.user.fullAddress.floor || '');
        setCity(cartData.user.city || '');
        setBuilding(cartData.user.fullAddress.building || '');
        setDescription(cartData.user.fullAddress.description || '');
        setStreet(cartData.user.fullAddress.street || '');
    }, [cartData]);

    return (
        <div className="  flex items-center justify-center">
            <div className="text-center ">
                <p className="text-right mb-8" onClick={closeModal}>X</p>
                <p className="text-3xl text-center  underline HomeArrival-title">
                    EDIT ADDRESS
                </p>
                <form className="py-4" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap mb-4">
                        <input
                            type="number"
                            name="floor"
                            placeholder="Floor"
                            value={floor}
                            onChange={(e) => setFloor(e.target.value)}
                            className="px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
                            required
                        />
                        <span className="contactUsDescription-span"></span>
                        <input
                            type="text"
                            name="building"
                            placeholder='Building'
                            value={building}
                            onChange={(e) => setBuilding(e.target.value)}
                            className=" md:mt-0 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
                            required
                        />
                    </div>
                    <div className="flex flex-wrap mb-4">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
                            required
                        />
                        <span className="contactUsDescription-span"></span>
                        <input
                            type="text"
                            name="street"
                            placeholder="Street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            className=" md:mt-0 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black contactUs-input"
                            required
                        />
                    </div>
                    <textarea
                        className="w-full px-4 py-2 h-28 bg-gray-100 focus:outline-none  text-lg text-black"
                        placeholder="Additional description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="description"
                        required
                    ></textarea>
                    <button
                        className="bg-white text-red-700 font-bold py-2 px-6 border border-red-700 text-lg inline-block mt-5 flex ml-auto justify-center"
                        type="submit"
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CartAddress;