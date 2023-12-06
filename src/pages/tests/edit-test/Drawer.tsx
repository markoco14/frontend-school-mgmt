import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

type DrawerProps = {
  children: ReactNode;
  handleCloseDrawer: Function;
  title: string;
};

type DrawerHeaderProps = {
	title: string;
	handleCloseDrawer: Function;
}

const DrawerHeader = ({ title, handleCloseDrawer }: DrawerHeaderProps) => {
  return (
    <div className="mb-8 flex justify-between">
      <h2>{title}</h2>
      <button
        onClick={() => {
          handleCloseDrawer(false);
        }}
      >
        close
      </button>
    </div>
  );
};

const Drawer = ({ children, handleCloseDrawer, title }: DrawerProps) => {
  return (
    <AnimatePresence>
      <motion.div
        className="absolute left-0 top-0 h-screen w-screen bg-slate-900/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="fixed right-0 top-0 h-screen w-[100vw] border-l-2 bg-white p-4 sm:w-[50vw]"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
      >
        <div>
          <DrawerHeader title={title} handleCloseDrawer={handleCloseDrawer}/>
          {children}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};


export default Drawer;
