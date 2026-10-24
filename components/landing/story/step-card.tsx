import type { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { STEPS, stepEyebrow } from "./steps";

/** One step's copy, server-rendered. `children` carries extras like the embed snippet. */
export default function StepCard({
  index,
  headingId,
  children,
}: {
  index: number;
  headingId: string;
  children?: ReactNode;
}) {
  const step = STEPS[index];
  return (
    <Card className="max-w-md lg:max-w-sm">
      <CardHeader>
        <span className="label-eyebrow">{stepEyebrow(index)}</span>
        <CardTitle as="h2" id={headingId} className="text-3xl leading-[1.05] md:text-4xl lg:text-5xl">
          {step.headline}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <CardDescription className="text-sm md:text-base">{step.sub}</CardDescription>
        {children}
      </CardContent>
    </Card>
  );
}
