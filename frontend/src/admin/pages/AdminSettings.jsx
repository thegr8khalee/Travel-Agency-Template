import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  Settings,
  Save,
  Globe,
  DollarSign,
  Bell,
  CreditCard,
  Building2,
  Mail,
  Palette,
  Shield,
  Clock
} from 'lucide-react';

export default function AdminSettings() {
  const { settings, updateSettings } = useAdmin();
  const [activeTab, setActiveTab] = useState('general');
  const [editedSettings, setEditedSettings] = useState(settings);
  const [saveStatus, setSaveStatus] = useState('');

  const handleSave = () => {
    updateSettings(editedSettings);
    setSaveStatus('Settings saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'currency', label: 'Currency', icon: DollarSign },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'bank', label: 'Bank Details', icon: Building2 },
    { id: 'email', label: 'Email Settings', icon: Mail }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">System Settings</h1>
          <p className="text-base-content/60">Configure application settings and preferences</p>
        </div>
        <div className="flex gap-2 items-center">
          {saveStatus && (
            <div className="alert alert-success py-2 px-4">
              <span>{saveStatus}</span>
            </div>
          )}
          <button onClick={handleSave} className="btn btn-primary-custom gap-2">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 shrink-0">
          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-base-content/60 hover:bg-base-200'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-6">
            {/* General Settings */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
                  <Globe size={20} /> General Settings
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label"><span className="label-text font-medium">Company Name</span></label>
                    <input
                      type="text"
                      value={editedSettings.companyName || ''}
                      onChange={(e) => setEditedSettings({ ...editedSettings, companyName: e.target.value })}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">Website URL</span></label>
                    <input
                      type="url"
                      value={editedSettings.websiteUrl || ''}
                      onChange={(e) => setEditedSettings({ ...editedSettings, websiteUrl: e.target.value })}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">Timezone</span></label>
                    <select
                      value={editedSettings.timezone || 'Africa/Lagos'}
                      onChange={(e) => setEditedSettings({ ...editedSettings, timezone: e.target.value })}
                      className="select select-bordered w-full"
                    >
                      <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                      <option value="UTC">UTC</option>
                      <option value="Europe/London">Europe/London (GMT)</option>
                      <option value="America/New_York">America/New York (EST)</option>
                      <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                    </select>
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">Date Format</span></label>
                    <select
                      value={editedSettings.dateFormat || 'DD/MM/YYYY'}
                      onChange={(e) => setEditedSettings({ ...editedSettings, dateFormat: e.target.value })}
                      className="select select-bordered w-full"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="label"><span className="label-text font-medium">Default Language</span></label>
                  <select
                    value={editedSettings.language || 'en'}
                    onChange={(e) => setEditedSettings({ ...editedSettings, language: e.target.value })}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="ar">Arabic</option>
                  </select>
                </div>
              </div>
            )}

            {/* Currency Settings */}
            {activeTab === 'currency' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
                  <DollarSign size={20} /> Currency Settings
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label"><span className="label-text font-medium">Primary Currency</span></label>
                    <select
                      value={editedSettings.currency || 'NGN'}
                      onChange={(e) => setEditedSettings({ ...editedSettings, currency: e.target.value })}
                      className="select select-bordered w-full"
                    >
                      <option value="NGN">Nigerian Naira (₦)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                      <option value="AED">UAE Dirham (د.إ)</option>
                    </select>
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">Currency Symbol Position</span></label>
                    <select
                      value={editedSettings.currencyPosition || 'before'}
                      onChange={(e) => setEditedSettings({ ...editedSettings, currencyPosition: e.target.value })}
                      className="select select-bordered w-full"
                    >
                      <option value="before">Before amount (₦1,000)</option>
                      <option value="after">After amount (1,000₦)</option>
                    </select>
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">Decimal Places</span></label>
                    <select
                      value={editedSettings.decimalPlaces || '2'}
                      onChange={(e) => setEditedSettings({ ...editedSettings, decimalPlaces: e.target.value })}
                      className="select select-bordered w-full"
                    >
                      <option value="0">0 (1,000)</option>
                      <option value="2">2 (1,000.00)</option>
                    </select>
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">Thousand Separator</span></label>
                    <select
                      value={editedSettings.thousandSeparator || ','}
                      onChange={(e) => setEditedSettings({ ...editedSettings, thousandSeparator: e.target.value })}
                      className="select select-bordered w-full"
                    >
                      <option value=",">Comma (1,000)</option>
                      <option value=".">Period (1.000)</option>
                      <option value=" ">Space (1 000)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
                  <Bell size={20} /> Notification Settings
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                    <div>
                      <p className="font-medium text-base-content">New Booking Notifications</p>
                      <p className="text-sm text-base-content/60">Receive alerts when new bookings are made</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={editedSettings.notifications?.newBooking ?? true}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        notifications: { ...editedSettings.notifications, newBooking: e.target.checked }
                      })}
                      className="toggle toggle-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                    <div>
                      <p className="font-medium text-base-content">Payment Received</p>
                      <p className="text-sm text-base-content/60">Get notified when payments are received</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={editedSettings.notifications?.paymentReceived ?? true}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        notifications: { ...editedSettings.notifications, paymentReceived: e.target.checked }
                      })}
                      className="toggle toggle-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                    <div>
                      <p className="font-medium text-base-content">Service Request Alerts</p>
                      <p className="text-sm text-base-content/60">Notifications for visa, study abroad requests</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={editedSettings.notifications?.serviceRequest ?? true}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        notifications: { ...editedSettings.notifications, serviceRequest: e.target.checked }
                      })}
                      className="toggle toggle-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                    <div>
                      <p className="font-medium text-base-content">Email Notifications</p>
                      <p className="text-sm text-base-content/60">Send email notifications to admins</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={editedSettings.notifications?.emailNotifications ?? true}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        notifications: { ...editedSettings.notifications, emailNotifications: e.target.checked }
                      })}
                      className="toggle toggle-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                    <div>
                      <p className="font-medium text-base-content">SMS Notifications</p>
                      <p className="text-sm text-base-content/60">Send SMS alerts for critical updates</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={editedSettings.notifications?.smsNotifications ?? false}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        notifications: { ...editedSettings.notifications, smsNotifications: e.target.checked }
                      })}
                      className="toggle toggle-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Payment Methods */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
                  <CreditCard size={20} /> Payment Methods
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <CreditCard size={20} className="text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-medium text-base-content">Bank Transfer</p>
                        <p className="text-sm text-base-content/60">Accept direct bank transfers</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={editedSettings.paymentMethods?.bankTransfer ?? true}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        paymentMethods: { ...editedSettings.paymentMethods, bankTransfer: e.target.checked }
                      })}
                      className="toggle toggle-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <CreditCard size={20} className="text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="font-medium text-base-content">Paystack</p>
                        <p className="text-sm text-base-content/60">Accept card payments via Paystack</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={editedSettings.paymentMethods?.paystack ?? true}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        paymentMethods: { ...editedSettings.paymentMethods, paystack: e.target.checked }
                      })}
                      className="toggle toggle-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <CreditCard size={20} className="text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="font-medium text-base-content">Flutterwave</p>
                        <p className="text-sm text-base-content/60">Accept payments via Flutterwave</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={editedSettings.paymentMethods?.flutterwave ?? false}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        paymentMethods: { ...editedSettings.paymentMethods, flutterwave: e.target.checked }
                      })}
                      className="toggle toggle-primary"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-base-200 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                        <DollarSign size={20} className="text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="font-medium text-base-content">Cash Payment</p>
                        <p className="text-sm text-base-content/60">Accept cash at office</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={editedSettings.paymentMethods?.cash ?? true}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        paymentMethods: { ...editedSettings.paymentMethods, cash: e.target.checked }
                      })}
                      className="toggle toggle-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Bank Details */}
            {activeTab === 'bank' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
                  <Building2 size={20} /> Bank Account Details
                </h3>
                <p className="text-base-content/60 text-sm">Bank details shown to customers for transfers</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label"><span className="label-text font-medium">Bank Name</span></label>
                    <input
                      type="text"
                      value={editedSettings.bankDetails?.bankName || ''}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        bankDetails: { ...editedSettings.bankDetails, bankName: e.target.value }
                      })}
                      className="input input-bordered w-full"
                      placeholder="e.g., First Bank"
                    />
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">Account Name</span></label>
                    <input
                      type="text"
                      value={editedSettings.bankDetails?.accountName || ''}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        bankDetails: { ...editedSettings.bankDetails, accountName: e.target.value }
                      })}
                      className="input input-bordered w-full"
                      placeholder="Account holder name"
                    />
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">Account Number</span></label>
                    <input
                      type="text"
                      value={editedSettings.bankDetails?.accountNumber || ''}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        bankDetails: { ...editedSettings.bankDetails, accountNumber: e.target.value }
                      })}
                      className="input input-bordered w-full"
                      placeholder="10-digit account number"
                    />
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">Sort Code (Optional)</span></label>
                    <input
                      type="text"
                      value={editedSettings.bankDetails?.sortCode || ''}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        bankDetails: { ...editedSettings.bankDetails, sortCode: e.target.value }
                      })}
                      className="input input-bordered w-full"
                      placeholder="Bank sort code"
                    />
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> These bank details will be displayed to customers when they select bank transfer as a payment method.
                  </p>
                </div>
              </div>
            )}

            {/* Email Settings */}
            {activeTab === 'email' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
                  <Mail size={20} /> Email Configuration
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="label"><span className="label-text font-medium">SMTP Host</span></label>
                    <input
                      type="text"
                      value={editedSettings.email?.smtpHost || ''}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        email: { ...editedSettings.email, smtpHost: e.target.value }
                      })}
                      className="input input-bordered w-full"
                      placeholder="smtp.example.com"
                    />
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">SMTP Port</span></label>
                    <input
                      type="text"
                      value={editedSettings.email?.smtpPort || ''}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        email: { ...editedSettings.email, smtpPort: e.target.value }
                      })}
                      className="input input-bordered w-full"
                      placeholder="587"
                    />
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">SMTP Username</span></label>
                    <input
                      type="text"
                      value={editedSettings.email?.smtpUsername || ''}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        email: { ...editedSettings.email, smtpUsername: e.target.value }
                      })}
                      className="input input-bordered w-full"
                      placeholder="username@example.com"
                    />
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">SMTP Password</span></label>
                    <input
                      type="password"
                      value={editedSettings.email?.smtpPassword || ''}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        email: { ...editedSettings.email, smtpPassword: e.target.value }
                      })}
                      className="input input-bordered w-full"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">From Email</span></label>
                    <input
                      type="email"
                      value={editedSettings.email?.fromEmail || ''}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        email: { ...editedSettings.email, fromEmail: e.target.value }
                      })}
                      className="input input-bordered w-full"
                      placeholder="noreply@example.com"
                    />
                  </div>
                  <div>
                    <label className="label"><span className="label-text font-medium">From Name</span></label>
                    <input
                      type="text"
                      value={editedSettings.email?.fromName || ''}
                      onChange={(e) => setEditedSettings({
                        ...editedSettings,
                        email: { ...editedSettings.email, fromName: e.target.value }
                      })}
                      className="input input-bordered w-full"
                      placeholder="TravelPro Agency"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-4 bg-base-200 rounded-xl">
                  <input
                    type="checkbox"
                    checked={editedSettings.email?.useTLS ?? true}
                    onChange={(e) => setEditedSettings({
                      ...editedSettings,
                      email: { ...editedSettings.email, useTLS: e.target.checked }
                    })}
                    className="checkbox checkbox-primary"
                  />
                  <span className="text-base-content/70">Use TLS encryption</span>
                </div>

                <button className="btn btn-outline btn-sm">
                  Send Test Email
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
