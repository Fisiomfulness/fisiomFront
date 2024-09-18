"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@nextui-org/react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { apiEndpoints } from "@/api_endpoints";
import axios from "axios";
import { deleteUser } from "@/services/users";
import DeleteAccount from "@/components/DeleteAccount/DeleteAccount";

const DeleteAccountPage = () => {
  return (
    <main className=" p-12 pt-4 w-[70vw]">
      <DeleteAccount />
    </main>
  );
};

export default DeleteAccountPage;
