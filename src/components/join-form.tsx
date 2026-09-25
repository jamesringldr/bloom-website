"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Blossom } from "@/components/p2/blossom";
import { jobForm } from "@/lib/content";

type FormStatus = "idle" | "submitting" | "success" | "error";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Order matters: the first invalid field in this list gets focus.
const fieldOrder = [
  "fullName",
  "email",
  "phone",
  "desiredPay",
  "positions",
  "ageGroups",
  "cpr",
  "references",
] as const;

const longQuestions = [
  { name: "experience", label: "Do you have any childcare experience?" },
  { name: "loveMost", label: "What do you love most about working with young children?" },
  {
    name: "childrenNeed",
    label: "What do you believe children need from their teachers in order to thrive?",
  },
  { name: "playBased", label: "What does a play-based classroom look like to you?" },
  {
    name: "familyRelationship",
    label: "How would you build a relationship with a family whose child is struggling?",
  },
  {
    name: "stressHandling",
    label: "How do you handle stressful or overwhelming moments in the classroom?",
  },
] as const;

function Required() {
  return (
    <span aria-hidden="true" className="text-p2-tomato">
      {" "}
      *
    </span>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm font-semibold text-p2-tomato">
      {message}
    </p>
  );
}

function OptionGroup({
  id,
  legend,
  required,
  error,
  children,
}: {
  id: string;
  legend: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset id={id} aria-describedby={error ? `${id}-error` : undefined} className="space-y-1">
      <legend className="mb-1 text-sm font-medium">
        {legend}
        {required ? <Required /> : null}
      </legend>
      {children}
      <FieldError id={`${id}-error`} message={error} />
    </fieldset>
  );
}

function Option({
  type,
  name,
  value,
  checked,
  onChange,
  children,
}: {
  type: "checkbox" | "radio";
  name: string;
  value: string;
  checked?: boolean;
  onChange?: () => void;
  children: React.ReactNode;
}) {
  return (
    <label className="-mx-2 flex min-h-11 cursor-pointer items-center gap-3 rounded-xl px-2 hover:bg-p2-cream">
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="size-5 shrink-0 accent-p2-cobalt focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-p2-ink"
      />
      <span>{children}</span>
    </label>
  );
}

export function JoinForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [cpr, setCpr] = useState("");
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // The confirmation card is far shorter than the form, so the page shrinks and the browser
  // clamps the scroll position past it — bring the message back into view and announce it.
  useEffect(() => {
    if (status !== "success") return;
    const heading = successHeadingRef.current;
    heading?.scrollIntoView({ block: "center", behavior: "instant" });
    heading?.focus({ preventScroll: true });
  }, [status]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    const payload = {
      fullName: text("fullName"),
      email: text("email"),
      phone: text("phone"),
      desiredPay: text("desiredPay"),
      positions: data.getAll("positions").map(String),
      ageGroups: data.getAll("ageGroups").map(String),
      education: text("education"),
      cpr: text("cpr"),
      cprOther: text("cprOther"),
      experience: text("experience"),
      loveMost: text("loveMost"),
      childrenNeed: text("childrenNeed"),
      playBased: text("playBased"),
      familyRelationship: text("familyRelationship"),
      stressHandling: text("stressHandling"),
      references: text("references"),
      coverLetter: text("coverLetter"),
    };

    const errors: Record<string, string> = {};
    if (!payload.fullName) errors.fullName = "Full name is required.";
    if (!payload.email) errors.email = "Email is required.";
    else if (!emailPattern.test(payload.email)) errors.email = "Enter a valid email.";
    if (!payload.phone) errors.phone = "Phone number is required.";
    if (!payload.desiredPay) errors.desiredPay = "Desired pay is required.";
    if (payload.positions.length === 0) errors.positions = "Choose at least one position.";
    if (payload.ageGroups.length === 0) errors.ageGroups = "Choose at least one age group.";
    if (!payload.cpr) errors.cpr = "Tell us whether you are CPR / First Aid certified.";
    else if (payload.cpr === "Other" && !payload.cprOther) {
      errors.cpr = "Tell us about your CPR / First Aid certification.";
    }
    if (!payload.references) errors.references = "Please list 3 references.";

    setFieldErrors(errors);
    const firstInvalid = fieldOrder.find((key) => errors[key]);
    if (firstInvalid) {
      setStatus("error");
      setErrorMessage("Please fix the highlighted fields and try again.");
      const el = document.getElementById(`join-${firstInvalid}`);
      const target =
        el?.tagName === "FIELDSET"
          ? el.querySelector<HTMLElement>(
              firstInvalid === "cpr" && payload.cpr === "Other"
                ? "input[type=text]"
                : "input",
            )
          : el;
      target?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      setCpr("");
      setFieldErrors({});
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success") {
    return (
      <div id="apply">
        <div className="rounded-3xl bg-white p-8 text-center shadow-lg ring-1 ring-p2-leaf/40 sm:p-12">
          <Blossom pose="party" className="p2-float mx-auto mb-4 h-32" />
          <h2
            ref={successHeadingRef}
            tabIndex={-1}
            className="font-p2-display text-3xl font-extrabold outline-none"
          >
            Thanks for applying!
          </h2>
          <p className="mx-auto mt-3 max-w-md leading-relaxed text-p2-ink/80">
            We received your application and will be in touch soon.
          </p>
          <Button
            type="button"
            className="mt-6 rounded-full bg-p2-cobalt px-6 font-bold text-white"
            onClick={() => setStatus("idle")}
          >
            Submit another application
          </Button>
        </div>
      </div>
    );
  }

  const describe = (key: string) => (fieldErrors[key] ? `join-${key}-error` : undefined);

  return (
    <div id="apply">
      <form
        onSubmit={onSubmit}
        noValidate
        className="space-y-6 rounded-3xl bg-white p-6 sm:p-8"
      >
        <p className="text-sm font-semibold text-p2-ink/75">
          <span aria-hidden="true" className="text-p2-tomato">
            *
          </span>{" "}
          Required
        </p>

        <div className="space-y-2">
          <Label htmlFor="join-fullName">
            Full name
            <Required />
          </Label>
          <Input
            id="join-fullName"
            name="fullName"
            autoComplete="name"
            required
            aria-invalid={!!fieldErrors.fullName}
            aria-describedby={describe("fullName")}
          />
          <FieldError id="join-fullName-error" message={fieldErrors.fullName} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="join-email">
            Email
            <Required />
          </Label>
          <Input
            id="join-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!fieldErrors.email}
            aria-describedby={describe("email")}
          />
          <FieldError id="join-email-error" message={fieldErrors.email} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="join-phone">
            Phone number
            <Required />
          </Label>
          <Input
            id="join-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={!!fieldErrors.phone}
            aria-describedby={describe("phone")}
          />
          <FieldError id="join-phone-error" message={fieldErrors.phone} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="join-desiredPay">
            Desired Pay
            <Required />
          </Label>
          <Input
            id="join-desiredPay"
            name="desiredPay"
            required
            aria-invalid={!!fieldErrors.desiredPay}
            aria-describedby={describe("desiredPay")}
          />
          <FieldError id="join-desiredPay-error" message={fieldErrors.desiredPay} />
        </div>

        <OptionGroup
          id="join-positions"
          legend="Which position(s) are you interested in?"
          required
          error={fieldErrors.positions}
        >
          {jobForm.positions.map((option) => (
            <Option key={option} type="checkbox" name="positions" value={option}>
              {option}
            </Option>
          ))}
        </OptionGroup>

        <OptionGroup
          id="join-ageGroups"
          legend="What age group(s) are you interested in?"
          required
          error={fieldErrors.ageGroups}
        >
          {jobForm.ageGroups.map((option) => (
            <Option key={option} type="checkbox" name="ageGroups" value={option}>
              {option}
            </Option>
          ))}
        </OptionGroup>

        <OptionGroup id="join-education" legend="Education">
          {jobForm.education.map((option) => (
            <Option key={option} type="radio" name="education" value={option}>
              {option}
            </Option>
          ))}
        </OptionGroup>

        <OptionGroup
          id="join-cpr"
          legend="Are you CPR / First Aid certified?"
          required
          error={fieldErrors.cpr}
        >
          {jobForm.cpr.map((option) => (
            <Option
              key={option}
              type="radio"
              name="cpr"
              value={option}
              checked={cpr === option}
              onChange={() => setCpr(option)}
            >
              {option}
            </Option>
          ))}
          {cpr === "Other" ? (
            <div className="pt-1">
              <Label htmlFor="join-cprOther" className="sr-only">
                Other CPR / First Aid certification
              </Label>
              <Input
                id="join-cprOther"
                name="cprOther"
                type="text"
                aria-invalid={!!fieldErrors.cpr}
                aria-describedby={describe("cpr")}
              />
            </div>
          ) : null}
        </OptionGroup>

        {longQuestions.map(({ name, label }) => (
          <div key={name} className="space-y-2">
            <Label htmlFor={`join-${name}`}>{label}</Label>
            <Textarea id={`join-${name}`} name={name} rows={4} className="min-h-28" />
          </div>
        ))}

        <div className="space-y-2">
          <Label htmlFor="join-references">
            Please list 3 references (name, phone number, relationship)
            <Required />
          </Label>
          <Textarea
            id="join-references"
            name="references"
            rows={4}
            className="min-h-28"
            required
            aria-invalid={!!fieldErrors.references}
            aria-describedby={describe("references")}
          />
          <FieldError id="join-references-error" message={fieldErrors.references} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="join-coverLetter">Submit your cover letter or resume</Label>
          <Textarea id="join-coverLetter" name="coverLetter" rows={6} className="min-h-40" />
        </div>

        {status === "error" && errorMessage ? (
          <div
            role="alert"
            className="rounded-xl border border-p2-tomato/30 bg-red-50 px-4 py-3 text-sm font-semibold text-p2-tomato"
          >
            {errorMessage}
          </div>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-p2-tomato text-base font-extrabold text-white hover:bg-p2-tomato/90 sm:w-auto sm:px-10"
        >
          {status === "submitting" ? "Sending…" : "Submit application"}
        </Button>
      </form>
    </div>
  );
}
