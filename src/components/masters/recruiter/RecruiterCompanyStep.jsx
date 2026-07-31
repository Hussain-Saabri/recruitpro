import React from 'react';
import { Building, Briefcase, Activity, Percent, Globe, Calendar, FileText } from 'lucide-react';
import { Input } from '../../ui';

export default function RecruiterCompanyStep({ formData, handleChange, setFormData, errors }) {
  return (
    <>
      <Input label="Recruiter Name" labelIcon={<Building />} name="name" value={formData.name} onChange={handleChange} placeholder="e.g. TalentBridge" required error={errors.name} />
      <Input label="Type" labelIcon={<Briefcase />} name="type" type="number" value={formData.type} onChange={handleChange} placeholder="e.g. 0" required error={errors.type}/>
      <Input label="Org ID (Remove)" labelIcon={<Building />} name="organizationId" type="number" value={formData.organizationId} onChange={handleChange} placeholder="e.g. 1" />
      <Input label="Specialization" labelIcon={<Activity />} name="specialization" value={formData.specialization} onChange={handleChange} placeholder="e.g. IT, Engineering" required error={errors.specialization} />
      <Input label="Commission Rate (%)" labelIcon={<Percent />} name="commissionRate" type="number" min="0" step="0.1" value={formData.commissionRate} onChange={handleChange} placeholder="12.5" required error={errors.commissionRate} />
      <Input label="Website" labelIcon={<Globe />} name="website" value={formData.website} onChange={handleChange} placeholder="https://www.example.com" required error={errors.website} />
      <Input label="Contract Start Date" labelIcon={<Calendar />} name="contractStartDate" type="date" value={formData.contractStartDate} onChange={handleChange} required error={errors.contractStartDate} />
      <Input label="Contract End Date" labelIcon={<Calendar />} name="contractEndDate" type="date" min={formData.contractStartDate} value={formData.contractEndDate} onChange={handleChange} required error={errors.contractEndDate} />
      <div className="col-span-full">
        <label className="flex items-center text-[13px] font-semibold text-slate-700 mb-1.5 ml-0.5">
          <span className="text-brand-600 flex items-center justify-center [&>svg]:h-3.5 [&>svg]:w-3.5 mr-1.5 mt-[1px]">
            <FileText />
          </span>
          Notes
        </label>
        <textarea 
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          className="w-full rounded-[5px] border border-gray-200 px-3 py-2 text-[12.5px] bg-white placeholder:text-gray-600 placeholder:text-[12px] focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all duration-200" 
          rows={4}
        />
      </div>
    </>
  );
}
