import React from "react";

// Icons
import { AtSign } from "lucide-react";

const Email = ({ value, readOnly, onChange }) => {
  return (
    <div>
      <h1 className="text-gray-700 text-base mb-3">Email</h1>
      <div className="w-full max-w-md">
        <div className="relative">
          <AtSign className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className="block w-full pl-10 pr-3 py-3 border rounded focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Email;
