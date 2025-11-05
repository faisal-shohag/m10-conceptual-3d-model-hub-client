import { Link } from 'react-router';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail 
} from 'lucide-react';
import { LuRotate3D } from 'react-icons/lu';


const Footer = () => {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="bg-linear-to-r text-white from-pink-500 to-red-600 py-8 px-4  rounded-xl mt-20 shadow-2xl mb-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <div className="flex items-center space-x-2 text-white">
         <LuRotate3D size={25}/>
      <span className="text-xl font-bold  dark:text-gray-200">3D Model Hub</span>
    </div>
          <ul className="space-y-2 mt-4">
            <li><Link to="/all-models" className=" dark:text-gray-200 hover:text-blue-600">All Models</Link></li>
            <li><Link to="/add-model" className=" dark:text-gray-200 hover:text-blue-600">Add Model</Link></li>
            <li><Link to="/profile" className=" dark:text-gray-200 hover:text-blue-600">Profile</Link></li>
            <li><Link to="/auth/login" className=" dark:text-gray-200 hover:text-blue-600">Login</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4  dark:text-gray-200">Resources</h3>
          <ul className="space-y-2">
            <li><Link to="/" className=" dark:text-gray-200 hover:text-blue-600">Learning Blog</Link></li>
            <li><Link to="/" className=" dark:text-gray-200 hover:text-blue-600">Guides</Link></li>
            <li><Link to="/" className=" dark:text-gray-200 hover:text-blue-600">Poly Tips</Link></li>
            <li><Link to="/resources" className=" dark:text-gray-200 hover:text-blue-600">Resources</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4  dark:text-gray-200">Community</h3>
          <ul className="space-y-2">
            <li><Link to="/" className=" dark:text-gray-200 hover:text-blue-600">Discussion Forums</Link></li>
            <li><Link to="/" className=" dark:text-gray-200 hover:text-blue-600">Study Groups</Link></li>
            <li><Link to="/" className=" dark:text-gray-200 hover:text-blue-600">Events & Workshops</Link></li>
            <li><Link to="/" className=" dark:text-gray-200 hover:text-blue-600">Leaderboard</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4  dark:text-gray-200">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className=" dark:text-gray-200 hover:text-blue-700">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className=" dark:text-gray-200 hover:text-blue-400">
              <Twitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className=" dark:text-gray-200 hover:text-pink-600">
              <Instagram size={24} />
            </a>
          
          </div>
          <div>
            <a 
              href="mailto:support@nihonlearn.com" 
              className="flex items-center  dark:text-gray-200 hover:text-blue-600"
            >
              <Mail size={18} className="mr-2" /> support@nihonlearn.com
            </a>
          </div>
        </div>
      </div>


      <div className="border-t lg:mb-0 md:mb-0 mb-20 border-[#fa7171] mt-8 pt-4 text-center">
        <p className="text-sm  dark:text-gray-200">
          © {currentYear} 3D Model Hub Learn. All Rights Reserved.
          <span className="ml-4">
            <Link to="/" className="hover:text-blue-600 mr-3">Privacy Policy</Link>
            <Link to="/" className="hover:text-blue-600">Terms of Service</Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;