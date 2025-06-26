"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Volume2, VolumeX, X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function VideoBackground() {
  const [isMuted, setIsMuted] = useState(true)
  const [showPopup, setShowPopup] = useState(false)
  const [email, setEmail] = useState("")
  const [hasShownPopup, setHasShownPopup] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [glitchActive, setGlitchActive] = useState(false)
  const [titleGlitch] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleVideoEnd = () => {
    if (!hasShownPopup) {
      setShowPopup(true)
      setHasShownPopup(true)
      if (videoRef.current) {
        videoRef.current.loop = true
        videoRef.current.currentTime = 0
        videoRef.current.play()
      }
    }
  }

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showPopup])

  // Random glitch effects
  useEffect(() => {
    if (!showPopup) return

    // Occasional container glitch
    const containerGlitchInterval = setInterval(
      () => {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 150)
      },
      Math.random() * 5000 + 5000,
    )

    // Title glitch effect (removed since titleGlitch is not used in the UI)

    return () => {
      clearInterval(containerGlitchInterval)
    }
  }, [showPopup])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address")
      setIsSubmitting(false)

      // Trigger glitch on error
      setGlitchActive(true)
      setTimeout(() => setGlitchActive(false), 300)
      return
    }

    // Trigger glitch effect on submit
    setGlitchActive(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setGlitchActive(false)
      console.log("Email submitted:", email)

      // Store email in localStorage for the success page
      localStorage.setItem("userEmail", email)

      // Redirect to success page after showing success message
      setTimeout(() => {
        router.push("/success")
      }, 2000)
    }, 1500)
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <>
      <style jsx global>{`
        @keyframes loading {
          0% {
            left: -30%;
          }
          100% {
            left: 100%;
          }
        }
        
        @keyframes blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.05);
          }
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes errorGlitch {
          0%, 100% {
            transform: translateX(0);
          }
          20%, 60% {
            transform: translateX(-2px);
          }
          40%, 80% {
            transform: translateX(2px);
          }
        }
        
        @keyframes borderGlitch {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .glitch-button:hover {
          background-position: right center;
          background-size: 200% auto;
          transition: 0.3s;
        }
        
        .glitch-button:active {
          transform: scale(0.98);
        }
      `}</style>

      {/* Video Container */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop={false}
          muted={isMuted}
          playsInline
          onEnded={handleVideoEnd}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/videos/doctor_squatch.mp4" type="video/mp4" />
        </video>

        {/* Volume Button */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 10,
            background: "rgba(0,0,0,0.3)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            padding: "12px",
            cursor: "pointer",
          }}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* Popup Overlay */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(5px)",
            padding: "16px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closePopup()
          }}
        >
          <div
            ref={containerRef}
            style={{
              width: "100%",
              maxWidth: "450px",
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 0 30px rgba(42, 75, 35, 0.5), 0 0 15px rgba(193, 122, 71, 0.5)",
              border: "1px solid #2a4b23",
              background: "rgba(245, 245, 240, 0.97)",
              backgroundImage: `
                linear-gradient(to right, rgba(42, 75, 35, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(42, 75, 35, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
              transform: glitchActive ? `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)` : "none",
              transition: glitchActive ? "none" : "transform 0.3s ease",
            }}
          >
            {/* Glitch overlay */}
            {glitchActive && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "rgba(193, 122, 71, 0.05)",
                  zIndex: 15,
                  mixBlendMode: "overlay",
                  pointerEvents: "none",
                }}
              />
            )}

            {/* Corner accents */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "16px",
                height: "16px",
                borderTop: "2px solid #2a4b23",
                borderLeft: "2px solid #2a4b23",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "16px",
                height: "16px",
                borderTop: "2px solid #c17a47",
                borderRight: "2px solid #c17a47",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "16px",
                height: "16px",
                borderBottom: "2px solid #c17a47",
                borderLeft: "2px solid #c17a47",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "16px",
                height: "16px",
                borderBottom: "2px solid #2a4b23",
                borderRight: "2px solid #2a4b23",
              }}
            />

            {/* Close button */}
            <button
              onClick={closePopup}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                zIndex: 20,
                color: "#2a4b23",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "24px",
                textShadow: "0 0 5px #2a4b23",
              }}
              onMouseEnter={() => setGlitchActive(true)}
              onMouseLeave={() => setGlitchActive(false)}
            >
              <X size={20} />
            </button>

            <div style={{ padding: "32px", position: "relative", zIndex: 10 }}>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                  {/* Title with glitch effect */}
                  <div style={{ textAlign: "center", marginBottom: "24px", position: "relative" }}>
                    <div
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                        color: "#2d5016",
                        fontFamily: "'Times New Roman', Times, serif",
                        fontStyle: "italic",
                        marginBottom: "8px",
                      }}
                    >
                      DR. SQUATCH®
                    </div>

                   
                    <div
                      style={{
                        height: "2px",
                        width: "100%",
                        background: "linear-gradient(90deg, transparent, #2a4b23, transparent)",
                        margin: "8px 0",
                      }}
                    />
                    <p
                      style={{
                        fontSize: "16px",
                        color: "#c17a47",
                        textShadow: "0 0 5px rgba(193, 122, 71, 0.5)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginTop: "16px",
                      }}
                    >
                      ENTER YOUR EMAIL TO CONTINUE
                    </p>
                  </div>

                  {/* Input field */}
                  <div style={{ marginBottom: "24px", position: "relative" }}>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "6px",
                        padding: "1px",
                        background: "linear-gradient(90deg, #2a4b23, #c17a47)",
                        opacity: error ? "0.8" : "1",
                        animation: error ? "borderGlitch 0.3s ease" : "none",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          margin: "1px",
                          borderRadius: "5px",
                          background: "rgba(245, 245, 240, 0.97)",
                        }}
                      ></div>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ENTER.YOUR@EMAIL.COM"
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
                        animation: "blink 1s infinite",
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
                        animation: "errorGlitch 0.3s ease",
                      }}
                    >
                      [ERROR]: {error}
                    </p>
                  )}

                  {/* Button */}
                  <div style={{ marginBottom: "24px" }}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="glitch-button"
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
                      }}
                      onMouseEnter={() => setGlitchActive(true)}
                      onMouseLeave={() => setGlitchActive(false)}
                    >
                      {isSubmitting ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                          <div
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              border: "2px solid rgba(255,255,255,0.3)",
                              borderTopColor: "white",
                              animation: "spin 1s linear infinite",
                            }}
                          />
                          PROCESSING...
                        </div>
                      ) : (
                        <>
                          CLAIM YOUR SOAP →
                          {glitchActive && (
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "rgba(255, 255, 255, 0.1)",
                                transform: "translateX(5px)",
                                mixBlendMode: "overlay",
                              }}
                            />
                          )}
                        </>
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
                    }}
                  >
                    [SECURE NATURAL SOAP CONNECTION]
                  </div>
                </form>
              ) : (
                <div style={{ textAlign: "center", padding: "24px 0" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      margin: "0 auto 16px",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: "#2a4b23",
                        opacity: 0.2,
                        animation: "pulse 2s infinite",
                      }}
                    ></div>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#2a4b23"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <h3
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      marginBottom: "8px",
                      color: "#2a4b23",
                      textShadow: "0 0 5px rgba(42, 75, 35, 0.5)",
                    }}
                  >
                    DISCOUNT ACTIVATED
                  </h3>

                  <div
                    style={{
                      height: "2px",
                      width: "100%",
                      background: "linear-gradient(90deg, transparent, #2a4b23, transparent)",
                      margin: "12px 0",
                    }}
                  ></div>

                  <p
                    style={{
                      marginBottom: "24px",
                      color: "#4a5568",
                      fontFamily: "monospace",
                    }}
                  >
                    REDIRECTING TO SOAP PARADISE...
                  </p>

                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        width: "100%",
                        height: "4px",
                        borderRadius: "2px",
                        backgroundColor: "rgba(42, 75, 35, 0.2)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: "30%",
                          background: "linear-gradient(90deg, #2a4b23, #c17a47)",
                          borderRadius: "2px",
                          position: "absolute",
                          left: "-30%",
                          animation: "loading 2s infinite linear",
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
