import React, { useState, useEffect } from "react";
import "../../CSS/Cart.css";
import axios from "axios";

function CartDetails({ openModal, openAddressModal, CartTable }) {
    const [shippingCost, setShippingCost] = useState(10);
    const [shippingMethod, setShippingMethod] = useState("delivery");
    const subtotal = localStorage.getItem("total");
    const [total, setTotal] = useState(0);
    const [cartData, setCartData] = useState("");

    const getCartItems = () => {
        const userId = localStorage.getItem("userId");
        axios.get(`${process.env.REACT_APP_URL}/cart/getByUserID/${userId}`)
            .then(response => {
                setCartData(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching cart data:", error);
            });
        console.log(cartData);
    }

    getCartItems();

    // const userAddress = cartData.user?.fullAddress;
    // console.log(cartData);
    // const userCity = cartData.user?.city;

    useEffect(() => {
        // Convert subtotal to integer using parseInt
        const subtotalInt = parseInt(subtotal);

        // Check if subtotalInt is a valid number
        if (!isNaN(subtotalInt)) {
            // Calculate newTotal with subtotalInt
            const newTotal = subtotalInt + (shippingMethod === "delivery" ? shippingCost : 0);

            // Set total with newTotal
            setTotal(newTotal);
        } else {
            console.error("Subtotal is not a valid number.");
        }
    }, [subtotal, total, shippingMethod, shippingCost]);


    const handleShippingMethodChange = (event) => {
        const method = event.target.value;
        setShippingMethod(method);
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
            </form>
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
        </div>
    );
}

export default CartDetails;