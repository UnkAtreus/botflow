'use client';
import { RichMenuElement } from '@/components/actions/rich-menu';
import { Droppable } from '@/components/droppable';
import DndProvider from '@/components/providers/dnd-provider';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
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
                  <input
                    type='text'
                    style={{
                      userSelect: 'all',
                    }}
                  />
                </div>
              </Droppable>
            </ResizablePanel>

            <ResizableHandle />
            <ResizablePanel defaultSize={32} className='overflow-visible'>
              <div className='flex items-center px-6 py-4 border-b'>
                <div className='font-normal'>Properties</div>
              </div>
              <ScrollArea className='h-[calc(100vh-128px)]'>
                <div className='p-6 space-y-2'>
                  <RichMenuElement.propertiesComponent
                    elementInstance={{
                      id: '1',
                      type: 'RichMenu',
                    }}
                  />
                </div>
              </ScrollArea>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </DndProvider>
    </ResizablePanelGroup>
  );
}
