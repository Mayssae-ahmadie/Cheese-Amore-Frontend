import DeliveryBanner from "../Components/DeliveryBanner";
import NavBar from "../Components/NavBar";
import HomepageHeader from "../Components/Header";
import HomepageAbout from "../Components/About";
import HomepageBoards from "../Components/Boards";
import HomepageGrazing from "../Components/Grazing";
import QualityBanner from "../Components/QualityBanner";
import Footer from "../Components/Footer"

function HomePage() {
    return (
        <div>
            <DeliveryBanner />
            <NavBar />
            <HomepageHeader />
            <HomepageAbout />
            <HomepageBoards />
            <HomepageGrazing />
            <QualityBanner />
            <Footer />
        </div>
    );
}

export default HomePage;