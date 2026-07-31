import React from 'react';
import { MapPin, Building, Globe, CreditCard } from 'lucide-react';
import { Input } from '../../ui';

export default function RecruiterAddressStep({ formData, handleChange, errors }) {
  return (
    <>
      <div className="col-span-full">
        <Input label="Address Type (To be removed)" labelIcon={<MapPin />} name="addressType" type="number" value={formData.addressType} onChange={handleChange} placeholder="e.g. 0" />
      </div>
      <div className="col-span-full">
        <Input label="Address Line 1" labelIcon={<MapPin />} name="address1" value={formData.address1} onChange={handleChange} placeholder="Street Address" required error={errors.address1} />
      </div>
      <div className="col-span-full">
        <Input label="Address Line 2" labelIcon={<MapPin />} name="address2" value={formData.address2} onChange={handleChange} placeholder="Suite, Apt (Optional)"  />
      </div>
      <Input label="City" labelIcon={<Building />} name="city" value={formData.city} onChange={handleChange} required error={errors.city} />
      <Input label="State" labelIcon={<MapPin />} name="state" value={formData.state} onChange={handleChange} required error={errors.state} />
      <Input label="Country" labelIcon={<Globe />} name="country" value={formData.country} onChange={handleChange} required error={errors.country} />
      <Input label="Postal Code" labelIcon={<MapPin />} name="postalCode" value={formData.postalCode} onChange={handleChange} required error={errors.postalCode} />
      <Input label="Landmark" labelIcon={<MapPin />} name="landmark" value={formData.landmark} onChange={handleChange} required error={errors.landmark} />
      
      <Input label="PAN" labelIcon={<CreditCard />} name="pan" value={formData.pan} onChange={handleChange} required error={errors.pan} />
      <Input label="TIN" labelIcon={<CreditCard />} name="tin" value={formData.tin} onChange={handleChange} required error={errors.tin} />
    </>
  );
}
