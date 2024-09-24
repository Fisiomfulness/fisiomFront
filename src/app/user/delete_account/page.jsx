"use client";
import React from "react";
import axios from "axios";
import DeleteAccount from "@/components/DeleteAccount/DeleteAccount";

const DeleteAccountPage = () => {
  return (
    <main className=" p-12 pt-4 w-[70vw]">
      <DeleteAccount />
    </main>
  );
};

export default DeleteAccountPage;
