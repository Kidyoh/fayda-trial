# 📱 Mobile App Cart & Payment Implementation

## 🎯 Overview

This document provides a complete guide for implementing the cart and payment functionality in your mobile app using the same backend APIs as the web application.

## 🏗️ Mobile App Architecture

### Technology Stack
- **Framework**: React Native with Expo
- **State Management**: Zustand with AsyncStorage
- **Navigation**: React Navigation
- **HTTP Client**: Axios
- **Payment**: Deep linking for SantiPay

### Project Structure
```
src/
├── store/
│   ├── cartStore.ts          # Cart state management
│   └── authStore.ts          # Authentication state
├── components/
│   ├── cart/
│   │   ├── CartItem.tsx      # Individual cart item
│   │   ├── CartList.tsx      # Cart items list
│   │   └── CartSummary.tsx   # Order summary
│   └── checkout/
│       ├── CheckoutForm.tsx  # Payment form
│       └── PaymentStatus.tsx # Payment result
├── screens/
│   ├── CartScreen.tsx        # Main cart screen
│   ├── CheckoutScreen.tsx    # Checkout process
│   └── PaymentScreen.tsx     # Payment handling
├── services/
│   ├── cartAPI.ts            # Cart API calls
│   ├── paymentAPI.ts         # Payment API calls
│   └── deepLinkHandler.ts    # Deep link handling
└── utils/
    ├── phoneFormatter.ts     # Phone number utilities
    └── validators.ts         # Input validation
```

## 📦 Installation & Setup

### 1. Dependencies
```bash
# Core dependencies
npm install @react-navigation/native @react-navigation/stack
npm install @react-native-async-storage/async-storage
npm install zustand
npm install axios
npm install react-native-linking
npm install react-native-vector-icons

# Development dependencies
npm install --save-dev @types/react-native
```

### 2. Package.json Configuration
```json
{
  "name": "fayida-student-mobile",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~49.0.0",
    "react": "18.2.0",
    "react-native": "0.72.6",
    "@react-navigation/native": "^6.1.0",
    "@react-navigation/stack": "^6.3.0",
    "@react-native-async-storage/async-storage": "1.18.2",
    "zustand": "^4.4.0",
    "axios": "^1.5.0",
    "react-native-linking": "^3.0.0"
  }
}
```

## 🛒 Cart Store Implementation

### Mobile Cart Store
```typescript
// src/store/cartStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CartPackageItem {
  type: 'package';
  id: string;
  packageName: string;
  price: number;
  temporaryPrice?: number;
  price2?: number;
  price3?: number;
  temporaryPrice2?: number;
  temporaryPrice3?: number;
  discountStatus: boolean;
  discountExpiryDate?: string;
  imgUrl?: string;
  tag?: string;
  courses?: any[];
  selectedDuration: 1 | 3 | 6;
  quantity: number;
}

export interface CartCourseItem {
  type: 'course';
  id: string;
  courseName: string;
  price: number;
  temporaryPrice?: number;
  discountStatus: boolean;
  discountExpiryDate?: string;
  thumbnail?: string;
  courseDescription?: string;
  quantity: number;
}

export type CartItem = CartPackageItem | CartCourseItem;

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  
  // Actions
  addPackageToCart: (packageData: Omit<CartPackageItem, 'type' | 'quantity'>) => void;
  addCourseToCart: (courseData: Omit<CartCourseItem, 'type' | 'quantity'>) => void;
  removeFromCart: (id: string, type: 'package' | 'course') => void;
  updateQuantity: (id: string, type: 'package' | 'course', quantity: number) => void;
  updatePackageDuration: (id: string, duration: 1 | 3 | 6) => void;
  clearCart: () => void;
  
  // UI Actions
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  
  // Calculations
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemCount: (id: string, type: 'package' | 'course') => number;
  isInCart: (id: string, type: 'package' | 'course') => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addPackageToCart: (packageData) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          item => item.id === packageData.id && item.type === 'package'
        );

        if (existingItemIndex >= 0) {
          const updatedItems = [...items];
          const existingItem = updatedItems[existingItemIndex] as CartPackageItem;
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + 1
          };
          set({ items: updatedItems });
        } else {
          const newItem: CartPackageItem = {
            ...packageData,
            type: 'package',
            quantity: 1
          };
          set({ items: [...items, newItem] });
        }
      },

      addCourseToCart: (courseData) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          item => item.id === courseData.id && item.type === 'course'
        );

        if (existingItemIndex >= 0) {
          const updatedItems = [...items];
          const existingItem = updatedItems[existingItemIndex] as CartCourseItem;
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + 1
          };
          set({ items: updatedItems });
        } else {
          const newItem: CartCourseItem = {
            ...courseData,
            type: 'course',
            quantity: 1
          };
          set({ items: [...items, newItem] });
        }
      },

      removeFromCart: (id, type) => {
        const { items } = get();
        const updatedItems = items.filter(
          item => !(item.id === id && item.type === type)
        );
        set({ items: updatedItems });
      },

      updateQuantity: (id, type, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id, type);
          return;
        }

        const { items } = get();
        const updatedItems = items.map(item => {
          if (item.id === id && item.type === type) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ items: updatedItems });
      },

      updatePackageDuration: (id, duration) => {
        const { items } = get();
        const updatedItems = items.map(item => {
          if (item.id === id && item.type === 'package') {
            return { ...item, selectedDuration: duration } as CartPackageItem;
          }
          return item;
        });
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },

      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          let itemPrice = 0;
          
          if (item.type === 'package') {
            const packageItem = item as CartPackageItem;
            let basePrice = packageItem.discountStatus && packageItem.temporaryPrice 
              ? packageItem.temporaryPrice 
              : packageItem.price;
            
            if (packageItem.selectedDuration === 3) {
              basePrice = packageItem.discountStatus && packageItem.temporaryPrice2 
                ? packageItem.temporaryPrice2 
                : packageItem.price2 || basePrice;
            } else if (packageItem.selectedDuration === 6) {
              basePrice = packageItem.discountStatus && packageItem.temporaryPrice3 
                ? packageItem.temporaryPrice3 
                : packageItem.price3 || basePrice;
            }
            
            itemPrice = basePrice;
          } else if (item.type === 'course') {
            const courseItem = item as CartCourseItem;
            itemPrice = courseItem.discountStatus && courseItem.temporaryPrice 
              ? courseItem.temporaryPrice 
              : courseItem.price;
          }
          
          return total + (itemPrice * item.quantity);
        }, 0);
      },

      getItemCount: (id, type) => {
        const { items } = get();
        const item = items.find(item => item.id === id && item.type === type);
        return item ? item.quantity : 0;
      },

      isInCart: (id, type) => {
        const { items } = get();
        return items.some(item => item.id === id && item.type === type);
      }
    }),
    {
      name: 'mobile-cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
```

## 🎨 UI Components

### Cart Screen
```typescript
// src/screens/CartScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import { useCartStore } from '../store/cartStore';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { useNavigation } from '@react-navigation/native';

export function CartScreen() {
  const { items, getTotalItems, getTotalPrice } = useCartStore();
  const navigation = useNavigation();

  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Please add items to your cart first.');
      return;
    }
    navigation.navigate('Checkout');
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <CartItem item={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart</Text>
        <Text style={styles.subtitle}>{getTotalItems()} items</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.continueButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => `${item.type}-${item.id}`}
            renderItem={renderItem}
            style={styles.list}
            showsVerticalScrollIndicator={false}
          />
          
          <CartSummary
            total={getTotalPrice()}
            itemCount={getTotalItems()}
            onCheckout={handleCheckout}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#07705d',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  continueButton: {
    backgroundColor: '#07705d',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    padding: 16,
  },
});
```

### Cart Item Component
```typescript
// src/components/cart/CartItem.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';
import { CartItem as CartItemType } from '../../store/cartStore';
import { useCartStore } from '../../store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart, updatePackageDuration } = useCartStore();

  const getPrice = () => {
    if (item.type === 'package') {
      let price = item.discountStatus && item.temporaryPrice 
        ? item.temporaryPrice 
        : item.price;
      
      if (item.selectedDuration === 3) {
        price = item.discountStatus && item.temporaryPrice2 
          ? item.temporaryPrice2 
          : item.price2 || price;
      } else if (item.selectedDuration === 6) {
        price = item.discountStatus && item.temporaryPrice3 
          ? item.temporaryPrice3 
          : item.price3 || price;
      }
      
      return price;
    } else {
      return item.discountStatus && item.temporaryPrice 
        ? item.temporaryPrice 
        : item.price;
    }
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, item.type, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id, item.type);
  };

  const handleDurationChange = (duration: 1 | 3 | 6) => {
    if (item.type === 'package') {
      updatePackageDuration(item.id, duration);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={[
          styles.imagePlaceholder,
          { backgroundColor: item.type === 'package' ? '#07705d' : '#bf8c13' }
        ]}>
          <Text style={styles.imageText}>
            {item.type === 'package' ? 'PKG' : 'CRS'}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>
          {item.type === 'package' ? item.packageName : item.courseName}
        </Text>
        
        <Text style={styles.type}>
          {item.type === 'package' ? 'Package' : 'Course'}
        </Text>

        {item.type === 'package' && (
          <View style={styles.durationContainer}>
            <Text style={styles.durationLabel}>Duration:</Text>
            <View style={styles.durationButtons}>
              {[1, 3, 6].map((duration) => (
                <TouchableOpacity
                  key={duration}
                  style={[
                    styles.durationButton,
                    item.selectedDuration === duration && styles.durationButtonActive
                  ]}
                  onPress={() => handleDurationChange(duration as 1 | 3 | 6)}
                >
                  <Text style={[
                    styles.durationButtonText,
                    item.selectedDuration === duration && styles.durationButtonTextActive
                  ]}>
                    {duration}M
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.controls}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(-1)}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => handleQuantityChange(1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.removeButton}
            onPress={handleRemove}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          {getPrice() * item.quantity} Birr
        </Text>
        <Text style={styles.pricePerItem}>
          {getPrice()} Birr each
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  type: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  durationContainer: {
    marginBottom: 12,
  },
  durationLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  durationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  durationButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  durationButtonActive: {
    backgroundColor: '#07705d',
    borderColor: '#07705d',
  },
  durationButtonText: {
    fontSize: 12,
    color: '#666',
  },
  durationButtonTextActive: {
    color: 'white',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  removeButtonText: {
    color: '#e74c3c',
    fontSize: 12,
    fontWeight: '600',
  },
  priceContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#07705d',
  },
  pricePerItem: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
```

### Cart Summary Component
```typescript
// src/components/cart/CartSummary.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

interface CartSummaryProps {
  total: number;
  itemCount: number;
  onCheckout: () => void;
}

export function CartSummary({ total, itemCount, onCheckout }: CartSummaryProps) {
  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal ({itemCount} items)</Text>
          <Text style={styles.value}>{total} Birr</Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.row}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{total} Birr</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={onCheckout}
      >
        <Text style={styles.checkoutButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  summary: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#07705d',
  },
  checkoutButton: {
    backgroundColor: '#07705d',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

## 💳 Checkout & Payment

### Checkout Screen
```typescript
// src/screens/CheckoutScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ScrollView
} from 'react-native';
import { useCartStore } from '../store/cartStore';
import { processCartCheckout, formatEthiopianPhoneNumber } from '../services/cartAPI';
import { getAccessToken } from '../services/authService';

export function CheckoutScreen() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    const accessToken = getAccessToken();
    if (!accessToken) {
      Alert.alert('Error', 'Please log in to continue');
      return;
    }

    setIsLoading(true);

    try {
      const formattedPhoneNumber = formatEthiopianPhoneNumber(phoneNumber);
      
      const result = await processCartCheckout(items, formattedPhoneNumber, accessToken);

      if (result.success) {
        if (result.paymentUrl) {
          // Open payment URL
          const { Linking } = require('react-native');
          await Linking.openURL(result.paymentUrl);
          clearCart();
        } else {
          Alert.alert('Success', 'Payment initiated. Please check your phone for payment instructions.');
          clearCart();
        }
      } else {
        Alert.alert('Error', result.message || 'Payment failed. Please try again.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      Alert.alert('Error', 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>Checkout</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="09xxxxxxxx"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
            <Text style={styles.helpText}>
              Enter your phone number for SantiPay payment
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total ({items.length} items)</Text>
            <Text style={styles.summaryValue}>{getTotalPrice()} Birr</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.checkoutButton, isLoading && styles.checkoutButtonDisabled]}
          onPress={handleCheckout}
          disabled={isLoading}
        >
          <Text style={styles.checkoutButtonText}>
            {isLoading ? 'Processing...' : 'Pay Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  helpText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#07705d',
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  checkoutButton: {
    backgroundColor: '#07705d',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonDisabled: {
    backgroundColor: '#ccc',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
```

## 🔗 Deep Link Handling

### Deep Link Handler
```typescript
// src/services/deepLinkHandler.ts
import { Linking } from 'react-native';

export class DeepLinkHandler {
  static async handlePaymentReturn(url: string) {
    if (url.includes('payment/success')) {
      // Handle successful payment
      return { type: 'success', message: 'Payment completed successfully!' };
    } else if (url.includes('payment/failed')) {
      // Handle failed payment
      return { type: 'error', message: 'Payment failed. Please try again.' };
    } else if (url.includes('payment/cancelled')) {
      // Handle cancelled payment
      return { type: 'cancelled', message: 'Payment was cancelled.' };
    }
    
    return null;
  }

  static setupDeepLinkListener(callback: (result: any) => void) {
    const handleUrl = async (url: string) => {
      const result = await this.handlePaymentReturn(url);
      if (result) {
        callback(result);
      }
    };

    // Listen for deep links when app is running
    const subscription = Linking.addEventListener('url', ({ url }) => {
      handleUrl(url);
    });

    // Handle deep link when app is opened from closed state
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleUrl(url);
      }
    });

    return subscription;
  }
}
```

## 🚀 Navigation Setup

### App Navigation
```typescript
// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CartScreen } from '../screens/CartScreen';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { PaymentStatusScreen } from '../screens/PaymentStatusScreen';

const Stack = createStackNavigator();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#07705d',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Cart" 
          component={CartScreen}
          options={{ title: 'Shopping Cart' }}
        />
        <Stack.Screen 
          name="Checkout" 
          component={CheckoutScreen}
          options={{ title: 'Checkout' }}
        />
        <Stack.Screen 
          name="PaymentStatus" 
          component={PaymentStatusScreen}
          options={{ title: 'Payment Status' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## 📱 App Configuration

### App.json Configuration
```json
{
  "expo": {
    "name": "Fayida Student",
    "slug": "fayida-student",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#07705d"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.fayida.student",
      "infoPlist": {
        "CFBundleURLTypes": [
          {
            "CFBundleURLName": "fayida-student",
            "CFBundleURLSchemes": ["fayida"]
          }
        ]
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#07705d"
      },
      "package": "com.fayida.student",
      "intentFilters": [
        {
          "action": "VIEW",
          "autoVerify": true,
          "data": [
            {
              "scheme": "https",
              "host": "fayida.com"
            }
          ],
          "category": ["BROWSABLE", "DEFAULT"]
        }
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "scheme": "fayida"
  }
}
```

## 🧪 Testing

### Unit Tests
```typescript
// __tests__/cartStore.test.ts
import { useCartStore } from '../src/store/cartStore';

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  test('should add package to cart', () => {
    const store = useCartStore.getState();
    
    store.addPackageToCart({
      id: 'pkg-1',
      packageName: 'Test Package',
      price: 100,
      selectedDuration: 1,
      discountStatus: false
    });

    expect(store.items).toHaveLength(1);
    expect(store.items[0].type).toBe('package');
    expect(store.items[0].quantity).toBe(1);
  });

  test('should calculate total price correctly', () => {
    const store = useCartStore.getState();
    
    store.addPackageToCart({
      id: 'pkg-1',
      packageName: 'Test Package',
      price: 100,
      selectedDuration: 1,
      discountStatus: false
    });

    store.addCourseToCart({
      id: 'course-1',
      courseName: 'Test Course',
      price: 50,
      discountStatus: false
    });

    expect(store.getTotalPrice()).toBe(150);
  });
});
```

## 🚀 Deployment

### Build Commands
```bash
# Development
npm start

# Android
npm run android

# iOS
npm run ios

# Build for production
expo build:android
expo build:ios
```

### Environment Configuration
```typescript
// src/config/environment.ts
export const config = {
  API_URL: process.env.EXPO_PUBLIC_API_URL || 'https://api.fayida.com',
  SANTIPAY_MERCHANT_ID: process.env.EXPO_PUBLIC_SANTIPAY_MERCHANT_ID,
  DEEP_LINK_SCHEME: 'fayida',
};
```

This mobile implementation provides a complete cart and payment system that mirrors the web application's functionality while being optimized for mobile devices. The system uses the same backend APIs, ensuring consistency across platforms.


