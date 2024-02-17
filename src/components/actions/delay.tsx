import { RiTimerLine } from '@remixicon/react';
import {
  ElementsType,
  WorkflowElement,
  WorkflowElementInstance,
} from '../types/workflow-elements';

const type: ElementsType = 'Delay';

export const DelayElement: WorkflowElement = {
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
  return <></>;
}
