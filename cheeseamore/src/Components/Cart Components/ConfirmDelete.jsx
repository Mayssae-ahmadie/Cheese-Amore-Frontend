function ConfirmDelete({ closeModal, onConfirm }) {
    const handleConfirm = () => {
        onConfirm();
        closeModal();
    };

    return (
        <div className="flex items-center justify-center">
            <div className="text-center">
                <p className="text-2xl m-12 w-2/3 mx-auto">
                    Are you sure you want to remove this product from your cart?
                </p>
                <div className="flex justify-end bg-gray-100 p-6 items-center">
                    <button className="bg-white text-red-700 font-bold py-1 px-2 w-32 text-lg inline-block  mr-4" onClick={closeModal}>
                        CANCEL
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="bg-[#E6C068] text-black font-bold py-1 px-2 w-32 text-lg inline-block "
                    >
                        CONFIRM
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDelete;