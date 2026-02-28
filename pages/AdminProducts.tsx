
import React, { useState } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { Product, Category } from '../types';
import { Plus, Trash2, Edit2, Package, Image as ImageIcon, X, Info } from 'lucide-react';

interface AdminProductsProps {
  products: Product[];
  categories: Category[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const AdminProducts: React.FC<AdminProductsProps> = ({ products, categories, setProducts }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    categoryId: '', 
    description: '', 
    imageUrls: '' 
  });

  const handleSave = () => {
    // Split by new line or comma to handle multiple URLs
    const images = formData.imageUrls.split(/[\n,]+/).map(s => s.trim()).filter(s => s !== '');
    
    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? { 
        ...p, 
        name: formData.name,
        categoryId: formData.categoryId,
        description: formData.description,
        images: images.length > 0 ? images : p.images 
      } : p));
    } else {
      const newProd: Product = {
        id: Date.now().toString(),
        name: formData.name,
        categoryId: formData.categoryId,
        description: formData.description,
        images: images.length > 0 ? images : ['https://via.placeholder.com/600x400?text=No+Image']
      };
      setProducts(prev => [...prev, newProd]);
    }
    closeModal();
  };

  const openModal = (prod?: Product) => {
    if (prod) {
      setEditingId(prod.id);
      setFormData({ 
        name: prod.name, 
        categoryId: prod.categoryId, 
        description: prod.description,
        imageUrls: prod.images.join('\n')
      });
    } else {
      setEditingId(null);
      setFormData({ 
        name: '', 
        categoryId: categories[0]?.id || '', 
        description: '', 
        imageUrls: '' 
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this product item permanently?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <AdminSidebar />
      <div className="flex-grow lg:ml-64 p-4 md:p-8 pt-20 lg:pt-8 overflow-x-hidden">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 tracking-tight">Product Inventory</h1>
            <p className="text-sm md:text-base text-gray-500 font-medium">Manage and organize items within your categories.</p>
          </div>
          <button 
            onClick={() => openModal()}
            className="w-full sm:w-auto bg-primary text-white flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 text-base"
          >
            <Plus size={20} /> Add New Product
          </button>
        </header>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
           <div className="overflow-x-auto custom-scrollbar">
             <table className="w-full text-left min-w-[800px]">
                <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-black border-b tracking-widest">
                   <tr>
                      <th className="px-6 py-4">Item Details</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Images</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {products.map((prod) => {
                      const cat = categories.find(c => c.id === prod.categoryId);
                      return (
                        <tr key={prod.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-4">
                                 <img 
                                   src={prod.images[0]} 
                                   className="w-12 h-12 object-cover rounded-xl shadow-sm border border-gray-100 bg-gray-50" 
                                   onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Err'; }}
                                 />
                                 <div className="flex flex-col">
                                   <span className="font-extrabold text-sm text-gray-900 line-clamp-1">{prod.name}</span>
                                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">SKU: {prod.id}</span>
                                 </div>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                               <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-black uppercase tracking-wider border border-primary/10">
                                 {cat?.name || 'Uncategorized'}
                               </span>
                            </td>
                            <td className="px-6 py-5">
                               <div className="flex items-center gap-2 text-gray-500 font-bold text-xs bg-gray-50 px-3 py-1.5 rounded-lg w-fit">
                                 <ImageIcon size={14} className="text-gray-400" /> 
                                 <span>{prod.images.length} Image{prod.images.length !== 1 ? 's' : ''}</span>
                               </div>
                            </td>
                            <td className="px-6 py-5 text-right space-x-1">
                              <button onClick={() => openModal(prod)} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Edit"><Edit2 size={18} /></button>
                              <button onClick={() => handleDelete(prod.id)} className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Delete"><Trash2 size={18} /></button>
                            </td>
                        </tr>
                      )
                   })}
                   {products.length === 0 && (
                     <tr>
                       <td colSpan={4} className="px-6 py-20 text-center">
                         <div className="flex flex-col items-center gap-2 text-gray-400">
                           <Package size={40} className="opacity-20" />
                           <p className="font-bold">No products found. Start by adding one!</p>
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
           <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[95vh] relative custom-scrollbar">
              <div className="flex justify-between items-center mb-10 sticky top-0 bg-white/90 backdrop-blur-md z-10 py-2">
                <div>
                  <h2 className="text-2xl font-black text-black">{editingId ? 'Edit Product' : 'New Product'}</h2>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Product Details</p>
                </div>
                <button onClick={closeModal} className="text-gray-400 hover:text-black transition-colors p-3 bg-gray-50 rounded-full"><X size={24} /></button>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:gap-8">
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Product Name</label>
                    <input 
                      type="text" 
                      className="w-full p-4 md:p-5 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none font-bold text-gray-800 transition-all shadow-sm"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Premium Casement Handle"
                    />
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Category</label>
                        <select 
                          className="w-full p-4 md:p-5 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none font-bold text-gray-800 appearance-none cursor-pointer transition-all shadow-sm"
                          value={formData.categoryId}
                          onChange={e => setFormData({...formData, categoryId: e.target.value})}
                        >
                          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Gallery Image URLs</label>
                        <textarea 
                          rows={2}
                          className="w-full p-4 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none font-bold text-gray-800 text-sm transition-all shadow-sm resize-none"
                          value={formData.imageUrls}
                          onChange={e => setFormData({...formData, imageUrls: e.target.value})}
                          placeholder="Paste URLs here (one per line)"
                        />
                        <div className="flex items-center gap-1 mt-2 text-[9px] text-blue-500 font-bold uppercase tracking-widest ml-1">
                          <Info size={12} /> Multiple images allowed (one per line)
                        </div>
                    </div>
                 </div>

                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Specifications & Description</label>
                    <textarea 
                      rows={6}
                      className="w-full p-5 border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-primary rounded-2xl outline-none font-bold text-gray-800 text-base leading-relaxed transition-all shadow-sm"
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      placeholder="Enter size variations, materials, and features..."
                    ></textarea>
                 </div>
              </div>
              
              <div className="flex gap-4 mt-12 sticky bottom-0 bg-white/90 backdrop-blur-md py-6 border-t border-gray-100">
                 <button onClick={closeModal} className="flex-grow py-5 border-2 border-gray-100 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-colors uppercase tracking-widest text-xs">Cancel</button>
                 <button onClick={handleSave} className="flex-grow py-5 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all uppercase tracking-widest text-xs active:scale-95">
                   {editingId ? 'Update Product' : 'Publish Product'}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
