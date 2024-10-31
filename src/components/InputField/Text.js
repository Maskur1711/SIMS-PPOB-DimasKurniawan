import React from "react";

// Icons
import { User } from "lucide-react";

const Text = ({ name, value, onChange, placeholder, readOnly }) => {
  return (
    <div className="w-full max-w-md">
      <div className="relative mb-4">
        <User className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className="block w-full pl-10 pr-3 py-3 border rounded focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
        />
      </div>
    </div>
  );
};

export default Text;
