import { PointerEvent } from 'react';
import {
  CustomAreaRenderer,
  CustomStyles,
  IArea,
} from '@/components/ui/area-selector/types';

export interface IAreaProps {
  area: IArea;
  globalAreaStyle?: CustomStyles;
  onCropStart: (event: PointerEvent<HTMLDivElement>) => void;
  showHandles: boolean;
  customAreaRenderer?: CustomAreaRenderer;
  areaNumber: number;
}
