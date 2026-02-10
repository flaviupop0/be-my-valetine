import { JSX } from "react";
import { Button, Card } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { PHRASES, GIFS } from "../../constants";
import { useHome } from "../../hooks";
import classNames from "classnames";

export const Home = (): JSX.Element => {
    const {
        containerRef,
        noButtonPos,
        loading,
        yesScale,
        noScale,
        phraseIndex,
        handleNoButton,
        handleYesButton,
    } = useHome();

    return (
        <Card className="flex h-screen flex-1 justify-center flex-col items-center justify-center p-4">
            <div className="mb-6 h-48 flex items-center justify-center">
                <img
                    src={GIFS[phraseIndex % GIFS.length]}
                    className="h-full rounded-2xl shadow-sm border-4 border-white"
                    alt="Reaction"
                />
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-gray-800 text-center mb-12 h-24">
                {PHRASES[phraseIndex]}
            </h1>

            <div
                ref={containerRef}
                className="flex gap-8 items-center justify-center w-full relative h-32"
            >
                <Button
                    type="primary"
                    danger
                    size="large"
                    icon={<HeartFilled />}
                    onClick={handleYesButton}
                    loading={loading}
                    className={classNames(
                        "bg-red-500 text-white text-xl py-3 px-10 rounded-lg shadow-md transition-transform",
                    )}
                    style={{
                        transform: `scale(${yesScale})`,
                    }}
                >
                    YES!
                </Button>

                <Button
                    size="large"
                    onMouseEnter={handleNoButton}
                    onTouchStart={(e) => {
                        e.preventDefault();
                        handleNoButton();
                    }}
                    onClick={handleNoButton}
                    danger
                    className={classNames(
                        "absolute bg-red-500 text-black text-xl py-3 px-10 rounded-lg shadow-md transition-transform z-2",
                    )}
                    style={
                        noButtonPos.x !== 0
                            ? {
                                  left: `${noButtonPos.x}px`,
                                  top: `${noButtonPos.y}px`,
                                  transform: `scale(${noScale})`,
                              }
                            : undefined
                    }
                >
                    NO
                </Button>
            </div>
        </Card>
    );
};
