import { LoaderIcon } from "lucide-react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="loader animate-spin">
      <LoaderIcon />
    </div>
  );
};

export default Loader;
