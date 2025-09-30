import Image from "next/image";

/* ------------------ Footer ------------------ */
function Footer() {
  return (
    <footer className="py-8 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-3">
          <Image src="/logo.jpg" alt="logo" width={36} height={36} />
          <div>
            <div className="font-semibold">VISION ADS</div>
            <div className="text-xs">Modern digital agency · All rights reserved</div>
          </div>
        </div>
         
        <div className="flex items-center gap-4">
          <p>Made with ❤️ by Vision Ads</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="mailto:rgaurav.ms@gmail.com">hello@visionads.com</a>
        </div>
      </div>
    </footer>
  );
}


export default Footer;