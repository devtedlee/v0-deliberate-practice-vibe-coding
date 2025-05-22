import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MapContextType {
  mapLoaded: boolean;
  setMapLoaded: (loaded: boolean) => void;
  mapError: Error | null;
  setMapError: (error: Error | null) => void;
  // Add other context values as needed by MapSection.tsx or other components
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [mapError, setMapError] = useState<Error | null>(null);

  return (
    <MapContext.Provider value={{ mapLoaded, setMapLoaded, mapError, setMapError }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};
