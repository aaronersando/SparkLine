"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";
import { FormState } from "@/lib/types";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast.success("Success", {
          description: "Your startup pitch has been created successfully",
        });

        router.push(`/startup/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast.error("Error", {
          description: "Please check your inputs and try again",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast.error("Error", {
        description: "An unexpected error has occurred",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form
      action={formAction}
      className="py-10 max-w-2xl mx-auto my-10 space-y-8 px-6 rounded bg-[var(--txt-primary)] text-[color:var(--bg-900)]"
    >
      <div>
        <label
          htmlFor="title"
          className="font-bold text-[18px] uppercase text-[color:var(--bg-900)] "
        >
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="w-full px-5 py-7 text-[18px] font-semibold rounded-full mt-3 border-[3px] border-[var(--border)] bg-transparent text-[color:var(--bg-900)]"
          required
          placeholder="Startup Title"
        />

        {errors.title && (
          <p className="text-[color:var(--danger)] mt-2 ml-5">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="font-bold text-[18px] uppercase text-[color:var(--bg-900)] "
        >
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="w-full p-5 text-[18px] font-semibold rounded-[20px] mt-3 border-[3px] border-[var(--border)] bg-transparent text-[color:var(--bg-900)]"
          required
          placeholder="Startup Description"
        />

        {errors.description && (
          <p className="text-[color:var(--danger)] mt-2 ml-5">
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="category"
          className="font-bold text-[18px] uppercase text-[color:var(--bg-900)]"
        >
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="w-full px-5 py-7 text-[18px] font-semibold rounded-full mt-3 border-[3px] border-[var(--border)] bg-transparent text-[color:var(--bg-900)]"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />

        {errors.category && (
          <p className="text-[color:var(--danger)] mt-2 ml-5">
            {errors.category}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="link"
          className="font-bold text-[18px] uppercase text-[color:var(--bg-900)]"
        >
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="w-full px-5 py-7 text-[18px] font-semibold rounded-full mt-3 border-[3px] border-[var(--border)] bg-transparent text-[color:var(--bg-900)]"
          required
          placeholder="Startup Image URL"
        />

        {errors.link && (
          <p className="text-[color:var(--danger)] mt-2 ml-5">{errors.link}</p>
        )}
      </div>

      <div data-color-mode="light">
        <label
          htmlFor="pitch"
          className="font-bold text-[18px] uppercase text-[color:var(--bg-900)]"
        >
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly describe your idea and what problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {errors.pitch && (
          <p className="text-[color:var(--danger)] mt-2 ml-5">{errors.pitch}</p>
        )}
      </div>

      <Button
        type="submit"
        className="rounded-full p-5 min-h-[70px] w-full font-bold text-[18px] bg-[var(--accent-cyan)] text-[color:#041021] border-[4px] border-[var(--border)]"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>

      {state.error && state.status === "ERROR" && (
        <p className="text-[color:var(--danger)] ml-5 mt-4">{state.error}</p>
      )}
    </form>
  );
};

export default StartupForm;
