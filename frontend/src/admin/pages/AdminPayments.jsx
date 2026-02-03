import { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import {
  CreditCard,
  Search,
  Plus,
  Eye,
  X,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Receipt,
  DollarSign,
  FileText,
  Printer
} from 'lucide-react';

export default function AdminPayments() {
  const { payments, bookings, customers, recordPayment, formatCurrency } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showRecordModal, setShowRecordModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    method: 'Bank Transfer',
    reference: ''
  });

  const filteredPayments = payments.filter(payment => {
    const matchesSearch =
      payment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (payment.reference && payment.reference.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalRevenue: payments.reduce((sum, p) => sum + p.paidAmount, 0),
    pendingAmount: payments.reduce((sum, p) => sum + p.balance, 0),
    completedPayments: payments.filter(p => p.status === 'completed').length,
    pendingPayments: payments.filter(p => p.status !== 'completed').length
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'partial': return <Clock size={16} className="text-yellow-500" />;
      default: return <AlertCircle size={16} className="text-red-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'badge-success',
      partial: 'badge-warning',
      pending: 'badge-error'
    };
    return styles[status] || 'badge-ghost';
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    if (selectedPayment && paymentForm.amount) {
      recordPayment(
        selectedPayment.id,
        parseInt(paymentForm.amount.replace(/,/g, '')),
        paymentForm.method,
        paymentForm.reference
      );
      setShowRecordModal(false);
      setSelectedPayment(null);
      setPaymentForm({ amount: '', method: 'Bank Transfer', reference: '' });
    }
  };

  const openRecordModal = (payment) => {
    setSelectedPayment(payment);
    setPaymentForm({
      amount: payment.balance.toString(),
      method: 'Bank Transfer',
      reference: ''
    });
    setShowRecordModal(true);
  };

  const openInvoiceModal = (payment) => {
    setSelectedPayment(payment);
    setShowInvoiceModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-base-content">Payments</h1>
          <p className="text-base-content/60">Track invoices and payment records</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-ghost btn-sm gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
              <DollarSign size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-base-content">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-sm text-base-content/60">Total Collected</p>
            </div>
          </div>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatCurrency(stats.pendingAmount)}</p>
              <p className="text-sm text-base-content/60">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completedPayments}</p>
          <p className="text-sm text-base-content/60">Completed</p>
        </div>
        <div className="bg-base-100 rounded-xl p-4 shadow-sm border border-base-300">
          <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pendingPayments}</p>
          <p className="text-sm text-base-content/60">Awaiting Payment</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-base-100 rounded-2xl p-4 shadow-sm border border-base-300">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/40" size={20} />
            <input
              type="text"
              placeholder="Search by customer, invoice number, or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select select-bordered"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="partial">Partial</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr className="bg-base-200">
                <th>Invoice</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Method</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-base-200">
                  <td>
                    <div className="flex items-center gap-2">
                      <Receipt size={16} className="text-base-content/40" />
                      <span className="font-medium">{payment.invoiceNo}</span>
                    </div>
                  </td>
                  <td>
                    <div>
                      <p className="font-medium text-base-content">{payment.customerName}</p>
                      <p className="text-sm text-base-content/60">{payment.customerEmail}</p>
                    </div>
                  </td>
                  <td>
                    <span className="font-semibold">{formatCurrency(payment.amount)}</span>
                  </td>
                  <td>
                    <span className="font-semibold text-green-600 dark:text-green-400">{formatCurrency(payment.paidAmount)}</span>
                  </td>
                  <td>
                    <span className={`font-semibold ${payment.balance > 0 ? 'text-red-600 dark:text-red-400' : 'text-base-content/40'}`}>
                      {formatCurrency(payment.balance)}
                    </span>
                  </td>
                  <td>
                    <span className="text-sm">{payment.method || '-'}</span>
                  </td>
                  <td>
                    <span className="text-sm">{payment.dueDate}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(payment.status)}
                      <span className={`badge badge-sm ${getStatusBadge(payment.status)}`}>
                        {payment.status}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openInvoiceModal(payment)}
                        className="btn btn-ghost btn-sm btn-square"
                        title="View Invoice"
                      >
                        <Eye size={16} />
                      </button>
                      {payment.balance > 0 && (
                        <button
                          onClick={() => openRecordModal(payment)}
                          className="btn btn-primary btn-sm"
                        >
                          Record Payment
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPayments.length === 0 && (
          <div className="p-12 text-center">
            <CreditCard size={48} className="mx-auto mb-4 text-base-content/30" />
            <p className="text-base-content/60">No payments found</p>
          </div>
        )}
      </div>

      {/* Record Payment Modal */}
      {showRecordModal && selectedPayment && (
        <div className="modal modal-open">
          <div className="modal-box">
            <button onClick={() => setShowRecordModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
            <h3 className="font-bold text-lg mb-4">Record Payment</h3>
            
            <div className="p-4 bg-base-200 rounded-xl mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-base-content/60">Invoice</span>
                <span className="font-medium">{selectedPayment.invoiceNo}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-base-content/60">Customer</span>
                <span className="font-medium">{selectedPayment.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">Balance Due</span>
                <span className="font-bold text-red-600 dark:text-red-400">{formatCurrency(selectedPayment.balance)}</span>
              </div>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="label"><span className="label-text font-medium">Amount (₦)</span></label>
                <input
                  type="text"
                  value={paymentForm.amount}
                  onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                  className="input input-bordered w-full"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div>
                <label className="label"><span className="label-text font-medium">Payment Method</span></label>
                <select
                  value={paymentForm.method}
                  onChange={(e) => setPaymentForm({ ...paymentForm, method: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Card">Card</option>
                  <option value="Cash">Cash</option>
                  <option value="USSD">USSD</option>
                </select>
              </div>
              <div>
                <label className="label"><span className="label-text font-medium">Reference Number</span></label>
                <input
                  type="text"
                  value={paymentForm.reference}
                  onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })}
                  className="input input-bordered w-full"
                  placeholder="Transaction reference"
                />
              </div>
              <div className="modal-action">
                <button type="button" onClick={() => setShowRecordModal(false)} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Record Payment
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setShowRecordModal(false)}></div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoiceModal && selectedPayment && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <button onClick={() => setShowInvoiceModal(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <X size={20} />
            </button>
            
            {/* Invoice Content */}
            <div className="p-6 bg-base-100" id="invoice">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-base-content">INVOICE</h2>
                  <p className="text-base-content/60">{selectedPayment.invoiceNo}</p>
                </div>
                <div className="text-right">
                  <h3 className="font-bold text-primary">TravelAgency Nigeria</h3>
                  <p className="text-sm text-base-content/60">15 Marina Street, Victoria Island</p>
                  <p className="text-sm text-base-content/60">Lagos, Nigeria</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-sm text-base-content/60 mb-1">Bill To:</p>
                  <p className="font-semibold">{selectedPayment.customerName}</p>
                  <p className="text-sm text-base-content/60">{selectedPayment.customerEmail}</p>
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    <p className="text-sm text-base-content/60">Invoice Date</p>
                    <p className="font-medium">{selectedPayment.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60">Due Date</p>
                    <p className="font-medium">{selectedPayment.dueDate}</p>
                  </div>
                </div>
              </div>

              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b border-base-300">
                    <th className="text-left py-2 text-base-content/60 text-sm">Description</th>
                    <th className="text-right py-2 text-base-content/60 text-sm">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-base-300">
                    <td className="py-3">Booking #{selectedPayment.bookingId}</td>
                    <td className="py-3 text-right">{formatCurrency(selectedPayment.amount)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between py-2">
                    <span className="text-base-content/60">Subtotal</span>
                    <span>{formatCurrency(selectedPayment.amount)}</span>
                  </div>
                  <div className="flex justify-between py-2 text-green-600 dark:text-green-400">
                    <span>Amount Paid</span>
                    <span>-{formatCurrency(selectedPayment.paidAmount)}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-base-300 font-bold text-lg">
                    <span>Balance Due</span>
                    <span className={selectedPayment.balance > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                      {formatCurrency(selectedPayment.balance)}
                    </span>
                  </div>
                </div>
              </div>

              {selectedPayment.notes && (
                <div className="mt-8 p-4 bg-base-200 rounded-lg">
                  <p className="text-sm text-base-content/60">Notes:</p>
                  <p className="text-sm">{selectedPayment.notes}</p>
                </div>
              )}
            </div>

            <div className="modal-action">
              <button onClick={() => setShowInvoiceModal(false)} className="btn btn-ghost">
                Close
              </button>
              <button className="btn btn-primary gap-2">
                <Printer size={16} />
                Print Invoice
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/50" onClick={() => setShowInvoiceModal(false)}></div>
        </div>
      )}
    </div>
  );
}
