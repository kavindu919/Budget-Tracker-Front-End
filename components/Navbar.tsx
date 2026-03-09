import { useState } from "react";
import { PiBellSimpleRingingThin, PiList, PiUser } from "react-icons/pi";
import ProfilePopup from "./ProfilePopup";

interface NavBarProps {
  setIsMobileOpen: (value: boolean) => void;
}

const Navbar = ({ setIsMobileOpen }: NavBarProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  return (
    <header className="flex h-14 w-full flex-row items-center justify-between px-4 md:h-16 lg:h-20">
      <div>
        <button
          onClick={() => setIsMobileOpen(true)}
          className="mr-auto block cursor-pointer md:hidden"
          aria-label="Open menu"
        >
          <PiList className="h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-row items-center space-x-1">
        <button
          aria-label="Notifications"
          className="bg-moonstone flex items-center justify-center rounded-full p-2"
        >
          <PiBellSimpleRingingThin className="h-6 w-6 text-black md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </button>
        <div className="relative">
          <button
            aria-label="profile-section"
            className="bg-moonstone flex cursor-pointer items-center justify-center rounded-full p-2"
            onClick={() => setModalOpen((prev) => !prev)}
          >
            <PiUser className="h-6 w-6 text-black md:h-5 md:w-5 lg:h-6 lg:w-6" />
          </button>
          {modalOpen && <ProfilePopup />}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
