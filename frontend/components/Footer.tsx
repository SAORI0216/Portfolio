export default function Footer() {
  return (
    <>
      <svg
        className="block w-full h-[120px]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          fill="#cb8967"
          d="
            M0,70
            C240,40 480,40 720,70
            C960,95 1200,95 1440,70
            L1440,120
            L0,120
            Z
          "
        />
      </svg>

      <footer className="w-full bg-[#cb8967]">
        <div className="mx-auto max-w-5xl py-6 text-center">
          <p className="text-sm text-white/90">
            © {new Date().getFullYear()} Saori Portfolio
          </p>
        </div>
      </footer>
    </>
  );
}
