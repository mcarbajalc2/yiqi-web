import Faq from "./components/boot/faq";
import ContactSection from "./components/contactsection";
import { Curricula } from "./components/curricula/curricula";
import MinimalisticFooter, { SocialLink } from "./components/footer";
import ResponsiveVideoHero from "./components/hero/hero";
import Navbar from "./components/navbar/navbar";
import Pricing, { PriceGrid } from "./components/pricing";
import TrustedByCarousel from "./components/trusted/trusted";
import { Twitter, Instagram, Linkedin } from "lucide-react";

// nav bar

const url = [
  {
    link: "#curricula",
    text: "Curricula",
  },
  {
    link: "#precio",
    text: "Curricula",
  },
  {
    link: "https://youtu.be/es-E_6TAQrQ?si=x95Uck-wIdEvUzL1",
    text: "Nosotros",
  },
];

const cta = {
  link: "#contacto",
  text: "Registrate",
};

// ResponsiveVideoHero props

const videoProps = {
  videoSrc: "/e.mp4",
  videoText: "Your browser does not support the video tag.",
  title: "Impulsa tu carrera en inteligencia artificial",
  description:
    "Unete al futuro de la industria tecnologica con este bootcamp hecho por expertos de la industria",
  ctaUrl1: "#contacto",
  cta1: "Quiero empezar!",
  ctaUrl2: "#curricula",
  cta2: "Quiero saber más",
};

// trusted by carousel

const TrustedTitle = "Hemos capacitado a equipos de:";

// FAQ

const header1 = "¿Qué encontrarás en";
const header2 = " nuestro Bootcamp?";
const feat1 = {
  title: "Sesiones en vivo",
  subtitle:
    "Cada semana tendremos una sesión de capacitación con un experto en el tema con amplia experiencia",
};

const feat2 = {
  title: "Proyectos",
  subtitle:
    "Nuestro programa se enfoca en un 80% de práctica, con ejercicios, tareas y sesiones en vivo de programación, complementado por un 20% de teoría para consolidar los conceptos clave.",
};

const feat3 = {
  title: "Recompensas",
  subtitle:
    "Premios y recompensas sorpresa para bonificar la participación e innovación de los participantes.",
};

const feat4 = {
  title: "Mentorías",
  subtitle:
    "Te asignaremos mentores para que puedas resolver todas tus dudas en una sesión privada fuera de clases.",
};

// curricular
const curriculaTitle = "¿Cuál será el plan de estudios?";
const curriculaLink = {
  link: "/course",
  text: "Ver curricula completa",
};
const dummyContent = [
  {
    title: "Fundamentos de inteligencia artificial generativa",
    description: (
      <>
        <>
          En este modulo aprenderás las bases de que es la inteligencia
          artificial generativa y como funciona, exploraremos diversos casos de
          uso practicos en el día a dia, desde un enfoque poco tecnico para
          luego desentrañar como funcionan estas herramientas por detrás, a
          nivel de arquitectura de la solución.
        </>
        <>
          Este bootcamp está diseñado tanto para gerentes de producto como para
          ingenieros. Así que en este modulo aprenderás todo lo necesario para
          comprender los requerimientos que te llevaran a poder liderar un
          equipo de alta eficiencia para poder construir productos sobre la
          inteligencia artificial generativa.
        </>
      </>
    ),
    badge: "Introducción - primer modulo",
    image: "/genai.jpeg",
  },
  {
    title: "La arquitectura de una solución de AI",
    description: (
      <>
        En este modulo desentrañaremos lo que toma arquitectar una solución de
        inteligencia artificial desde 0, para lo cual tendremos en cuanta
        diversos conceptos requeridos para poder llevar a cabo la idea, como por
        ejemplo los diversos servicios de cloud los cuales pueden consumir, como
        tomar una desición de pricing y como ahorrar costos al momento de hacer
        una solución que requiera de esta tecnología.
      </>
    ),
    badge: "Arquitectura de una solución - Segundo módulo",
    image: "/arch.jpeg",
  },
  {
    title: "Desarrollo de una solución",
    description: (
      <>
        Hay miles de formas de poder desarrollar una solución de inteligencia
        artificial y diversos enfoques para poder llevarlas a cabo, sin embargo
        aveces no todos los caminos llegan a roma, por lo tanto en este modulo
        te enseñaremos como puedes implementar tu idea, con herramientas que te
        ayudarán a poder ahorrar mucho tiempo, al momento de hacer tu idea
        realidad y llevarlas al go to market, explicaremos cuando y cuando no
        utilizar langchain, explicaremos los diversos tipos de servicios que
        podemos utilizar para solucionar diversas problematicas además de como
        desarrollar utilizando frameworks de ultima generación como Next.js,
        Langchain, además de servicios de AWS y vercel para poder hacer el
        deploy.
      </>
    ),
    badge: "Desarrollo, implementación y despliegue - Tercer módulo",
    image: "/final.jpeg",
  },
];

// pricing props

const priceImg = "/spacex.jpg";
const priceTitle = "Nuestros precios";

const priceDetails: PriceGrid[] = [
  {
    price: "170",
    title: "Precio general",
    features: [
      "Acceso al bootcamp 4 fechas",
      "Material educativo",
      "Tutorías online",
      "Evento presencial networking",
    ],
  },
  {
    price: "100",
    title: "Precio Andino",
    subtitle: "(Descuento a miembros de Andino VIP)",
    features: [
      "Acceso al bootcamp 4 fechas",
      "Material educativo",
      "Tutorías online",
      "Evento presencial networking",
    ],
  },
];

// contact
const contactVid = "/c.mp4";
const contactText = "Your browser does not support the video tag.";
const contactHeader = [
  {
    header1: "Postula a nuestro ",
    header2: "bootcamp",
  },
];

// minimalistic footer
const footerImg = "/logoandino.svg";

const socials: SocialLink[] = [
  {
    url: "https://x.com/andino_labs",
    label: "Twitter",
    icon: Twitter,
  },
  {
    url: "https://www.instagram.com/andinolabs/",
    label: "Instagram",
    icon: Instagram,
  },
  {
    url: "https://www.linkedin.com/company/andino-labs/?originalSubdomain=pe",
    label: "LinkedIn",
    icon: Linkedin,
  },
];

export default async function BootcampTemplate1() {
  return (
    <main className="absolute flex flex-col max-w-screen items-center justify-center w-full md:px-16 p-7">
      <Navbar imgSrc="" url={url} cta={cta} />
      <ResponsiveVideoHero videoProps={videoProps} />
      <TrustedByCarousel title={TrustedTitle} />
      <Faq
        feat1={feat1}
        feat2={feat2}
        feat3={feat3}
        feat4={feat4}
        header1={header1}
        header2={header2}
      />
      <Curricula
        dummyContent={dummyContent}
        title={curriculaTitle}
        url={curriculaLink}
      />
      <Pricing
        imageSrc={priceImg}
        priceDetails={priceDetails}
        title={priceTitle}
      />
      <ContactSection
        header={contactHeader}
        videoSrc={contactVid}
        videoText={contactText}
      />
      <MinimalisticFooter imageSrc={footerImg} socials={socials} />
    </main>
  );
}
