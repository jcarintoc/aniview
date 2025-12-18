import CatalogContainer from "@/components/features/catalog/CatalogContainer";
import Sidebar from "@/components/features/catalog/Sidebar";

const CatalogPage = () => {
  return (
    <div className="max-w-7xl mx-auto mt-24 p-3 sm:p-5">
      <div className="bg-accent/65 rounded-[1.25rem] p-2 flex flex-col md:flex-row gap-2">
        <Sidebar />

        <CatalogContainer />
      </div>
    </div>
  );
};

export default CatalogPage;
