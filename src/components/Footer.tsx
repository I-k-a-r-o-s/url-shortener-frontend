const Footer = () => {
  return (
    <footer className="footer footer-center border-t border-base-300 bg-base-100 px-4 py-6 text-base-content/70 sm:footer-horizontal">
      <aside>
        <p className="text-center text-sm">
          Copyright (c) {new Date().getFullYear()} - All rights NOT reserved by anyone. Coded for learning purposes.
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
