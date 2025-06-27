"use client"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface MyTubPopupProps {
  onClose: () => void
  unlockedPieces: {
    sydneySweeney: boolean
    nautical: boolean
    mikeTyson: boolean
    avengers: boolean
  }
}

export default function MyTubPopup({ onClose, unlockedPieces }: MyTubPopupProps) {
  const [glitchActive, setGlitchActive] = useState(false)
  const [selectedSoap, setSelectedSoap] = useState<string | null>(null)

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  // Random glitch effects
  useEffect(() => {
    const glitchInterval = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 150)
      },
      Math.random() * 8000 + 5000,
    )

    return () => {
      clearInterval(glitchInterval)
    }
  }, [])

  const soapPieces = [
    {
      id: "sydneySweeney",
      name: "Sydney Sweeney dinner (grand prize)",
      unlocked: unlockedPieces.sydneySweeney,
      color: "#c17a47",
      description: "Collect 4 more pieces to win a free dinner with Sydney!",
      image: "/Images/sydney_sweeney.png",
      count: unlockedPieces.sydneySweeney ? 1 : 0,
      maxCount: 4,
    },
    {
      id: "nautical",
      name: "Nautical 4 pack",
      unlocked: unlockedPieces.nautical,
      color: "#2a4b23",
      description: "Premium nautical-themed soap collection for the adventurous spirit",
      image: "/Images/nautical_4.png",
      count: unlockedPieces.nautical ? 1 : 0,
      maxCount: 4,
    },
    {
      id: "mikeTyson",
      name: "Mike Tyson soap",
      unlocked: unlockedPieces.mikeTyson,
      color: "#c17a47",
      description: "Knockout power soap that packs a punch for your daily routine",
      image: "/Images/mike_tyson.jpg",
      count: unlockedPieces.mikeTyson ? 1 : 0,
      maxCount: 4,
    },
    {
      id: "avengers",
      name: "Avengers collection",
      unlocked: unlockedPieces.avengers,
      color: "#2a4b23",
      description: "Assemble your superhero soap collection with these heroic scents",
      image: "/Images/avengers.jpg",
      count: unlockedPieces.avengers ? 1 : 0,
      maxCount: 4,
    },
  ]

  return (
    <>
      {/* Self-contained CSS */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes tubPopupScale {
            from { opacity: 0; transform: scale(0.8) translateY(50px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          
          @keyframes tubGlitch {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-2px); }
            40%, 80% { transform: translateX(2px); }
          }
          
          @keyframes tubProgressFill {
            from { width: 0%; }
            to { width: var(--progress-width); }
          }
          
          @keyframes tubPulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
          }
          
          @keyframes tubFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes tubCornerGlow {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          
          .tub-soap-card:hover {
            transform: scale(1.02) !important;
            transition: all 0.3s ease !important;
          }
          
          .tub-progress-dot {
            animation: tubPulse 2s infinite ease-in-out;
          }
        `,
        }}
      />

      <div
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100vw",
          height: "100vh",
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          animation: "tubPopupScale 0.5s ease-out",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose()
        }}
      >
        <div
          style={{
            width: "95%",
            maxWidth: "900px",
            maxHeight: "90vh",
            margin: "0px 16px",
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0px 0px 50px rgba(42, 75, 35, 0.5), 0px 0px 25px rgba(193, 122, 71, 0.5)",
            border: "2px solid #2a4b23",
            background: "linear-gradient(135deg, #1a2e1a 0%, #2a4b23 100%)",
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(42, 75, 35, 0.2) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(193, 122, 71, 0.2) 0%, transparent 50%),
              linear-gradient(to right, rgba(42, 75, 35, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(42, 75, 35, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100% 100%, 100% 100%, 30px 30px, 30px 30px",
            transform: glitchActive ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` : "none",
            transition: glitchActive ? "none" : "transform 0.3s ease",
          }}
        >
          {/* Glitch overlay */}
          {glitchActive && (
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                right: "0px",
                bottom: "0px",
                background: "rgba(193, 122, 71, 0.1)",
                zIndex: 15,
                mixBlendMode: "overlay",
                pointerEvents: "none",
              }}
            />
          )}

          {/* Animated corner brackets */}
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "30px",
              height: "30px",
              borderTop: "3px solid #2a4b23",
              borderLeft: "3px solid #2a4b23",
              animation: "tubCornerGlow 2s infinite ease-in-out",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              width: "30px",
              height: "30px",
              borderTop: "3px solid #c17a47",
              borderRight: "3px solid #c17a47",
              animation: "tubCornerGlow 2s infinite ease-in-out",
              animationDelay: "0.5s",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0px",
              left: "0px",
              width: "30px",
              height: "30px",
              borderBottom: "3px solid #c17a47",
              borderLeft: "3px solid #c17a47",
              animation: "tubCornerGlow 2s infinite ease-in-out",
              animationDelay: "1s",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "0px",
              right: "0px",
              width: "30px",
              height: "30px",
              borderBottom: "3px solid #2a4b23",
              borderRight: "3px solid #2a4b23",
              animation: "tubCornerGlow 2s infinite ease-in-out",
              animationDelay: "1.5s",
            }}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              zIndex: 20,
              color: "#2a4b23",
              background: "rgba(245, 245, 240, 0.9)",
              border: "1px solid rgba(42, 75, 35, 0.3)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "20px",
              textShadow: "0px 0px 10px #2a4b23",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#c17a47"
              e.currentTarget.style.textShadow = "0px 0px 15px #c17a47"
              e.currentTarget.style.transform = "scale(1.1)"
              e.currentTarget.style.background = "rgba(245, 245, 240, 1)"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#2a4b23"
              e.currentTarget.style.textShadow = "0px 0px 10px #2a4b23"
              e.currentTarget.style.transform = "scale(1)"
              e.currentTarget.style.background = "rgba(245, 245, 240, 0.9)"
            }}
          >
            <X size={20} />
          </button>

          <div
            style={{
              padding: "40px",
              position: "relative",
              zIndex: 10,
              overflowY: "auto",
              maxHeight: "90vh",
            }}
          >
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <h1
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "white",
                  textShadow: "0px 0px 20px rgba(42, 75, 35, 0.8), 0px 0px 40px rgba(42, 75, 35, 0.6)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                  fontFamily: "'Times New Roman', Times, serif",
                  animation: "tubFloat 3s infinite ease-in-out",
                }}
              >
                MY TUB
              </h1>
              <div
                style={{
                  height: "3px",
                  width: "200px",
                  margin: "0px auto",
                  background: "linear-gradient(90deg, transparent, #2a4b23, #c17a47, transparent)",
                  borderRadius: "2px",
                }}
              />
              <p
                style={{
                  fontSize: "18px",
                  color: "#c17a47",
                  textShadow: "0px 0px 10px rgba(193, 122, 71, 0.8)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: "20px",
                  fontFamily: "monospace",
                }}
              >
                SOAP COLLECTION PROGRESS
              </p>
            </div>

            {/* Soap Pieces Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                gap: "24px",
                marginBottom: "40px",
              }}
            >
              {soapPieces.map((soap, index) => (
                <div
                  key={soap.id}
                  className="tub-soap-card"
                  style={{
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: `2px solid ${soap.color}`,
                    background: "rgba(26, 46, 26, 0.8)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: soap.unlocked ? `0px 0px 20px ${soap.color}40` : "0px 0px 10px rgba(0,0,0,0.3)",
                  }}
                  onClick={() => setSelectedSoap(selectedSoap === soap.id ? null : soap.id)}
                >
                  {/* Progress bar background */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      right: "0px",
                      height: "6px",
                      background: "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                  {/* Progress bar fill */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      left: "0px",
                      height: "6px",
                      background: `linear-gradient(90deg, ${soap.color}, ${soap.color}80)`,
                      width: `${(soap.count / soap.maxCount) * 100}%`,
                      transition: "width 1s ease-out",
                      animationDelay: `${0.5 + index * 0.1}s`,
                    }}
                  />

                  <div style={{ padding: "24px" }}>
                    {/* Soap piece image */}
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        marginBottom: "16px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: `1px solid ${soap.color}40`,
                        position: "relative",
                        background: "rgba(0,0,0,0.2)",
                      }}
                    >
                      <img
                        src={soap.image || "/placeholder.svg"}
                        alt={soap.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                          filter: soap.unlocked ? "none" : "grayscale(100%) brightness(0.3)",
                          transition: "filter 0.3s ease",
                        }}
                      />
                      {!soap.unlocked && (
                        <div
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "#666",
                            fontSize: "48px",
                            fontWeight: "bold",
                            textShadow: "0px 0px 10px rgba(0,0,0,0.8)",
                            animation: "tubPulse 2s infinite ease-in-out",
                          }}
                        >
                          🔒
                        </div>
                      )}
                    </div>

                    {/* Title and progress */}
                    <h3
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: soap.unlocked ? soap.color : "#666",
                        textShadow: soap.unlocked ? `0px 0px 10px ${soap.color}` : "none",
                        marginBottom: "8px",
                        fontFamily: "monospace",
                        letterSpacing: "0.05em",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {soap.name}
                    </h3>

                    {/* Progress counter */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "12px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          color: soap.unlocked ? soap.color : "#666",
                          fontFamily: "monospace",
                          textShadow: soap.unlocked ? `0px 0px 8px ${soap.color}` : "none",
                        }}
                      >
                        {soap.count}/{soap.maxCount}
                      </span>
                      <div style={{ display: "flex", gap: "4px" }}>
                        {Array.from({ length: soap.maxCount }).map((_, i) => (
                          <div
                            key={i}
                            className={i < soap.count ? "tub-progress-dot" : ""}
                            style={{
                              width: "12px",
                              height: "12px",
                              borderRadius: "50%",
                              background: i < soap.count ? soap.color : "rgba(255, 255, 255, 0.2)",
                              boxShadow: i < soap.count ? `0px 0px 8px ${soap.color}` : "none",
                              transition: "all 0.3s ease",
                              animationDelay: `${i * 0.1}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    {selectedSoap === soap.id && (
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#ccc",
                          fontFamily: "monospace",
                          lineHeight: "1.4",
                          marginTop: "12px",
                          paddingTop: "12px",
                          borderTop: `1px solid ${soap.color}40`,
                          animation: "tubPopupScale 0.3s ease-out",
                        }}
                      >
                        {soap.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer message */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid rgba(42, 75, 35, 0.3)",
                  background: "rgba(42, 75, 35, 0.1)",
                  marginBottom: "20px",
                  animation: "tubFloat 4s infinite ease-in-out",
                  animationDelay: "1s",
                }}
              >
                <p
                  style={{
                    color: "#2a4b23",
                    fontFamily: "monospace",
                    fontSize: "16px",
                    letterSpacing: "0.05em",
                    margin: "0px",
                    textShadow: "0px 0px 8px rgba(42, 75, 35, 0.8)",
                    fontWeight: "bold",
                  }}
                >
                  [SYSTEM STATUS]: VAULT SYNCHRONIZED
                </p>
                <p
                  style={{
                    color: "#c17a47",
                    fontFamily: "monospace",
                    fontSize: "14px",
                    margin: "8px 0px 0px 0px",
                    textShadow: "0px 0px 5px rgba(193, 122, 71, 0.6)",
                  }}
                >
                  Keep entering codes to unlock more puzzle pieces!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
