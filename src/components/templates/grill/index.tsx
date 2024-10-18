import Evento, { EventProps } from "./components/checkout/landing/event";
import Feature, { FeatureProps } from "./components/checkout/landing/feats";
import Footer from "./components/checkout/landing/footer";
import ImageGallery, { GalleryProps } from "./components/checkout/landing/gallery";
import Header from "./components/checkout/landing/header";
import VideoBackground from "./components/checkout/landing/herobg";
import Navbar from "./components/checkout/landing/navbar";
import PrecioEvento, { PricingProps } from "./components/checkout/landing/pricing";
import { Container, Main, Section } from "./components/checkout/mainLayout";
import { GrillHeaderProps } from "./components/checkout/landing/header";
import { GrillNavbarProps } from "./components/checkout/landing/navbar";
interface GrillTemplateTypes {
  videoBGurl: string;
  navProps: GrillNavbarProps;
  headerProps: GrillHeaderProps;
  eventProps: EventProps;
  featureProps: FeatureProps;
  pricingProps: PricingProps;
  galleryProps: GalleryProps;
}

export default function GrillTemplate(props: GrillTemplateTypes) {
  return (
    <>
      <VideoBackground videoUrl={props.videoBGurl} />
      <Navbar cta={props.navProps.cta} navItems={props.navProps.navItems} />
      <Main>
        <Container>
          <Section>
            <Header
              cta={props.headerProps.cta}
              headerDescription={props.headerProps.headerDescription}
              headerTitleSecondary={props.headerProps.headerTitleSecondary}
              headerTitle={props.headerProps.headerTitle}
            />
            <Evento 
              motionHeader={props.eventProps.motionHeader} 
              balanceText={props.eventProps.balanceText}
              paymentText={props.eventProps.paymentText} 
              videoSrc={props.eventProps.videoSrc} 
              videoText={props.eventProps.videoText} 
            />
            <Feature
              featCta={props.featureProps.featCta}
              featMotion1={props.featureProps.featMotion1}
              featMotion2={props.featureProps.featMotion2}
            />
            <PrecioEvento 
              cta={props.pricingProps.cta}
              description={props.pricingProps.description}
              dateTime={props.pricingProps.dateTime}
              location={props.pricingProps.location}
              balanceText={props.pricingProps.balanceText}
              title={props.pricingProps.title}
              videoSrc={props.pricingProps.videoSrc}
              videoText={props.pricingProps.videoText}
              text1={props.pricingProps.text1}
              text2={props.pricingProps.text2}
              text3={props.pricingProps.text3}
              text4={props.pricingProps.text4}
            />
            <ImageGallery
              header1={props.galleryProps.header1}
            />
            <Footer />
          </Section>
        </Container>
      </Main>
    </>
  );
}
