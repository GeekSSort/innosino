/**
 * Every service detail page is this data plus one shared template. The
 * Hardware & PCB Design entry is the copy that shipped as the standalone
 * /services page; the rest were written to the same brief and structure.
 */
export interface ServiceStage {
  stage: string;
  title: string;
  desc: string;
}

export interface ServiceItem {
  num: string;
  title: string;
  desc: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceProject {
  category: string;
  title: string;
  desc: string;
  image: string;
}

export interface Service {
  slug: string;
  title: string;
  /** Hero sub-heading. */
  description: string;
  processStages: ServiceStage[];
  onDemandServices: ServiceItem[];
  whyUsPoints: ServiceItem[];
  faqs: ServiceFaq[];
  /**
   * Only the disciplines with photographed work carry this. The template drops
   * the section entirely rather than showing invented case studies.
   */
  projects?: ServiceProject[];
}

export const services: Service[] = [
  {
    slug: "hardware-pcb-design",
    title: "Hardware & PCB Design",
    description:
      "We transform schematic concepts into production-ready PCB designs, delivering reliable circuit and layout engineering built for real-world performance and seamless manufacturing.",
    processStages: [
      {
        stage: "Stage 01",
        title: "Requirements & Schematic",
        desc: "We lock the electrical requirements, select components against cost and availability, and produce a reviewed schematic.",
      },
      {
        stage: "Stage 02",
        title: "Layout & Routing",
        desc: "Stack-up, placement, and routing with impedance, thermal, and EMI considerations built into the layout itself.",
      },
      {
        stage: "Stage 03",
        title: "Prototype Fabrication",
        desc: "Fast-turn boards are fabricated and assembled so the design meets hardware before it meets a customer.",
      },
      {
        stage: "Stage 04",
        title: "Bring-up & Testing",
        desc: "Hands-on bring-up, signal probing, and stress testing to surface edge cases before pilot production runs.",
      },
      {
        stage: "Stage 05",
        title: "DFM Review & Production Handoff",
        desc: "A final manufacturability pass, then a documentation package your contract manufacturer can build from directly.",
      },
    ],
    onDemandServices: [
      {
        num: "01",
        title: "Schematic Capture",
        desc: "Circuit design and component selection built around your BOM and cost targets.",
      },
      {
        num: "02",
        title: "PCB Layout & Routing",
        desc: "Placement and routing across single to high-density multilayer stack-ups.",
      },
      {
        num: "03",
        title: "Signal Integrity & EMI/EMC",
        desc: "Impedance-controlled routing and grounding strategy, planned before layout begins.",
      },
      {
        num: "04",
        title: "DFM / DFA Review",
        desc: "Every board checked against real assembly tolerances before it reaches fabrication.",
      },
      {
        num: "05",
        title: "Prototyping & Bring-up",
        desc: "Fast-turn prototypes and hands-on bring-up so issues surface in the lab.",
      },
      {
        num: "06",
        title: "Testing & Validation",
        desc: "Functional and environmental testing against the product's real operating conditions.",
      },
      {
        num: "07",
        title: "Component Sourcing",
        desc: "BOM management with sourcing and availability checks against your target volumes.",
      },
    ],
    whyUsPoints: [
      {
        num: "01",
        title: "Engineering + Innovation",
        desc: "We design to your specifications while identifying overlooked details that help prevent issues before production.",
      },
      {
        num: "02",
        title: "Cost Optimized Development",
        desc: "Stack-up, placement, and routing with impedance, thermal, and EMI considerations built into the layout itself.",
      },
      {
        num: "03",
        title: "Full Cycle, One Team",
        desc: "Idea through production under one roof no gap between the schematic team and the people who build it.",
      },
      {
        num: "04",
        title: "Manufacturing Ready Files",
        desc: "Documentation that matches the silkscreen, so your contract manufacturer builds it right the first time.",
      },
      {
        num: "05",
        title: "Cross Industry Experience",
        desc: "From consumer electronics to biomedical we bring constraints from one industry into another.",
      },
      {
        num: "06",
        title: "Direct Engineering Access",
        desc: "You talk to the engineer laying out your board, not a project manager relaying messages.",
      },
    ],
    faqs: [
      {
        q: "What does the Hardware & PCB Design service include?",
        a: "Our Hardware & PCB design service covers schematic architecture, component sourcing & BOM management, multilayer PCB stack-up design, impedance control, SI/PI analysis, DFM/DFA fabrication checks, fast-turn prototyping, and full manufacturing documentation handoff.",
      },
      {
        q: "How many layers can you design for?",
        a: "We routinely engineer 2 to 16+ layer boards ranging from standard double-sided microcontrollers to high-density interconnect (HDI) multilayer RF and FPGA carrier boards.",
      },
      {
        q: "What tools and platforms do you design around?",
        a: "Layout is done in Altium Designer. The STM32 family covers most of our control and processing designs, with FreeRTOS and LVGL for the firmware and display layer.",
      },
      {
        q: "Do you support the handoff to manufacturing?",
        a: "Yes. We generate turnkey manufacturing packages including Gerbers, drill files, IPC-2581/ODB++ packages, pick-and-place files, and detailed assembly drawings. We also coordinate directly with fabrication and assembly houses.",
      },
      {
        q: "Can you take over a board that's already in progress?",
        a: "Absolutely. We can perform schematic & layout reviews, identify bugs or EMI issues, optimize the BOM for supply chain constraints, or redesign existing layouts for cost reduction and scale.",
      },
    ],
    projects: [
      {
        category: "SMART IoT",
        title: "Sensor Node & Gateway Boards",
        desc: "Multilayer control boards for field sensors and gateways wireless connectivity, low-power design, and connector layouts built for industrial enclosures.",
        image: "/service_page/Sensor Node and Gateway Boards.jpg",
      },
      {
        category: "BIOMEDICAL",
        title: "Wearable & Monitoring Boards",
        desc: "Space-constrained PCB layouts for wearable and biomedical devices, engineered for low power consumption, reliable EMI performance, and seamless integration into compact, skin-safe enclosures.",
        image: "/service_page/Wearable and Monitoring Boards.png",
      },
      {
        category: "RENEWABLE ENERGY",
        title: "Power & Metering Boards",
        desc: "High-current PCB layouts for power conversion and smart metering systems, engineered with optimized trace routing, thermal management, and stack-up planning for reliable, long-term performance.",
        image: "/service_page/Power and Metering Boards.png",
      },
    ],
  },
  {
    slug: "product-development",
    title: "Product Development",
    description:
      "We take a product from an early requirement to a manufacturable design, covering architecture, industrial design, mechanical integration, and prototyping. Every decision is made against cost, compliance, and volume targets.",
    processStages: [
      { stage: "Stage 01", title: "Requirements & Feasibility", desc: "We turn the product brief into measurable requirements, then test them against cost, power, size, and regulatory constraints before an approach is committed." },
      { stage: "Stage 02", title: "Concept & System Architecture", desc: "Block-level architecture fixing the split between electronics, mechanics, and software, with the interfaces and trade-offs each subsystem has to live with." },
      { stage: "Stage 03", title: "Industrial Design & Enclosure", desc: "Form, materials, and interaction developed alongside the enclosure, so ergonomics and tooling constraints are resolved while the internals are still movable." },
      { stage: "Stage 04", title: "Integration & Prototype Iteration", desc: "Mechanical, electronic, and software subsystems come together in working prototypes, then iterate in realistic conditions against measured behaviour rather than assumed behaviour." },
      { stage: "Stage 05", title: "Certification, Pilot & Launch", desc: "Compliance testing planned early, then a pilot build that proves the process, fixtures, and documentation before the first full production order." },
    ],
    onDemandServices: [
      { num: "01", title: "Feasibility Study", desc: "Technical and commercial feasibility assessed against your cost, power, size, and timeline constraints." },
      { num: "02", title: "System Architecture", desc: "Subsystem partitioning and interface definition across electronics, mechanics, and software." },
      { num: "03", title: "Industrial Design", desc: "Form, materials, and finish developed with tooling, assembly, and cost constraints in view." },
      { num: "04", title: "Enclosure & Mechanical Design", desc: "3D modelling, tolerance stack-ups, and fit checks for moulded, machined, or printed parts." },
      { num: "05", title: "Prototype Builds", desc: "Functional and appearance prototypes built for lab testing, user evaluation, and demonstration." },
      { num: "06", title: "Certification Planning", desc: "Standards mapping and pre-compliance testing so approvals do not stall your launch." },
      { num: "07", title: "Pilot Production Support", desc: "Pilot runs, process documentation, and test fixtures that prepare the line for volume." },
    ],
    whyUsPoints: [
      { num: "01", title: "One Team, Whole Programme", desc: "The same engineers carry a product from requirement to pilot build, so nothing is lost handing work between separate suppliers." },
      { num: "02", title: "Feasibility Before Commitment", desc: "We test the hard assumptions early, so cost, power, and compliance risks surface while they are still cheap to design around." },
      { num: "03", title: "Designed for the Factory", desc: "Tooling, assembly, and test constraints enter the design at concept stage rather than arriving as rework after the first pilot build." },
      { num: "04", title: "Hardware and Software Together", desc: "Electronics, enclosure, and firmware are developed against one architecture, so interfaces are agreed before either side is expensive to change." },
      { num: "05", title: "Cross-Industry Constraints", desc: "Work across consumer, industrial, biomedical, and energy products means the constraints of one sector routinely improve the design of another." },
      { num: "06", title: "Direct Engineering Access", desc: "You talk to the engineers making the trade-offs on your product, at review points where decisions are recorded rather than assumed." },
    ],
    faqs: [
      { q: "What does the Product Development service cover?", a: "It runs from requirements capture and feasibility through system architecture, industrial design, enclosure and mechanical engineering, electronics and firmware, prototyping, certification planning, and pilot production. You can take the full programme or join at a single stage." },
      { q: "How is this different from your Hardware & PCB Design service?", a: "Hardware & PCB Design is board-level work: schematic, layout, and manufacturing files. Product Development sits above it, owning the architecture, enclosure, mechanical integration, and compliance path, and drawing in the PCB, firmware, and manufacturing services as the programme needs them." },
      { q: "Can you start from a rough idea rather than a written specification?", a: "Yes. We open with a feasibility phase that converts the idea into measurable requirements, a block-level architecture, and an early cost and risk view. You decide whether to continue before detailed design spend begins." },
      { q: "Do you handle certification and compliance?", a: "We plan for it from the architecture stage, map the product to the standards applicable in its target markets, and run pre-compliance checks on prototypes. Formal testing is carried out at accredited laboratories, and we prepare the technical file and support the retest cycle." },
      { q: "What happens once the design is finished?", a: "We run a pilot build to validate the process, fixtures, and documentation, then hand over a complete package covering mechanical and electrical data, the BOM, and assembly and test instructions. We can stay involved through the first production batches and manage engineering changes." },
    ],
  },
  {
    slug: "embedded-system-design",
    title: "Embedded System Design",
    description:
      "We turn hardware requirements into firmware that runs reliably on real silicon, delivering drivers, RTOS architecture, and communication stacks built for production hardware and long deployment cycles.",
    processStages: [
      { stage: "Stage 01", title: "Requirements & MCU Selection", desc: "We map firmware requirements to peripherals, memory, and power budget, then select an MCU or SoC against availability and toolchain support." },
      { stage: "Stage 02", title: "Firmware Architecture", desc: "Task decomposition, RTOS or bare-metal decision, interrupt priorities, and memory layout defined before the first driver is written." },
      { stage: "Stage 03", title: "Board Bring-up & Drivers", desc: "Clock tree, boot sequence, and peripheral drivers brought up on real hardware, with each interface verified on a scope or analyser." },
      { stage: "Stage 04", title: "Application & Connectivity", desc: "Application logic, communication stacks, and low-power state machines built on the driver layer, then measured against the power budget." },
      { stage: "Stage 05", title: "Validation & Release", desc: "Regression testing, fault injection, and a signed release image with bootloader and OTA path documented for production." },
    ],
    onDemandServices: [
      { num: "01", title: "MCU & SoC Selection", desc: "Peripheral, memory, and power analysis matched to your firmware and supply constraints." },
      { num: "02", title: "Board Bring-up", desc: "Clock, boot, and peripheral bring-up on new hardware, verified against the schematic." },
      { num: "03", title: "RTOS & Bare-metal Firmware", desc: "FreeRTOS, Zephyr, or bare-metal architecture chosen against real timing requirements." },
      { num: "04", title: "Peripheral Drivers", desc: "SPI, I2C, UART, CAN, USB, and ADC drivers written against the datasheet." },
      { num: "05", title: "Communication Stacks", desc: "BLE, Wi-Fi, LoRa, Modbus, and MQTT integration with reconnect and retry handling." },
      { num: "06", title: "Low-Power Design", desc: "Sleep-mode state machines and wake sources measured against your battery life target." },
      { num: "07", title: "Bootloader & OTA", desc: "Dual-bank update flow with image verification and rollback on failed boots." },
    ],
    whyUsPoints: [
      { num: "01", title: "Firmware Written for the Board", desc: "We read your schematic before writing drivers, so the firmware matches the pin map, clock tree, and power rails you actually built." },
      { num: "02", title: "Hardware and Firmware Together", desc: "The same team handles the board and the code, so bring-up issues get traced to the right layer instead of bouncing between vendors." },
      { num: "03", title: "Timing You Can Verify", desc: "Interrupt latency and task deadlines are measured on hardware with a logic analyser, not assumed from the datasheet." },
      { num: "04", title: "Power Budget Held to Target", desc: "Sleep states and duty cycles are profiled on a current meter, so battery life is a measurement rather than an estimate." },
      { num: "05", title: "Field-Serviceable Releases", desc: "Bootloader, OTA path, and rollback are designed in from the start, so a deployed unit can be updated without a site visit." },
      { num: "06", title: "Direct Engineering Access", desc: "You talk to the engineer writing your firmware, not a project manager relaying messages." },
    ],
    faqs: [
      { q: "What does the Embedded System Design service include?", a: "The service covers MCU and SoC selection, firmware architecture, board bring-up, peripheral driver development, RTOS integration, communication stacks, low-power state machines, bootloader and OTA design, and validation testing on production hardware." },
      { q: "Which microcontrollers and processors do you work with?", a: "Most of our control and processing designs use the STM32 family, with ESP32, nRF52, and PIC used where connectivity or cost drives the choice. For Linux-class work we build on i.MX and Rockchip SoCs with Yocto or Buildroot images." },
      { q: "Do you use an RTOS or bare-metal firmware?", a: "It depends on the timing and concurrency requirements. Simple sensor and control loops run faster and more predictably bare-metal, while designs with concurrent stacks, filesystems, or multiple communication interfaces are built on FreeRTOS or Zephyr." },
      { q: "Can you support over-the-air updates?", a: "Yes. We implement dual-bank or A/B bootloaders with signed image verification, CRC checks, and automatic rollback on a failed boot, delivered over BLE, Wi-Fi, or a cellular link depending on the product." },
      { q: "Can you take over firmware that is already written?", a: "Yes. We review existing codebases for timing bugs, stack overflows, and peripheral misconfiguration, refactor drivers onto a maintainable HAL, and port firmware to a new MCU when the original part goes end-of-life." },
    ],
  },
  {
    slug: "software-integration",
    title: "Software Integration",
    description:
      "We connect embedded devices to the software that runs them, delivering firmware-to-cloud pipelines, APIs, and interfaces that stay reliable once real fleets are in the field.",
    processStages: [
      { stage: "Stage 01", title: "Integration Scoping", desc: "We map every data path from device to user, then fix the protocols, payload formats, and update cadence before any code is written." },
      { stage: "Stage 02", title: "Device Interface & Provisioning", desc: "Firmware-side connectivity, BLE or Wi-Fi provisioning flows, and credential handling so a device joins a network without a technician present." },
      { stage: "Stage 03", title: "Backend & API Development", desc: "MQTT brokers, REST endpoints, and storage schemas sized to your message rate, with authentication and device identity built in from the start." },
      { stage: "Stage 04", title: "Application Layer", desc: "Mobile and web dashboards that read live telemetry, expose device controls, and stay usable when the connection drops mid-session." },
      { stage: "Stage 05", title: "Field Testing & Deployment", desc: "Load testing, reconnection and sync behaviour under poor coverage, then deployment with logging and OTA update paths already in place." },
    ],
    onDemandServices: [
      { num: "01", title: "Device-to-Cloud Pipelines", desc: "Telemetry paths from sensor to database, sized around your real message rates." },
      { num: "02", title: "MQTT & REST APIs", desc: "Broker topology, topic design, and documented endpoints your team can build against." },
      { num: "03", title: "BLE & Wi-Fi Provisioning", desc: "Onboarding flows that get a device onto a network without a technician." },
      { num: "04", title: "Mobile & Web Dashboards", desc: "Live telemetry, device control, and history views on phone and desktop." },
      { num: "05", title: "Offline Sync & Buffering", desc: "Local queues and conflict handling so lost coverage does not lose data." },
      { num: "06", title: "Security & Authentication", desc: "Device identity, TLS transport, token-based auth, and role-scoped access control." },
      { num: "07", title: "Third-Party Platform Integration", desc: "Connections into ERP, analytics, billing, or existing IoT platforms you already run." },
    ],
    whyUsPoints: [
      { num: "01", title: "Firmware and Cloud Together", desc: "The same team writes the device code and the service it talks to, so protocol decisions are made once instead of negotiated across vendors." },
      { num: "02", title: "Built for Poor Connectivity", desc: "We design for dropped links, buffering, and reconnection first, because field devices spend real time outside good coverage." },
      { num: "03", title: "Security From the First Commit", desc: "Device identity, encrypted transport, and key handling are part of the architecture, not a hardening pass added before launch." },
      { num: "04", title: "Documented Interfaces", desc: "Every API and message schema ships with documentation, so your internal team or a later vendor can extend it without reverse engineering." },
      { num: "05", title: "Scoped to Real Volumes", desc: "Infrastructure sized against your expected fleet size and message rate, so hosting cost tracks the product rather than a template." },
      { num: "06", title: "Direct Engineering Access", desc: "You talk to the engineer writing your integration layer, not a project manager relaying messages." },
    ],
    faqs: [
      { q: "What does the Software Integration service include?", a: "The service covers device-side connectivity firmware, provisioning flows over BLE and Wi-Fi, MQTT and REST backends, data storage and sync, authentication and device identity, mobile and web dashboards, and integration with third-party platforms you already use." },
      { q: "Which protocols and cloud platforms do you work with?", a: "MQTT and HTTPS/REST cover most device traffic, with WebSockets where a dashboard needs a live stream and CoAP or Modbus where the device dictates it. We deploy on AWS, Azure, and Google Cloud, and can work against an existing IoT platform rather than replacing it." },
      { q: "Can you work with hardware we already have in the field?", a: "Yes. We can write against an existing firmware interface, or add a connectivity layer to deployed devices where the hardware allows an OTA update. Where the current protocol is undocumented, we start by characterising the traffic on the wire." },
      { q: "How do you handle devices that lose connectivity?", a: "Devices buffer readings locally and replay them on reconnect, with timestamps applied at capture rather than at upload. Dashboards show last-seen state clearly instead of presenting stale data as live." },
      { q: "Do you build the mobile and web applications as well?", a: "Yes. We build cross-platform mobile apps and web dashboards on top of the same API layer, covering device pairing, live telemetry, control actions, alerting, and user role management." },
    ],
  },
  {
    slug: "industrial-automation",
    title: "Industrial Automation",
    description:
      "We turn process requirements into working control systems, delivering PLC, sensing, and SCADA engineering built to run continuously on a live factory floor.",
    processStages: [
      { stage: "Stage 01", title: "Process Audit & Control Specification", desc: "We walk the line, map the sequence of operations, and write an I/O list and control narrative the whole build works from." },
      { stage: "Stage 02", title: "Architecture & Panel Design", desc: "Controller selection, network topology, and panel layout, with fieldbus segments and power distribution planned before any wiring drawing is issued." },
      { stage: "Stage 03", title: "PLC Logic & HMI Development", desc: "Structured ladder and IEC 61131-3 code with interlocks, alarms, and HMI screens written against the control narrative agreed at the outset." },
      { stage: "Stage 04", title: "Simulation & Factory Acceptance", desc: "Logic is exercised against simulated I/O and then hardware, so sequence and fault handling are proven before the panel ships." },
      { stage: "Stage 05", title: "Commissioning & Handover", desc: "On-site loop checks, tuning, and operator training, closed out with wiring drawings, tag lists, and source code you own." },
    ],
    onDemandServices: [
      { num: "01", title: "PLC & Controller Programming", desc: "Ladder, structured text, and function block logic across major controller platforms." },
      { num: "02", title: "SCADA & HMI Development", desc: "Operator screens, alarm handling, and historian tags built around the actual process." },
      { num: "03", title: "Industrial Networking", desc: "Modbus, CAN, Profinet, EtherNet/IP, and OPC UA integration across mixed vendor equipment." },
      { num: "04", title: "Sensing & Instrumentation", desc: "Sensor selection, signal conditioning, and 4-20 mA or IO-Link loop engineering." },
      { num: "05", title: "Motor & Drive Control", desc: "VFD and servo integration with motion profiling, feedback loops, and drive commissioning." },
      { num: "06", title: "Condition Monitoring", desc: "Vibration, current, and thermal monitoring feeding predictive maintenance thresholds and trend data." },
      { num: "07", title: "Retrofit & Legacy Integration", desc: "Protocol gateways and edge nodes that bring older machines onto a modern network." },
    ],
    whyUsPoints: [
      { num: "01", title: "Controls and Hardware Together", desc: "The team writing your PLC logic also designs the boards and sensor interfaces, so field problems do not fall between two vendors." },
      { num: "02", title: "Vendor Neutral Integration", desc: "We specify controllers and drives on fit and lifecycle support rather than a distribution agreement, and we work across mixed installed bases." },
      { num: "03", title: "Built for the Plant Floor", desc: "Enclosure rating, isolation, surge protection, and cable routing treated as design inputs, not corrections made during commissioning." },
      { num: "04", title: "Safety Designed In", desc: "Emergency stop circuits, guarding interlocks, and safe states defined at the architecture stage and verified before the line runs." },
      { num: "05", title: "Documented and Maintainable", desc: "Commented source, tag databases, and wiring drawings handed over so your maintenance team can change logic without calling us." },
      { num: "06", title: "Direct Engineering Access", desc: "You talk to the engineer who wrote the logic and stood at the panel, not a coordinator relaying notes from site." },
    ],
    faqs: [
      { q: "What does the Industrial Automation service include?", a: "The service covers process audit and control narratives, control panel and I/O architecture, PLC and controller programming, HMI and SCADA development, drive and motion integration, industrial networking, and on-site commissioning with full documentation handover." },
      { q: "Which controllers and protocols do you work with?", a: "We program mainstream PLC and PAC platforms in IEC 61131-3 languages, and also build controllers around STM32 and industrial Linux where an off-the-shelf PLC is not the right fit. On the network side we work with Modbus RTU and TCP, CAN and CANopen, Profinet, EtherNet/IP, and OPC UA." },
      { q: "Can you automate existing machines rather than new lines?", a: "Yes. Retrofits are a large part of the work: we reverse-engineer the existing sequence, add sensing and a modern controller, and use protocol gateways or edge nodes to bring legacy equipment onto an OPC UA or MQTT layer without replacing the machine." },
      { q: "How do you handle safety and environmental requirements?", a: "Safety functions are specified with the control narrative, with hardwired emergency stop circuits and defined safe states independent of the process logic. Panels and field electronics are designed for the actual environment, covering IP rating, temperature range, vibration, isolation, and surge protection." },
      { q: "What does predictive maintenance involve in practice?", a: "We instrument the assets that matter with vibration, motor current, and temperature sensing, then log the data through the PLC or an edge gateway to build baselines. Alerts run on trends and thresholds derived from that data rather than fixed calendar intervals." },
    ],
  },
  {
    slug: "manufacturing-support",
    title: "Manufacturing Support",
    description:
      "We take a validated design into volume, handling manufacturability review, supplier selection, and pilot builds. Your product reaches the line with documentation, fixtures, and test coverage already in place.",
    processStages: [
      { stage: "Stage 01", title: "DFM & DFA Assessment", desc: "We audit the released design against real assembly tolerances, panelisation limits, and test access before any tooling money is committed." },
      { stage: "Stage 02", title: "BOM & Supply Chain Preparation", desc: "Every line item is checked for lifecycle status, lead time, and second sources, with alternates qualified against the original footprint." },
      { stage: "Stage 03", title: "Manufacturer Selection & Onboarding", desc: "We shortlist contract manufacturers on capability and volume fit, run the quoting round, and transfer the build package directly." },
      { stage: "Stage 04", title: "Pilot Run & First Article", desc: "A controlled low-volume build with first-article inspection, cross-section checks where needed, and a written record of every deviation found." },
      { stage: "Stage 05", title: "Yield Analysis & Ramp", desc: "Test data from the pilot drives process and design corrections, then the build package is frozen for sustained production." },
    ],
    onDemandServices: [
      { num: "01", title: "DFM / DFA Review", desc: "Manufacturability and assembly checks against your chosen line's real process limits." },
      { num: "02", title: "CM Selection & Liaison", desc: "Sourcing, quoting, and day-to-day technical liaison with your contract manufacturer." },
      { num: "03", title: "BOM & Supply Chain Management", desc: "Lifecycle checks, alternate qualification, and sourcing against your target build volumes." },
      { num: "04", title: "Test Jig & Fixture Design", desc: "Bed-of-nails and functional fixtures with the test software that drives them." },
      { num: "05", title: "Pilot Production Runs", desc: "Controlled low-volume builds that expose process issues before the ramp begins." },
      { num: "06", title: "First Article Inspection", desc: "Dimensional, electrical, and workmanship verification of the first units off the line." },
      { num: "07", title: "Compliance Documentation", desc: "RoHS, REACH, and IPC-class evidence packaged for auditors and customs alike." },
    ],
    whyUsPoints: [
      { num: "01", title: "Engineers On The Line", desc: "The people who review your build package understand the circuit behind it, so process questions get answered without a translation layer." },
      { num: "02", title: "Vendor Neutral Sourcing", desc: "We select manufacturers on capability and price for your volume, not on a standing relationship we are obliged to feed." },
      { num: "03", title: "Test Coverage Before Ramp", desc: "Fixtures and functional test scripts are ready at pilot stage, so yield data exists before the first production order lands." },
      { num: "04", title: "Supply Chain Realism", desc: "Alternates are qualified and footprints checked ahead of time, so a single obsolete part does not stop a scheduled build." },
      { num: "05", title: "Documentation That Matches Reality", desc: "Assembly drawings, work instructions, and revision control kept in step with what the line actually builds, not the original intent." },
      { num: "06", title: "Single Point Of Ownership", desc: "One team carries the design intent through DFM, pilot, and ramp, so nothing is lost in the handover to production." },
    ],
    faqs: [
      { q: "What does the Manufacturing Support service include?", a: "It covers DFM and DFA review, BOM and supply-chain management, contract-manufacturer selection and liaison, test-jig and fixture design, pilot production runs, first-article inspection, yield analysis, and compliance documentation. In short, everything between a validated design and a stable production line." },
      { q: "Can you work with a design we developed elsewhere?", a: "Yes. We start with a manufacturability and test-coverage audit of your existing package (Gerbers, ODB++ or IPC-2581, BOM, and assembly drawings), then flag the changes needed before the design is quoted for volume." },
      { q: "Do you select the contract manufacturer or do we?", a: "The decision stays with you. We shortlist candidates against your volume, IPC class, and certification requirements, run the RFQ, compare quotes on a like-for-like basis, and then handle the technical liaison once you have chosen." },
      { q: "What do you build for test at pilot stage?", a: "Typically an in-circuit or bed-of-nails fixture for board-level coverage plus a functional test jig that exercises the product through its real interfaces. Each ships with test software, pass or fail criteria, and a logged result per serial number." },
      { q: "How do you handle component obsolescence during a production run?", a: "The BOM is monitored for lifecycle and last-time-buy notices, and we qualify form-fit-function alternates ahead of need. Where no drop-in exists, we scope the layout or firmware change and route it through a documented revision rather than an unrecorded line substitution." },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const serviceSlugs = services.map((s) => s.slug);
