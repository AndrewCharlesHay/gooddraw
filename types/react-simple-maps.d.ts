declare module "react-simple-maps" {
  import type { ReactNode, SVGProps } from "react";

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    viewBox?: string;
    style?: React.CSSProperties;
    children?: ReactNode;
  }

  interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: Geography[] }) => ReactNode;
  }

  interface Geography {
    rsmKey: string;
    id: string | number;
    properties: Record<string, unknown>;
    geometry: object;
  }

  interface GeographyProps extends Omit<SVGProps<SVGPathElement>, "style"> {
    geography: Geography;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    onMouseMove?: (event: React.MouseEvent<SVGPathElement>, geo: Geography) => void;
    onMouseLeave?: (event: React.MouseEvent<SVGPathElement>, geo: Geography) => void;
    onClick?: (event: React.MouseEvent<SVGPathElement>, geo: Geography) => void;
  }

  export function ComposableMap(props: ComposableMapProps): JSX.Element;
  export function Geographies(props: GeographiesProps): JSX.Element;
  export function Geography(props: GeographyProps): JSX.Element;
  export function ZoomableGroup(props: { children?: ReactNode; [key: string]: unknown }): JSX.Element;
}
