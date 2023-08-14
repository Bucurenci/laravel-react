function Footer() {

    let dateObj: Date = new Date();
    let currentYear: Number = dateObj.getFullYear();

    return (
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright &copy; Demo Ecommerce {currentYear}</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
