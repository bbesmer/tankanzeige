'use server';

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type State = {
    errors?: {
      company?: string[]
      volume?: string[];
      price?: string[];
      mileage?: string[];
    };
    message?: string | null;
  };
  
  const FormSchema = z.object({
    id: z.string(),
    company: z.string({
      invalid_type_error: 'Please provide a company name.',
    }),
    volume: z.coerce
      .number()
      .gt(0, { message: 'Please enter an volume greater than 0l.' }),
    price: z.coerce
      .number()
      .gt(0, { message: 'Please enter an price greater than CHF 0.' }),
    mileage: z.coerce
      .number()
      .gt(0, { message: 'Please enter an mileage greater than 0km.' }),
    date: z.string(),
  });
   
  const CreateFueling = FormSchema.omit({ id: true, date: true });
  
  export async function createFueling(prevState: State, formData: FormData) {
    const validatedFields = CreateFueling.safeParse({
      company: formData.get('company'),
      volume: formData.get('volume'),
      price: formData.get('price'),
      mileage: formData.get('mileage'),
    });
    
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Fueling.',
      };
    }
  
    const { company, volume, price, mileage } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];
    
    try {
      await sql`
        INSERT INTO fueling (company, volume, price, mileage, date)
        VALUES (${company}, ${volume}, ${price}, ${mileage}, ${date})
      `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Fueling'
      }
    }
  
    revalidatePath('/dashboard/fuelings');
    redirect('/dashboard/fuelings');
  }