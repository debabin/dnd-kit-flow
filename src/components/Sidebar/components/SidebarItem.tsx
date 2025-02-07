interface SidebarItemProps {
    type: string;
    label: string;
    icon: React.FunctionComponent;
}

export const SidebarItem = (props: SidebarItemProps) => (
    <div className='flex cursor-pointer bg-gray-50 z-10 items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group'>
        <props.icon />
        <span className='ms-3'>{props.label}</span>
    </div>
);
