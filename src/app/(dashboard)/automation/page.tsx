'use client';
import { ActionButton } from '@/components/action-button';
import { Button } from '@/components/ui/button';
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from '@/components/ui/resizable';
import { RiGitForkLine, RiLineFill, RiSurveyLine } from '@remixicon/react';
import { Droppable } from '@/components/droppable';
import DndProvider from '@/components/providers/dnd-provider';

export default function Page() {
  return (
    <ResizablePanelGroup
      direction='horizontal'
      className='min-h-[calc(100dvh-64px)] w-full'
    >
      {/* <ResizablePanel defaultSize={20}>
        <div className='flex h-full items-center justify-center p-6'>
          <span className='font-semibold'>Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle /> */}
      <DndProvider>
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction='horizontal' className='min-h- w-full'>
            <ResizablePanel defaultSize={68}>
              <div className='flex items-center justify-center px-6 py-4 border-b'>
                <div className='font-normal'>
                  Workflow: <span className='font-semibold'>Demo Flow</span>
                </div>
              </div>
              <Droppable>
                <div className='flex h-full items-center justify-center p-6 '>
                  <span className='font-semibold'>Content1</span>
                </div>
              </Droppable>
            </ResizablePanel>

            <ResizableHandle />
            <ResizablePanel defaultSize={32} className='overflow-visible'>
              <div className='flex items-center px-6 py-4 border-b'>
                <div className='font-normal'>Workflow Items</div>
              </div>
              <div className='p-6 space-y-2'>
                <div className='font-normal'>Action</div>
                <div className='flex flex-col space-y-2'>
                  <ActionButton title='Rich menu' icon={<RiLineFill />} />
                  <ActionButton title='แบบฟอร์ม' icon={<RiSurveyLine />} />
                  <ActionButton
                    title='สร้างเงื่อนไข'
                    icon={<RiGitForkLine className='rotate-180' />}
                  />
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </DndProvider>
    </ResizablePanelGroup>
  );
}
