import NavBar from "../Components/NavBar";
import ContactSection from "../Components/ContactSection";
import ContactUsForm from "../Components/ContactUsForm";
import QualityBanner from "../Components/QualityBanner";
import Footer from "../Components/Footer";


function ContactPage() {
    return (
        <div>
            <NavBar />
            <ContactSection />
            <ContactUsForm />
            <QualityBanner />
            <Footer />
        </div>
    );
}

export default ContactPage;