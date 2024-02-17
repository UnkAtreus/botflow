'use client';

import { IArea, IAreaRendererProps } from '@bmunozg/react-image-area';
import { useCallback, useEffect, useState } from 'react';

export function useAreaSelector() {
  const [areas, setAreas] = useState<IArea[]>([]);
  const [selectedArea, setSelectedArea] = useState<IAreaRendererProps>();

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedArea) {
        removeArea(selectedArea.areaNumber);
      }
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [selectedArea]);

  function removeArea(areaNumber: number) {
    setAreas((prev) => prev.filter((_, i) => i + 1 !== areaNumber));
  }

  return {
    areas,
    setAreas,
    selectedArea,
    setSelectedArea,
    removeArea,
  };
}
