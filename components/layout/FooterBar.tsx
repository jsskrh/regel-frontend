const FooterBar = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-gray-800 text-white p-4 md:p-6 lg:p-8 lg:sr-only">
      <div className="container mx-auto flex justify-between flex-wrap md:flex-nowrap">
        {/* About Us */}
        {/* <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
          <h5 className="text-lg font-bold mb-2">About Us</h5>
          <p className="text-sm">
          Regel Technology is a messaging platform designed to simplify communication.
          </p>
        </div> */}

        {/* Quick Links */}
        {/* <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
          <h5 className="text-lg font-bold mb-2">Quick Links</h5>
          <ul>
            <li>
              <a
                href="/dashboard/messages"
                className="text-sm text-gray-300 hover:text-white"
              >
                Messages
              </a>
            </li>
            <li>
              <a
                href="/dashboard/contacts"
                className="text-sm text-gray-300 hover:text-white"
              >
                Contacts
              </a>
            </li>
            <li>
              <a
                href="/dashboard/settings"
                className="text-sm text-gray-300 hover:text-white"
              >
                Settings
              </a>
            </li>
          </ul>
        </div> */}

        {/* Stay Connected */}
        {/* <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
          <h5 className="text-lg font-bold mb-2">Stay Connected</h5>
          <div className="flex mb-2">
            <a
              href="https://facebook.com/smsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-white mr-2"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-square"></i>
            </a>
            <a
              href="https://twitter.com/smsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-white mr-2"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter-square"></i>
            </a>
            <a
              href="https://instagram.com/smsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-white"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram-square"></i>
            </a>
          </div>
          <p className="text-sm">
            &copy; {currentYear} Regel Technology. All rights reserved.
          </p>
        </div> */}

        <div className="flex mt-12 pt-8 border-t text-center justify-between text-gray-600">
          <div>
            <p>© All rights reserved.</p>
          </div>
          <div className="flex space-x-2 ">
            <p>Privacy Policy</p>
            <p>Terms of Service</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBar;
