"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { Eraser } from "lucide-react";

const formSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(40, "First name can be at most 40 characters"),
  lastName: z
    .string()
    .trim()
    .max(40, "Last name can be at most 40 characters")
    .optional(),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email")
    .max(120, "Email can be at most 120 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message can be at most 2000 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const GOOGLE_FORM_ACTION = "YOUR_GOOGLE_FORM_ACTION_URL";

const GOOGLE_ENTRIES = {
  firstName: "YOUR_FIRST_NAME_ENTRY_ID",
  lastName: "YOUR_LAST_NAME_ENTRY_ID",
  email: "YOUR_EMAIL_ENTRY_ID",
  message: "YOUR_MESSAGE_ENTRY_ID",
} as const;

const GOOGLE_META_FIELDS = {
  fvv: "1",
  fbzx: "YOUR_FBZX_VALUE",
  pageHistory: "0",
} as const;

function buildGooglePayload(values: FormValues) {
  return new URLSearchParams({
    [GOOGLE_ENTRIES.firstName]: values.firstName,
    [GOOGLE_ENTRIES.lastName]: values.lastName ?? "",
    [GOOGLE_ENTRIES.email]: values.email,
    [GOOGLE_ENTRIES.message]: values.message,
    ...GOOGLE_META_FIELDS,
  });
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: buildGooglePayload(values),
      });
      form.reset();
      toast.success("Your message has been sent.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-6 p-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="text-sm text-muted-foreground">
          For collaborations, talks, publishing, or just to share a thought —
          feel free to reach out.
        </p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup className="gap-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Controller
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>First Name *</FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="Your answer"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Last Name</FieldLabel>
                  <Input
                    id={field.name}
                    placeholder="Your answer"
                    aria-invalid={fieldState.invalid}
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email *</FieldLabel>
                <Input
                  id={field.name}
                  placeholder="example@email.com"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="message"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Message *</FieldLabel>
                <Textarea
                  id={field.name}
                  placeholder="Your answer"
                  className="min-h-32"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => form.reset()}
            aria-label="Clear form"
          >
            <Eraser />
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner /> : "Send"}
          </Button>
        </div>
      </form>
    </div>
  );
}
