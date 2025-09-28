import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

export default function RasmalaiApologyFlow() {
  const [step, setStep] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const canvasRef = useRef(null);

  // Floating hearts for apology step (step 4)
  useEffect(() => {
    let interval;
    if (showHearts) {
      interval = setInterval(() => {
        const heart = document.createElement("div");
        heart.innerText = "❤️";
        heart.style.position = "absolute";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.top = "100%";
        heart.style.fontSize = Math.random() * 20 + 20 + "px";
        heart.style.animation =
          "floatUp 4s linear forwards, fadeOut 4s linear forwards";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [showHearts]);

  // Continuous hearts rain for happy step (step 6)
  useEffect(() => {
    if (step !== 6) return;
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.innerText = "💖";
      heart.style.position = "absolute";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "-50px";
      heart.style.fontSize = Math.random() * 20 + 20 + "px";
      heart.style.animation = "fallDown 5s linear forwards";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    }, 400);
    return () => clearInterval(interval);
  }, [step]);

  // Fireworks on happy step
  useEffect(() => {
    if (step !== 6) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = [];

    function createFirework(x, y) {
      const colors = ["#ff4d4d", "#ffd633", "#4dff4d", "#33ccff", "#ff66ff"];
      for (let i = 0; i < 30; i++) {
        particles.push({
          x,
          y,
          angle: Math.random() * 2 * Math.PI,
          speed: Math.random() * 4 + 2,
          radius: Math.random() * 2 + 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.02;
        if (p.alpha <= 0) particles.splice(i, 1);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }

    const fireworkInterval = setInterval(() => {
      createFirework(
        Math.random() * canvas.width,
        Math.random() * canvas.height / 2
      );
    }, 1000);

    animate();

    return () => clearInterval(fireworkInterval);
  }, [step]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-amber-50 to-amber-100 text-center p-6 relative overflow-hidden">
      {/* Background Song */}
      {step >= 0 && (
        <ReactPlayer
          url="https://www.youtube.com/watch?v=6Ss2Ga7A0TA"
          playing={true}
          loop={false}
          controls={false}
          width="0"
          height="0"
        />
      )}

      {/* Fireworks Canvas */}
      {step === 6 && (
        <canvas
          ref={canvasRef}
          width={window.innerWidth}
          height={window.innerHeight}
          className="fixed top-0 left-0 pointer-events-none"
        />
      )}

      {/* Step 0: Mahal Door */}
      {step === 0 && (
        <div className="relative w-72 h-80 perspective flex">
          {/* Left Panel */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -100, x: -150 }}
            transition={{ duration: 2 }}
            className="w-1/2 h-full bg-amber-700 border-r-4 border-yellow-900 shadow-xl flex items-center justify-center text-white text-2xl font-bold"
            onAnimationComplete={() => setStep(1)}
          >
            🚪
          </motion.div>
          {/* Right Panel */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: 100, x: 150 }}
            transition={{ duration: 2 }}
            className="w-1/2 h-full bg-amber-700 border-l-4 border-yellow-900 shadow-xl flex items-center justify-center text-white text-2xl font-bold"
          >
            🚪
          </motion.div>
        </div>
      )}

      {/* Step 1: First Question */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 rounded-xl shadow-xl p-6"
        >
          <h2 className="text-xl font-bold text-amber-800">
            Kya aap mujhse gussa ho? 🥺
          </h2>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-2 rounded-lg bg-red-500 text-white"
            >
              Yes
            </button>
            <button
              onClick={() => setStep(6)}
              className="px-5 py-2 rounded-lg bg-green-500 text-white"
            >
              No
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 2: Second Question */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 rounded-xl shadow-xl p-6"
        >
          <h2 className="text-xl font-bold text-rose-700">
            Sunne me aa raha hai ki aap mujhse gussa ho, kya ye sach hai?
          </h2>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-2 rounded-lg bg-red-500 text-white"
            >
              Yes
            </button>
            <button
              onClick={() => setStep(6)}
              className="px-5 py-2 rounded-lg bg-green-500 text-white"
            >
              No
            </button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Kyu gussa ho */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/80 rounded-xl shadow-xl p-6"
        >
          <h2 className="text-xl font-bold text-amber-700">
            Kyu gussa ho Rasmalai? 😔
          </h2>
          {setTimeout(() => setStep(4), 2000) && null}
        </motion.div>
      )}

      {/* Step 4: Apology */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-rose-50 rounded-xl shadow-xl p-6"
        >
          <h2 className="text-lg font-bold text-rose-700">Sorry... 🥺</h2>
          <p className="mt-3 text-sm text-rose-900 leading-relaxed">
            Shayad mai jaanti hu kyu gussa ho... <br />
            Please gussa matt hoyiye, aap to meri jaan ho. ❤️ <br />
            And I am so sorry ki maine apna promise tod diya... <br />
            Please mujhe maaf kar do.
          </p>
          <div className="mt-4 flex justify-center">
            <img
              src="https://stickershop.line-scdn.net/stickershop/v1/product/10655/LINEStorePC/main.png"
              alt="Bubu Dudu Hug"
              className="w-40 h-40"
            />
          </div>
          <button
            onClick={() => {
              setShowHearts(true);
              setTimeout(() => setStep(5), 3000);
            }}
            className="mt-4 px-5 py-2 rounded-lg bg-rose-600 text-white shadow-md"
          >
            Maaf kar do ❤️
          </button>
        </motion.div>
      )}

      {/* Step 5: Maan jaao */}
      {step === 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 rounded-xl shadow-xl p-6"
        >
          <h2 className="text-xl font-bold text-amber-700">
            Maan jaao na please Rasmalai 🥺
          </h2>
          <button
            onClick={() => setStep(6)}
            className="mt-4 px-5 py-2 rounded-lg bg-green-600 text-white"
          >
            Okay ❤️
          </button>
        </motion.div>
      )}

      {/* Step 6: Happy + Confession + Continuous Hearts */}
      {step === 6 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 rounded-xl shadow-xl p-6 relative z-10"
        >
          <h2 className="text-xl font-bold text-green-700">Yay! 🥰</h2>
          <p className="mt-2 text-sm text-green-900">
            Rasmalai ab khush hai! 🎉
          </p>
          <div className="mt-4 flex justify-center">
            <img
              src="https://stickershop.line-scdn.net/stickershop/v1/product/10655/LINEStorePC/main.png"
              alt="Bubu Dudu Happy"
              className="w-36 h-36"
            />
          </div>
          <p className="mt-6 text-lg font-semibold text-pink-600">
            💖 I Love You Rasmalai — Hamesha aur hamesha 💖
          </p>
        </motion.div>
      )}

      {/* CSS animations */}
      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-100vh); opacity: 0; }
          }
          @keyframes fadeOut {
            100% { opacity: 0; }
          }
          @keyframes fallDown {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }
          .perspective {
            perspective: 1000px;
          }
        `}
      </style>
    </div>
  );
}
