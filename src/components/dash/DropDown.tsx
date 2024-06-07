import React, { useState, useEffect, useRef } from 'react';
import points from '../../assets/svg/pt3.svg';
import { ButtonProps } from '../../Props/ButtonProps';

const Dropdown:React.FC<ButtonProps> = ({fun}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <div className="flex justify-end">
      <button
        onClick={toggleDropdown}
        className="text-white px-4 py-2 rounded-md focus:outline-none"
      >
        <img src={points} alt="Points" />
      </button>
      {isOpen && (
        <div ref={dropdownRef} className="absolute mt-1 w-40 bg-white rounded-md shadow-lg">
          <ul>
            <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer" onClick={fun}>Borrar</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
