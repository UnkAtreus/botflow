/* eslint-disable @typescript-eslint/no-explicit-any */
import { DelayElement } from '../actions/delay';
import { RichMenuElement } from '../actions/rich-menu';

export type ElementsType = 'Delay' | 'RichMenu' | 'Condition';

export type WorkflowElement = {
  type: ElementsType;
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  workflowComponent: React.FC<{
    elementInstance: WorkflowElementInstance;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: WorkflowElementInstance;
  }>;
};

export type WorkflowElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>;
};

type FormElementsType = {
  [key in ElementsType]: WorkflowElement;
};

export const FormElements: FormElementsType = {
  Delay: DelayElement,
  RichMenu: RichMenuElement,
  Condition: DelayElement,
};
