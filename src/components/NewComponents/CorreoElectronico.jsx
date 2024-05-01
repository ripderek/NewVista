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
  Checkbox,
} from "@material-tailwind/react";

export function CorreoElectronico() {
  return (
    <Card
      color="transparent"
      shadow={false}
      className="mx-auto container w-full items-center max-w-[50rem]"
    >
      <Typography variant="h2" color="blue-gray">
        Contacto
      </Typography>

      <form className="mt-8 mb-2 w-full shadow-2xl p-5 ">
        <div className="mb-1 flex flex-col gap-6 ">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Nombre
          </Typography>
          <Input
            size="lg"
            placeholder=""
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Correo electrónico:
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Mensaje:
          </Typography>
          <textarea
            type="text"
            size="lg"
            className=" border-2 border-blue-gray-100 rounded-lg"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>

        <Button className="mt-6" fullWidth color="red">
          Enviar
        </Button>
      </form>
    </Card>
  );
}
export default CorreoElectronico;
