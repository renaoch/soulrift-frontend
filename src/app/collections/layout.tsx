// app/products/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import {NavbarD} from "@/components/Navbar"
import { Suspense } from 'react';
export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
<div>
    <NavbarD/>
    <main className="flex-1 container mx-auto py-6 px-6">
          <Suspense fallback={<div>Loading...</div>}> {children}</Suspense>
       
      </main>
</div>





  );
}
