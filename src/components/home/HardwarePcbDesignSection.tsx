import ServiceMediaSection from "./ServiceMediaSection";

export default function HardwarePcbDesignSection() {
  return (
    <ServiceMediaSection
      id={"hardware-pcb-design"}
      videoSrc={"/homepage_assets/Hardware and PCB Design.mp4"}
      posterSrc={"/posters/homepage_assets/Hardware and PCB Design.webp"}
      scrimOpacity={0.12}
      title={"Hardware & PCB Design"}
      body={"Hardware & PCB Design delivers reliable, high-performance circuits engineered for efficient, scalable, and robust electronic systems."}
    />
  );
}
