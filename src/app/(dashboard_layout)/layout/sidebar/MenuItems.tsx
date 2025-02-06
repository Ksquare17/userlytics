'use client'

import {
  IconAperture,
  IconLayoutDashboard,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";


const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    id: uniqueId(),
    title: "User",
    icon: IconUserPlus,
    href: "/user",
  },
 
  {
    id: uniqueId(),
    title: "RTE",
    icon: IconAperture,
    href: "/rte",
  },
 
 
];

export default Menuitems;
