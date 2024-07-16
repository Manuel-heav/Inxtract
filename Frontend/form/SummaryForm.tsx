"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
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

  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      const result = await response.json();
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
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  };

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setSummary(null);
    setError(null);

    const formData = new FormData();
    if (values.file) {
      formData.append("file", values.file, "1ef428e6-9601-4af0-bb13-08291557a45a");
    }
    formData.append("prompt", values.prompt);

    try {
      const result1 = await callApiWithFormData(apiEndpoint1, formData);

      if (result1.errors) {
        setError(JSON.stringify(result1.errors));
        return;
      }

      const raw2 = { text: result1.text };

      const result2 = await callApi(apiEndpoint2, raw2);

      if (result2.errors) {
        setError(JSON.stringify(result2.errors));
        return;
      }

      const raw3 = { text: result1.text, prompt: values.prompt };

      const result3 = await callApi(apiEndpoint3, raw3);

      if (result3.errors) {
        setError(JSON.stringify(result3.errors));
        return;
      }

      const extractedText = result3.candidates[0].content.parts[0].text;
      setSummary(extractedText);
    } catch (error) {
      console.error("Error during API calls", error);
      setError("An error occurred during the API calls.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
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

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>

      {isLoading && (
        <div className="mt-5 p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Analyzing...</h2>
          <p>Please wait while we analyze your article.</p>
        </div>
      )}

      {error && (
        <div className="mt-5 p-4 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <pre>{error}</pre>
        </div>
      )}

      {summary && !isLoading && !error && (
        <div className="mt-5 p-4 border rounded-lg shadow-sm w-[50%]">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="w-[50%]">{summary}</p>
        </div>
      )}
    </div>
  );
}
