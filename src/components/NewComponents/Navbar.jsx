import React from "react";
import {
  Navbar as MTNavbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Carousel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, XCircleIcon } from "@heroicons/react/24/outline";

/* 
interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}
function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <Typography
        as="a"
        href={href || "#"}
        target={href ? "_blank" : "_self"}
        variant="small"
        className="font-medium"
      >
        {children}
      </Typography>
    </li>
  );
}
*/
export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const [VerCarrusel, setVerCarruel] = React.useState(false);
  function handleOpen() {
    setOpen((cur) => !cur);
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <MTNavbar
      fullWidth
      shadow={false}
      blurred={false}
      //color={isScrolling ? "black" : "transparent"}
      color={isScrolling ? "red" : "white"}
      className="fixed top-0 z-50 border-0"
    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          as="a"
          href="https://www.material-tailwind.com"
          target="_blank"
          variant="h6"
          color={isScrolling ? " white" : "black"}
        >
          Comisariato Polita
        </Typography>
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? "text-white" : "  text-gray-900"
          }`}
        >
          <Typography
            href="#first-div"
            as="a"
            variant="small"
            className="font-medium"
          >
            Quiénes Somos
          </Typography>
          <Typography
            href="#features"
            as="a"
            variant="small"
            className="font-medium"
          >
            Acerca de
          </Typography>
          <Typography
            href="#documentos-electronicos"
            as="a"
            variant="small"
            className="font-medium"
          >
            Facturación Electrónica
          </Typography>
          <Typography
            href="#correo-electronico"
            as="a"
            variant="small"
            className="font-medium"
          >
            Contacto
          </Typography>

          {/*  <NavItem href="https://www.material-tailwind.com/docs/react/installation">
            Docs
          </NavItem>*/}
        </ul>

        <div className="hidden gap-2 lg:flex lg:items-center">
          {/* 
          <IconButton
            variant="text"
            color={isScrolling ? "white" : "gray"}
            size="sm"
          >
            <i className="fa-brands fa-twitter text-base" />
          </IconButton>
          <IconButton
            variant="text"
            color={isScrolling ? "white" : "gray"}
            size="sm"
          >
            <i className="fa-brands fa-facebook text-base" />
          </IconButton>
          <IconButton
            variant="text"
            color={isScrolling ? "white" : "gray"}
            size="sm"
          >
            <i className="fa-brands fa-instagram text-base" />
          </IconButton>
          
          <a href="https://www.material-tailwind.com/blocks" target="_blank">
            <Button color={isScrolling ? "gray" : "white"} size="sm">
              Blocks
            </Button>
          </a>
          */}
        </div>
        <IconButton
          variant="text"
          color={isScrolling ? "white" : "gray"}
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-4 rounded-lg border-t border-blue-gray-50 bg-white px-6 py-5">
          <ul className="flex flex-col gap-4 text-blue-gray-900">
            <Typography
              href="#first-div"
              as="a"
              variant="small"
              className="font-medium"
            >
              Quiénes Somos
            </Typography>
            <Typography
              href="#features"
              as="a"
              variant="small"
              className="font-medium"
            >
              Acerca de
            </Typography>
            <Typography
              href="#documentos-electronicos"
              as="a"
              variant="small"
              className="font-medium"
            >
              Facturación Electrónica
            </Typography>
            <Typography
              href="#correo-electronico"
              as="a"
              variant="small"
              className="font-medium"
            >
              Contacto
            </Typography>
          </ul>
          {/* 
          <div className="mt-4 flex items-center gap-2">
            <IconButton variant="text" color="gray" size="sm">
              <i className="fa-brands fa-twitter text-base" />
            </IconButton>
            <IconButton variant="text" color="gray" size="sm">
              <i className="fa-brands fa-facebook text-base" />
            </IconButton>
            <IconButton variant="text" color="gray" size="sm">
              <i className="fa-brands fa-instagram text-base" />
            </IconButton>
          </div>
          */}
        </div>
      </Collapse>
      <IconButton
        size="lg"
        color="white"
        className={`fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900 shadow-2xl border-x-4 border-y-4 p-8 
         bg-blue-900`}
        ripple={false}
        href="https://www.facebook.com/despensapolita.bf?mibextid=LQQJ4d"
      >
        <a
          href="https://www.facebook.com/despensapolita.bf?mibextid=LQQJ4d"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <i className="fa-brands fa-facebook text-4xl text-white " />*/}
          <svg
            class="w-12 h-12 text-white text-4xl"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </IconButton>
      <IconButton
        size="lg"
        color="white"
        className={`fixed bottom-28 right-8 z-40 rounded-full shadow-blue-gray-900 shadow-2xl border-x-4 border-y-4 p-8 
         bg-green-600`}
        ripple={false}
      >
        <a
          href="https://wa.me/593980903968?text=Hola"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            class="w-12 h-12 text-white text-4xl"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M12 4a8 8 0 0 0-6.895 12.06l.569.718-.697 2.359 2.32-.648.379.243A8 8 0 1 0 12 4ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.96 9.96 0 0 1-5.016-1.347l-4.948 1.382 1.426-4.829-.006-.007-.033-.055A9.958 9.958 0 0 1 2 12Z"
              clip-rule="evenodd"
            />
            <path
              fill="currentColor"
              d="M16.735 13.492c-.038-.018-1.497-.736-1.756-.83a1.008 1.008 0 0 0-.34-.075c-.196 0-.362.098-.49.291-.146.217-.587.732-.723.886-.018.02-.042.045-.057.045-.013 0-.239-.093-.307-.123-1.564-.68-2.751-2.313-2.914-2.589-.023-.04-.024-.057-.024-.057.005-.021.058-.074.085-.101.08-.079.166-.182.249-.283l.117-.14c.121-.14.175-.25.237-.375l.033-.066a.68.68 0 0 0-.02-.64c-.034-.069-.65-1.555-.715-1.711-.158-.377-.366-.552-.655-.552-.027 0 0 0-.112.005-.137.005-.883.104-1.213.311-.35.22-.94.924-.94 2.16 0 1.112.705 2.162 1.008 2.561l.041.06c1.161 1.695 2.608 2.951 4.074 3.537 1.412.564 2.081.63 2.461.63.16 0 .288-.013.4-.024l.072-.007c.488-.043 1.56-.599 1.804-1.276.192-.534.243-1.117.115-1.329-.088-.144-.239-.216-.43-.308Z"
            />
          </svg>
        </a>
      </IconButton>
      {VerCarrusel && (
        <Card
          className="mt-6 w-96 fixed bottom-8 left-2 z-40"
          color="transparent"
        >
          <CardHeader color="blue-gray" className="">
            <IconButton
              className="!absolute top-3 right-3 bg-yellow-600 shadow-none z-40"
              onClick={() => setVerCarruel(false)}
            >
              <XCircleIcon className="w-11" color="orange" />
            </IconButton>
            <Carousel loop={true} autoplay={true} className="rounded-xl">
              <img
                src="/Carrusel/1.jpg"
                alt="image 1"
                className="h-full w-full object-cover object-center"
              />
              <img
                src="/Carrusel/2.jpg"
                alt="image 2"
                className="h-full w-full object-cover object-center"
              />
              <img
                src="/Carrusel/3.jpg"
                alt="image 3"
                className="h-full w-full object-cover object-center"
              />
            </Carousel>
          </CardHeader>
        </Card>
      )}
    </MTNavbar>
  );
}

export default Navbar;
