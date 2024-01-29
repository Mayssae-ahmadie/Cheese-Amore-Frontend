import React, { useState, useEffect } from "react";
import "../../CSS/Cart.css";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    addDays,
    isAfter,
    isBefore,
    setHours,
    format,
} from 'date-fns';
import { useToasts } from 'react-toast-notifications';

function CartDetails({ openModal, openAddressModal, CartTable }) {
    const userId = localStorage.getItem('userId');
    const [shippingCost, setShippingCost] = useState(10);
    const [shippingMethod, setShippingMethod] = useState("delivery");
    const subtotal = localStorage.getItem("total");
    const [total, setTotal] = useState(0);
    const [cartData, setCartData] = useState("");
    const [receiveDateTime, setReceiveDateTime] = useState(null);
    const { addToast } = useToasts();

    const getCartItems = () => {
        const userId = localStorage.getItem("userId");
        axios.get(`${process.env.REACT_APP_URL}/cart/getByUserID/${userId}`)
            .then(response => {
                setCartData(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching cart data:", error);
            });
    }

    getCartItems();

    // const userAddress = cartData.user?.fullAddress;
    // console.log(cartData);
    // const userCity = cartData.user?.city;

    useEffect(() => {
        // Convert subtotal to integer using parseInt
        const subtotalInt = parseInt(subtotal);
        console.log(subtotal);

        // Check if subtotalInt is a valid number
        if (!isNaN(subtotalInt)) {
            // Calculate newTotal with subtotalInt
            const newTotal = subtotalInt + (shippingMethod === "delivery" ? shippingCost : 0);

            // Set total with newTotal
            setTotal(newTotal);
            console.log(subtotal, newTotal);
            localStorage.setItem("Totals", newTotal);
        } else {
            console.error("Subtotal is not a valid number.");
        }
    }, [subtotal, total, shippingMethod, shippingCost]);

    const handleShippingMethodChange = (event) => {
        const method = event.target.value;
        setShippingMethod(method);
    };


    const handleDateTime = async (selectedDateTime) => {
        if (!userId) {
            console.error('You must be logged in to schedule your delivery or pickup slot');
            return;
        }

        try {
            // if (!isWithinTimeRange(selectedDateTime)) {
            //     console.error('Delivery and Pickup are only available from 10 am to 10 pm');
            //     return;
            // }

            console.log('Delivery or pickup slot was scheduled successfully');
            setReceiveDateTime(selectedDateTime);
        } catch (error) {
            console.error('Error handling delivery or pickup date and time:', error.message);
        }
    };

    const minDate = new Date('2024-01-29');
    const maxDate = addDays(new Date('2024-06-29'), 180); // 180 days from today

    const isWithinTimeRange = (date) => {
        const startHour = 10;
        const endHour = 20;

        return (
            isAfter(date, setHours(date, startHour)) &&
            isBefore(date, setHours(date, endHour))
        );
    };

    const formatDateTime = (receiveDateTime) => {
        // Parse the string into a Date object
        const dateTime = new Date(receiveDateTime);

        // Extract components
        const month = dateTime.toLocaleString('en-US', { month: 'long' });
        const day = dateTime.getDate();
        const year = dateTime.getFullYear();

        // Convert to 12-hour format
        let hour = dateTime.getHours();
        const am_pm = hour >= 12 ? "PM" : "AM";
        hour = hour % 12;
        hour = hour ? hour : 12; // Handle midnight (0:00) as 12 AM

        // Format the output
        const formattedDateTime = `${month} ${day}, ${year} and ${hour}:00${am_pm}`;

        console.log(formattedDateTime); // Output: January 1, 2022 and 12:00PM
        console.log(receiveDateTime);
    };

    return (
        <div className="cartDetails-cont p-8 scale-90 mt-4">
            <p className="text-3xl italic mb-9 ml-8 CartDetails-Title">Choose shipping method</p>
            <form>
                <div className="flex justify-between CartDetails-form">
                    <div className="ml-12 CartDetails-input">
                        <div className="mb-4">
                            <label className="text-2xl">
                                <input
                                    type="radio"
                                    className="mr-4"
                                    name="shippingMethod"
                                    value="delivery"
                                    checked={shippingMethod === "delivery"}
                                    onChange={handleShippingMethodChange}
                                />
                                Delivery (preorder 3-4 days) - 10 $
                                {/* <p className="text-lg ml-8 italic">
                                    {userCity}, {userAddress.street},  {userAddress.building}, Floor: {userAddress.floor}
                                    <a onClick={openAddressModal} className="underline ml-4 not-italic">Edit address</a>
                                </p> */}
                            </label>
                        </div>
                        <div className="mb-4">
                            <label className="text-2xl">
                                <input
                                    type="radio"
                                    className="mr-4"
                                    name="shippingMethod"
                                    value="pick up"
                                    checked={shippingMethod === "pick up"}
                                    onChange={handleShippingMethodChange}
                                />
                                Pickup - free
                            </label>
                        </div>

                        <div>
                            <p className="text-3xl italic mb-9 mt-12 CartDetails-Title">Schedule date and time </p>
                            <DatePicker
                                selected={receiveDateTime}
                                onChange={(date) => {
                                    const dateTime = new Date(date); // Parse the selected date
                                    const formattedDateTime = dateTime.toLocaleString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                    });

                                    console.log(formattedDateTime); // Output the formatted date and time
                                    localStorage.setItem("date", formattedDateTime)
                                }}
                                dateFormat="MM/dd/yyyy h:mm aa"
                                minDate={minDate}
                                maxDate={maxDate}
                                showTimeSelect
                                timeIntervals={60}
                                timeFormat="HH:mm aa"
                                value={setReceiveDateTime}
                            />

                        </div>
                    </div>
                    <div className="flex gap-60 CartDetails-receipt">
                        <div>
                            <p className="text-xl mb-4 italic">Subtotal</p>
                            <p className="text-xl mb-4 italic">Shipping</p>
                            <p className="text-xl mb-4 italic">Total</p>
                        </div>
                        <div>
                            <p className="text-xl mb-4 italic">{subtotal} $</p>
                            <p className="text-xl mb-4 italic">{shippingMethod === "delivery" ? `${shippingCost} $` : "-"}</p>
                            <p className="text-xl mb-4 italic">{total} $</p>
                        </div>
                    </div>
                </div>
            </form >
            <div className="flex justify-end">
                <button
                    onClick={() => openModal(shippingMethod)}
                    className="bg-[#E6C068] text-black font-bold py-3 px-2 w-96 text-lg inline-block mt-5 flex justify-center checkout-button"
                >
                    <p className="cartDetails-checkout">
                        CHECKOUT<span className="ml-12">{total} $ </span>{" "}
                    </p>
                    <br /><p> </p>
                    <p className="font-normal italic whitespace-pre"> (cash on delivery)</p>
                </button>
            </div>
        </div >
    );
}

export default CartDetails;