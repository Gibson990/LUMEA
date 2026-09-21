import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminUsers from '../components/AdminUsers';
import AdminSupport from '../components/AdminSupport';
import { useAuth } from '../context/AuthContext';
import {
  fetchAdminStats,
  fetchOrders,
  updateOrderStatus,
  fetchCustomers,
  fetchProduct,
  fetchUsers,
  updateUserRole,
  addUser,
  deleteUser,
  fetchSupportTickets,
  updateTicketStatus
} from '../services/api';
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Sparkles,
  Search,
  Filter,
  RefreshCw,
  Users,
  LifeBuoy,
  ShieldAlert
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, openAuthModal } = useAuth();
  const currentUserRole = user?.role;
  const isAuthorizedAdmin = currentUserRole === 'admin' || currentUserRole === 'subadmin';

  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [product, setProduct] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [ticketsList, setTicketsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const loadAllAdminData = async () => {
    setLoading(true);
    try {
      const [statsData, ordersData, custData, prodData, usersData, ticketsData] = await Promise.all([
        fetchAdminStats(),
        fetchOrders(),
        fetchCustomers(),
        fetchProduct(),
        fetchUsers(),
        fetchSupportTickets()
      ]);
      setStats(statsData);
      setOrders(ordersData);
      setCustomers(custData);
      setProduct(prodData);
      setUsersList(usersData);
      setTicketsList(ticketsData);
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorizedAdmin) {
      loadAllAdminData();
    }
  }, [isAuthorizedAdmin]);

  // Role Access Guard: Block Customers from viewing Admin Portal
  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-screen bg-[#FFF8FA] flex flex-col justify-between">
        <Navbar />
        <main className="max-w-md mx-auto px-4 py-20 text-center space-y-6 my-auto">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-[#2B2024]">Access Restricted</h2>
            <p className="text-xs text-[#6e5f65]">
              You are currently logged in as <strong className="text-[#2B2024]">{user?.name || 'Customer'}</strong> ({user?.email || 'Guest'}). Store Administrator authorization is required to view this panel.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => openAuthModal('login')}
              className="bg-[#2B2024] text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-md hover:bg-black transition-colors"
            >
              Sign In as Admin
            </button>
            <Link
              to="/"
              className="bg-white border border-[#F4D8DF] text-[#2B2024] px-5 py-2.5 rounded-2xl text-xs font-semibold hover:border-[#D96C8A] transition-colors"
            >
              Return to Customer Store
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      loadAllAdminData();
    } catch (err) {
      alert('Error updating status: ' + err.message);
    }
  };

  const handleUserRoleChange = async (userId, newRole) => {
    await updateUserRole(userId, newRole);
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  const handleAddUser = async (userData) => {
    const res = await addUser(userData);
    if (res.success) setUsersList(prev => [...prev, res.user]);
  };

  const handleDeleteUser = async (userId) => {
    await deleteUser(userId);
    setUsersList(prev => prev.filter(u => u.id !== userId));
  };

  const handleTicketStatusChange = async (ticketId, newStatus) => {
    await updateTicketStatus(ticketId, newStatus);
    setTicketsList(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = (o.order_code || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (o.customer_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (o.shade_name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Processing':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Shipped':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8FA] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#D96C8A]">
              <Sparkles className="w-4 h-4" />
              <span>Store Management ({currentUserRole.toUpperCase()})</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-[#2B2024]">
              Luméa Admin Portal
            </h1>
          </div>

          <div className="flex items-center space-x-1.5 bg-white/80 p-1.5 rounded-2xl border border-[#F4D8DF] shadow-sm overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'dashboard' ? 'bg-[#D96C8A] text-white shadow-md' : 'text-[#6e5f65] hover:text-[#2B2024]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'orders' ? 'bg-[#D96C8A] text-white shadow-md' : 'text-[#6e5f65] hover:text-[#2B2024]'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1 ${
                activeTab === 'support' ? 'bg-[#D96C8A] text-white shadow-md' : 'text-[#6e5f65] hover:text-[#2B2024]'
              }`}
            >
              <LifeBuoy className="w-3.5 h-3.5" />
              <span>Support ({ticketsList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1 ${
                activeTab === 'users' ? 'bg-[#D96C8A] text-white shadow-md' : 'text-[#6e5f65] hover:text-[#2B2024]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>User Roles ({usersList.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'products' ? 'bg-[#D96C8A] text-white shadow-md' : 'text-[#6e5f65] hover:text-[#2B2024]'
              }`}
            >
              Shades
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === 'customers' ? 'bg-[#D96C8A] text-white shadow-md' : 'text-[#6e5f65] hover:text-[#2B2024]'
              }`}
            >
              Customers
            </button>

            <button
              onClick={loadAllAdminData}
              className="p-2 text-[#6e5f65] hover:text-[#D96C8A] rounded-xl hover:bg-[#FFF8FA]"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              
              <div className="glass-card p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[#6e5f65]">
                  <span className="text-xs font-semibold">Total Revenue</span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#2B2024]">
                  ₹{stats.total_revenue.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-emerald-600 font-medium">Accumulated store sales</span>
              </div>

              <div className="glass-card p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[#6e5f65]">
                  <span className="text-xs font-semibold">Total Orders</span>
                  <ShoppingBag className="w-4 h-4 text-[#D96C8A]" />
                </div>
                <div className="font-serif text-2xl font-bold text-[#2B2024]">
                  {stats.total_orders}
                </div>
                <span className="text-[10px] text-[#6e5f65]">Processed orders</span>
              </div>

              <div className="glass-card p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[#6e5f65]">
                  <span className="text-xs font-semibold">Pending Orders</span>
                  <Clock className="w-4 h-4 text-amber-500" />
                </div>
                <div className="font-serif text-2xl font-bold text-amber-600">
                  {stats.pending_orders}
                </div>
                <span className="text-[10px] text-amber-600 font-medium">Awaiting processing</span>
              </div>

              <div className="glass-card p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[#6e5f65]">
                  <span className="text-xs font-semibold">Support Tickets</span>
                  <LifeBuoy className="w-4 h-4 text-purple-600" />
                </div>
                <div className="font-serif text-2xl font-bold text-purple-700">
                  {ticketsList.filter(t => t.status === 'Open').length} Open
                </div>
                <span className="text-[10px] text-[#6e5f65]">Customer inquiries</span>
              </div>

              <div className="glass-card p-5 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-[#6e5f65]">
                  <span className="text-xs font-semibold">Top Shade</span>
                  <Sparkles className="w-4 h-4 text-[#D96C8A]" />
                </div>
                <div className="font-serif text-lg font-bold text-[#D96C8A] truncate">
                  {stats.top_shade}
                </div>
                <span className="text-[10px] text-[#6e5f65]">Best seller shade</span>
              </div>

            </div>

            {/* Recent Orders Overview Table */}
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#F4D8DF] pb-4">
                <h3 className="font-serif text-lg font-bold text-[#2B2024]">Recent Orders</h3>
                <button onClick={() => setActiveTab('orders')} className="text-xs font-bold text-[#D96C8A] hover:underline">
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#F4D8DF] text-[#6e5f65]">
                      <th className="py-3 px-4 font-semibold">Order ID</th>
                      <th className="py-3 px-4 font-semibold">Customer</th>
                      <th className="py-3 px-4 font-semibold">Shade</th>
                      <th className="py-3 px-4 font-semibold">Qty</th>
                      <th className="py-3 px-4 font-semibold">Amount</th>
                      <th className="py-3 px-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-b border-[#F4D8DF]/40 hover:bg-white/60">
                        <td className="py-3 px-4 font-bold text-[#D96C8A]">{order.order_code}</td>
                        <td className="py-3 px-4 font-medium text-[#2B2024]">{order.customer_name}</td>
                        <td className="py-3 px-4">{order.shade_name}</td>
                        <td className="py-3 px-4">{order.quantity}</td>
                        <td className="py-3 px-4 font-bold">₹{order.total_amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-[#6e5f65] absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search order ID, customer, shade..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs border border-[#F4D8DF] bg-white focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
                />
              </div>

              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-[#6e5f65]" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl text-xs border border-[#F4D8DF] bg-white text-[#2B2024] focus:outline-none focus:ring-2 focus:ring-[#D96C8A]"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#F4D8DF] text-[#6e5f65]">
                      <th className="py-3 px-4 font-semibold">Order</th>
                      <th className="py-3 px-4 font-semibold">Customer</th>
                      <th className="py-3 px-4 font-semibold">Shade</th>
                      <th className="py-3 px-4 font-semibold">Qty</th>
                      <th className="py-3 px-4 font-semibold">Total</th>
                      <th className="py-3 px-4 font-semibold">Payment</th>
                      <th className="py-3 px-4 font-semibold">Status Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-[#F4D8DF]/40 hover:bg-white/60">
                        <td className="py-3 px-4 font-bold text-[#D96C8A]">{order.order_code}</td>
                        <td className="py-3 px-4 font-medium text-[#2B2024]">
                          <div>{order.customer_name}</div>
                          <div className="text-[10px] text-[#6e5f65]">{order.customer_email}</div>
                        </td>
                        <td className="py-3 px-4 font-medium">{order.shade_name}</td>
                        <td className="py-3 px-4">{order.quantity}</td>
                        <td className="py-3 px-4 font-bold text-[#2B2024]">₹{order.total_amount}</td>
                        <td className="py-3 px-4 text-[#6e5f65]">{order.payment_method}</td>
                        <td className="py-3 px-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-xl text-xs font-bold border focus:outline-none ${getStatusBadge(order.status)}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SUPPORT TICKETS DESK */}
        {activeTab === 'support' && (
          <AdminSupport
            tickets={ticketsList}
            onTicketStatusChange={handleTicketStatusChange}
          />
        )}

        {/* TAB 4: USERS MANAGEMENT & SUB-ADMIN PROMOTION */}
        {activeTab === 'users' && (
          <AdminUsers
            users={usersList}
            onUserRoleChange={handleUserRoleChange}
            onAddUser={handleAddUser}
            onDeleteUser={handleDeleteUser}
            currentUserRole={currentUserRole}
          />
        )}

        {/* TAB 5: SHADES & INVENTORY */}
        {activeTab === 'products' && product && (
          <div className="glass-panel p-6 rounded-3xl space-y-6">
            <div className="flex justify-between items-center border-b border-[#F4D8DF] pb-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#2B2024]">{product.name}</h3>
                <p className="text-xs text-[#6e5f65]">{product.description}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#6e5f65]">Retail Price:</span>
                <div className="font-serif text-2xl font-bold text-[#D96C8A]">₹{product.price}</div>
              </div>
            </div>

            <h4 className="font-serif font-bold text-base text-[#2B2024]">Shade Variants & Inventory Stock</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.variants.map((v) => (
                <div key={v.id} className="glass-card p-4 rounded-2xl flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full shadow-md border-2 border-white flex-shrink-0" style={{ backgroundColor: v.color_hex }} />
                    <div>
                      <h5 className="font-bold text-sm text-[#2B2024]">{v.name}</h5>
                      <span className="text-[10px] text-[#6e5f65] font-mono">{v.color_hex}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#6e5f65] block">Stock Level</span>
                    <span className="font-bold text-sm text-[#D96C8A]">{v.stock} units</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CUSTOMERS DIRECTORY */}
        {activeTab === 'customers' && (
          <div className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#2B2024] border-b border-[#F4D8DF] pb-4">
              Registered Customers Directory
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#F4D8DF] text-[#6e5f65]">
                    <th className="py-3 px-4 font-semibold">Customer ID</th>
                    <th className="py-3 px-4 font-semibold">Name</th>
                    <th className="py-3 px-4 font-semibold">Email</th>
                    <th className="py-3 px-4 font-semibold">Phone</th>
                    <th className="py-3 px-4 font-semibold">Orders Count</th>
                    <th className="py-3 px-4 font-semibold">Total Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.id} className="border-b border-[#F4D8DF]/40 hover:bg-white/60">
                      <td className="py-3 px-4 font-bold text-[#6e5f65]">#CUST-0{c.id}</td>
                      <td className="py-3 px-4 font-bold text-[#2B2024]">{c.name}</td>
                      <td className="py-3 px-4 text-[#6e5f65]">{c.email}</td>
                      <td className="py-3 px-4 text-[#6e5f65]">{c.phone || 'N/A'}</td>
                      <td className="py-3 px-4 font-semibold">{c.order_count} orders</td>
                      <td className="py-3 px-4 font-bold text-[#D96C8A]">₹{c.total_spent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
