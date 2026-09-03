"use client";

import React from "react";
import Image from "next/image";

// Sparkle Icon matching Figma node 1498:14140 / 1498:14163 (width: 19.786, height: 22.8, color: #D65900)
function SparkleIcon() {
  return (
    <svg
      width="20"
      height="23"
      viewBox="0 0 20 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <path
        d="M10 0.6C10 6.5 14.5 11 19.786 11C14.5 11 10 15.5 10 23.4C10 15.5 5.5 11 0.214 11C5.5 11 10 6.5 10 0.6Z"
        fill="#D65900"
      />
    </svg>
  );
}

// Arrow Icon for Buttons (45 deg diagonal arrow)
function ArrowUpRightIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <path
        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FeaturedProjectListSection() {
  return (
    <section
      style={{
        position: "relative",
        width: "1440px",
        backgroundColor: "rgba(255, 190, 3, 1)", // rgb(1, 0.745, 0.012) -> #FFBE03
        margin: "0 auto",
        paddingBottom: "132px",
      }}
    >
      {/* Section Header Text: Node 1498:14129 (x: 135, y: 64, w: 1170, h: 76) */}
      <div
        style={{
          padding: "64px 135px 0",
          width: "1440px",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <h2
          style={{
            margin: 0,
            width: "1170px",
            fontFamily: "'Urbanist', sans-serif",
            fontSize: "32px",
            fontWeight: 600,
            lineHeight: "1.2",
            color: "#000000",
            textAlign: "left",
          }}
        >
          Discover some of our latest projects, built to solve real-world problems with
          smart technology and innovative ideas.
        </h2>
      </div>

      {/* ========================================================
          STACKING CARDS CONTAINER
          Each card is position: sticky, so as the user scrolls the lower
          card slides up and lands on top of the card above it, leaving a
          small offset sliver of each previous card visible.
          ======================================================== */}
      <div
        style={{
          position: "relative",
          width: "1440px",
          boxSizing: "border-box",
          padding: "56px 135px 0",
        }}
      >

      {/* ========================================================
          CARD 1: Smart Musical Instruments
          Frame 1618873613: x: 135, y: 172, w: 1170, h: 442 (inner frame at y: 48, h: 394)
          Image: /homepage_assets/featured_project_images/guitar.png
          ======================================================== */}
      <div
        style={{
          position: "sticky",
          top: "96px",
          marginBottom: "47px",
          zIndex: 1,
          width: "1170px",
          height: "394px",
          borderRadius: "18px",
          backgroundColor: "#FFFDF9", // rgba(255, 250, 235, 1) -> #FFFDF9
          border: "0.6px solid rgba(255, 214, 98, 1)",
          boxShadow: "0 0 60px rgba(255, 228, 151, 0.5)",
          boxSizing: "border-box",
          padding: "32px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Content Area (w: 566px, h: 329px) */}
        <div
          style={{
            width: "566px",
            height: "329px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header & Subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {/* Sub Heading with Sparkle */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                height: "24px",
              }}
            >
              <SparkleIcon />
              <span
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "150%",
                  color: "#D65900",
                }}
              >
                Featured Project
              </span>
            </div>

            {/* Title */}
            <h3
              style={{
                margin: 0,
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "36px",
                fontWeight: 600,
                lineHeight: "1.2",
                color: "#000000",
              }}
            >
              Smart Musical Instruments
            </h3>

            {/* Description */}
            <p
              style={{
                margin: 0,
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "150%",
                color: "#333333",
              }}
            >
              Engineered six intelligent instruments with AI, DSP, and embedded technologies,
              delivering real-time audio processing, wireless connectivity, and patent-ready
              innovations.
            </p>
          </div>

          {/* Statistics Badge (Node 1498:14144: w: 293, h: 37, radius: 8px, bg: rgba(255,255,255,0.24)) */}
          <div
            style={{
              width: "fit-content",
              height: "37px",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              padding: "4px 16px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "24px",
                fontWeight: 600,
                color: "#000000",
              }}
            >
              6+
            </span>
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                color: "#333333",
                textTransform: "uppercase",
              }}
            >
              Smart Instruments Developed
            </span>
          </div>

          {/* Button (Node 1498:14148: w: 144, h: 44, radius: 100px, bg: #000000) */}
          <button
            type="button"
            style={{
              width: "144px",
              height: "44px",
              borderRadius: "100px",
              backgroundColor: "#000000",
              border: "none",
              padding: "12px 20px 12px 24px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              Know Details
            </span>
            <ArrowUpRightIcon />
          </button>
        </div>

        {/* Right Image Container (Node 1498:14151: w: 476, h: 330, radius: 16px) */}
        <div
          style={{
            position: "relative",
            width: "476px",
            height: "330px",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "#000000",
          }}
        >
          <Image
            src="/homepage_assets/featured_project_images/guitar.png"
            alt="Smart Musical Instruments"
            fill
            sizes="476px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* ========================================================
          CARD 2: PolyPan Electronic Handpan
          Frame 1618873614: x: 135, y: 613, w: 1170, h: 442 (inner frame at y: 48, h: 394) -> abs y: 661
          Image: /homepage_assets/featured_project_images/white_moontype.png
          ======================================================== */}
      <div
        style={{
          position: "sticky",
          top: "116px",
          marginBottom: "47px",
          zIndex: 2,
          width: "1170px",
          height: "394px",
          borderRadius: "18px",
          backgroundColor: "#FFFDF9",
          border: "0.6px solid rgba(255, 214, 98, 1)",
          boxShadow: "0 0 60px rgba(255, 228, 151, 0.4)",
          boxSizing: "border-box",
          padding: "32px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Content Area */}
        <div
          style={{
            width: "566px",
            height: "329px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header & Subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                height: "24px",
              }}
            >
              <SparkleIcon />
              <span
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "150%",
                  color: "#D65900",
                }}
              >
                Featured Project
              </span>
            </div>

            <h3
              style={{
                margin: 0,
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "36px",
                fontWeight: 600,
                lineHeight: "1.2",
                color: "#000000",
              }}
            >
              PolyPan Electronic Handpan
            </h3>

            <p
              style={{
                margin: 0,
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "150%",
                color: "#333333",
              }}
            >
              An intelligent electronic handpan combining 9-zone touch sensing, gesture
              control, and wireless MIDI to deliver a modern, expressive musical experience
              powered by embedded technology.
            </p>
          </div>

          {/* Statistics Badges (2 badges side by side) */}
          <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
            <div
              style={{
                height: "37px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                padding: "4px 16px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#000000",
                }}
              >
                9
              </span>
              <span
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#333333",
                  textTransform: "uppercase",
                }}
              >
                Independent Touch Zones
              </span>
            </div>

            <div
              style={{
                height: "37px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                padding: "4px 16px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#000000",
                }}
              >
                7
              </span>
              <span
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#333333",
                  textTransform: "uppercase",
                }}
              >
                Gesture Combinations
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            type="button"
            style={{
              width: "144px",
              height: "44px",
              borderRadius: "100px",
              backgroundColor: "#000000",
              border: "none",
              padding: "12px 20px 12px 24px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              Know Details
            </span>
            <ArrowUpRightIcon />
          </button>
        </div>

        {/* Right Image Container */}
        <div
          style={{
            position: "relative",
            width: "476px",
            height: "330px",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "#000000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "254px",
              height: "248px",
            }}
          >
            <Image
              src="/homepage_assets/featured_project_images/white_moontype.png"
              alt="PolyPan Electronic Handpan"
              fill
              sizes="254px"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      {/* ========================================================
          CARD 3: AI Sensor & Security Systems
          Frame 1618873615: x: 135, y: 1054, w: 1170, h: 442 -> abs y: 1102
          Image: /homepage_assets/featured_project_images/ai.png
          ======================================================== */}
      <div
        style={{
          position: "sticky",
          top: "136px",
          marginBottom: "47px",
          zIndex: 3,
          width: "1170px",
          height: "394px",
          borderRadius: "18px",
          backgroundColor: "#FFFDF9",
          border: "0.6px solid rgba(255, 214, 98, 1)",
          boxShadow: "0 0 60px rgba(255, 228, 151, 0.4)",
          boxSizing: "border-box",
          padding: "32px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Content Area */}
        <div
          style={{
            width: "566px",
            height: "329px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header & Subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                height: "24px",
              }}
            >
              <SparkleIcon />
              <span
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "150%",
                  color: "#D65900",
                }}
              >
                Featured Project
              </span>
            </div>

            <h3
              style={{
                margin: 0,
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "36px",
                fontWeight: 600,
                lineHeight: "1.2",
                color: "#000000",
              }}
            >
              AI Sensor & Security Systems
            </h3>

            <p
              style={{
                margin: 0,
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "150%",
                color: "#333333",
              }}
            >
              An AI-powered security system that uses advanced mmWave sensors to detect human
              presence, monitor occupancy in real time, and enable smart, camera-free access
              control for safer and more efficient spaces.
            </p>
          </div>

          {/* Statistics Badge */}
          <div
            style={{
              width: "fit-content",
              height: "37px",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              padding: "4px 16px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "24px",
                fontWeight: 600,
                color: "#000000",
              }}
            >
              $2.8B
            </span>
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                color: "#333333",
                textTransform: "uppercase",
              }}
            >
              Addressable Market
            </span>
          </div>

          {/* Button */}
          <button
            type="button"
            style={{
              width: "144px",
              height: "44px",
              borderRadius: "100px",
              backgroundColor: "#000000",
              border: "none",
              padding: "12px 20px 12px 24px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              Know Details
            </span>
            <ArrowUpRightIcon />
          </button>
        </div>

        {/* Right Image Container */}
        <div
          style={{
            position: "relative",
            width: "476px",
            height: "330px",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "#000000",
          }}
        >
          <Image
            src="/homepage_assets/featured_project_images/ai.png"
            alt="AI Sensor & Security Systems"
            fill
            sizes="476px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      {/* ========================================================
          CARD 4: Logic IC Trainer Kit
          Frame 1618873616: x: 135, y: 1495, w: 1170, h: 442 -> abs y: 1543
          Image: /homepage_assets/featured_project_images/blue & black image.png
          ======================================================== */}
      <div
        style={{
          position: "sticky",
          top: "156px",
          marginBottom: "0px",
          zIndex: 4,
          width: "1170px",
          height: "394px",
          borderRadius: "18px",
          backgroundColor: "#FFFDF9",
          border: "0.6px solid rgba(255, 214, 98, 1)",
          boxShadow: "0 0 60px rgba(255, 228, 151, 0.4)",
          boxSizing: "border-box",
          padding: "32px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left Content Area */}
        <div
          style={{
            width: "566px",
            height: "329px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Header & Subtitle */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
                height: "24px",
              }}
            >
              <SparkleIcon />
              <span
                style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontSize: "16px",
                  fontWeight: 600,
                  lineHeight: "150%",
                  color: "#D65900",
                }}
              >
                Featured Project
              </span>
            </div>

            <h3
              style={{
                margin: 0,
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "36px",
                fontWeight: 600,
                lineHeight: "1.2",
                color: "#000000",
              }}
            >
              Logic IC Trainer Kit
            </h3>

            <p
              style={{
                margin: 0,
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "150%",
                color: "#333333",
              }}
            >
              An interactive digital logic training kit that helps students learn logic
              circuits through hands-on experiments, real-time visualization, and WebSerial
              connectivity for a practical engineering learning experience.
            </p>
          </div>

          {/* Statistics Badge */}
          <div
            style={{
              width: "fit-content",
              height: "37px",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              padding: "4px 16px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
              boxSizing: "border-box",
            }}
          >
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "24px",
                fontWeight: 600,
                color: "#000000",
              }}
            >
              16
            </span>
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                color: "#333333",
                textTransform: "uppercase",
              }}
            >
              Logic IC Profiles
            </span>
          </div>

          {/* Button */}
          <button
            type="button"
            style={{
              width: "144px",
              height: "44px",
              borderRadius: "100px",
              backgroundColor: "#000000",
              border: "none",
              padding: "12px 20px 12px 24px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                fontFamily: "'Urbanist', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                color: "#FFFFFF",
                whiteSpace: "nowrap",
              }}
            >
              Know Details
            </span>
            <ArrowUpRightIcon />
          </button>
        </div>

        {/* Right Image Container */}
        <div
          style={{
            position: "relative",
            width: "476px",
            height: "330px",
            borderRadius: "16px",
            overflow: "hidden",
            backgroundColor: "#000000",
          }}
        >
          <Image
            src="/homepage_assets/featured_project_images/blue & black image.png"
            alt="Logic IC Trainer Kit"
            fill
            sizes="476px"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      </div>

      {/* ========================================================
          BOTTOM BUTTON: View All Projects
          Node 1498:14230: x: 628, y: 2000, w: 184, h: 43.799
          ======================================================== */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          height: "44px",
          marginTop: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          type="button"
          style={{
            width: "184px",
            height: "44px",
            borderRadius: "100px",
            backgroundColor: "#000000",
            border: "none",
            padding: "12px 20px 12px 24px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "16px",
              fontWeight: 500,
              color: "#FFFFFF",
              whiteSpace: "nowrap",
            }}
          >
            View All Projects
          </span>
          <ArrowUpRightIcon />
        </button>
      </div>
    </section>
  );
}

