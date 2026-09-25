"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/content";

type ChildFields = {
  id: string;
  fullName: string;
  dob: string;
  accommodations: string;
};

type FormStatus = "idle" | "submitting" | "success" | "error";

function emptyChild(id = "child-1"): ChildFields {
  return {
    id,
    fullName: "",
    dob: "",
    accommodations: "",
  };
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ReserveForm() {
  const [children, setChildren] = useState<ChildFields[]>([emptyChild()]);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // The confirmation card is far shorter than the form, so the page shrinks and the browser
  // clamps the scroll position past it — bring the message back into view and announce it.
  useEffect(() => {
    if (status !== "success") return;
    const heading = successHeadingRef.current;
    heading?.scrollIntoView({ block: "center", behavior: "instant" });
    heading?.focus({ preventScroll: true });
  }, [status]);

  function updateChild(id: string, patch: Partial<ChildFields>) {
    setChildren((prev) =>
      prev.map((child) => (child.id === id ? { ...child, ...patch } : child)),
    );
  }

  function addChild() {
    setChildren((prev) => [
      ...prev,
      emptyChild(`child-${Date.now()}-${prev.length + 1}`),
    ]);
  }

  function removeChild(id: string) {
    setChildren((prev) =>
      prev.length <= 1 ? prev : prev.filter((child) => child.id !== id),
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);

    const parentName = String(data.get("parentName") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const startDate = String(data.get("startDate") ?? "").trim();
    const daysNeeded = String(data.get("daysNeeded") ?? "").trim();
    const hoursNeeded = String(data.get("hoursNeeded") ?? "").trim();
    const comments = String(data.get("comments") ?? "").trim();

    const errors: Record<string, string> = {};
    if (!parentName) errors.parentName = "Parent/guardian name is required.";
    if (!email) errors.email = "Email is required.";
    else if (!emailPattern.test(email)) errors.email = "Enter a valid email.";
    if (!phone) errors.phone = "Phone is required.";
    if (!startDate) errors.startDate = "Desired start date is required.";
    if (!daysNeeded) errors.daysNeeded = "Tell us which days you need.";
    if (!hoursNeeded) errors.hoursNeeded = "Tell us which hours you need.";

    children.forEach((child, index) => {
      if (!child.fullName.trim()) {
        errors[`childName-${index}`] = "Child name is required.";
      }
      if (!child.dob) {
        errors[`childDob-${index}`] = "Date of birth is required.";
      }
    });

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) {
      setStatus("error");
      setErrorMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName,
          email,
          phone,
          startDate,
          daysNeeded,
          hoursNeeded,
          comments,
          children: children.map((child) => ({
            fullName: child.fullName.trim(),
            dob: child.dob,
            accommodations: child.accommodations.trim(),
          })),
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        mocked?: boolean;
      } | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.error ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
      setChildren([emptyChild()]);
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
      <section
        id="reserve"
        className="section-pad accent-blue"
        aria-labelledby="reserve-heading"
      >
        <div className="container-bloom max-w-2xl">
          <div className="rounded-3xl bg-white p-8 text-center shadow-lg ring-1 ring-bloom-green/20 sm:p-12">
            <Image
              src="/mascot-blossom-web.png"
              alt=""
              width={120}
              height={116}
              className="mx-auto mb-4 h-24 w-auto animate-float"
            />
            <h2
              ref={successHeadingRef}
              tabIndex={-1}
              id="reserve-heading"
              className="font-display text-3xl font-semibold text-bloom-ink outline-none"
            >
              You’re on the list!
            </h2>
            <p className="mt-3 text-bloom-ink/75">
              Thanks for reserving enrollment at Bloom. We’ll follow up at your
              email soon.
            </p>
            <Button
              type="button"
              className="mt-6 rounded-full bg-bloom-blue font-bold"
              onClick={() => setStatus("idle")}
            >
              Submit another reservation
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="reserve"
      className="section-pad relative accent-blue"
      aria-labelledby="reserve-heading"
    >
      <Image
        src="/mascot-blossom-web.png"
        alt=""
        width={140}
        height={135}
        className="pointer-events-none absolute -top-2 right-4 hidden h-24 w-auto opacity-90 animate-wiggle sm:block lg:right-12 lg:h-28"
        aria-hidden
      />
      <div className="container-bloom max-w-3xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.16em] text-bloom-blue">
            Reserve Enrollment
          </p>
          <h2
            id="reserve-heading"
            className="font-display text-3xl font-semibold text-bloom-ink sm:text-4xl"
          >
            Submit a Reservation Request
          </h2>
          <p className="mt-3 text-bloom-ink/70">
            Opening {site.opening}.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className="space-y-6 rounded-3xl bg-white p-6 shadow-lg ring-1 ring-bloom-blue/15 sm:p-8"
        >
          <fieldset className="space-y-4">
            <legend className="font-display text-xl font-semibold text-bloom-ink">
              Parent / Guardian
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="parentName">Full name</Label>
                <Input
                  id="parentName"
                  name="parentName"
                  autoComplete="name"
                  required
                  aria-invalid={!!fieldErrors.parentName}
                />
                {fieldErrors.parentName ? (
                  <p className="text-sm text-destructive">{fieldErrors.parentName}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-invalid={!!fieldErrors.email}
                />
                {fieldErrors.email ? (
                  <p className="text-sm text-destructive">{fieldErrors.email}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  aria-invalid={!!fieldErrors.phone}
                />
                {fieldErrors.phone ? (
                  <p className="text-sm text-destructive">{fieldErrors.phone}</p>
                ) : null}
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-display text-xl font-semibold text-bloom-ink">
              Children
            </legend>
            {children.map((child, index) => (
              <div
                key={child.id}
                className="space-y-4 rounded-2xl border border-border bg-bloom-soft/50 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold text-bloom-ink">
                    Child {index + 1}
                  </h3>
                  {children.length > 1 ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeChild(child.id)}
                    >
                      Remove
                    </Button>
                  ) : null}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={`childName-${child.id}`}>Full name</Label>
                    <Input
                      id={`childName-${child.id}`}
                      value={child.fullName}
                      onChange={(e) =>
                        updateChild(child.id, { fullName: e.target.value })
                      }
                      required
                      aria-invalid={!!fieldErrors[`childName-${index}`]}
                    />
                    {fieldErrors[`childName-${index}`] ? (
                      <p className="text-sm text-destructive">
                        {fieldErrors[`childName-${index}`]}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`childDob-${child.id}`}>Date of birth</Label>
                    <Input
                      id={`childDob-${child.id}`}
                      type="date"
                      value={child.dob}
                      onChange={(e) =>
                        updateChild(child.id, { dob: e.target.value })
                      }
                      required
                      aria-invalid={!!fieldErrors[`childDob-${index}`]}
                    />
                    {fieldErrors[`childDob-${index}`] ? (
                      <p className="text-sm text-destructive">
                        {fieldErrors[`childDob-${index}`]}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor={`childAccommodations-${child.id}`}>
                      Special accommodations needed
                    </Label>
                    <Textarea
                      id={`childAccommodations-${child.id}`}
                      value={child.accommodations}
                      onChange={(e) =>
                        updateChild(child.id, {
                          accommodations: e.target.value,
                        })
                      }
                      rows={2}
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="rounded-full border-bloom-blue/40 font-semibold text-bloom-blue"
              onClick={addChild}
            >
              + Add additional child
            </Button>
          </fieldset>

          <fieldset className="space-y-4">
            <legend className="font-display text-xl font-semibold text-bloom-ink">
              Schedule
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Desired start date</Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  required
                  aria-invalid={!!fieldErrors.startDate}
                />
                {fieldErrors.startDate ? (
                  <p className="text-sm text-destructive">{fieldErrors.startDate}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="daysNeeded">Days care needed</Label>
                <Input
                  id="daysNeeded"
                  name="daysNeeded"
                  placeholder="e.g. Mon–Fri, or M/W/F"
                  required
                  aria-invalid={!!fieldErrors.daysNeeded}
                />
                {fieldErrors.daysNeeded ? (
                  <p className="text-sm text-destructive">
                    {fieldErrors.daysNeeded}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="hoursNeeded">Hours care needed</Label>
                <Input
                  id="hoursNeeded"
                  name="hoursNeeded"
                  placeholder="e.g. 8:00am–4:00pm"
                  required
                  aria-invalid={!!fieldErrors.hoursNeeded}
                />
                {fieldErrors.hoursNeeded ? (
                  <p className="text-sm text-destructive">
                    {fieldErrors.hoursNeeded}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="comments">Additional comments / questions</Label>
                <Textarea
                  id="comments"
                  name="comments"
                  rows={3}
                  placeholder="Optional"
                />
              </div>
            </div>
          </fieldset>

          {status === "error" && errorMessage ? (
            <div
              role="alert"
              className="rounded-xl border border-destructive/30 bg-red-50 px-4 py-3 text-sm text-destructive"
            >
              {errorMessage}
            </div>
          ) : null}

          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="w-full rounded-full bg-bloom-red text-base font-bold text-white hover:bg-bloom-red/90 sm:w-auto sm:px-10"
          >
            {status === "submitting" ? "Sending…" : "Submit reservation"}
          </Button>
        </form>
      </div>
    </section>
  );
}
