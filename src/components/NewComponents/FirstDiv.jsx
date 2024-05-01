import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";

export function FirstDiv() {
  return (
    <div className="relative min-h-screen w-full">
      <header
        className="grid !min-h-[30rem] "
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(150,0,0,0.8), rgba(150,0,0,0.8)), url('/image/fondo.jpg')",
        }}
      >
        {/* 
      <header className="grid !min-h-[30rem] bg-red-700 ">
      */}
        <div className="container mx-auto mt-14 grid h-full w-full grid-cols-1 place-items-center lg:mt-14 lg:grid-cols-2">
          <div className="col-span-1">
            <Typography variant="h1" color="white" className="mb-4">
              Bienvenido a <br /> Comisariato Polita
            </Typography>
            <Typography
              variant="lead"
              className="mb-7 !text-white md:pr-16 xl:pr-28"
            >
              Tu destino para productos frescos y de calidad.
            </Typography>
          </div>
          <Image
            width={900}
            height={200}
            src="/image/PolitaPNG5.png"
            alt="team work"
            className="col-span-1 my-20 h-full max-h-[60rem] -translate-y-32 md:max-h-[350rem] lg:my-0 lg:ml-auto lg:max-h-[40rem] lg:translate-y-0"
          />
        </div>
      </header>
      <div className="mx-8 lg:mx-16 -mt-24 rounded-xl bg-white p-5 md:p-14 shadow-2xl">
        <div>
          <Typography variant="h3" color="blue-gray" className="mb-3">
            ¿Quiénes Somos?
          </Typography>
          <Typography
            variant="paragraph"
            className="font-normal !text-gray-700 lg:w-5/12"
          >
            Somos una tienda comprometida con la satisfacción de nuestros
            clientes. Ofrecemos una amplia variedad de productos frescos y de
            calidad.
          </Typography>
        </div>
      </div>
    </div>
  );
}
export default FirstDiv;
