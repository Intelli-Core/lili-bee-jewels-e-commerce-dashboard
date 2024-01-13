import { DashboardIcon, CubeIcon, ReaderIcon, GearIcon } from "@radix-ui/react-icons";

export const dashboardLinks = [
  {
    label: "Overview",
    route: "/",
    icon: DashboardIcon,
  },
  {
    label: "Products",
    route: "/dashboard/products",
    icon: CubeIcon,
  },
  {
    label: "Orders",
    route: "/dashboard/orders",
    icon: ReaderIcon,
  },
  {
    label: "Settings",
    route: "/dashboard/settings",
    icon: GearIcon,
  },
];
