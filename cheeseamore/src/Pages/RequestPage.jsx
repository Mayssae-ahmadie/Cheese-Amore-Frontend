import NavBar from "../Components/NavBar";
import RequestSection from "../Components/RequestSection";
import RequestForm from "../Components/RequestForm";
import QualityBanner from "../Components/QualityBanner";
import Footer from "../Components/Footer";


function ContactPage() {
    return (
        <div>
            <NavBar />
            <RequestSection />
            <RequestForm />
            <QualityBanner />
            <Footer />
        </div>
    );
}

export default ContactPage;