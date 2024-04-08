"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Tooltip,
  Spacer,
} from "@nextui-org/react";
import { EditIcon } from "./data/EditIcon";
import { DeleteIcon } from "./data/DeleteIcon";
import { EyeIcon } from "./data/EyeIcon";
import { columns, productos } from "./data/productos";
import { users, columnsUsers } from "./data/dataUsers";
import {
  CustomButton,
  CustomOverlay,
} from "@/features/ui";

export default function ListaProd() {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      // Para la tabla de usuarios
      case "admin":
        return user.admin ? "ADMIN" : "USER COMMON";

      // Para la tabla de productos
      case "name":
        return (
          <div className="flex items-center">
            <User avatarProps={{ radius: "lg", src: user.avatar }} />
            <span className="ml-2">{cellValue}</span>
          </div>
        );

      case "modelo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.marca}
            </p>
          </div>
        );

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Agregar ">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() =>
                  user.admin ? alert("Puede acceder") : alert("Debes ser Admin")
                }
              >
                <EyeIcon />
              </span>
            </Tooltip>
            {user.admin ? (
              <>
                <Tooltip content="Editar">
                  <span
                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    onClick={() =>
                      user.admin
                        ? alert("Puede acceder")
                        : alert("Debes ser Admin")
                    }
                  >
                    <EditIcon />
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="Delete user">
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={() =>
                      user.admin
                        ? alert("Puede acceder")
                        : alert("Debes ser Admin")
                    }
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
              </>
            ) : (
              <>
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() => alert("Debes ser Admin")}
                >
                  <EditIcon />
                </span>
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => alert("Debes ser Admin")}
                >
                  <DeleteIcon />
                </span>
              </>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <div
        className={[
          "px-4 w-full bg-primary-400",
          "flex flex-col justify-center items-center",
        ].join(" ")}
      >
        <img
          className="absolute bottom-0 left-0 h-1/2 max-sm:w-2/3 max-sm:h-auto"
          alt="logo_overlay"
          src="/logo_overlay.webp"
        />
        <CustomButton>Administrar Usuarios</CustomButton>
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columnsUsers}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Spacer Y={3} />

        <CustomButton>Administrar Productos</CustomButton>
        <Table aria-label="Example table with custom cells">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={productos}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
