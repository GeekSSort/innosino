import ServiceMediaSection from "./ServiceMediaSection";
import { serviceMedia } from "@/content/home";

const data = serviceMedia.find((s) => s.id === "industrial-automation")!;

export default function IndustrialAutomationSection() {
  return <ServiceMediaSection {...data} />;
}
