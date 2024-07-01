import { SelectOption } from "@/interfaces";
import {
  Activity,
  CreditCard,
  DollarSign,
  Home,
  Package,
  ShoppingCart,
} from "lucide-react";
import { z } from "zod";

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

export const productFormSchema = z.object({
  name: z.string().min(2, {
    message: "Product name should be at least 2 characters.",
  }),
  price: z.coerce.number().positive(),
  category: z.string().uuid({
    message: "Category is required.",
  }),
  description: z
    .string()
    .max(255, {
      message: "Description should be only 255 characters long.",
    })
    .optional(),
  caption: z.string().optional(),
  thumbnail: z.union([z.instanceof(File), z.string()]).optional(),
  media: z.union([z.array(z.string()), z.array(z.instanceof(File))]).optional(),
  // material: z.string().uuid({
  //   message: "Material must be a valid UUID.",
  // }),
  sizes: z.string().array().optional(),
  weight: z.coerce.number().positive(),
  status: z.string().min(1, {
    message: "Status is required.",
  }),
});

export const statusSelectOptions: SelectOption[] = [
  { label: "Active", value: "ACTIVE", checked: true },
  { label: "Draft", value: "DRAFT", checked: false },
  { label: "Archived", value: "ARCHIVED", checked: false },
];

export const imagePlaceholder =
  "/assets/images/placeholders/image-placeholder.svg";

export const imageBlur =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOsa2yqBwAFCAICLICSyQAAAABJRU5ErkJggg==";
