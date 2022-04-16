import React from 'react';
import clsx from 'clsx';
import { bluePieChartTheme } from './themes';
import s from './PieChart.module.css';

export interface PieData {
  value: number;
  title?: string;
}

export interface PieColor {
  fill: string;
}

export interface PieChartProps {
  id?: string;
  className?: string;
  data: PieData[];
  theme?: PieColor[];
  radius?: number;
  rotation?: number;
  gap?: number;
  pieWidth?: number;
}

function createPie(
  startAngle: number,
  endAngle: number,
  radius: number,
  pieWidth: number,
  fill: string,
) {
  // Degrees to radians
  startAngle *= Math.PI / 180;
  endAngle *= Math.PI / 180;

  const innerRadius = radius - pieWidth;
  const pieAngle = Math.abs(endAngle - startAngle);

  // Set large-arc-flag,
  // if the arc is greater then a half of the chart
  const largeArcFlag = pieAngle > Math.PI ? 1 : 0;

  // Left top corner
  const xLeftTop = Math.cos(startAngle) * radius;
  const yLeftTop = Math.sin(startAngle) * radius;

  // Right top corner
  const xRightTop = Math.cos(endAngle) * radius;
  const yRightTop = Math.sin(endAngle) * radius;

  // Right bottom corner
  const xRightBottom = Math.cos(endAngle) * innerRadius;
  const yRightBottom = Math.sin(endAngle) * innerRadius;

  // Left bottom corner
  const xLeftBottom = Math.cos(startAngle) * innerRadius;
  const yLeftBottom = Math.sin(startAngle) * innerRadius;

  let d = `M ${xLeftTop} ${yLeftTop}`;
  d += `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${xRightTop} ${yRightTop}`;
  d += `L ${xRightBottom} ${yRightBottom}`;
  d += `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${xLeftBottom} ${yLeftBottom}`;
  d += `Z`;

  return <path fill={fill} d={d} />;
}

export const PieChart = ({
  id,
  className,
  data,
  theme,
  radius,
  rotation,
  gap,
  pieWidth,
}: PieChartProps) => {
  // Setting defaults
  theme = theme ?? bluePieChartTheme;
  radius = radius ?? 100;
  rotation = rotation ?? 0;
  gap = gap ?? 1;
  pieWidth = pieWidth ?? 35;

  // Correct settings
  radius = Math.max(0, radius);
  gap = Math.max(0, Math.min(gap, (360 - 10) / data.length));
  pieWidth = Math.max(0, Math.min(pieWidth, radius));

  const valueSum = data.reduce(
    (currentSum, pieData) => currentSum + pieData.value,
    0,
  );

  let rotationOffset = rotation;
  const pies = [];
  for (let i = 0; i < data.length; i++) {
    const percentage = data[i].value / valueSum;
    const sizeInDegrees = (360 - gap * data.length) * percentage;

    const startRotation = rotationOffset;
    const endRotation = startRotation + sizeInDegrees;
    rotationOffset += sizeInDegrees + gap;

    // pieColorIndex has ZigZag path (1, 2, 3, 2, 1)
    const pieColorIndex =
      theme.length -
      1 -
      Math.abs(theme.length - 1 - (i % (theme.length * 2 - 1)));
    const pieColor = theme[pieColorIndex];

    pies.push(
      createPie(startRotation, endRotation, radius, pieWidth, pieColor.fill),
    );
  }

  return (
    <svg
      id={id}
      className={clsx(s.pieChart, className)}
      viewBox={`${-radius} ${-radius} ${radius * 2} ${radius * 2}`}>
      {pies.map((pie) => pie)}
    </svg>
  );
};
