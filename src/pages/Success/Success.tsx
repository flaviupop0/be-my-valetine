import { JSX, useEffect } from "react";
import { Result } from "antd";
import confetti from "canvas-confetti";
import { SUCCESS_GIF } from "../../constants";
import Fireworks from "@fireworks-js/react";

export const Success = (): JSX.Element => {
    useEffect(() => {
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;

        const interval: ReturnType<typeof setInterval> = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            confetti({
                particleCount: 100,
                startVelocity: 30,
                spread: 360,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
                colors: ["#ff4d4f", "#ff7875", "#ff9c9c", "#ffffff"],
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen flex items-center flex-col justify-center bg-red-100">
            <Fireworks
                options={{
                    rocketsPoint: {
                        min: 0,
                        max: 100,
                    },
                    explosion: 5,
                    intensity: 30,
                    flickering: 50,
                    lineStyle: "round",
                    lineWidth: {
                        explosion: {
                            min: 2,
                            max: 4,
                        },
                        trace: {
                            min: 1,
                            max: 2,
                        },
                    },
                }}
            />
            <Result
                status="success"
                title={
                    <span className="text-4xl md:text-6xl font-bold text-red-600">
                        YAAAY! TE IUBESC! ❤️
                    </span>
                }
                subTitle={
                    <span className="text-xl">
                        Alegerea corectă! Pregătește-te pentru o seară magică.
                    </span>
                }
                extra={[
                    <div key="success-img" className="flex justify-center mt-4">
                        <img
                            src={SUCCESS_GIF}
                            className="rounded-xl shadow-2xl w-80 border-8 border-white"
                            alt="Happy"
                        />
                    </div>,
                ]}
            />
        </div>
    );
};
