"use server";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { error } from "console";
import slugify from "slugify";

export const createPitch = async (state: any, form: FormData, pitch: string) => {

  const session = await auth();
  
  if (!session) return { error: "Not signed in", status: "ERROR" };

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== pitch),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {

    const startup = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return {
      ...result,
      error: "",
      status: "SUCCESS"
    }

  } catch (error) {
    console.log(error);
    return {
      error: JSON.stringify(error),
      status: "ERROR"
    };
  }

}