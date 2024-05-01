//Este es un nuevo archivo que no se habia usado en el proyecto anterior sirve como un rotueador parecedio a nodejs

import {
  UserCircleIcon,
  ChartBarSquareIcon,
  AdjustmentsHorizontalIcon,
  CodeBracketIcon,
  BookmarkSquareIcon,
  ClipboardDocumentCheckIcon,
  ArrowsRightLeftIcon,
  ArrowsUpDownIcon,
  ShareIcon,
  CheckCircleIcon,
  CommandLineIcon,
} from "@heroicons/react/24/solid";
//Importa todos los componentes que tiene la carpta MenuLateral mediante el index.js
//import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
//aqui es para particionar la barra en otra seccion
//import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard/SIOA",
    //        layout: "dashboard/SYSPRO",
    title: "SIOIA",
    pages: [
      {
        icon: <BookmarkSquareIcon {...icon} />,
        name: "Guias (Touch)",
        path: "/Guias",
        //element: <Notifications />,
      },
      {
        icon: <ClipboardDocumentCheckIcon {...icon} />,
        name: "Procesar Pedidos",
        path: "/ProcesarPedidos",
        //element: <Notifications />,
      },
      {
        icon: <CodeBracketIcon {...icon} />,
        name: "Scripts Varios",
        path: "/Scripts",
        //element: <Notifications />,
      },
      {
        icon: <ArrowsRightLeftIcon {...icon} />,
        name: "Ruta OIA",
        path: "/RutaOIA",
        //element: <Notifications />,
      },
      //RtsRutasVendedor

      {
        icon: <ArrowsUpDownIcon {...icon} />,
        name: "Ruta CW",
        path: "/RutaCW",
        //element: <Notifications />,
      },
      {
        icon: <ShareIcon {...icon} />,
        name: "RtsRutasVendedor",
        path: "/RtsRutasVendedor",
        //element: <Notifications />,
      },
    ],
  },
  {
    title: "Syspro",
    layout: "dashboard/SYSPRO",
    pages: [
      {
        icon: <UserCircleIcon {...icon} />,
        name: "SalesPerson",
        path: "/SalesPerson",
        //element: <Notifications />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "ArCustomer",
        path: "/ArCustomer",
        //element: <Notifications />,
      },
    ],
  },
  {
    title: "Fact",
    layout: "dashboard/FACT",
    pages: [
      {
        icon: <CheckCircleIcon {...icon} />,
        name: "Auth Notas de credito",
        path: "/NotasCredito",
        //element: <Notifications />,
      },
    ],
  },
  //para otras acciones rapidas
  {
    title: "Otros",
    layout: "dashboard/Otros",
    pages: [
      {
        icon: <CommandLineIcon {...icon} />,
        name: "Formateador condicional",
        path: "/FormateadorCondicional",
        //element: <Notifications />,
      },
    ],
  },
];

export default routes;
