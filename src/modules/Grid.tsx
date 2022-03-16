import { useEffect, useRef } from "react";

import useWindowSize from "../hooks/useWindowResize";
import { useStore } from "../store/utils";

export default function Grid() {
    const setMiddle = useStore((state) => state.setMiddle);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const windowSize = useWindowSize();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        // Resize canvas
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setMiddle("x", canvas.offsetLeft + canvas.offsetWidth / 2);
        setMiddle("y", canvas.offsetTop - canvas.offsetHeight / 2);

        function drawGrid(options: {
            theContext: CanvasRenderingContext2D | null;
            background?: string;
            majorColor?: string;
            minorColor?: string;
            colorOfNum?: string;
            displayNum?: boolean;
        }) {
            const ctx = options.theContext || false;

            if (!ctx) return;

            const bkg = options.background || "#ffffff";
            const maj = options.majorColor || "#d1d1d1";
            const min = options.minorColor || "#eeeeee";
            const txt = options.colorOfNum || "rgba(0,0,0,.3)";
            const num = options.displayNum || false;

            const W = ctx.canvas.width;
            const H = ctx.canvas.height;

            ctx.font = "10px Verdana";
            ctx.fillStyle = bkg;
            ctx.fillRect(0, 0, W, H);
            ctx.lineWidth = 1;

            for (let x = 0; x < W; x += 10) {
                ctx.beginPath();
                ctx.fillStyle = txt;
                ctx.strokeStyle = min;
                if (x % 50 == 0) {
                    ctx.strokeStyle = maj;
                    num && ctx.fillText(x.toString(), x, 10);
                }
                ctx.moveTo(x, 0);
                ctx.lineTo(x, H);
                ctx.stroke();
            }

            for (let y = 0; y < H; y += 10) {
                ctx.beginPath();
                ctx.fillStyle = txt;
                ctx.strokeStyle = min;
                if (y % 50 == 0) {
                    ctx.strokeStyle = maj;
                    num && y && ctx.fillText(y.toString(), 0, y + 8);
                }
                ctx.moveTo(0, y);
                ctx.lineTo(W, y);
                ctx.stroke();
            }
        }

        drawGrid({
            theContext: ctx,
        });
    }, [canvasRef, setMiddle, windowSize]);

    return <canvas ref={canvasRef} className="relative w-full h-full block"></canvas>;
}
