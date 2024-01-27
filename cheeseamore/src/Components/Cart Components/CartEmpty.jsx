import { Link } from 'react-router-dom';
import EmptyCart from "../../Assets/Outofcheese.png";


function CartEmpty() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center mt-[-15%]">
                <img src={EmptyCart} ></img>
                <Link to='/Shop '> <button className="bg-[#E6C068] text-black font-bold rounded-lg shadow-md mt-5 py-1 px-2 w-32 text-lg inline-block">
                    SHOP NOW
                </button></Link>
            </div>
        </div>
    );
}

export default CartEmpty;