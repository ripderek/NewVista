import {
  Navbar,
  FirstDiv,
  Features,
  DocumentosElectronicos,
  CorreoElectronico,
  Footer,
} from "@/components/NewComponents";
export default function Home() {
  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Navbar />
      <div id="first-div">
        <FirstDiv />
      </div>
      <div id="features">
        <Features />
      </div>
      <div id="documentos-electronicos">
        <DocumentosElectronicos />
      </div>
      <div id="correo-electronico">
        <CorreoElectronico />
      </div>
      <Footer />
    </div>
  );
}
Home.displayName = "/src/layout/dashboard.jsx";
///src/layout/dashboard.jsx
//export default Home;
