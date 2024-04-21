import Image from "next/image";
import pawLogo from "../../../../public/paw_logo.png";

interface CatsLoaderProps {
  text?: string;
}

const CatsLoader: React.FC<CatsLoaderProps> = ({ text }) => (
  <div className="flex w-full justify-center my-[16px]">
    {text && <p className="mr-[16px]">{text}</p>}
    <Image
      className="animate-ping"
      src={pawLogo}
      width={20}
      height={20}
      alt="Loading paw"
    />
  </div>
);

export default CatsLoader;
