"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/schemas/formSchema";

type FormData = z.infer<typeof formSchema>;

export function SummaryForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
      prompt: "",
    },
  });

  const apiEndpoint1 = "http://localhost:5268/api/chatWithPdf/gettext";
  const apiEndpoint2 = "http://localhost:5268/api/chatWithPdf/summary";
  const apiEndpoint3 = "http://localhost:5268/api/chatWithPdf/chat";

  const callApiWithFormData = async (url: string, formData: globalThis.FormData) => {
    const requestOptions: RequestInit = {
      method: "POST",
      body: formData,
      redirect: "follow",
    };

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.text();
      console.log(result);
      return result;
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  };

  const callApi = async (url: string, body: { text: string; prompt?: string }) => {
    const requestOptions: RequestInit = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    };

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.text();
      console.log(result);
      return result;
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  };

  async function onSubmit(values: FormData) {
    const formData = new FormData();
    if (values.file) {
      formData.append("file", values.file, "1ef428e6-9601-4af0-bb13-08291557a45a");
    }
    formData.append("prompt", values.prompt);

    try {
      // Call the first API with FormData
      const result1 = await callApiWithFormData(apiEndpoint1, formData);

      // Prepare the raw data for the second API
      const raw2 = { text: result1 };

      // Call the second API
      const result2 = await callApi(apiEndpoint2, raw2);

      // Prepare the raw data for the third API
      const raw3 = { text: result1, prompt: values.prompt };

      // Call the third API
      const result3 = await callApi(apiEndpoint3, raw3);

      console.log("All API calls completed successfully");
    } catch (error) {
      console.error("Error during API calls", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Controller
          name="file"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col mb-5">
              <FormLabel>Upload File</FormLabel>
              <FormControl>
                <input
                  type="file"
                  onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : undefined)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="prompt"
          render={({ field }) => (
            <FormItem className="mb-5">
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter your prompt (at least 5 characters).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
