import React, { useState, useEffect } from "react";
import {
  CursorArrowRaysIcon,
  HeartIcon,
  LightBulbIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

export function DocumentosElectronicos() {
  const [numeroDocumento, setDocumento] = useState("");
  const [inputValue, setInputValue] = useState("001-010-000000000");

  const handleInputChange = (event) => {
    const { value } = event.target;
    const paddedValue = value.padStart(9, "0");
    setDocumento(value);
    const formattedValue = `001-010-${paddedValue.slice(-9)}`;
    setInputValue(formattedValue);
    console.log(formattedValue);
  };
  return (
    <section className="py-14 ">
      <div className="container mx-auto mb-20 text-center px-9">
        <Typography variant="h2" color="blue-gray" className="">
          Buscar y Descargar Comprobantes Electrónicos
        </Typography>
        <div className="w-full mt-5 flex">
          <Input
            label="Número de documento:"
            value={numeroDocumento}
            // onChange={(e) => setDocumento(e.target.value)}
            onChange={handleInputChange}
          />
          <Tooltip content="Buscar Documento">
            <a
              href={`https://superdespensapolita.com/DocumentosElectronicos/Facturas/${inputValue}.pdf`}
              target="_blank"
            >
              <Button color="blue" className="ml-4">
                <MagnifyingGlassIcon className="h-4 w-4 cursor-pointer " />
              </Button>
            </a>
          </Tooltip>
        </div>
        {/* 
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 !text-gray-500 lg:w-11/12 lg:px-8 "
        >
          En Comisariato Polita, nos esforzamos por brindar una experiencia de
          compra excepcional. Nuestro equipo está comprometido con la excelencia
          en el servicio al cliente y la calidad de nuestros productos.
        </Typography>
        */}
      </div>
      {/* 
      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-4 gap-y-12 md:grid-cols-2">
        {FEATURES.map((props, idx) => (
          <FeatureCard key={idx} {...props} />
        ))}
      </div>
      */}
    </section>
  );
}
export default DocumentosElectronicos;
