// Uncomment the following lines to run portfolio and comment BrowserRouter Code Block in App.jsx
// import About from "./component/Portfolio/About/About";
// import Contact from "./component/Portfolio/Contact/Contact";
// import Footer from "./component/Portfolio/Footer/Footer";
// import HeroSection from "./component/Portfolio/HeroSection/HeroSection";
// import Navbar from "./component/Portfolio/Navbar/Navbar";
// import Project from "./component/Portfolio/Project/Project";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./component/FormLearnings/ProductForm/ProductList";
import ProductDetail from "./component/FormLearnings/ProductForm/ProductDetail";
import CreateAssignment from "./component/FormLearnings/assignment/CreateAssignment";
import CreateProduct from "./component/FormLearnings/ProductForm/CreateProduct";
import EditProduct from "./component/FormLearnings/ProductForm/EditProduct";
import EventRegistration from "./component/FormLearnings/EventRegistration/EventRegistration";
import AssignmentList from "./component/FormLearnings/assignment/AssignmentList";
function App() {
  return (
    <>
      {/* Uncomment this to run portfolio and comment BrowserRouter Code Block */}
      {/* <Navbar />
      <HeroSection />
      <About />
      <Project />
      <Contact />
      <Footer /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/:id/edit" element={<EditProduct />} />
          <Route path="/products" element={<ProductList />} />
          {/* <Route path="/assignments/new" element={<CreateAssignment />} /> */}
          <Route path="/products/new" element={<CreateProduct />} />
          {/* <Route path="/event/new" element={<EventRegistration />} />
          <Route path="/assignments" element={<AssignmentList />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
