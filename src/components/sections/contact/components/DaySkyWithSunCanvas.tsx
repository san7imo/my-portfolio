import React, { useEffect, useRef } from "react";

interface DaySkyWithSunCanvasProps {
  className?: string;
}

const DaySkyWithSunCanvas: React.FC<DaySkyWithSunCanvasProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const palette = [
      "#FFF6C3", // centro
      "#FFE066", // amarillo claro
      "#FFB733", // naranja suave
      "#E89000", // naranja fuerte
      "#C86A00", // borde más oscuro
    ];

    const pixelSize = 4; // tamaño del “pixel” grande

    const drawPixelCircle = (
      cx: number,
      cy: number,
      radius: number,
      color: string
    ) => {
      ctx.fillStyle = color;
      for (let y = -radius; y <= radius; y++) {
        for (let x = -radius; x <= radius; x++) {
          if (x * x + y * y <= radius * radius) {
            ctx.fillRect(
              Math.floor(cx + x) * pixelSize,
              Math.floor(cy + y) * pixelSize,
              pixelSize,
              pixelSize
            );
          }
        }
      }
    };

    const animate = () => {
      // Fondo cielo
      ctx.fillStyle = "rgb(135, 206, 235)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sol más pequeño y más abajo
      const sunRadius = 8; // antes era 12 → ahora más pequeño
      const sunX = Math.floor((canvas.width - 100) / pixelSize); // más centrado horizontalmente
      const sunY = Math.floor(120 / pixelSize); // más abajo verticalmente

      // Halo suave para realismo
      drawPixelCircle(sunX, sunY, sunRadius + 5, "rgba(255, 240, 150, 0.08)");
      drawPixelCircle(sunX, sunY, sunRadius + 4, "rgba(255, 240, 150, 0.12)");
      drawPixelCircle(sunX, sunY, sunRadius + 3, "rgba(255, 240, 150, 0.18)");
      drawPixelCircle(sunX, sunY, sunRadius + 2, "rgba(255, 240, 150, 0.25)");

      // Círculos concéntricos simulando degradado pixel art
      for (let i = palette.length - 1; i >= 0; i--) {
        drawPixelCircle(sunX, sunY, sunRadius - i, palette[i]);
      }

      // Sutil parpadeo/brillo
      if (Math.random() > 0.9) {
        ctx.globalAlpha = 0.85 + Math.random() * 0.15;
      } else {
        ctx.globalAlpha = 1;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
};

export default DaySkyWithSunCanvas;
