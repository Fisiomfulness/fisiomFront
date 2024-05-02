import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@nextui-org/react';
import { MdAdminPanelSettings } from 'react-icons/md';
import { dashboardDropdown } from '../data/data';
export default function DropdownDashboard() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(!open)}
        className={`-z-10 absolute bg-zinc-600 bg-opacity-35 w-screen h-screen transition-all duration-150 ${
          open ? 'block z-[9]' : 'hidden '
        }`}
      ></div>
      <Dropdown
        type="listbox"
        closeOnSelect
        className="w-full z-10 bg-zinc-200"
      >
        <DropdownTrigger>
          <Button
            variant="bordered"
            color="primary"
            className=" absolute -top-[55px] z-10"
            onClick={() => setOpen(!open)}
            startContent={<MdAdminPanelSettings className="text-2xl" />}
          >
            Panel de administrador
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Static Actions"
          position="bottom"
          className="w-full"
        >
          {dashboardDropdown.map((option) => {
            return (
              <DropdownItem
                key={option.tab}
                startContent={option.icon}
                className="w-full text-2xl bg-zinc-400 bg-opacity-30 transition-all text-primary-900 hover:bg-primary-500 z-10"
                aria-label="Actions"
                variant="primary"
                onClick={() => {
                  setOpen(!open);
                  //TODO changeTab deberá cambiar la pestaña que se ve.
                  // changeTab(option.tab);
                }}
              >
                {option.name}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
