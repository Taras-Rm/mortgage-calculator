import { useCallback } from "react";

export const useMessasge = () => {
    return useCallback((text) => {
        if(window.M && text) {
            window.M.toast({ html: text });
        }
    }, [])
}