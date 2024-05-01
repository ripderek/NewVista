import React from "react";
import { Typography } from "@material-tailwind/react";

import {
  CursorArrowRaysIcon,
  HeartIcon,
  LightBulbIcon,
  LockClosedIcon,
} from "@heroicons/react/24/solid";

export function Features() {
  return (
    <section className="py-14 ">
      <div className="container mx-auto mb-20 text-center">
        <Typography variant="h2" color="blue-gray">
          Acerca de
        </Typography>
        <Typography
          variant="lead"
          className="mx-auto w-full px-4 !text-gray-700 lg:w-11/12 lg:px-8 "
        >
          En Comisariato Polita, nos esforzamos por brindar una experiencia de
          compra excepcional. Nuestro equipo está comprometido con la excelencia
          en el servicio al cliente y la calidad de nuestros productos.
        </Typography>
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
export default Features;
