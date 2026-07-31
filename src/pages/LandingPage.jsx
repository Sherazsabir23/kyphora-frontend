import Hero from "../components/landing/Hero";
import TrustedBy from "../components/landing/TrustedBy";
import Features from "../components/landing/Features";
import DashboardPreview from "../components/landing/DashboardPreview";
import HowItWorks from "../components/landing/HowItWorks";
import WhyChooseUs from "../components/landing/WhyChooseUs";
import Testimonials from "../components/landing/Testimonials";
import SecurityFeatures from "../components/landing/SecurityFeatures";
import FAQ from "../components/landing/FAQ";
import CTA from "../components/landing/CTA";

const LandingPage = () => {
    return (
        <>
            <Hero />
            <TrustedBy />
            <Features />
            <DashboardPreview />
            <HowItWorks />
            <WhyChooseUs />
            <SecurityFeatures />
            <Testimonials />
            <FAQ />
            <CTA />
        </>
    );
};

export default LandingPage;