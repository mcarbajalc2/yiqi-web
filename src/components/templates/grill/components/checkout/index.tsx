import { Radio } from "lucide-react";
import Evento from "./landing/event";
import Feature, { FeatureText } from "./landing/feats";
import Footer from "./landing/footer";
import ImageGallery from "./landing/gallery";
import Header from "./landing/header";
import VideoBackground from "./landing/herobg";
import Navbar, { GrillNavbarProps } from "./landing/navbar";
import PrecioEvento from "./landing/pricing";
import { Container, Main, Section } from "./mainLayout";
import {
  Network,
  MessageSquare,
  Utensils,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

// fake data

// video background and navbar
const cta = "List";
const videoUrl = "/video.mp4";
const navItems = [
  {
    href: "#",
    label: "new list item",
  },
];

// header
const headerCta = "submit";
const headerDescription = "this is Adino labs Grill tech meet up event ";
const headerTitle = "The Best tech Grill meeting in Peru";
const headerTitleSecondary = "Meet with the best";

// event

const motionHeader = "¿Qué es el TECH GRILL?";
const videoSrc = "/2.mp4";
const videoText = "Tu navegador no soporta el elemento de video.";
const balanceText = `
  ¡Descubre TECH GRILL! Este evento único combina aprendizaje,
  diversión y networking en un ambiente relajado. Disfruta de una
  deliciosa parrillada y vino mientras interactúas con personas
  influyentes y aprendes de expertos en innovación y tecnologías
  emergentes. ¡Una experiencia imperdible!
`;
const paymentText = "Comprar Entrada";

// features
const featMotion1 = "¿Qué encontrarás en el TECH GRILL?";
const featMotion2 =
  "Una experiencia única que combina tecnología, networking y diversión";
const featCta = "Reserva tu lugar";

const featureText: FeatureText[] = [
  {
    icon: <Network className="h-8 w-8 text-orange-500" />,
    title: "Conexiones Clave",
    description:
      "Accede a una red de desarrolladores, fundadores de startups y líderes en innovación.",
    href: "#",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-orange-500" />,
    title: "Charlas Interactivas",
    description:
      "Aprende de expertos de la industria en sesiones prácticas y dinámicas.",
    href: "#",
  },
  {
    icon: <Utensils className="h-8 w-8 text-orange-500" />,
    title: "Networking con Sabor",
    description:
      "Disfruta de una parrillada y bebidas mientras te conectas con otros asistentes.",
    href: "#",
  },
];

// pricing

const title = "Tech Grill: Edición Halloween";
const priceDescription = "S/. 65";
const dateTime = "Sábado 2 de Noviembre, 7:00 PM - 10:00 PM";
const location = "Los Laureles 104, Santiago de Surco 15023";
const texts = [
  "Acceso exclusivo al evento y charlas",
  "Networking con líderes e innovadores de la industria tech",
  "Dinamicas de networking efectivo y divertido",
  "Parrillada y bebidas incluidas durante todo el evento"
]

const priceCta = "Comprar Entrada";
const priceVideoSrc = "/output.mp4";
const priceVideoText = "Tu navegador no soporta el elemento de video.";

// Gallery props

const galleryHeader = "Así lo pasamos en nuestros eventos";
const galleryImages = [
  "/fotos/1701239260065.jpg",
  "/fotos/1707745815195.jpg",
  "/fotos/1707745820545.jpg",
  "/fotos/1708979881903.jpg",
  "/fotos/1708979896325.jpg",
  "/fotos/1708979896795.jpg",
  "/fotos/1713030447411.jpg",
  "/fotos/1713030448746.jpg",
  "/fotos/1713030449380.jpg",
  "/fotos/1716477639767.jpg",
  "/fotos/1716477639866.jpg",
];

export default function Home() {
  return (
    <>
      <VideoBackground videoUrl={videoUrl} />
      <Navbar cta={cta} navItems={navItems} />
      <Main>
        <Container>
          <Section>
            <Header
              cta={headerCta}
              headerDescription={headerDescription}
              headerTitle={headerTitle}
              headerTitleSecondary={headerTitleSecondary}
            />
            <Evento
              motionHeader={motionHeader}
              balanceText={balanceText}
              paymentText={paymentText}
              videoSrc={videoSrc}
              videoText={videoText}
            />
            <Feature
              featCta={featCta}
              featMotion1={featMotion1}
              featMotion2={featMotion2}
              featureText={featureText}
            />
            <PrecioEvento
              cta={priceCta}
              description={priceDescription}
              dateTime={dateTime}
              location={location}
              balanceText={balanceText}
              title={title}
              videoSrc={priceVideoSrc}
              videoText={priceVideoText}
              texts={texts}
            />
            <ImageGallery 
              header1={galleryHeader}
              images={galleryImages}
            />
            <Footer />
          </Section>
        </Container>
      </Main>
    </>
  );
}
