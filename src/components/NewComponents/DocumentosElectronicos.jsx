import React from "react";
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
  return (
    <section className="py-14 ">
      <div className="container mx-auto mb-20 text-center px-9">
        <Typography variant="h2" color="blue-gray" className="">
          Buscar y Descargar Comprobantes Electrónicos
        </Typography>
        <div className="w-full mt-5">
          <Input
            label="Número de Factura:"
            icon={<MagnifyingGlassIcon className="h-5 w-5 cursor-pointer" />}
          />
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
