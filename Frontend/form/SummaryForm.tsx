"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
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

const presets = [
  "Explain the methodologies",
  "What are the contributions",
  "Explain like I'm 5",
  "Summarize the literature review",
  "What were the results of the methodologies of this research",
  "List a glossary of the technical terms"
];

export function SummaryForm() {
  const { userId } = useAuth();
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
  const [selectedPreset, setSelectedPreset] = useState<string>("");

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

  const callApi = async (url: string, body: { text: string; prompt?: string; userId: string }) => {
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
  
    if (!userId) {
      setError("User ID is required.");
      setIsLoading(false);
      return;
    }
  
    const formData = new FormData();
    if (values.file) {
      formData.append("file", values.file, values.file.name || "uploaded_file");
    }
    const combinedPrompt = values.prompt.trim() + (selectedPreset ? " " + selectedPreset : "");
    formData.append("prompt", combinedPrompt);
    formData.append("userId", userId);
  
    try {
      const result1 = await callApiWithFormData(apiEndpoint1, formData);
  
      if (result1.errors) {
        console.error("Error from API Endpoint 1:", result1.errors);
        setError(`Error from API Endpoint 1: ${JSON.stringify(result1.errors)}`);
        return;
      }
  
      const raw2 = { text: result1.text, userId };
      const result2 = await callApi(apiEndpoint2, raw2);
  
      if (result2.errors) {
        console.error("Error from API Endpoint 2:", result2.errors);
        setError(`Error from API Endpoint 2: ${JSON.stringify(result2.errors)}`);
        return;
      }
  
      const raw3 = { text: result1.text, prompt: combinedPrompt, userId };
      const result3 = await callApi(apiEndpoint3, raw3);
  
      if (result3.errors) {
        console.error("Error from API Endpoint 3:", result3.errors);
        setError(`Error from API Endpoint 3: ${JSON.stringify(result3.errors)}`);
        return;
      }
  
      console.log("Result from API Endpoint 3:", result3);
      if (result3.text) {
        const extractedText = result3.text;
        setSummary(extractedText);
      } else {
        setError("Unexpected response structure from API Endpoint 3");
      }
    } catch (error) {
      console.error("Error during API calls:", error);
      setError(`An error occurred during the API calls: ${error}`);
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

          <div className="mb-5">
            <FormLabel>Preset</FormLabel>
            <select
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value)}
              className="block w-full px-4 py-2 mt-1 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="">Select a preset</option>
              {presets.map((preset, index) => (
                <option key={index} value={preset}>
                  {preset}
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Analyze"}
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
