import Hero from '../components/sections/Hero';
import PopularCourses from '../components/sections/PopularCourses';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import PlacementStats from '../components/sections/PlacementStats';
import RecruitmentPartners from '../components/sections/RecruitmentPartners';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <PopularCourses />
      <WhyChooseUs />
      <PlacementStats />
      <RecruitmentPartners />
      <Testimonials />
      <CTA />
    </>
  );
}
