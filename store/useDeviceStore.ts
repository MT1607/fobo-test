import {create} from "zustand";

interface DeviceState {
    isMobile: boolean;
    setIsMobile: (isMobile: boolean) => void;
    updateDevice: () => void;
}

export const useDeviceStore = create<DeviceState>((set) => {
    // Helper function to update the device state
    const updateDevice = () => {
        if (typeof window !== "undefined") {
            set({isMobile: window.innerWidth <= 768});
        }
    };

    // Setup event listener only on client side
    if (typeof window !== "undefined") {
        // Initial update
        updateDevice();

        // Add event listener for resize
        window.addEventListener("resize", updateDevice);
    }

    return {
        // Default value for SSR
        isMobile: false,
        // Manually set isMobile
        setIsMobile: (isMobile: boolean) => set({isMobile}),
        // Update based on window size
        updateDevice
    };
});