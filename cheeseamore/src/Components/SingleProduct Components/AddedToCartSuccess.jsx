function AddedToCartSuccess({ closeModal }) {
    return (
        <div className="  flex items-center justify-center">
            <div className="text-center">
                <p className="text-2xl m-12 w-2/3 mx-auto">
                    Product added to your cart successfully!
                </p>
                <div className="flex justify-end bg-gray-100 p-6 items-center">
                    <button
                        onClick={closeModal}
                        className="bg-[#E6C068] text-black font-bold py-1 px-2 w-32 text-lg inline-block " >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddedToCartSuccess;