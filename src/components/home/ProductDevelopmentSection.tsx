import ServiceMediaSection from "./ServiceMediaSection";
import { serviceMedia } from "@/content/home";

const data = serviceMedia.find((s) => s.id === "product-development")!;

export default function ProductDevelopmentSection() {
  return <ServiceMediaSection {...data} />;
}
