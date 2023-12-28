import Form from '@/app/ui/fuelings/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Fuelings', href: '/dashboard/fuelings' },
          {
            label: 'Create Fueling',
            href: '/dashboard/fuelings/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}