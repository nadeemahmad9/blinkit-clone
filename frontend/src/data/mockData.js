// export const CATEGORY_DATA = {
//   "dairy": {
//     name: "Dairy, Bread & Eggs",
//     subCategories: [
//       { id: "milk", name: "Milk", icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-2_10.png" },
//       { id: "bread", name: "Bread & Pav", icon: "https://cdn.grofers.com/app/images/category/cms_images/icon/953_1643384422020.png" },
//       { id: "eggs", name: "Eggs", icon: "https://cdn.grofers.com/app/images/category/cms_images/icon/1238_1643384352932.png" },
//       { id: "flakes", name: "Flakes & Kids", icon: "https://cdn.grofers.com/app/images/category/cms_images/icon/123_1643384405523.png" },
//     ]
//   },
//   "snacks": {
//     name: "Snacks & Munchies",
//     subCategories: [
//       { id: "chips", name: "Chips", icon: "..." },
//       { id: "biscuits", name: "Biscuits", icon: "..." },
//     ]
//   }
// };

export const CATEGORY_DATA = {
  // 1. DAIRY SECTION
  // URL: /category/dairy
  "dairy": {
    name: "Dairy, Bread & Eggs",
    subCategories: [
      { 
        id: "milk",  // ✅ Matches Backend Category
        name: "Milk", 
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=225/layout-engine/2022-11/Slice-2_10.png" 
      },
      { 
        id: "bread", // ✅ Matches Backend Category
        name: "Bread & Pav", 
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/953_1657599742631.png" 
      },
      { 
        id: "eggs",  // ✅ Matches Backend Category
        name: "Eggs", 
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/1200_1657599895699.png" 
      },
      { 
        id: "flakes", 
        name: "Flakes & Kids", 
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/954_1680251634382.png" 
      },
    ]
  },

  // 2. SNACKS SECTION
  // URL: /category/snacks
  "snacks": {
    name: "Snacks & Munchies",
    subCategories: [
      { 
        id: "chips", // ✅ Matches Backend Category
        name: "Chips & Crisps", 
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/940_1643445382163.png" 
      },
      { 
        id: "biscuits", // ✅ Matches Backend Category
        name: "Biscuits & Cookies", 
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/28_1643445056245.png" 
      },
      { 
        id: "namkeen", 
        name: "Namkeen", 
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/1178_1643445391732.png" 
      }
    ]
  },

  // 3. BEVERAGES SECTION (Optional - if you need it)
  // URL: /category/beverages
  "beverages": {
    name: "Cold Drinks & Juices",
    subCategories: [
      { 
        id: "cold-drinks", 
        name: "Soft Drinks", 
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/1102_1649432926740.png" 
      },
      { 
        id: "juices", 
        name: "Fruit Juices", 
        icon: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=180/app/images/category/cms_images/icon/955_1643385414974.png" 
      }
    ]
  }
};