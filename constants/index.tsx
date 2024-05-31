import {
  Activity,
  CreditCard,
  DollarSign,
  Home,
  Package,
  ShoppingCart,
} from "lucide-react";

export const navLinks = [
  {
    label: "Dashboard",
    route: "/",
    icon: <Home />,
  },
  {
    label: "Orders",
    route: "/orders",
    icon: <ShoppingCart />,
  },
  {
    label: "Products",
    route: "/products",
    icon: <Package />,
  },
];

export const metricCardsContent = [
  {
    title: "Total Revenue",
    mainValue: "$45,231.89",
    description: "+20.1% from last month",
    icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Products Sold",
    mainValue: "+1523",
    description: "+30.1% from last month",
    icon: <Package className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Sales",
    mainValue: "+12,234",
    description: "+19% from last month",
    icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Orders",
    mainValue: "+573",
    description: "+201 since last hour",
    icon: <Activity className="h-4 w-4 text-muted-foreground" />,
  },
];
