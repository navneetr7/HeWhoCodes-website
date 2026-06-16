export type GlassPillMetrics = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type GlassPillMoveOptions = {
  first?: boolean;
  instant?: boolean;
  tracking?: boolean;
};

export type GlassPillPointerResult = {
  metrics: GlassPillMetrics;
  activeIndex: number | null;
};

export type GlassPillIndicatorHandle = {
  moveTo: (metrics: GlassPillMetrics, options?: GlassPillMoveOptions) => void;
  hide: () => void;
};