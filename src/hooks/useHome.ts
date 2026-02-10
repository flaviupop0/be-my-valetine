import { useRef, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router";
import { PHRASES } from "../constants";
import { ROUTES_CONSTANTS } from "../types";

interface UseHomeReturn {
    containerRef: React.RefObject<HTMLDivElement | null>;
    noButtonPos: { x: number; y: number };
    loading: boolean;
    yesScale: number;
    noScale: number;
    phraseIndex: number;
    handleNoButton: () => void;
    handleYesButton: () => Promise<void>;
}

export const useHome = (): UseHomeReturn => {
    const containerRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();
    const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
    const [loading, setLoading] = useState(false);
    const [yesScale, setYesScale] = useState(1);
    const [noScale, setNoScale] = useState(1);
    const [phraseIndex, setPhraseIndex] = useState(0);

    const handleNoButton = (): void => {
        if (!containerRef.current) {
            return;
        }

        const container = containerRef.current;
        const buttonWidth = 150;
        const buttonHeight = 50;

        const maxX = container.clientWidth - buttonWidth;
        const maxY = container.clientHeight - buttonHeight;

        const x = Math.random() * maxX;
        const y = Math.random() * maxY;

        setNoButtonPos({ x, y });
        setYesScale((prev) => prev + 0.15);
        setNoScale((prev) => (prev > 0.4 ? prev - 0.1 : prev));
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    };

    const handleYesButton = async (): Promise<void> => {
        setLoading(true);
        await supabase
            .from("valentines_responses")
            .insert([{ answer: "YES! ❤️" }]);
        setLoading(false);
        navigate(ROUTES_CONSTANTS.SUCCESS);
    };

    return {
        containerRef,
        noButtonPos,
        loading,
        yesScale,
        noScale,
        phraseIndex,
        handleNoButton,
        handleYesButton,
    };
};
