// import {
//   CSSProperties,
//   PointerEvent,
//   useCallback,
//   useEffect,
//   useId,
//   useRef,
//   useState,
// } from 'react';
// import { Button } from '../button';
// import {
//   containArea,
//   convertToPercentArea,
//   convertToPixelArea,
// } from '@/lib/utils';

// export type Area = {
//   id: number;
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   isSelected: boolean;
// };

// type Rectangle = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
// };

// export type XOrds = 'e' | 'w';
// export type YOrds = 'n' | 's';
// export type XYOrds = 'nw' | 'ne' | 'se' | 'sw';
// export type Ords = XOrds | YOrds | XYOrds;
// const DOC_MOVE_OPTS = { capture: true, passive: true };

// type EventData = {
//   originalClientX: number;
//   originalClientY: number;
//   clientX: number;
//   clientY: number;
//   originalMouseX: number;
//   originalMouseY: number;
//   ord?: Ords;
// };

// type AreaSelectorProps = {
//   maxArea?: number;
//   minWidth?: number;
//   minHeight?: number;
//   children: React.ReactNode;
// };
// const AreaSelector: React.FC<AreaSelectorProps> = ({
//   maxArea = Infinity,
//   minWidth = 0,
//   minHeight = 0,
//   children,
// }) => {
//   const wrapperRef = useRef<HTMLDivElement>(null!);
//   const mediaRef = useRef<HTMLDivElement>(null!);
//   const [areas, setAreas] = useState<Area[]>([]);
//   const [selectedArea, setSelectedArea] = useState<Area | null>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isResizing, setIsResizing] = useState(false);
//   const [areaEvent, setAreaEvent] = useState<EventData>({
//     originalClientX: 0,
//     originalClientY: 0,
//     clientX: 0,
//     clientY: 0,
//     originalMouseX: 0,
//     originalMouseY: 0,
//   });

//   const getBoxSize = (): Rectangle => {
//     const element = mediaRef.current;

//     if (!element) {
//       return { x: 0, y: 0, width: 0, height: 0 };
//     }
//     const { x, y, width, height } = element.getBoundingClientRect();
//     return { x, y, width, height };
//   };

//   const getPointRegion = useCallback(
//     (box: Rectangle): XYOrds => {
//       const mouseX = areaEvent.clientX - box.x;
//       const mouseY = areaEvent.clientY - box.y;
//       const topHalf = mouseY < areaEvent.originalMouseY;
//       const leftHalf = mouseX < areaEvent.originalMouseX;
//       if (leftHalf) {
//         return topHalf ? 'nw' : 'sw';
//       } else {
//         return topHalf ? 'ne' : 'se';
//       }
//     },
//     [areaEvent]
//   );

//   const onDocPointerMoveHandler = useCallback(
//     (event: globalThis.PointerEvent) => {
//       event.preventDefault();
//       event.stopPropagation();

//       const box = getBoxSize();

//       if (isDrawing && selectedArea) {
//         setAreaEvent((currentData) => ({
//           ...currentData,
//           clientX: event.clientX,
//           clientY: event.clientY,
//         }));
//         const direction = getPointRegion(box);
//         const nextArea = convertToPixelArea(
//           selectedArea,
//           box.width,
//           box.height
//         ); //get Area in pixels
//         const resolvedOrd: Ords = areaEvent.ord ? areaEvent.ord : direction;
//         const xDiff = areaEvent.clientX - areaEvent.originalClientX; //width
//         const yDiff = areaEvent.clientY - areaEvent.originalClientY; // height

//         const tmpArea: Area = {
//           ...selectedArea,
//           x: 0,
//           y: 0,
//           width: 0,
//           height: 0,
//         };
//         if (direction === 'ne') {
//           tmpArea.x = areaEvent.originalMouseX;
//           tmpArea.width = xDiff;
//           tmpArea.height = Math.abs(yDiff);
//           tmpArea.y = areaEvent.originalMouseY - tmpArea.height;
//         } else if (direction === 'se') {
//           tmpArea.x = areaEvent.originalMouseX;
//           tmpArea.y = areaEvent.originalMouseY;
//           tmpArea.width = xDiff;
//           tmpArea.height = yDiff;
//         } else if (direction === 'sw') {
//           tmpArea.x = areaEvent.originalMouseX + xDiff;
//           tmpArea.y = areaEvent.originalMouseY;
//           tmpArea.width = Math.abs(xDiff);

//           tmpArea.height = yDiff;
//         } else if (direction === 'nw') {
//           tmpArea.x = areaEvent.originalMouseX + xDiff;
//           tmpArea.width = Math.abs(xDiff);
//           tmpArea.height = Math.abs(yDiff);
//           tmpArea.y = areaEvent.originalMouseY + yDiff;
//         }

//         const containedArea = containArea(
//           tmpArea,
//           direction,
//           box.width,
//           box.height,
//           minWidth,
//           minHeight
//         );

//         // Apply x/y/width/height changes depending on ordinate
//         // (fixed aspect always applies both).
//         const xyOrds = ['nw', 'ne', 'se', 'sw'];
//         const xOrds = ['e', 'w'];
//         const yOrds = ['n', 's'];
//         if (xyOrds.indexOf(resolvedOrd) > -1) {
//           nextArea.x = containedArea.x;
//           nextArea.y = containedArea.y;
//           nextArea.width = containedArea.width;
//           nextArea.height = containedArea.height;
//         } else if (xOrds.indexOf(resolvedOrd) > -1) {
//           nextArea.x = containedArea.x;
//           nextArea.width = containedArea.width;
//         } else if (yOrds.indexOf(resolvedOrd) > -1) {
//           nextArea.y = containedArea.y;
//           nextArea.height = containedArea.height;
//         }

//         console.log(nextArea);

//         const finalArea = convertToPercentArea(nextArea, box.width, box.height);

//         console.log(finalArea);
//         console.log(areas);

//         setAreas((prev) =>
//           prev.map((a) =>
//             a.id === selectedArea?.id ? { ...selectedArea, ...finalArea } : a
//           )
//         );
//       }
//     },
//     [
//       areaEvent,
//       areas,
//       getPointRegion,
//       isDrawing,
//       minHeight,
//       minWidth,
//       selectedArea,
//     ]
//   );

//   const onDocPointerDoneHandler = useCallback(
//     (event: globalThis.PointerEvent) => {
//       event.preventDefault();
//       event.stopPropagation();
//       console.log('onPointerUp');

//       setIsDrawing(false);
//       setAreaEvent({
//         originalClientX: 0,
//         originalClientY: 0,
//         clientX: 0,
//         clientY: 0,
//         originalMouseX: 0,
//         originalMouseY: 0,
//       });
//     },
//     []
//   );

//   useEffect(() => {
//     document.addEventListener(
//       'pointermove',
//       onDocPointerMoveHandler,
//       DOC_MOVE_OPTS
//     );
//     document.addEventListener(
//       'pointerup',
//       onDocPointerDoneHandler,
//       DOC_MOVE_OPTS
//     );
//     document.addEventListener(
//       'pointercancel',
//       onDocPointerDoneHandler,
//       DOC_MOVE_OPTS
//     );

//     return () => {
//       document.removeEventListener(
//         'pointermove',
//         onDocPointerMoveHandler,
//         DOC_MOVE_OPTS
//       );
//       document.removeEventListener(
//         'pointerup',
//         onDocPointerDoneHandler,
//         DOC_MOVE_OPTS
//       );
//       document.removeEventListener(
//         'pointercancel',
//         onDocPointerDoneHandler,
//         DOC_MOVE_OPTS
//       );
//     };
//   }, [onDocPointerDoneHandler, onDocPointerMoveHandler]);

//   return (
//     <div
//       ref={wrapperRef}
//       className='relative cursor-crosshair touch-none box-border'
//     >
//       <div
//         ref={mediaRef}
//         className='box-border'
//         onPointerDown={(event) => {
//           const target = event.currentTarget;
//           event.preventDefault();
//           event.stopPropagation();

//           const box = getBoxSize();
//           console.log('box', box);

//           const mouseAreaX = event.clientX - box.x;
//           const mouseAreaY = event.clientY - box.y;

//           console.log('area', mouseAreaX, mouseAreaY);

//           const sizeAreas = areas.length;

//           const nextArea: Area = {
//             id: sizeAreas + 1,
//             x: mouseAreaX,
//             y: mouseAreaY,
//             width: 0,
//             height: 0,
//             isSelected: true,
//           };

//           console.log('nextArea', nextArea);

//           setAreaEvent({
//             originalClientX: event.clientX,
//             originalClientY: event.clientY,
//             clientX: event.clientX,
//             clientY: event.clientY,
//             originalMouseX: mouseAreaX,
//             originalMouseY: mouseAreaY,
//           });

//           setIsDrawing(true);

//           if (sizeAreas < maxArea) {
//             setSelectedArea(nextArea);
//             setAreas((prev) => prev.concat(nextArea));
//           }
//         }}
//         onPointerMove={(event) => {}}
//       >
//         {children}
//       </div>
//       {areas.map((area) => (
//         <Area
//           key={area.id}
//           area={area}
//           showHandles={area.isSelected}
//           onClick={(event) => {
//             event.preventDefault();
//             event.stopPropagation();
//             // setAreas((prev) =>
//             //   prev.map((a) => ({ ...a, isSelected: a.id === area.id }))
//             // );
//           }}
//           onPointerUp={(event) => {
//             event.preventDefault();
//             event.stopPropagation();
//             console.log('onPointerUp');

//             // setIsDrawing(false);
//           }}
//           onCropStart={(event) => {}}
//         />
//       ))}

//       <div className=''>
//         <div className='flex '>
//           <Button
//             onClick={() => {
//               setAreas([]);
//               setAreaEvent({
//                 originalClientX: 0,
//                 originalClientY: 0,
//                 clientX: 0,
//                 clientY: 0,
//                 originalMouseX: 0,
//                 originalMouseY: 0,
//               });
//             }}
//           >
//             Clear
//           </Button>
//           <div className=''>
//             <div>
//               ord: {areaEvent.ord} x:{areaEvent.clientX} y:{areaEvent.clientY}
//             </div>
//             <div>
//               clientX:{areaEvent.originalClientX} clientY:
//               {areaEvent.originalClientY}
//             </div>
//             <div>
//               MouseX:{areaEvent.originalMouseX} MouseY:
//               {areaEvent.originalMouseY}
//             </div>
//           </div>
//         </div>
//         <div>
//           {areas.map((area) => (
//             <div key={area.id} className=''>
//               x:{area.x} y:{area.y} w:{area.width} h:{area.height}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// type AreaProps = {
//   AreaRender?: (area: Area) => React.ReactNode;
//   area: Area;
//   onClick: (event: PointerEvent<HTMLDivElement>) => void;
//   onCropStart: (event: PointerEvent<HTMLDivElement>) => void;
//   onPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
//   showHandles: boolean;
// };
// const Area: React.FC<AreaProps> = ({
//   AreaRender,
//   area,
//   showHandles,
//   onClick,
//   onCropStart,
//   onPointerUp,
// }) => {
//   const PositionStyle = {
//     top: `${area.y}%`,
//     left: `${area.x}%`,
//     width: `${area.width}%`,
//     height: `${area.height}%`,
//   };

//   return (
//     <div
//       onPointerUp={onPointerUp}
//       onPointerDown={onCropStart}
//       onClick={onClick}
//       className='absolute cursor-move box-border touch-none'
//       data-wrapper='wrapper'
//       style={{
//         ...PositionStyle,
//       }}
//     >
//       {AreaRender ? AreaRender(area) : null}
//       {showHandles ? <ResizeHandles /> : null}
//     </div>
//   );
// };

// const ResizeHandles = () => {
//   const HANDLE_SIZE = 10;
//   const HANDLE_STYLES: CSSProperties = {
//     position: 'absolute',
//     outline: '1px solid rgba(0,0,0,0.5)',
//     border: '1px solid rgba(255,255,255,0.5)',
//     width: HANDLE_SIZE,
//     height: HANDLE_SIZE,
//   };
//   return (
//     <>
//       <div
//         data-dir='s'
//         data-ord='s'
//         style={{
//           ...HANDLE_STYLES,
//           bottom: 0,
//           left: '50%',
//           marginBottom: (-1 * HANDLE_SIZE) / 2,
//           marginLeft: (-1 * HANDLE_SIZE) / 2,
//           cursor: 's-resize',
//         }}
//       />
//       <div
//         data-dir='n'
//         data-ord='n'
//         style={{
//           ...HANDLE_STYLES,
//           top: 0,
//           left: '50%',
//           marginTop: (-1 * HANDLE_SIZE) / 2,
//           marginLeft: (-1 * HANDLE_SIZE) / 2,
//           cursor: 'n-resize',
//         }}
//       />
//       <div
//         data-dir='w'
//         data-ord='w'
//         style={{
//           ...HANDLE_STYLES,
//           top: '50%',
//           left: 0,
//           marginTop: (-1 * HANDLE_SIZE) / 2,
//           marginLeft: (-1 * HANDLE_SIZE) / 2,
//           cursor: 'w-resize',
//         }}
//       />
//       <div
//         data-dir='e'
//         data-ord='e'
//         style={{
//           ...HANDLE_STYLES,
//           top: '50%',
//           right: 0,
//           marginTop: (-1 * HANDLE_SIZE) / 2,
//           marginRight: (-1 * HANDLE_SIZE) / 2,
//           cursor: 'e-resize',
//         }}
//       />
//       <div
//         data-dir='se'
//         data-ord='se'
//         style={{
//           ...HANDLE_STYLES,
//           bottom: 0,
//           right: 0,
//           marginBottom: (-1 * HANDLE_SIZE) / 2,
//           marginRight: (-1 * HANDLE_SIZE) / 2,
//           cursor: 'se-resize',
//         }}
//       />

//       <div
//         data-dir='sw'
//         data-ord='sw'
//         style={{
//           ...HANDLE_STYLES,
//           bottom: 0,
//           left: 0,
//           marginBottom: (-1 * HANDLE_SIZE) / 2,
//           marginLeft: (-1 * HANDLE_SIZE) / 2,
//           cursor: 'sw-resize',
//         }}
//       />
//       <div
//         data-dir='nw'
//         data-ord='nw'
//         style={{
//           ...HANDLE_STYLES,
//           top: 0,
//           left: 0,
//           marginTop: (-1 * HANDLE_SIZE) / 2,
//           marginLeft: (-1 * HANDLE_SIZE) / 2,
//           cursor: 'nw-resize',
//         }}
//       />
//       <div
//         data-dir='ne'
//         data-ord='ne'
//         style={{
//           ...HANDLE_STYLES,
//           top: 0,
//           right: 0,
//           marginTop: (-1 * HANDLE_SIZE) / 2,
//           marginRight: (-1 * HANDLE_SIZE) / 2,
//           cursor: 'ne-resize',
//         }}
//       />
//     </>
//   );
// };

// AreaSelector.displayName = 'AreaSelector';

// export default AreaSelector;
