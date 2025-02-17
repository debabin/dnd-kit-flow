interface SidebarItemProps {
  icon: React.FunctionComponent;
  label: string;
  type: string;
}

export const SidebarItem = (props: SidebarItemProps) => (
  <div className='flex cursor-pointer z-10  items-center p-2 rounded-lg hover:bg-gray-100 group'>
    <props.icon />
    <span className='ms-3'>{props.label}</span>
  </div>
);
