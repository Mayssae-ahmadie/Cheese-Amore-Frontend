import { useNavigate } from 'react-router-dom';

function Logout({ closeLogoutModal }) {
    const navigate = useNavigate();

    const Logout = () => {
        localStorage.clear();
        closeLogoutModal();
        navigate('/LogIn');
    };

    return (
        <div className="flex items-center justify-center">
            <div className="text-center">
                <p className="text-2xl m-12 w-2/3 mx-auto">
                    Are you sure you want to log out?
                </p>
                <div className="flex justify-end bg-gray-100 p-6 items-center">
                    <button className="bg-[#E6C068] text-black  font-bold py-1 px-2 w-32 text-lg inline-block  mr-4"
                        onClick={closeLogoutModal}>
                        CANCEL
                    </button>
                    <button
                        onClick={Logout}
                        className="bg-[#E6C068] text-black font-bold py-1 px-2 w-32 text-lg inline-block"
                    >
                        CONFIRM
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Logout;