import ServiceMediaSection from "./ServiceMediaSection";
import { serviceMedia } from "@/content/home";

const data = serviceMedia.find((s) => s.id === "hardware-pcb-design")!;

export default function HardwarePcbDesignSection() {
  return <ServiceMediaSection {...data} />;
}
