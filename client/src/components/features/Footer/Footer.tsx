export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50 py-6">
      <div className="container mx-auto px-4 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} BookVerse Library All Rights Reserved.
          Created with ❤️ by Aljosa Boskovic.
        </p>
      </div>
    </footer>
  );
};
