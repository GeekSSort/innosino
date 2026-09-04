import ServiceMediaSection from "./ServiceMediaSection";
import { serviceMedia } from "@/content/home";

const data = serviceMedia.find((s) => s.id === "embedded-system-design")!;

export default function EmbeddedSystemDesignSection() {
  return <ServiceMediaSection {...data} />;
}
