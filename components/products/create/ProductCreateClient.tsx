"use client";

import ImageInput from "@/components/shared/image/ImageInput";
import ImageDropzone from "@/components/shared/image/dropzone/ImageDropzone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { productFormSchema } from "@/constants";
import {
  createProduct,
  createProductAttributes,
} from "@/lib/actions/product.actions";
import { ApiResponse, Attributes, Category, Material, Product } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type ProductCreateClientProps = {
  categories: Category[];
  materials?: Material[];
};

const ProductCreateClient = ({ ...props }: ProductCreateClientProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof productFormSchema>>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: 1.0,
      weight: 1.0,
      category: "",
      status: "",
      thumbnail: undefined,
      media: undefined,
      description: undefined,
    },
  });

  const statusList = [
    { label: "Active", value: "ACTIVE" },
    { label: "Draft", value: "DRAFT" },
  ];

  const { formState, handleSubmit, reset } = form;
  const { isSubmitting } = formState;
  const [formReset, setFormReset] = useState(false);

  const onSubmit = async (values: z.infer<typeof productFormSchema>) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price.toString());
    formData.append("category", values.category);

    if (values.description) {
      formData.append("description", values.description);
    }

    formData.append("status", values.status || "ACTIVE");

    const productAttributes: Attributes = await createProductAttributes({
      weight: values.weight,
    });
    formData.append("attributes", productAttributes.id);

    if (values.thumbnail instanceof File) {
      formData.append("thumbnail", values.thumbnail);
    }

    const mediaFiles: File[] = (values.media || []).filter(
      (file: any): file is File => file instanceof File,
    );

    mediaFiles.forEach((file, index) => {
      formData.append(`media[${index}]`, file);
    });

    console.log("FormData: ", formData);
    const result: ApiResponse<Product> = await createProduct(formData);
    if (result.errors) {
      return toast.error(result.errors.name, { position: "top-center" });
    }
    router.push("/products/");
    reset();
  };

  return (
    <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[70rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Create Product
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 gap-1"
              onClick={() => {
                reset();
                setFormReset(true);
              }}
            >
              Discard
            </Button>
            <Button
              type="button"
              className="w-full h-8 gap-1"
              size="sm"
              disabled={isSubmitting}
              onClick={() => {
                handleSubmit(onSubmit)();
              }}
            >
              {form.formState.isSubmitting ? (
                <React.Fragment>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Creating product...</span>
                </React.Fragment>
              ) : (
                <span>Create product</span>
              )}
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-4">
          <Form {...form}>
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                  <CardDescription>
                    Information about the product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="flex-grow">
                      <FormField
                        disabled={isSubmitting}
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Golden necklace" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex-grow">
                      <FormField
                        disabled={isSubmitting}
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Price</FormLabel>
                            <FormControl>
                              <Input
                                className="w-full"
                                {...field}
                                type="number"
                                onChange={(e) =>
                                  field.onChange(parseFloat(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      disabled={isSubmitting}
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="A descritpion about your product"
                              className="resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                  <CardDescription>Media of the product</CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    disabled={isSubmitting}
                    control={form.control}
                    name="media"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="w-full h-[100px]">
                            <ImageDropzone
                              type={"multi"}
                              mode={"create"}
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Other Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <FormField
                      disabled={isSubmitting}
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Category</FormLabel>
                          <Select
                            disabled={isSubmitting}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {props.categories.map((category, key) => (
                                <SelectItem value={category.id} key={key}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      disabled={isSubmitting}
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product weight (in grams)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="10"
                              className="w-full"
                              {...field}
                              type="number"
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      disabled={isSubmitting}
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Status</FormLabel>
                          <Select
                            disabled={isSubmitting}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {statusList.map((status, key) => (
                                <SelectItem value={status.value} key={key}>
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Thumbnail</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                  <FormField
                    disabled={isSubmitting}
                    control={form.control}
                    name="thumbnail"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="size-[195px]">
                            <ImageInput
                              mode={"create"}
                              value={field.value}
                              formReset={formReset}
                              onChange={field.onChange}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default ProductCreateClient;
