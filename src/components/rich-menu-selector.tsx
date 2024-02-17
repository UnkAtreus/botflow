import { useAreaSelector } from './hooks/useAreaSelector';
import {
  ContextMenuShortcut,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from './ui/context-menu';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { useEffect, useRef } from 'react';
import { Control, FieldValues, UseFormReturn } from 'react-hook-form';
import {
  RiDeleteBin6Fill,
  RiDeleteBinFill,
  RiDeleteBinLine,
} from '@remixicon/react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { AreaSelector, IArea, IAreaRendererProps } from './ui/area-selector';

declare type RenderChildren = (
  areas: IArea[],
  actions: {
    removeArea: (areaNumber: number) => void;
  },
  selectedArea?: IAreaRendererProps
) => React.ReactNode;

function RichMenuSelector({
  src,
  children,
}: {
  src: string;
  children: RenderChildren;
}) {
  const { areas, setAreas, removeArea, setSelectedArea, selectedArea } =
    useAreaSelector();

  const customRender = (areaProps: IAreaRendererProps) => {
    if (!areaProps.isChanging) {
      return (
        <ContextMenu key={areaProps.areaNumber}>
          <ContextMenuTrigger
            className='flex w-full h-full'
            onPointerDown={() => setSelectedArea(areaProps)}
          />
          <ContextMenuContent className='w-16'>
            <ContextMenuItem onClick={() => removeArea(areaProps.areaNumber)}>
              Delete
              <ContextMenuShortcut>Del</ContextMenuShortcut>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      );
    }
  };

  return (
    <>
      <AreaSelector
        areas={areas}
        onChange={(areas) => {
          setAreas(areas);
        }}
        unit='percentage'
        customAreaRenderer={customRender}
        wrapperStyle={{
          border: '1.5px dashed var(--border)',
        }}
        globalAreaStyle={{
          border: '1.5px dashed blue',
          backgroundColor: 'lightblue',
          opacity: 0.7,
        }}
      >
        <img src={src} alt='my image' />
      </AreaSelector>
      <div className='w-full space-y-2 h-full'>
        {children?.(areas, { removeArea }, selectedArea)}
      </div>
    </>
  );
}

function ActionField({
  name,
  label,
  area,
  control,
  isSelected,
  removeArea,
  areaNumber,
  image,
  form,
}: {
  name: string;
  label: string;
  area: IArea;
  control: Control<FieldValues, any>;
  isSelected: boolean;
  removeArea: (areaNumber: number) => void;
  areaNumber: number;
  image: HTMLImageElement;
  form: UseFormReturn<any>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSelected) {
      inputRef.current?.focus({
        preventScroll: true,
      });
    }
  }, [isSelected, area]);

  return (
    <>
      <FormField
        control={control}
        name={name}
        defaultValue={'message'}
        render={({ field }) => (
          <FormItem>
            <div className='flex w-full justify-between'>
              <FormLabel>{label}</FormLabel>
              <RiDeleteBinLine
                onClick={() => {
                  removeArea(areaNumber);
                }}
                className='w-4 h-4 cursor-pointer'
              />
            </div>
            <FormDescription>
              x: {area.x.toFixed(2)} y: {area.y.toFixed(2)} w:{' '}
              {((area.width / 100) * image.width).toFixed(2)} h:{' '}
              {((area.height / 100) * image.height).toFixed(2)}
            </FormDescription>
            <FormControl>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Action' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='message'>Message Action</SelectItem>
                    <SelectItem value='uri'>URI Action</SelectItem>
                    <SelectItem value='form'>Form Action</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`text-${name}`}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                ref={inputRef}
                placeholder={form.watch(name) || 'input text'}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

RichMenuSelector.Field = ActionField;

export default RichMenuSelector;
