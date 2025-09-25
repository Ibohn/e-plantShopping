import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      // Vérifier si l'article existe déjà dans le panier
      const existingItem = state.items.find(item => item.name === newItem.name);
      
      if (existingItem) {
        // Si l'article existe, augmenter la quantité
        existingItem.quantity += 1;
      } else {
        // Si l'article n'existe pas, l'ajouter au panier
        state.items.push({
          ...newItem,
          quantity: 1
        });
      }
    },
    removeItem: (state, action) => {
      const itemName = action.payload;
      // Filtrer le tableau pour supprimer l'article par son nom
      state.items = state.items.filter(item => item.name !== itemName);
    },
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;
      // Trouver l'article dans le panier
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        // Mettre à jour la quantité
        itemToUpdate.quantity = amount;
        
        // Si la quantité est 0, supprimer l'article
        if (itemToUpdate.quantity <= 0) {
          state.items = state.items.filter(item => item.name !== name);
        }
      }
    },
    clearCart: (state) => {
      // Vider complètement le panier
      state.items = [];
    }
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = CartSlice.actions;

export default CartSlice.reducer;
