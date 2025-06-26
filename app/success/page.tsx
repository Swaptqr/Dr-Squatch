"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import MyTubPopup from "@/components/my-tub-popup"

export default function SuccessPage() {
  const [userEmail, setUserEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [showSpeechBubble, setShowSpeechBubble] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showRewardsPopup, setShowRewardsPopup] = useState(false)
  const [code, setCode] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [glitchActive, setGlitchActive] = useState(false)
  const [titleGlitch, setTitleGlitch] = useState(false)
  const [showMyTub, setShowMyTub] = useState(false)
  const [unlockedPieces, setUnlockedPieces] = useState({
    sydneySweeney: false,
    nautical: false,
    mikeTyson: false,
    avengers: false,
  })
  const router = useRouter()
  const VALID_CODE = "SQUATCH_swapt"

  useEffect(() => {
    // Get email from localStorage
    const email = localStorage.getItem("userEmail")
    if (email) {
      setUserEmail(email)
    } else {
      // If no email found, redirect back to home
      router.push("/")
      return
    }
    setIsLoading(false)

    // Show speech bubble after 2 seconds
    const speechTimer = setTimeout(() => {
      setShowSpeechBubble(true)
    }, 2000)

    return () => clearTimeout(speechTimer)
  }, [router])

  const handleBubbleClick = () => {
    setShowSpeechBubble(false)
    setShowForm(true)
  }

  // Random glitch effects for form
  useEffect(() => {
    if (!showForm) return

    // Occasional container glitch
    const containerGlitchInterval = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 150)
      },
      Math.random() * 5000 + 5000,
    )

    // Title glitch effect
    const titleGlitchInterval = setInterval(
      () => {
        setTitleGlitch(true)
        setTimeout(() => setTitleGlitch(false), 200)
      },
      Math.random() * 3000 + 2000,
    )

    return () => {
      clearInterval(containerGlitchInterval)
      clearInterval(titleGlitchInterval)
    }
  }, [showForm])

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Check if code is valid
    if (code !== VALID_CODE) {
      setError("Invalid access code. Please try again.")
      setIsSubmitting(false)

      // Trigger glitch on error
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
      return
    }

    // Trigger glitch effect on submit
    setGlitchActive(true)

    // Simulate successful code entry
    setTimeout(() => {
      setIsSubmitting(false)
      setGlitchActive(false)
      setShowForm(false)

      // Unlock Sydney Sweeney piece
      setUnlockedPieces((prev) => ({ ...prev, sydneySweeney: true }))

      setShowRewardsPopup(true) // Show the cool rewards popup!
    }, 1500)
  }

  const closeForm = () => {
    setShowForm(false)
    setCode("")
    setError("")
  }

  if (isLoading) {
    return (
      <div
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000",
          color: "#fff",
          fontSize: "18px",
          fontFamily: "monospace",
        }}
      >
        Loading...
      </div>
    )
  }

  return (
    <>
      {/* Self-contained CSS for success page */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes successFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes bubbleFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes speechBubblePop {
            0% { opacity: 0; transform: scale(0.5); }
            80% { transform: scale(1.1); }
            100% { opacity: 1; transform: scale(1); }
          }
          
          @keyframes formFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes formScaleIn {
            from { opacity: 0; transform: scale(0.9) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          
          @keyframes glitchBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          
          @keyframes glitchSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes glitchErrorShake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-2px); }
            40%, 80% { transform: translateX(2px); }
          }
          
          @keyframes glitchBorderPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          
          @keyframes rewardsPopupScale {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          
          @keyframes rewardsPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes rewardsGlow {
            0%, 100% { filter: drop-shadow(0 0 20px rgba(42, 75, 35, 0.8)) drop-shadow(0 0 40px rgba(193, 122, 71, 0.5)); }
            50% { filter: drop-shadow(0 0 30px rgba(42, 75, 35, 1)) drop-shadow(0 0 60px rgba(193, 122, 71, 0.8)); }
          }
          
          @keyframes rewardsFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(2deg); }
            50% { transform: translateY(-5px) rotate(0deg); }
            75% { transform: translateY(-15px) rotate(-2deg); }
          }
          
          @keyframes puzzlePieceFloat {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg) scale(1);
            }
            25% { 
              transform: translateY(-8px) rotate(3deg) scale(1.02);
            }
            50% { 
              transform: translateY(-4px) rotate(0deg) scale(1.05);
            }
            75% { 
              transform: translateY(-12px) rotate(-3deg) scale(1.02);
            }
          }
          
          .form-glitch-button:hover {
            background-position: right center !important;
            background-size: 200% auto !important;
            transition: 0.3s !important;
          }
          
          .form-glitch-button:active {
            transform: scale(0.98) !important;
          }
        `,
        }}
      />

      {/* Full screen background with image */}
      <div
        style={{
          position: "fixed",
          top: "0px",
          left: "0px",
          width: "100vw",
          height: "100vh",
          backgroundImage: "url('/images/doctor_squatch_big_image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          margin: "0px",
          padding: "0px",
          overflow: "hidden",
          animation: "successFadeIn 1s ease-out",
        }}
      >
        {/* Speech Bubble - Real bubble style */}
        {showSpeechBubble && (
          <div
            style={{
              position: "absolute",
              top: "15%",
              left: "35%",
              transform: "translateX(-50%)",
              width: "180px",
              height: "180px",
              background:
                "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))",
              borderRadius: "50%",
              border: "2px solid rgba(255, 255, 255, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              animation:
                "speechBubblePop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), bubbleFloat 2s infinite ease-in-out",
              boxShadow: "0 8px 30px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.2)",
              zIndex: 100,
              textAlign: "center",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
            }}
            onClick={handleBubbleClick}
          >
            {/* Bubble highlight */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "30px",
                width: "40px",
                height: "40px",
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent)",
                borderRadius: "50%",
                pointerEvents: "none",
              }}
            />

            {/* Text inside bubble */}
            <div
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                color: "#2a4b23",
                textShadow: "0 1px 2px rgba(255, 255, 255, 0.8)",
                lineHeight: "1.2",
                padding: "10px",
              }}
            >
              🔐<br />
              Enter the
              <br />
              code
            </div>
          </div>
        )}

        {/* Code Entry Form - Same style as landing page */}
        {showForm && (
          <div
            style={{
              position: "fixed",
              top: "0px",
              left: "0px",
              width: "100vw",
              height: "100vh",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(5px)",
              WebkitBackdropFilter: "blur(5px)",
              padding: "16px",
              margin: "0px",
              boxSizing: "border-box",
              animation: "formFadeIn 0.3s ease-out",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeForm()
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "450px",
                position: "relative",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0px 0px 30px rgba(42, 75, 35, 0.5), 0px 0px 15px rgba(193, 122, 71, 0.5)",
                border: "1px solid #2a4b23",
                background: "rgba(245, 245, 240, 0.97)",
                backgroundImage: `
                  linear-gradient(to right, rgba(42, 75, 35, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(42, 75, 35, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
                transform: glitchActive ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` : "none",
                transition: glitchActive ? "none" : "transform 0.3s ease",
                margin: "0px",
                padding: "0px",
                boxSizing: "border-box",
                animation: "formScaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
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
                    background: "rgba(193, 122, 71, 0.05)",
                    zIndex: 15,
                    mixBlendMode: "overlay",
                    pointerEvents: "none",
                    margin: "0px",
                    padding: "0px",
                  }}
                />
              )}

              {/* Corner accents */}
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "16px",
                  height: "16px",
                  borderTop: "2px solid #2a4b23",
                  borderLeft: "2px solid #2a4b23",
                  margin: "0px",
                  padding: "0px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  width: "16px",
                  height: "16px",
                  borderTop: "2px solid #c17a47",
                  borderRight: "2px solid #c17a47",
                  margin: "0px",
                  padding: "0px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "0px",
                  left: "0px",
                  width: "16px",
                  height: "16px",
                  borderBottom: "2px solid #c17a47",
                  borderLeft: "2px solid #c17a47",
                  margin: "0px",
                  padding: "0px",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "0px",
                  right: "0px",
                  width: "16px",
                  height: "16px",
                  borderBottom: "2px solid #2a4b23",
                  borderRight: "2px solid #2a4b23",
                  margin: "0px",
                  padding: "0px",
                }}
              />

              {/* Close button */}
              <button
                onClick={closeForm}
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  zIndex: 20,
                  color: "#2a4b23",
                  background: "rgba(42, 75, 35, 0.1)",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  textShadow: "0px 0px 5px #2a4b23",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0px",
                  padding: "0px",
                  transition: "all 0.2s ease",
                }}
              >
                <X size={16} />
              </button>

              <div
                style={{ padding: "32px", position: "relative", zIndex: 10, margin: "0px", boxSizing: "border-box" }}
              >
                <form onSubmit={handleFormSubmit} style={{ margin: "0px", padding: "0px" }}>
                  {/* Title with glitch effect */}
                  <div style={{ textAlign: "center", marginBottom: "24px", position: "relative", padding: "0px" }}>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#2d5016",
                        fontFamily: "'Times New Roman', Times, serif",
                        fontStyle: "italic",
                        marginBottom: "8px",
                        margin: "0px 0px 8px 0px",
                        padding: "0px",
                      }}
                    >
                      DR. SQUATCH®
                    </div>

                    <h2
                      style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        color: "#2a4b23",
                        textShadow: "0px 0px 10px rgba(42, 75, 35, 0.5)",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                        position: "relative",
                        margin: "0px 0px 8px 0px",
                        padding: "0px",
                        lineHeight: "1.2",
                      }}
                    >
                      SOAP OFFER ACCESS
                      {titleGlitch && (
                        <>
                          <span
                            style={{
                              position: "absolute",
                              top: "0px",
                              left: "0px",
                              right: "0px",
                              color: "#c17a47",
                              clipPath: "inset(30% 0 30% 0)",
                              transform: "translateX(-2px)",
                              opacity: 0.8,
                              margin: "0px",
                              padding: "0px",
                            }}
                          >
                             SOAP OFFER ACCESS
                          </span>
                          <span
                            style={{
                              position: "absolute",
                              top: "0px",
                              left: "0px",
                              right: "0px",
                              color: "#2a4b23",
                              clipPath: "inset(60% 0 10% 0)",
                              transform: "translateX(2px)",
                              opacity: 0.8,
                              margin: "0px",
                              padding: "0px",
                            }}
                          >
                            TUB ACCESS
                          </span>
                        </>
                      )}
                    </h2>
                    <div
                      style={{
                        height: "2px",
                        width: "100%",
                        background: "linear-gradient(90deg, transparent, #2a4b23, transparent)",
                        margin: "8px 0px",
                        padding: "0px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#c17a47",
                        textShadow: "0px 0px 5px rgba(193, 122, 71, 0.5)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginTop: "16px",
                        margin: "16px 0px 0px 0px",
                        padding: "0px",
                      }}
                    >
                      ENTER THE CODE TO UNLOCK
                    </p>
                  </div>

                  {/* Input field */}
                  <div
                    style={{ marginBottom: "24px", position: "relative", margin: "0px 0px 24px 0px", padding: "0px" }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "0px",
                        right: "0px",
                        bottom: "0px",
                        borderRadius: "6px",
                        padding: "1px",
                        background: "linear-gradient(90deg, #2a4b23, #c17a47)",
                        opacity: error ? "0.8" : "1",
                        animation: error ? "glitchBorderPulse 0.3s ease" : "none",
                        margin: "0px",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "1px",
                          left: "1px",
                          right: "1px",
                          bottom: "1px",
                          borderRadius: "5px",
                          background: "rgba(245, 245, 240, 0.97)",
                          margin: "0px",
                          padding: "0px",
                        }}
                      ></div>
                    </div>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="ENTER.ACCESS.CODE"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "transparent",
                        border: "none",
                        borderRadius: "6px",
                        color: "#2a4b23",
                        fontFamily: "monospace",
                        letterSpacing: "0.1em",
                        position: "relative",
                        zIndex: 10,
                        outline: "none",
                        boxSizing: "border-box",
                        margin: "0px",
                        fontSize: "14px",
                      }}
                      disabled={isSubmitting}
                    />
                    {/* Blinking cursor indicator */}
                    <div
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        backgroundColor: "#c17a47",
                        zIndex: 11,
                        animation: "glitchBlink 1s infinite",
                        margin: "0px",
                        padding: "0px",
                      }}
                    />
                  </div>

                  {error && (
                    <p
                      style={{
                        marginTop: "-16px",
                        marginBottom: "16px",
                        color: "#c17a47",
                        fontFamily: "monospace",
                        fontSize: "14px",
                        animation: "glitchErrorShake 0.3s ease",
                        margin: "-16px 0px 16px 0px",
                        padding: "0px",
                      }}
                    >
                      [ERROR]: {error}
                    </p>
                  )}

                  {/* Button */}
                  <div style={{ marginBottom: "24px", margin: "0px 0px 24px 0px", padding: "0px" }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="form-glitch-button"
                      style={{
                        width: "100%",
                        padding: "12px",
                        background: "linear-gradient(90deg, #2a4b23, #c17a47)",
                        border: "none",
                        borderRadius: "6px",
                        color: "white",
                        fontFamily: "monospace",
                        letterSpacing: "0.1em",
                        fontWeight: "bold",
                        cursor: "pointer",
                        position: "relative",
                        textTransform: "uppercase",
                        overflow: "hidden",
                        margin: "0px",
                        boxSizing: "border-box",
                        fontSize: "14px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {isSubmitting ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px",
                            margin: "0px",
                            padding: "0px",
                          }}
                        >
                          <div
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              border: "2px solid rgba(255,255,255,0.3)",
                              borderTopColor: "white",
                              animation: "glitchSpin 1s linear infinite",
                              margin: "0px",
                              padding: "0px",
                            }}
                          />
                          VERIFYING...
                        </div>
                      ) : (
                        "UNLOCK ACCESS →"
                      )}
                    </button>
                  </div>

                  {/* Security notice */}
                  <div
                    style={{
                      textAlign: "center",
                      color: "#2a4b23",
                      fontFamily: "monospace",
                      fontSize: "12px",
                      letterSpacing: "0.05em",
                      opacity: 0.7,
                      margin: "0px",
                      padding: "0px",
                    }}
                  >
                    [SECURE CONNECTION ESTABLISHED]
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Rewards Popup - Sydney Sweeney Edition */}
        {showRewardsPopup && <SydneyRewardsPopup onClose={() => setShowRewardsPopup(false)} />}

        {/* Back to home button - positioned at bottom */}
        <button
          onClick={() => router.push("/")}
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            padding: "12px 24px",
            fontSize: "16px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            margin: "0px",
            boxSizing: "border-box",
            fontWeight: "500",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            zIndex: 10,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.8)"
            e.currentTarget.style.transform = "translateX(-50%) translateY(-2px)"
            e.currentTarget.style.boxShadow = "0px 8px 20px rgba(0, 0, 0, 0.4)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(0, 0, 0, 0.7)"
            e.currentTarget.style.transform = "translateX(-50%) translateY(0px)"
            e.currentTarget.style.boxShadow = "none"
          }}
        >
          ← Back to Home
        </button>

        {/* My Tub button - positioned at top right */}
        <button
          onClick={() => setShowMyTub(true)}
          style={{
            position: "absolute",
            top: "40px",
            right: "40px",
            background: "linear-gradient(90deg, #2a4b23, #c17a47)",
            color: "white",
            border: "none",
            padding: "12px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            margin: "0px",
            boxSizing: "border-box",
            fontFamily: "monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            boxShadow: "0px 4px 15px rgba(42, 75, 35, 0.4)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            zIndex: 20,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)"
            e.currentTarget.style.boxShadow = "0px 8px 25px rgba(42, 75, 35, 0.6)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0px)"
            e.currentTarget.style.boxShadow = "0px 4px 15px rgba(42, 75, 35, 0.4)"
          }}
        >
          🧼 My Tub
        </button>

        {/* My Tub Popup */}
        {showMyTub && <MyTubPopup onClose={() => setShowMyTub(false)} unlockedPieces={unlockedPieces} />}
      </div>
    </>
  )
}

// Sydney Sweeney Rewards Popup Component with Confetti
function SydneyRewardsPopup({ onClose }: { onClose: () => void }) {
  const [glitchActive, setGlitchActive] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Trigger confetti when the popup appears
  useEffect(() => {
    // Delay to allow animation to complete
    const timer = setTimeout(() => {
      triggerConfetti()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Trigger confetti function
  const triggerConfetti = () => {
    if (!confettiCanvasRef.current || !containerRef.current) return

    const canvas = confettiCanvasRef.current
    const container = containerRef.current
    const rect = container.getBoundingClientRect()

    // Set canvas dimensions to match container
    canvas.width = rect.width
    canvas.height = rect.height

    // Create confetti instance using a simple confetti simulation
    // Launch initial burst
    createConfettiBurst(canvas, { y: 0.8, x: 0.5 }, 150)

    // Add some delayed bursts for more effect
    setTimeout(() => {
      createConfettiBurst(canvas, { x: 0, y: 0.5 }, 50)
    }, 500)

    setTimeout(() => {
      createConfettiBurst(canvas, { x: 1, y: 0.5 }, 50)
    }, 800)
  }

  // Simple confetti burst function
  const createConfettiBurst = (canvas: HTMLCanvasElement, origin: { x: number; y: number }, count: number) => {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      color: string
      size: number
      life: number
    }> = []

    const colors = ["#2a4b23", "#c17a47", "#ffffff", "#d4a574"]

    // Create particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: origin.x * canvas.width,
        y: origin.y * canvas.height,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * -8 - 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 2,
        life: 1,
      })
    }

    // Animate particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.vy += 0.3 // gravity
        particle.life -= 0.02

        if (particle.life <= 0) {
          particles.splice(index, 1)
          return
        }

        ctx.save()
        ctx.globalAlpha = particle.life
        ctx.fillStyle = particle.color
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size)
        ctx.restore()
      })

      if (particles.length > 0) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }

  // Effects when popup appears
  useEffect(() => {
    // Initial glitch effect
    setGlitchActive(true)
    setTimeout(() => setGlitchActive(false), 300)

    // Occasional glitch effect
    const glitchInterval = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      },
      Math.random() * 3000 + 2000,
    )

    // Show details after animation
    const detailsTimer = setTimeout(() => {
      setShowDetails(true)
    }, 1800)

    return () => {
      clearInterval(glitchInterval)
      clearTimeout(detailsTimer)
    }
  }, [])

  return (
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
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        animation: "rewardsPopupScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Confetti canvas - positioned absolutely to cover the entire popup */}
      <canvas
        ref={confettiCanvasRef}
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10001,
        }}
      />

      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: "550px",
          margin: "0px 16px",
          position: "relative",
          borderRadius: "12px",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1a2e1a 0%, #2a4b23 100%)",
          boxShadow: "0px 0px 50px rgba(42, 75, 35, 0.8), 0px 0px 25px rgba(193, 122, 71, 0.6)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Animated background elements */}
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            right: "0px",
            bottom: "0px",
            overflow: "hidden",
            zIndex: 1,
          }}
        >
          {/* Grid background */}
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              right: "0px",
              bottom: "0px",
              backgroundImage: `
                linear-gradient(to right, rgba(42, 75, 35, 0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(42, 75, 35, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              opacity: 0.5,
            }}
          />

          {/* Animated circles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                width: 100 + i * 50 + "px",
                height: 100 + i * 50 + "px",
                borderRadius: "50%",
                background: i % 2 === 0 ? "rgba(42, 75, 35, 0.1)" : "rgba(193, 122, 71, 0.1)",
                filter: "blur(40px)",
                animation: `rewardsPulse ${8 + i * 2}s infinite ease-in-out`,
                animationDelay: i * 0.5 + "s",
              }}
            />
          ))}
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 10,
            padding: "40px 24px 24px 24px",
            textAlign: "center",
          }}
        >
          {/* Soap Puzzle Piece with Sydney Sweeney */}
          <div
            style={{
              position: "relative",
              margin: "0px auto 24px auto",
              width: "min(300px, 80vw)",
              height: "min(300px, 40vh)",
              maxWidth: "250px",
              maxHeight: "250px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Background glow effect */}
            <div
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                right: "0px",
                bottom: "0px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(42, 75, 35, 0.6) 0%, rgba(193, 122, 71, 0.3) 70%)",
                filter: "blur(30px)",
                transform: "scale(1.5)",
                animation: "rewardsGlow 3s infinite ease-in-out",
              }}
            />

            {/* Soap Puzzle Piece container with 3D effect */}
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                zIndex: 10,
                animation: "puzzlePieceFloat 5s infinite ease-in-out",
              }}
            >
              {/* SVG for the soap puzzle piece shape with Sydney's image inside */}
              <svg
                viewBox="0 0 120 120"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "100%",
                  height: "100%",
                  filter: "drop-shadow(0 0 20px rgba(42, 75, 35, 0.8)) drop-shadow(0 0 40px rgba(193, 122, 71, 0.5))",
                }}
              >
                {/* Define the soap puzzle piece path as a clip path */}
                <defs>
                  <clipPath id="soapPuzzleClip">
                    <path d="M20 30 Q20 20 30 20 L50 20 Q55 15 60 20 L90 20 Q100 20 100 30 L100 50 Q105 55 100 60 L100 90 Q100 100 90 100 L60 100 Q55 105 50 100 L30 100 Q20 100 20 90 L20 60 Q15 55 20 50 Z" />
                  </clipPath>
                  <linearGradient
                    id="soapPuzzleGradient"
                    x1="20"
                    y1="20"
                    x2="100"
                    y2="100"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0" stopColor="#2a4b23" />
                    <stop offset="1" stopColor="#c17a47" />
                  </linearGradient>
                </defs>

                {/* Sydney Sweeney image inside the soap puzzle piece */}
                <image
                  href="/images/sydney_sweeney.png"
                  x="20"
                  y="20"
                  width="80"
                  height="80"
                  clipPath="url(#soapPuzzleClip)"
                  preserveAspectRatio="xMidYMid slice"
                />

                {/* Neon outline of the soap puzzle piece */}
                <path
                  d="M20 30 Q20 20 30 20 L50 20 Q55 15 60 20 L90 20 Q100 20 100 30 L100 50 Q105 55 100 60 L100 90 Q100 100 90 100 L60 100 Q55 105 50 100 L30 100 Q20 100 20 90 L20 60 Q15 55 20 50 Z"
                  stroke="url(#soapPuzzleGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Title with glitch effect */}
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: "white",
              textShadow: "0 0 15px rgba(42, 75, 35, 0.8), 0 0 30px rgba(42, 75, 35, 0.6)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              position: "relative",
              fontFamily: "'Times New Roman', Times, serif",
            }}
          >
            SOAP PUZZLE PIECE UNLOCKED!
            {glitchActive && (
              <>
                <span
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    right: "0px",
                    color: "#c17a47",
                    clipPath: "inset(30% 0 30% 0)",
                    transform: "translateX(-2px)",
                    opacity: 0.8,
                  }}
                >
                  SOAP PUZZLE PIECE UNLOCKED!
                </span>
                <span
                  style={{
                    position: "absolute",
                    top: "0px",
                    left: "0px",
                    right: "0px",
                    color: "#2a4b23",
                    clipPath: "inset(60% 0 10% 0)",
                    transform: "translateX(2px)",
                    opacity: 0.8,
                  }}
                >
                  SOAP PUZZLE PIECE UNLOCKED!
                </span>
              </>
            )}
          </h2>

          {/* Divider */}
          <div
            style={{
              height: "2px",
              width: "100%",
              background: "linear-gradient(90deg, transparent, #2a4b23, #c17a47, transparent)",
              margin: "16px 0px",
            }}
          />
        </div>

        {/* Content section with staggered animation */}
        {showDetails && (
          <div
            style={{
              position: "relative",
              zIndex: 10,
              padding: "0px 32px 32px 32px",
              animation: "rewardsPopupScale 0.5s ease-out",
            }}
          >
            {/* Message */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "12px",
                  color: "#c17a47",
                  textShadow: "0 0 8px rgba(193, 122, 71, 0.8)",
                  letterSpacing: "0.1em",
                  fontWeight: "600",
                }}
              >
                🎉 You've unlocked a Sydney Sweeney dinner Free Soap Piece! 🎉
              </p>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "16px",
                  lineHeight: "1.5",
                }}
              >
                Collect 3 more pieces to win a free dinner with Sydney Sweeney!
              </p>
            </div>

            {/* Progress section */}
            <div
              style={{
                background: "rgba(0, 0, 0, 0.3)",
                borderRadius: "12px",
                padding: "24px",
                marginBottom: "24px",
                border: "1px solid rgba(42, 75, 35, 0.3)",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  color: "white",
                  textAlign: "center",
                }}
              >
                🧼 Your Collection Progress:
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <ProgressBar
                  label="Sydney Sweeney dinner (grand prize)"
                  current={1}
                  total={4}
                  color="#c17a47"
                  highlight
                />
                <ProgressBar label="Nautical 4 pack" current={0} total={4} color="#2a4b23" />
                <ProgressBar label="Mike Tyson soap" current={0} total={4} color="#c17a47" />
                <ProgressBar label="Avengers collection" current={0} total={4} color="#2a4b23" />
              </div>
            </div>

            {/* Button */}
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "8px",
                fontWeight: "bold",
                fontSize: "16px",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(90deg, #2a4b23, #c17a47)",
                color: "white",
                border: "none",
                cursor: "pointer",
                textShadow: "0 0 5px rgba(0,0,0,0.5)",
                boxShadow: "0 4px 15px rgba(42, 75, 35, 0.4)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={() => setGlitchActive(true)}
              onMouseLeave={() => setGlitchActive(false)}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)"
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(42, 75, 35, 0.6)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0px)"
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(42, 75, 35, 0.4)"
              }}
            >
              <span style={{ position: "relative", zIndex: 10 }}>CONTINUE COLLECTING 🧼</span>
            </button>
          </div>
        )}

        {/* Corner accents */}
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "64px",
            height: "64px",
            borderTop: "2px solid #2a4b23",
            borderLeft: "2px solid #2a4b23",
            borderTopLeftRadius: "12px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "0px",
            right: "0px",
            width: "64px",
            height: "64px",
            borderTop: "2px solid #c17a47",
            borderRight: "2px solid #c17a47",
            borderTopRightRadius: "12px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            left: "0px",
            width: "64px",
            height: "64px",
            borderBottom: "2px solid #c17a47",
            borderLeft: "2px solid #c17a47",
            borderBottomLeftRadius: "12px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            right: "0px",
            width: "64px",
            height: "64px",
            borderBottom: "2px solid #2a4b23",
            borderRight: "2px solid #2a4b23",
            borderBottomRightRadius: "12px",
            pointerEvents: "none",
          }}
        />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 20,
            fontSize: "24px",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            color: "#2a4b23",
            background: "rgba(245, 245, 240, 0.9)",
            border: "1px solid rgba(42, 75, 35, 0.3)",
            cursor: "pointer",
            textShadow: "0 0 5px #2a4b23",
            transition: "all 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "rgba(245, 245, 240, 1)"
            e.currentTarget.style.transform = "scale(1.1)"
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "rgba(245, 245, 240, 0.9)"
            e.currentTarget.style.transform = "scale(1)"
          }}
        >
          ×
        </button>
      </div>
    </div>
  )
}

// Progress bar component with Dr. Squatch styling
function ProgressBar({
  label,
  current,
  total,
  color = "#2a4b23",
  highlight = false,
}: {
  label: string
  current: number
  total: number
  color?: string
  highlight?: boolean
}) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
        <span
          style={{
            fontSize: "14px",
            fontWeight: highlight ? "bold" : "500",
            color: highlight ? color : "white",
            textShadow: highlight ? `0 0 5px ${color}` : "none",
          }}
        >
          {label}
        </span>
        <span
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            color: color,
            textShadow: `0 0 5px ${color}`,
          }}
        >
          {current}/{total}
        </span>
      </div>
      <div
        style={{
          position: "relative",
          height: "12px",
          width: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          borderRadius: "6px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${(current / total) * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${color}, ${color === "#2a4b23" ? "#c17a47" : "#2a4b23"})`,
            borderRadius: "6px",
            boxShadow: `0 0 10px ${color}`,
            transition: "width 1s ease-out",
            animation: current > 0 ? "rewardsPulse 2s infinite ease-in-out" : "none",
          }}
        />
        {/* Progress bar segments */}
        <div style={{ position: "absolute", top: "0px", left: "0px", right: "0px", bottom: "0px", display: "flex" }}>
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              style={{
                height: "100%",
                flex: 1,
                borderRight: i < total - 1 ? "1px solid rgba(0, 0, 0, 0.5)" : "none",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
