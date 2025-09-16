"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
   const pathname = usePathname();
   const links = [
      { name: "Blocks effect", href: "/blocks" },
      { name: "Parallax effect", href: "/" },
      { name: "Amazing Gallery", href: "/images" },
   ];

   const getTitle = () => {
      if (pathname === "/") return "Parallax effect";
      if (pathname === "/images") return "Amazing Gallery";
      if (pathname === "/blocks") return "Blocks effect";
      return "";
   };

   // Get previous and next links based on current path
   const currentIndex = links.findIndex(link => link.href === pathname);
   const prevLink = currentIndex > 0 ? links[currentIndex - 1].href : links[links.length - 1].href;
   const nextLink = currentIndex < links.length - 1 ? links[currentIndex + 1].href : links[0].href;
   
   return (
      <nav className="fixed">
         <Link href={prevLink} className="flex items-center gap-2">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="40"
               height="40"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
               className="feather feather-arrow-left"
            >
               <line x1="19" y1="12" x2="5" y2="12"></line>
               <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
         </Link>
         <Link href={pathname}>{getTitle()}</Link>
         <Link href={nextLink}>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="40"
               height="40"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
            >
               <line x1="5" y1="12" x2="19" y2="12"></line>
               <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
         </Link>
      </nav>
   );
};