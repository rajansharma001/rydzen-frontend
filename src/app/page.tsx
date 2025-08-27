"use client";
import About from "../../components/About";
import BrowseByCategory from "../../components/BrowseByCategory";
import CarCard from "../../components/CarCard";
import CarFilterForm from "../../components/CarFilterForm";
import Hero from "../../components/Hero";

export default function Home() {
  return (
    <div className="w-full bg-[#fdfdfd]">
      <Hero />
      <CarFilterForm />
      <About />
      <BrowseByCategory />
      <CarCard />
    </div>
  );
}
