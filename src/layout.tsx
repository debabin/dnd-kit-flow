import { Flow, Sidebar } from './components';

export const Layout = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <Flow />
    </div>
  );
};
