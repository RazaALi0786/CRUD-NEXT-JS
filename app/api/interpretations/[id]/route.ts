import client from "@/lib/appwrite_client";
import { Databases } from "appwrite";
import { NextResponse } from "next/server";
const database = new Databases(client);
// Fetch a specific interpretation

async function fetchInterpretation(ID: string) {
  try {
    const response = await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "Interpretations",
      ID
    );
    return response;
  } catch (error) {
    console.error("Error fetching document:", error);
    throw new Error("Failed to fetch document");
  }
}
// Deleting
async function deleteInterpretation(ID: string) {
  try {
    const response = await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "Interpretations",
      ID
    );
    return response;
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document");
  }
}
// Updating
async function updateInterpretation(
  ID: string,
  data: { term: string; interpretation: string }
) {
  try {
    const response = await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
      "Interpretations",
      ID,
      data
    );
    return response;
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to update document");
  }
}
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const interpretation = await fetchInterpretation(id);
    return NextResponse.json({ interpretation });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch interpretation" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    await deleteInterpretation(id);
    return NextResponse.json({ message: "Interpretation deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete interpretation" },
      { status: 500 }
    );
  }
}
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const interpretation = await req.json();
    await updateInterpretation(id, interpretation);
    return NextResponse.json({ message: "Interpretation updated" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update interpretation" },
      { status: 500 }
    );
  }
}
