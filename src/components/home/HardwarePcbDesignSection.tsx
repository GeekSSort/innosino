import ServiceMediaSection from "./ServiceMediaSection";
import type { HomePageData } from "@/sanity/queries";


export default function HardwarePcbDesignSection({ data }: { data: HomePageData["serviceMedia"][number] }) {
  return <ServiceMediaSection {...data} />;
}
