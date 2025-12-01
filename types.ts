import React from 'react';

export interface SlideData {
  id: number;
  component: React.ReactNode;
}

export enum Direction {
  NEXT = 1,
  PREV = -1
}