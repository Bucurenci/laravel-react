function Footer() {

  let dateObj: Date = new Date();
  let currentYear: number = dateObj.getFullYear();
  let appName: string = import.meta.env.VITE_APP_NAME;

  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>Copyright &copy; {appName} {currentYear}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
