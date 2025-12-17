import { Spinner } from "./ui/spinner";

const PageSpinner = () => {
  return <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black/20 backdrop-blur-sm">
    <Spinner className="size-10 animate-spin" />
  </div>;
};

export default PageSpinner;
