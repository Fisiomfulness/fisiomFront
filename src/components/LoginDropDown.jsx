import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";


export default function LoginDropDown() {

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <User
            as="button"
            name="Dr. Mario Gómez"
            avatarProps={{
              isBordered: true,
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
            }}
            className="transition-transform"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat" closeOnSelect={false}>
          <DropdownItem key="settings" color="primary">
            <Popover 
              showArrow
              placement="right"
            >
              <PopoverTrigger>
                Mis servicios
              </PopoverTrigger>
              <PopoverContent>
                  <Button className="bg-white hover:bg-[#cce3fd] hover:text-primary">
                    <Link href="#">
                      Historial clinico pacientes
                    </Link>
                  </Button>
                  <Button className="bg-white hover:bg-[#cce3fd] hover:text-primary" fullWidth={true}>
                    <Link href="#">
                      Calendario
                    </Link>
                  </Button>
              </PopoverContent>
            </Popover>
          </DropdownItem>
          <DropdownItem key="team_settings" color="primary">
            <Link href="/edit_profile">
              Editar perfil
            </Link>
            </DropdownItem>
          <DropdownItem key="analytics" color="primary"><Popover 
              showArrow
              placement="right"
            >
              <PopoverTrigger>
                Blog
              </PopoverTrigger>
              <PopoverContent>
                  <Button className="w-56 bg-white hover:bg-[#cce3fd] hover:text-primary" >
                    <Link href="/createBlog">
                      Crear blog
                    </Link>
                  </Button>
                  <Button className="bg-white hover:bg-[#cce3fd] hover:text-primary" fullWidth={true}>
                    <Link href="#">
                      Mis blogs
                    </Link>
                  </Button>
              </PopoverContent>
            </Popover></DropdownItem>
          <DropdownItem key="system" color="primary">Cerrar sesión</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
