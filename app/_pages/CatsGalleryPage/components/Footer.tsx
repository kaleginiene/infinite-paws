const Footer: React.FC = () => (
  <footer className="py-[24px] w-full bg-white h-[90px]">
    <div className="container">
      <p className="text-center text-gray-300">{new Date().getFullYear()}</p>
      <p className="text-sm text-center text-gray-300">
        Createad by dog lovers to cat lovers
      </p>
    </div>
  </footer>
);

export default Footer;
