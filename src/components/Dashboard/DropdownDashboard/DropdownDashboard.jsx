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
export default function DropdownDashboard({setTab,tab}) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Dropdown
        type="listbox"
        closeOnSelect
        className="w-full z-10 bg-zinc-200"
      >
        <DropdownTrigger>
          <Button
            variant="faded"
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
                className={`w-full text-2xl  transition-all border border-zinc-300 text-primary-900 hover:bg-primary-200 z-10 ${tab === option.tab ? 'bg-primary-400' : 'bg-zinc-100'}`}
                aria-label="Actions"
                variant="primary"
                onClick={() => { 
                  setOpen(!open);
                  //TODO changeTab deberá cambiar la pestaña que se ve.
                  setTab(option.tab);
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
