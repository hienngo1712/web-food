import { defineStore } from "pinia";
import axios from "axios";
export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    total: 0,
    status: "active",
  }),
  actions: {
    async fetchCart() {
      try {
        const res = await axios.get(
          "https://685a05679f6ef9611154cb93.mockapi.io/cart"
        );
        this.items = res.data.items || [];
        this.updateTotal();
      } catch (err) {
        console.error("Lỗi fetch cart:", err);
      }
    },
    addItem(product) {
      const found = this.items.find((i) => i.id === product.id);
      if (found) {
        found.quantity++;
      } else {
        this.items.push({
          id: product.id,
          name: product.name_food,
          price: product.price,
          quantity: 1,
        });
      }
      this.updateTotal();
    },
    removeItem(product) {
      const found = this.items.find((i) => i.id === product.id);
      if (found) {
        found.quantity--;
        if (found.quantity <= 0) {
          this.items = this.items.filter((i) => i.id !== product.id);
        }
      }
      this.updateTotal();
    },
    updateTotal() {
      this.total = this.items.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
      );
    },
  },
  getters: {
    getItemQuantity: (state) => (id) => {
      const found = state.items.find((i) => i.id === id);
      return found ? found.quantity : 0;
    },
  },
});