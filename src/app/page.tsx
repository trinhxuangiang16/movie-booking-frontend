"use client";
import { Button } from "@/components/ui/button";
import "./globals.css";
import { Form } from "radix-ui";

export default function HomePage() {
  return (
    <div>
      <div className="text-red-500 text-2xl">Hello Tailwind</div>
      <Button>Click me</Button>

      <Button variant="outline">Outline</Button>

      <Button size="sm">Small</Button>

      <Button variant="destructive">Delete</Button>
    </div>
  );
}
