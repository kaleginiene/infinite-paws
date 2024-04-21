import Image from "next/image";
import pawLogo from "../../../../public/paw_logo.png";

const Header: React.FC = () => (
  <header className="bg-white w-full shadow-bottom fixed top-0">
    <div className="container py-[16px] flex items-center">
      <Image
        className="mr-4"
        src={pawLogo}
        width={50}
        height={50}
        alt="Paw logo"
      />
      <h1 className="font-bold text-purple-100">
        Purrfect Paws: Endless Cat Cuteness!
      </h1>
    </div>
  </header>
);

export default Header;
