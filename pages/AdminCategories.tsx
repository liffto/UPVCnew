
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Category } from '../types';
import { Plus, Trash2, Edit2, X, Layout } from 'lucide-react';

interface AdminCategoriesProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const AdminCategories: React.FC<AdminCategoriesProps> = ({ categories, setCategories }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', image: '' });

  const handleSave = () => {
    if (editingId) {
      setCategories(prev => prev.map(c => c.id === editingId ? { ...c, ...formData } : c));
    } else {
      const newCat: Category = {
        id: Date.now().toString(),
        ...formData
      };
      setCategories(prev => [...prev, newCat]);
    }
    closeModal();
  };

  const openModal = (cat?: Category) => {
    if (cat) {
      setEditingId(cat.id);
      setFormData({ name: cat.name, image: cat.image });
    } else {
      setEditingId(null);
      setFormData({ name: '', image: '' });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ name: '', image: '' });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this category and all associated data reference?')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-grow lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">Product Categories</h1>
            <p className="text-sm md:text-base text-gray-500 font-medium">Group your items by function or type.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="w-full sm:w-auto bg-primary text-white flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 text-base"
          >
            <Plus size={20} /> New Category
          </button>
        </header>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="overflow-x-auto custom-scrollbar">
             <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-black border-b tracking-widest">
                   <tr>
                      <th className="px-6 py-5">Main Image</th>
                      <th className="px-6 py-5">Category Title</th>
                      <th className="px-6 py-5">Unique ID</th>
                      <th className="px-6 py-5 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {categories.map((cat) => (
                     <tr key={cat.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4">
                          <img 
                            src={cat.image} 
                            className="w-14 h-14 object-cover rounded-2xl shadow-sm border border-white group-hover:scale-105 transition-transform bg-gray-100" 
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Category'; }}
                          />
                        </td>
                        <td className="px-6 py-4">
                           <span className="font-extrabold text-sm text-gray-900">{cat.name}</span>
                        </td>
                        <td className="px-6 py-4">
                           <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{cat.id}</span>
                        </td>
                        <td className="px-6 py-4 text-right space-x-1">
                           <button onClick={() => openModal(cat)} className="p-3 text-blue-600 hover:bg-blue-50 rounded-2xl transition-all" title="Edit"><Edit2 size={18} /></button>
                           <button onClick={() => handleDelete(cat.id)} className="p-3 text-red-600 hover:bg-red-50 rounded-2xl transition-all" title="Delete"><Trash2 size={18} /></button>
                        </td>
                     </tr>
                   ))}
                   {categories.length === 0 && (
                     <tr>
                        <td colSpan={4} className="px-6 py-20 text-center">
                           <div className="flex flex-col items-center gap-2 text-gray-400">
                              <Layout size={40} className="opacity-20" />
                              <p className="font-bold">No categories added yet.</p>
                           </div>
                        </td>
                     </tr>
                   )}
                </tbody>
             </table>
           </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
           <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 md:p-12 shadow-2xl relative">
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-2xl font-black text-black">{editingId ? 'Edit Category' : 'Add Category'}</h2>
                 <button onClick={closeModal} className="text-gray-400 hover:text-black transition-colors p-3 bg-gray-50 rounded-full"><X size={20} /></button>
              </div>

              <div className="space-y-8">
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Label Name</label>
                    <input 
                      type="text" 
                      className="w-full p-5 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none font-bold text-gray-800 transition-all shadow-sm"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Friction Stays"
                    />
                 </div>
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Cover Image URL</label>
                    <input 
                      type="text" 
                      className="w-full p-5 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none font-bold text-gray-800 text-sm transition-all shadow-sm"
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      placeholder="https://raw.githubusercontent.com/..."
                    />
                 </div>
              </div>

              <div className="flex gap-4 mt-12">
                 <button onClick={closeModal} className="flex-grow py-5 border-2 border-gray-100 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-widest text-xs">Cancel</button>
                 <button onClick={handleSave} className="flex-grow py-5 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-xs active:scale-95">
                   {editingId ? 'Save' : 'Create'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
