import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { Input } from '../../ui';

export default function RecruiterContactStep({ formData, handleInlineChange, errors }) {
  return (
    <>
      <Input label="Primary Contact Name" labelIcon={<User />} required value={formData.primaryContactName} onChange={(e) => handleInlineChange("primaryContactName", e.target.value)} error={errors.primaryContactName} />
      <Input label="Email-1" labelIcon={<Mail />} type="email" value={formData.email1} required onChange={(e) => handleInlineChange("email1", e.target.value)} error={errors.email1} />
      <Input label="Email-2 (Optional)" labelIcon={<Mail />} type="email" value={formData.email2} onChange={(e) => handleInlineChange("email2", e.target.value)}  />
      
      <Input label="Primary Contact Email" labelIcon={<Mail />} required type="email" value={formData.primaryContactEmail} onChange={(e) => handleInlineChange("primaryContactEmail", e.target.value)} error={errors.primaryContactEmail} />
      
      <Input label="Mobile" labelIcon={<Phone />} required value={formData.mobile} onChange={(e) => handleInlineChange("mobile", e.target.value)} error={errors.mobile} />
      <Input label="Phone (Optional)" labelIcon={<Phone />} value={formData.phone} onChange={(e) => handleInlineChange("phone", e.target.value)} />
      
      <Input label="Primary Contact Mobile" required labelIcon={<Phone />} value={formData.primaryContactMobile} onChange={(e) => handleInlineChange("primaryContactMobile", e.target.value)} error={errors.primaryContactMobile} />
      
      <Input label="Primary Contact Phone" labelIcon={<Phone />} value={formData.primaryContactPhone} onChange={(e) => handleInlineChange("primaryContactPhone", e.target.value)} />
    </>
  );
}
