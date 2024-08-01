"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function CreatePage() {
  const [formData, setFormData] = useState({
    term: "",
    interpretation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handelInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.term || !formData.interpretation) {
      setError("All fields are required");
      return;
    }
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("/api/interpretations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed To Create Interpretation");
      }
      router.push("/");
    } catch (error) {
      console.log(error);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-bold my-8">Add New </h2>
      <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        <input
          type="text"
          name="term"
          placeholder="Term"
          value={formData.term}
          className="py-1 px-4 border rounded-md"
          onChange={handelInputChange}
        />
        <textarea
          name="interpretation"
          rows={4}
          placeholder="Interpretation"
          value={formData.interpretation}
          className="py-1 px-4 border rounded-md resize-none"
          onChange={handelInputChange}
        ></textarea>
        <button
          className="bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Add Interpretation"}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
