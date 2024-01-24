import NavBar from "../Components/NavBar";
import AboutSection from "../Components/AboutSection";
import AboutFaq from "../Components/AboutFaq";
import QualityBanner from "../Components/QualityBanner";
import Footer from "../Components/Footer";

function AboutPage() {
    return (
        <div>
            <NavBar />
            <AboutSection />
            <AboutFaq />
            <QualityBanner />
            <Footer />
        </div>
    );
}

export default AboutPage;