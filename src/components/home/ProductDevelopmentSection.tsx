import ServiceMediaSection from "./ServiceMediaSection";
import type { HomePageData } from "@/sanity/queries";


export default function ProductDevelopmentSection({ data }: { data: HomePageData["serviceMedia"][number] }) {
  return <ServiceMediaSection {...data} />;
}
