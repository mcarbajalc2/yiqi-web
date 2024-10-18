import Evento from "./landing/event";
import Feature from "./landing/feats";
import Footer from "./landing/footer";
import ImageGallery from "./landing/gallery";
import Header from "./landing/header";
import VideoBackground from "./landing/herobg";
import Navbar, { GrillNavbarProps } from "./landing/navbar";
import PrecioEvento from "./landing/pricing";
import { Container, Main, Section } from "./mainLayout";

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
              featureText={}
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
              images={}
            />
            <Footer />
          </Section>
        </Container>
      </Main>
    </>
  );
}
