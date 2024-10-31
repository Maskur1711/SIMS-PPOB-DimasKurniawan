import React, { useEffect, useState } from "react";
import { getServicesApi } from "../../api/baseAPI";
const Layanan = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServicesApi();
        if (data.status === 0) {
          setServices(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        if (err.message.includes("Token tidak tidak valid atau kadaluwarsa")) {
          console.error("Token expired. Please log in again.");
        } else {
          setError("Failed to load services.");
        }
      }
    };

    fetchServices();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center p-4 overflow-x-auto">
      <div className="flex space-x-4">
        {services.map((service) => (
          <div
            key={service.service_code}
            className="flex flex-col items-center p-2 min-w-[120px]"
          >
            <img
              src={service.service_icon}
              alt={service.service_name}
              className="w-16 h-16 mb-2 object-contain"
            />
            <h2 className="font-normal text-center text-sm">
              {service.service_name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Layanan;
