import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import { useRef, MutableRefObject } from 'react';
import type { Map as LeafletMap } from 'leaflet';

const DynamicMap = dynamic(() => import('./dynamic-map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-lg">
      <div className="text-center space-y-2">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary-500" />
        <p className="text-muted-foreground">Loading map...</p>
      </div>
    </div>
  ),
});

interface MapComponentProps {
  center: [number, number];
  zoom: number;
  markerPosition: [number, number];
  popupContent: string;
  onMapReady?: () => void;
  mapRef?: MutableRefObject<LeafletMap | null>;
}

const MapComponent: React.FC<MapComponentProps> = ({
  center,
  zoom,
  markerPosition,
  popupContent,
  onMapReady,
  mapRef
}) => {
  const internalMapRef = useRef<LeafletMap | null>(null);
  const actualMapRef = mapRef || internalMapRef;

  return <DynamicMap
    center={center}
    zoom={zoom}
    markerPosition={markerPosition}
    popupContent={popupContent}
    onMapReady={onMapReady}
    mapRef={actualMapRef}
  />;
};

export default MapComponent;