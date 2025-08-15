import CarFilterForm from "../../components/CarFilterForm";
import Hero from "../../components/Hero";

export default function Home() {
  return (
    <div className="w-full bg-[#fdfdfd] h-full">
      <Hero />
      <CarFilterForm />
    </div>
  );
}
