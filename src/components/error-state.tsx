import ErrorGif from "@/assets/something-went-wrong.gif";
import { Button } from "./ui/button";
import { RotateCcw } from "lucide-react";
import { Spinner } from "./ui/spinner";

interface ErrorStateProps {
  refetch: () => void;
  isFetching: boolean;
}

const ErrorState = ({ refetch, isFetching }: ErrorStateProps) => {
  return (
    <div className="font-secondary flex flex-col gap-8 items-center mt-40 p-4">
      <div className="overflow-hidden shadow-lg ">
        <img src={ErrorGif} alt="Something went wrong" className="w-full" />
      </div>

      <div className="space-y-2 text-center">
        <h1 className="text-2xl sm:text-3xl font-medium">
          Something went wrong
        </h1>
        <p className="text-base">please try again</p>
      </div>

      <Button className="font-default" onClick={refetch} disabled={isFetching}>
        {isFetching ? (
          <>
            <Spinner className="size-4 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            <RotateCcw className="size-4" />
            Try again
          </>
        )}
      </Button>
    </div>
  );
};

export default ErrorState;
