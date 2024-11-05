import Footer from "../components/footer/Footer";
import NavBar from "../components/navbar/Navbar";
import { ChildrenProps } from "../interfaces/childrenElements";

const PublicLayout = ({ children }: ChildrenProps) => {
  return (
    <>
      <NavBar />
      <div className="body-content container">{children}</div>
      <Footer />
    </>
  );
};

export default PublicLayout;
