
import {
 
  Globe,
  MenuIcon,
  MoonIcon,
  PaletteIcon,
} from "lucide-react";
import {  useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import DrawerPrimary from "../Drawer/Primary";
import { useState } from "react";
import { Switch } from "@/components/molecules/switch/default";
import { useTheme } from "@/components/molecules/providers/ThemeProvider"; // Import your Theme Provider

const NavbarPrimary = () => {
  const { toggleTheme } = useTheme(); // Access the current theme and toggle function
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get current location
  const [drawer, setDrawer] = useState(false);

  const toggleLanguage = () => {
    const currentLang = location.pathname.split("/")[1]; // Get the current language from path
    const newLang = currentLang === "fa" ? "en" : "fa"; // Toggle language
    const newPath = location.pathname.replace(`/${currentLang}`, `/${newLang}`); // Replace current language in path
    navigate(newPath); // Navigate to the new path
  };

  return (
    <div className="flex items-center justify-between w-full px-6 py-2">
    
      <div className="flex items-center justify-center gap-4">
     
        <Globe
          onClick={toggleLanguage}
          className="w-[18px] h-[18px] text-gray-500 duration-200 hover:text-primary cursor-pointer"
        />
        <MenuIcon
          onClick={() => setDrawer(true)}
          className="w-[18px] h-[18px] text-gray-500 duration-200 block lg:hidden hover:text-primary cursor-pointer"
        />
        <MoonIcon
          onClick={toggleTheme} // Toggle theme using context
          className="w-[18px] h-[18px] text-gray-500 duration-200 hidden lg:block hover:text-primary cursor-pointer"
        />
      </div>
      <DrawerPrimary title=" " isOpen={drawer} onClose={() => setDrawer(false)}>
        <div className="flex flex-col items-start gap-1">
         
          <div className="w-full">
          
          </div>

         
          <div className="flex items-center justify-between w-full gap-2 px-6">
            <div className="flex items-center gap-2">
              <PaletteIcon width={23} height={23} />
              <p> Theme:</p>
            </div>
            <Switch onClick={toggleTheme} />{" "}
            {/* This can also be used to toggle theme */}
          </div>
        </div>
      </DrawerPrimary>
    </div>
  );
};

export default NavbarPrimary;
