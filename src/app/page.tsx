import About from "../../components/About";
import BrowseByCategory from "../../components/BrowseByCategory";
import CarFilterForm from "../../components/CarFilterForm";
import Hero from "../../components/Hero";

export default function Home() {
  return (
    <div className="w-full bg-[#fdfdfd] h-full">
      <Hero />
      <CarFilterForm />
      <About />
      <BrowseByCategory />
    </div>
  );
}
