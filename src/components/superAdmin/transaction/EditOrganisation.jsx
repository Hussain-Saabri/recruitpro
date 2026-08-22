import React, { useState, useEffect, useMemo } from "react";
import { Modal, Input, Dropdown, AppDatePicker } from "@/components/ui";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  Hash,
  Tag,
  BriefcaseBusiness,
  Mail,
  Phone,
  Globe,
  Image,
  MapPin,
  Building,
  Map,
  Earth,
  Mailbox,
  CreditCard,
  CalendarDays,
  Edit2,
} from "lucide-react";
import { toast } from "sonner";
import {
  getCountryDropdownOptions,
  getStateDropdownOptions,
  getCityDropdownOptions,
  getPostalCodeForCity,
} from "@/constants/locationData.jsx";

export function EditOrganisation({ isOpen = true, onClose, orgDataToEdit }) {
  const location = useLocation();
  const editData = orgDataToEdit || location.state?.orgDataToEdit;
  const navigate = useNavigate();

  const [organisationData, setorganisationData] = useState({
    name: "",
    code: "",
    type: "",
    industry: "",
    email: "",
    phone: "",
    website: "",
    logoUrl: "",
    address: "",
    city: "",
    state: "",
    country: "India",
    postalCode: "",
    subscriptionPlan: "",
    trialEndsAt: "",
  });

  useEffect(() => {
    if (editData) {
      setorganisationData(editData);
    }
  }, [editData]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryOptions = useMemo(() => getCountryDropdownOptions(), []);
  const stateOptions = useMemo(
    () => getStateDropdownOptions(organisationData.country),
    [organisationData.country]
  );
  const cityOptions = useMemo(
    () => getCityDropdownOptions(organisationData.state),
    [organisationData.state]
  );

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      navigate("/dashboard");
    }
  };

  const handleSubmit = async () => {
    let newErrors = {};
    if (!organisationData.name.trim()) {
      newErrors.name = "Organization Name is required";
    } else if (
      organisationData.name.trim().length < 2 ||
      !organisationData.name.trim().match(/^[a-zA-Z ]+$/)
    ) {
      newErrors.name = "Letters only, minimum 2 characters";
    }
    if (!organisationData.code) newErrors.code = "Code is required";
    if (!organisationData.type) newErrors.type = "Type is required";
    if (!organisationData.industry) newErrors.industry = "Industry is required";
    if (!organisationData.email) newErrors.email = "Email is required";
    if (!organisationData.phone) newErrors.phone = "Phone is required";
    if (!organisationData.website) newErrors.website = "Website is required";
    if (!organisationData.address) newErrors.address = "Address is required";
    if (!organisationData.city) newErrors.city = "City is required";
    if (!organisationData.state) newErrors.state = "State is required";
    if (!organisationData.country) newErrors.country = "Country is required";
    if (!organisationData.postalCode) newErrors.postalCode = "Postal Code is required";
    if (!organisationData.subscriptionPlan) newErrors.subscriptionPlan = "Subscription Plan is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Form data ready to submit:", organisationData);
      toast.success("Organisation updated successfully");
      handleClose();
    } catch (error) {
      console.error("Error submitting form", error);
      toast.error("Failed to update organisation");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Edit Organisation"
      icon={<Edit2 className="text-brand-500" size={20} />}
      submitButton="Update Organisation"
      submitButtonIcon={<Edit2 size={14} />}
      cancelButton="Cancel"
      onSubmit={handleSubmit}
      disabled={isSubmitting}
      className="max-w-4xl"
    >
      <div className="flex flex-col gap-4 text-left font-sans">
        {/* Row 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            label="Name"
            labelIcon={<Building2 size={14} />}
            type="text"
            placeholder="Enter Organisation Name"
            value={organisationData.name}
            className="w-full text-[13px] font-medium text-gray-900"
            onChange={(e) => {
              const val = e.target.value;
              setorganisationData({ ...organisationData, name: val });
              if (val.trim().length > 0 && !val.match(/^[a-zA-Z ]+$/)) {
                setErrors({
                  ...errors,
                  name: "Letters only, minimum 2 characters",
                });
              } else if (errors.name) {
                setErrors({ ...errors, name: "" });
              }
            }}
            required={true}
            error={errors.name}
          />

          <Input
            label="Code"
            labelIcon={<Hash size={14} />}
            type="text"
            placeholder="Enter Organisation Code"
            value={organisationData.code}
            className="w-full text-[13px] font-medium text-gray-900"
            onChange={(e) => {
              setorganisationData({ ...organisationData, code: e.target.value });
              if (errors.code) setErrors({ ...errors, code: "" });
            }}
            required={true}
            error={errors.code}
          />

          <Input
            label="Type"
            labelIcon={<Tag size={14} />}
            type="text"
            placeholder="Enter Type"
            value={organisationData.type}
            className="w-full text-[13px] font-medium text-gray-900"
            onChange={(e) => {
              setorganisationData({ ...organisationData, type: e.target.value });
              if (errors.type) setErrors({ ...errors, type: "" });
            }}
            required={true}
            error={errors.type}
          />

          <Input
            label="Industry"
            labelIcon={<BriefcaseBusiness size={14} />}
            type="text"
            placeholder="Enter Industry"
            value={organisationData.industry}
            className="w-full text-[13px] font-medium text-gray-900"
            onChange={(e) => {
              setorganisationData({
                ...organisationData,
                industry: e.target.value,
              });
              if (errors.industry) setErrors({ ...errors, industry: "" });
            }}
            required={true}
            error={errors.industry}
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            label="Email"
            labelIcon={<Mail size={14} />}
            type="email"
            placeholder="Enter Email"
            value={organisationData.email}
            className="w-full text-[13px] font-medium text-gray-900"
            onChange={(e) => {
              setorganisationData({
                ...organisationData,
                email: e.target.value,
              });
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            required={true}
            error={errors.email}
          />

          <Input
            label="Phone"
            labelIcon={<Phone size={14} />}
            type="text"
            placeholder="Enter Phone"
            value={organisationData.phone}
            className="w-full text-[13px] font-medium text-gray-900"
            onChange={(e) => {
              setorganisationData({
                ...organisationData,
                phone: e.target.value,
              });
              if (errors.phone) setErrors({ ...errors, phone: "" });
            }}
            required={true}
            error={errors.phone}
          />

          <Input
            label="Website"
            labelIcon={<Globe size={14} />}
            type="text"
            placeholder="Enter Website Url"
            value={organisationData.website}
            className="w-full text-[13px] font-medium text-gray-900"
            onChange={(e) => {
              setorganisationData({
                ...organisationData,
                website: e.target.value,
              });
              if (errors.website) setErrors({ ...errors, website: "" });
            }}
            required={true}
            error={errors.website}
          />

          <Input
            label="Logo Url"
            labelIcon={<Image size={14} />}
            type="text"
            placeholder="Add Logo Image"
            value={organisationData.logoUrl}
            className="w-full text-[13px] font-medium text-gray-900"
            onChange={(e) => {
              setorganisationData({
                ...organisationData,
                logoUrl: e.target.value,
              });
              if (errors.logoUrl) setErrors({ ...errors, logoUrl: "" });
            }}
            error={errors.logoUrl}
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            label="Address"
            labelIcon={<MapPin size={14} />}
            type="text"
            placeholder="Enter Address"
            value={organisationData.address}
            className="w-full text-[13px] font-medium text-gray-900"
            onChange={(e) => {
              setorganisationData({
                ...organisationData,
                address: e.target.value,
              });
              if (errors.address) setErrors({ ...errors, address: "" });
            }}
            required={true}
            error={errors.address}
          />

          <Dropdown
            label="Country"
            icon={<Earth size={14} />}
            options={countryOptions}
            value={organisationData.country}
            onChange={(countryVal) => {
              setorganisationData({
                ...organisationData,
                country: countryVal,
                state: "", // Reset state when country changes
                city: "",  // Reset city when country changes
              });
              if (errors.country) setErrors({ ...errors, country: "" });
            }}
            placeholder="Select Country"
            searchable={true}
            required={true}
            direction="up"
            error={errors.country}
            wrapperClassName="w-full"
            className=" text-[13px]"
          />

          <Dropdown
            label="State"
            icon={<Map size={14} />}
            options={stateOptions}
            value={organisationData.state}
            onChange={(stateVal) => {
              setorganisationData({
                ...organisationData,
                state: stateVal,
                city: "", // Reset city when state changes
              });
              if (errors.state) setErrors({ ...errors, state: "" });
            }}
            placeholder={organisationData.country ? "Select State" : "Select Country First"}
            searchable={true}
            required={true}
            direction="up"
            error={errors.state}
            wrapperClassName="w-full"
            className="text-[13px]"
          />

          <Dropdown
            label="City"
            icon={<Building size={14} />}
            options={cityOptions}
            value={organisationData.city}
            onChange={(cityVal) => {
              const autoPostalCode = getPostalCodeForCity(cityVal);
              setorganisationData({
                ...organisationData,
                city: cityVal,
                postalCode: autoPostalCode || organisationData.postalCode,
              });
              if (errors.city) setErrors({ ...errors, city: "" });
              if (errors.postalCode && autoPostalCode) setErrors({ ...errors, postalCode: "" });
            }}
            placeholder={organisationData.state ? "Select City" : "Select State First"}
            searchable={true}
            required={true}
            direction="up"
            error={errors.city}
            wrapperClassName="w-full"
            className="text-[13px]"
          />
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Input
            label="Postal Code"
            labelIcon={<Mailbox size={14} />}
            type="text"
            placeholder="Enter Postal Code"
            value={organisationData.postalCode}
            className="w-full text-[13px] font-medium text-gray-900"
            onChange={(e) => {
              setorganisationData({
                ...organisationData,
                postalCode: e.target.value,
              });
              if (errors.postalCode) setErrors({ ...errors, postalCode: "" });
            }}
            required={true}
            error={errors.postalCode}
          />

          <Input
            label="Subscription Plan"
            labelIcon={<CreditCard size={14} />}
            type="text"
            placeholder="Enter Subscription Plan"
            value={organisationData.subscriptionPlan}
            className="w-full text-[13px] font-medium text-gray-900"
            onChange={(e) => {
              setorganisationData({
                ...organisationData,
                subscriptionPlan: e.target.value,
              });
              if (errors.subscriptionPlan)
                setErrors({ ...errors, subscriptionPlan: "" });
            }}
            required={true}
            error={errors.subscriptionPlan}
          />

          <div className="flex flex-col text-left">
            <label className="flex items-center text-slate-700 text-xs font-semibold mb-1">
              <span className="text-brand-600 flex items-center justify-center mr-1.5">
                <CalendarDays size={14} />
              </span>
              Trial Expiry Date
            </label>
            <AppDatePicker
              value={organisationData.trialEndsAt}
              onChange={(dateStr) => {
                setorganisationData({
                  ...organisationData,
                  trialEndsAt: dateStr,
                });
                if (errors.trialEndsAt) {
                  setErrors({ ...errors, trialEndsAt: "" });
                }
              }}
              placeholder="dd/mm/yyyy"
              position="above"
              className={`w-full text-[13px] font-medium text-gray-900 border-slate-200 ${
                errors.trialEndsAt ? "border-red-500" : ""
              }`}
            />
            {errors.trialEndsAt && (
              <span className="text-xs text-red-500 font-medium mt-1">
                {errors.trialEndsAt}
              </span>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
