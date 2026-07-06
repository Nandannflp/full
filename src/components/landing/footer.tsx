export function Footer() {
  return (
    <footer className="w-full bg-[#0A0A0A] px-6 py-12 border-t border-border text-secondary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div>
          <div className="text-2xl font-bold tracking-tight text-primary mb-6">
            Adwiser
          </div>
          <div className="text-sm">
            © {new Date().getFullYear()} Adwiser Digital. All rights reserved.
          </div>
        </div>
        <div className="flex gap-8 text-sm">
          <a href="#" className="hover:text-primary transition-colors">Twitter</a>
          <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-primary transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
