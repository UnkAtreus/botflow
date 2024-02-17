import {
  RiCloseCircleFill,
  RiDeleteBackFill,
  RiFileFill,
  RiTimerLine,
} from '@remixicon/react';
import {
  ElementsType,
  WorkflowElement,
  WorkflowElementInstance,
} from '../types/workflow-elements';

import RichMenuSelector from '../rich-menu-selector';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input, InputProps } from '../ui/input';
import { memo, useRef, useState } from 'react';
import { ControllerRenderProps, FieldValues, useForm } from 'react-hook-form';
import { useAreaSelector } from '../hooks/useAreaSelector';
import { AreaSelector } from '../ui/area-selector';
import Dropzone from '../ui/dropzone';
import { convertFileToBuffer, convertFileToString } from '@/lib/fles';

const type: ElementsType = 'RichMenu';

export const RichMenuElement: WorkflowElement = {
  type,
  designerBtnElement: {
    icon: RiTimerLine,
    label: 'Text Field',
  },
  workflowComponent: WorkflowComponent,
  propertiesComponent: PropertiesComponent,
};

function WorkflowComponent({
  elementInstance,
}: {
  elementInstance: WorkflowElementInstance;
}) {
  return <></>;
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: WorkflowElementInstance;
}) {
  const [file, setFile] = useState<string>('');
  const form = useForm();
  const img = new Image();
  img.src = file;

  async function handleOnDrop(acceptedFiles: FileList | null) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const allowedTypes = [
        { name: 'csv', types: ['text/csv'] },
        { name: 'png', types: ['image/png'] },
        {
          name: 'excel',
          types: [
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          ],
        },
      ];
      const fileType = allowedTypes.find((allowedType) =>
        allowedType.types.find((type) => type === acceptedFiles[0].type)
      );
      if (!fileType) {
        form.setValue('file', null);
        form.setError('file', {
          message: 'File type is not valid',
          type: 'typeError',
        });
      } else {
        const buffer = await URL.createObjectURL(acceptedFiles[0]);
        setFile(buffer);

        form.setValue('file', acceptedFiles[0]);
        form.clearErrors('file');
      }
    } else {
      form.setValue('file', null);
      form.setError('file', {
        message: 'File is required',
        type: 'typeError',
      });
    }
  }

  return (
    <div>
      {/* <AreaSelector areas={areas} onChange={setAreas}>
        <img src='./richmenu-template-guide-04.png' alt='richmenu' />
      </AreaSelector> */}
      <Form {...form}>
        <form className='space-y-8'>
          <FormField
            control={form.control}
            name='file'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Dropzone
                    {...field}
                    dropMessage='Drop image or click here'
                    handleOnDrop={handleOnDrop}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch('file') && (
            <RichMenuSelector src={file}>
              {(areas, { removeArea }, selectedArea) => {
                return (
                  <>
                    {areas.map((area, i) => {
                      const areaNumber = i + 1;
                      const isSelected =
                        selectedArea?.areaNumber === areaNumber;
                      return (
                        <RichMenuSelector.Field
                          key={`areas__${i}`}
                          name={`areas-${i}`}
                          label={`Action ${i + 1}`}
                          area={area}
                          control={form.control}
                          isSelected={isSelected}
                          removeArea={removeArea}
                          areaNumber={areaNumber}
                          image={img}
                          form={form}
                        />
                      );
                    })}
                  </>
                );
              }}
            </RichMenuSelector>
          )}
        </form>
      </Form>
    </div>
  );
}
