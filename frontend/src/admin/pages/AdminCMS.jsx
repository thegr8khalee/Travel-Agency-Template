import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  FileEdit,
  Save,
  Plus,
  Trash2,
  X,
  Image,
  Type,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Globe,
  HelpCircle,
  Megaphone
} from 'lucide-react';

export default function AdminCMS() {
  const { cmsContent, updateCmsContent, addCmsFaq, updateCmsFaq, deleteCmsFaq } = useAdmin();
  const [activeTab, setActiveTab] = useState('hero');
  const [editedContent, setEditedContent] = useState(cmsContent);
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');

  const handleSave = (section) => {
    updateCmsContent(section, editedContent[section]);
    setSaveStatus(`${section} saved successfully!`);
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleAddFaq = () => {
    if (newFaq.question && newFaq.answer) {
      addCmsFaq(newFaq);
      setNewFaq({ question: '', answer: '' });
      setShowFaqModal(false);
      setEditedContent({ ...editedContent, faqs: [...editedContent.faqs, { ...newFaq, id: Date.now() }] });
    }
  };

  const handleUpdateFaq = () => {
    if (editingFaq) {
      updateCmsFaq(editingFaq.id, editingFaq);
      setEditedContent({
        ...editedContent,
        faqs: editedContent.faqs.map(f => f.id === editingFaq.id ? editingFaq : f)
      });
      setEditingFaq(null);
    }
  };

  const handleDeleteFaq = (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      deleteCmsFaq(id);
      setEditedContent({
        ...editedContent,
        faqs: editedContent.faqs.filter(f => f.id !== id)
      });
    }
  };

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: Image },
    { id: 'about', label: 'About', icon: Type },
    { id: 'contact', label: 'Contact Info', icon: Phone },
    { id: 'social', label: 'Social Media', icon: Globe },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'announcements', label: 'Announcements', icon: Megaphone }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Content Management</h1>
          <p className="text-base-content/60">Edit website content and settings</p>
        </div>
        {saveStatus && (
          <div className="alert alert-success py-2 px-4">
            <span>{saveStatus}</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
        <div className="flex border-b border-base-300 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-primary border-b-2 border-primary bg-primary/5'
                    : 'text-base-content/60 hover:text-base-content hover:bg-base-200'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {/* Hero Section */}
          {activeTab === 'hero' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-base-content">Hero Section</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="label"><span className="label-text font-medium">Main Title</span></label>
                  <input
                    type="text"
                    value={editedContent.hero?.title || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      hero: { ...editedContent.hero, title: e.target.value }
                    })}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Subtitle</span></label>
                  <input
                    type="text"
                    value={editedContent.hero?.subtitle || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      hero: { ...editedContent.hero, subtitle: e.target.value }
                    })}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">CTA Button Text</span></label>
                  <input
                    type="text"
                    value={editedContent.hero?.ctaText || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      hero: { ...editedContent.hero, ctaText: e.target.value }
                    })}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Background Image URL</span></label>
                  <input
                    type="url"
                    value={editedContent.hero?.backgroundImage || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      hero: { ...editedContent.hero, backgroundImage: e.target.value }
                    })}
                    className="input input-bordered w-full"
                  />
                  {editedContent.hero?.backgroundImage && (
                    <img src={editedContent.hero.backgroundImage} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg" />
                  )}
                </div>
              </div>
              <button onClick={() => handleSave('hero')} className="btn btn-primary gap-2">
                <Save size={16} /> Save Hero Section
              </button>
            </div>
          )}

          {/* About Section */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-base-content">About Section</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="label"><span className="label-text font-medium">Title</span></label>
                  <input
                    type="text"
                    value={editedContent.about?.title || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      about: { ...editedContent.about, title: e.target.value }
                    })}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Description</span></label>
                  <textarea
                    value={editedContent.about?.text || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      about: { ...editedContent.about, text: e.target.value }
                    })}
                    className="textarea textarea-bordered w-full"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Mission Statement</span></label>
                  <input
                    type="text"
                    value={editedContent.about?.mission || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      about: { ...editedContent.about, mission: e.target.value }
                    })}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Vision Statement</span></label>
                  <input
                    type="text"
                    value={editedContent.about?.vision || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      about: { ...editedContent.about, vision: e.target.value }
                    })}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <button onClick={() => handleSave('about')} className="btn btn-primary gap-2">
                <Save size={16} /> Save About Section
              </button>
            </div>
          )}

          {/* Contact Info */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-base-content">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <Phone size={14} /> Phone Number
                    </span>
                  </label>
                  <input
                    type="tel"
                    value={editedContent.contact?.phone || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      contact: { ...editedContent.contact, phone: e.target.value }
                    })}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <MessageSquare size={14} /> WhatsApp
                    </span>
                  </label>
                  <input
                    type="tel"
                    value={editedContent.contact?.whatsapp || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      contact: { ...editedContent.contact, whatsapp: e.target.value }
                    })}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <Mail size={14} /> Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    value={editedContent.contact?.email || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      contact: { ...editedContent.contact, email: e.target.value }
                    })}
                    className="input input-bordered w-full"
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Working Hours</span>
                  </label>
                  <input
                    type="text"
                    value={editedContent.contact?.workingHours || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      contact: { ...editedContent.contact, workingHours: e.target.value }
                    })}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <MapPin size={14} /> Office Address
                    </span>
                  </label>
                  <textarea
                    value={editedContent.contact?.address || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      contact: { ...editedContent.contact, address: e.target.value }
                    })}
                    className="textarea textarea-bordered w-full"
                    rows={2}
                  />
                </div>
              </div>
              <button onClick={() => handleSave('contact')} className="btn btn-primary gap-2">
                <Save size={16} /> Save Contact Info
              </button>
            </div>
          )}

          {/* Social Media */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-base-content">Social Media Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label"><span className="label-text font-medium">Facebook URL</span></label>
                  <input
                    type="url"
                    value={editedContent.social?.facebook || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      social: { ...editedContent.social, facebook: e.target.value }
                    })}
                    className="input input-bordered w-full"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Instagram URL</span></label>
                  <input
                    type="url"
                    value={editedContent.social?.instagram || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      social: { ...editedContent.social, instagram: e.target.value }
                    })}
                    className="input input-bordered w-full"
                    placeholder="https://instagram.com/..."
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">Twitter URL</span></label>
                  <input
                    type="url"
                    value={editedContent.social?.twitter || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      social: { ...editedContent.social, twitter: e.target.value }
                    })}
                    className="input input-bordered w-full"
                    placeholder="https://twitter.com/..."
                  />
                </div>
                <div>
                  <label className="label"><span className="label-text font-medium">LinkedIn URL</span></label>
                  <input
                    type="url"
                    value={editedContent.social?.linkedin || ''}
                    onChange={(e) => setEditedContent({
                      ...editedContent,
                      social: { ...editedContent.social, linkedin: e.target.value }
                    })}
                    className="input input-bordered w-full"
                    placeholder="https://linkedin.com/..."
                  />
                </div>
              </div>
              <button onClick={() => handleSave('social')} className="btn btn-primary gap-2">
                <Save size={16} /> Save Social Links
              </button>
            </div>
          )}

          {/* FAQs */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-base-content">Frequently Asked Questions</h3>
                <button onClick={() => setShowFaqModal(true)} className="btn btn-primary btn-sm gap-2">
                  <Plus size={16} /> Add FAQ
                </button>
              </div>
              
              <div className="space-y-4">
                {editedContent.faqs?.map((faq, index) => (
                  <div key={faq.id} className="p-4 bg-base-200 rounded-xl">
                    {editingFaq?.id === faq.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingFaq.question}
                          onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                          className="input input-bordered w-full"
                        />
                        <textarea
                          value={editingFaq.answer}
                          onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                          className="textarea textarea-bordered w-full"
                          rows={2}
                        />
                        <div className="flex gap-2">
                          <button onClick={handleUpdateFaq} className="btn btn-primary btn-sm">Save</button>
                          <button onClick={() => setEditingFaq(null)} className="btn btn-ghost btn-sm">Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="font-semibold text-base-content">Q: {faq.question}</p>
                            <p className="text-base-content/60 mt-1">A: {faq.answer}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditingFaq(faq)}
                              className="btn btn-ghost btn-sm btn-square"
                            >
                              <FileEdit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteFaq(faq.id)}
                              className="btn btn-ghost btn-sm btn-square text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Announcements */}
          {activeTab === 'announcements' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-base-content">Website Announcements</h3>
              <p className="text-base-content/60 text-sm">Manage announcement banners shown on the website</p>
              
              <div className="space-y-4">
                {editedContent.announcements?.map((announcement, index) => (
                  <div key={announcement.id} className="flex items-center gap-4 p-4 bg-base-200 rounded-xl">
                    <input
                      type="checkbox"
                      checked={announcement.active}
                      onChange={(e) => {
                        const newAnnouncements = [...editedContent.announcements];
                        newAnnouncements[index] = { ...announcement, active: e.target.checked };
                        setEditedContent({ ...editedContent, announcements: newAnnouncements });
                      }}
                      className="checkbox checkbox-primary"
                    />
                    <input
                      type="text"
                      value={announcement.text}
                      onChange={(e) => {
                        const newAnnouncements = [...editedContent.announcements];
                        newAnnouncements[index] = { ...announcement, text: e.target.value };
                        setEditedContent({ ...editedContent, announcements: newAnnouncements });
                      }}
                      className="input input-bordered flex-1"
                    />
                    <span className={`badge ${announcement.active ? 'badge-success' : 'badge-ghost'}`}>
                      {announcement.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                ))}
              </div>
              <button onClick={() => handleSave('announcements')} className="btn btn-primary gap-2">
                <Save size={16} /> Save Announcements
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add FAQ Modal */}
      {showFaqModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <button onClick={() => setShowFaqModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg mb-4">Add New FAQ</h3>
            <div className="space-y-4">
              <div>
                <label className="label"><span className="label-text font-medium">Question</span></label>
                <input
                  type="text"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  className="input input-bordered w-full"
                  placeholder="Enter the question..."
                />
              </div>
              <div>
                <label className="label"><span className="label-text font-medium">Answer</span></label>
                <textarea
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  placeholder="Enter the answer..."
                />
              </div>
            </div>
            <div className="modal-action">
              <button onClick={() => setShowFaqModal(false)} className="btn btn-ghost">Cancel</button>
              <button onClick={handleAddFaq} className="btn btn-primary">Add FAQ</button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setShowFaqModal(false)}></div>
        </div>
      )}
    </div>
  );
}
