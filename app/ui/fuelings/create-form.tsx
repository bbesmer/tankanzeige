'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createFueling } from '@/app/lib/fuelings/actions';
import { useFormState } from 'react-dom';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createFueling, initialState);
  
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Fueling Company */}
        <div className="mb-4">
          <label htmlFor="company" className="mb-2 block text-sm font-medium">
            Company
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Enter company name"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Fueling Volume */}
        <div className="mb-4">
          <label htmlFor="volume" className="mb-2 block text-sm font-medium">
            Volume
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="volume"
                name="volume"
                type="number"
                step="0.01"
                placeholder="Enter volume in liters"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Fueling Price */}
        <div className="mb-4">
          <label htmlFor="price" className="mb-2 block text-sm font-medium">
            Price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="price"
                name="price"
                type="number"
                step="0.1"
                placeholder="Enter price in swiss francs"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Fueling Mileage */}
        <div className="mb-4">
          <label htmlFor="mileage" className="mb-2 block text-sm font-medium">
            Mileage
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="mileage"
                name="mileage"
                type="number"
                step="0.01"
                placeholder="Enter current mileage in kilometers"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <div id="form-error" aria-live="polite" aria-atomic="true">
          {state.message &&
            <p className="mt-2 text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
          }
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/fuelings"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Fueling</Button>
      </div>
    </form>
  );
}
