// Example: Using Dashboard Data in Your Website Pages

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';

/**
 * Example 1: Display Sponsors from Dashboard
 * Use this in your ContactSection or anywhere you want to show sponsors
 */
export function SponsorsSection() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const data = await apiClient.sponsors.getAll();
        setSponsors(data || []);
      } catch (error) {
        console.error('Failed to load sponsors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  if (loading) return <div>Loading sponsors...</div>;

  return (
    <section className="py-12 px-4">
      <h2 className="text-3xl font-bold mb-8">Our Partners</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="bg-white rounded-lg p-4 flex items-center justify-center">
            {sponsor.logoUrl && (
              <img
                src={sponsor.logoUrl}
                alt={`Sponsor logo #${sponsor.id}`}
                className="max-w-full max-h-16 object-contain"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Example 2: Display Content Blocks from Dashboard
 * Use this to create dynamic sections from admin-managed content
 */
export function DynamicContentBlocks() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlocks = async () => {
      try {
        const data = await apiClient.blocks.getAll();
        setBlocks(data || []);
      } catch (error) {
        console.error('Failed to load blocks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, []);

  if (loading) return <div>Loading content...</div>;

  return (
    <div className="space-y-12">
      {blocks.map((block) => (
        <div key={block.id} className="flex items-center gap-8">
          {block.image && (
            <img
              src={block.image}
              alt={block.titre || block.title || `Content block #${block.id}`}
              className="w-1/2 rounded-lg object-cover"
            />
          )}
          <div className="w-1/2">
            <h3 className="text-2xl font-bold mb-4">{block.titre || block.title}</h3>
            <p className="text-gray-600">{block.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Example 3: Display General Company Information
 * Use this in footer or about section
 */
export function CompanyInfo() {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await apiClient.information.getById(1);
        setInfo(data);
      } catch (error) {
        console.error('Failed to load company info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!info) return null;

  return (
    <div className="bg-gray-100 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">About Us</h2>
      <p className="mb-4">{info.moveProfetionelle}</p>
      <p className="mb-4">{info.storageSolution}</p>
      <div className="text-sm text-gray-600">
        <p>Experience: {info.yearsExperience} years</p>
        <p>Email: {info.email}</p>
        <p>Phone: {info.phone1}</p>
        {info.phone2 && <p>Secondary: {info.phone2}</p>}
      </div>
    </div>
  );
}

/**
 * Example 4: Display Offices Locations
 * Use this in a locations or contact page
 */
export function OfficeLocations() {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const data = await apiClient.offices.getAll();
        setOffices(data || []);
      } catch (error) {
        console.error('Failed to load offices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffices();
  }, []);

  if (loading) return <div>Loading offices...</div>;

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Our Offices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offices.map((office) => (
          <div key={office.id} className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-bold">{office.officeName}</h3>
            <p className="text-gray-600 text-sm">ID: {office.id}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/**
 * Example 5: Display Recent Contacts
 * Use this in a dashboard or analytics page
 */
export function RecentContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await apiClient.contacts.getAll();
        setContacts((data || []).slice(0, 5)); // Show only latest 5
      } catch (error) {
        console.error('Failed to load contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-lg font-bold mb-4">Recent Contacts</h3>
      <div className="space-y-3">
        {contacts.map((contact) => (
          <div key={contact.id} className="border-b pb-3 last:border-b-0">
            <p className="font-semibold">{contact.firstName} {contact.lastName}</p>
            <p className="text-sm text-gray-600">{contact.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default {
  SponsorsSection,
  DynamicContentBlocks,
  CompanyInfo,
  OfficeLocations,
  RecentContacts,
};
