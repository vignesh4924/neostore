import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where, orderBy, limit, onSnapshot, getDoc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';
import { INITIAL_PRODUCTS } from './initialData';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const productCollection = collection(db, 'products');
export const userCollection = collection(db, 'users');
export const orderCollection = collection(db, 'orders');

export const seedProducts = async () => {
  const path = 'products';
  try {
    const snapshot = await getDocs(productCollection);
    const existingNames = snapshot.docs.map(doc => doc.data().name);
    
    // Check if any brand new watch is missing
    const newWatches = ["OMEGA-SEA VECTOR", "APPLE-W LINK ULTRA", "T-HEUER FORMULA NEO", "TAG-H FORMULA X-RACING"];
    const needsUpdate = newWatches.some(name => !existingNames.includes(name));
    
    if (snapshot.empty || needsUpdate) {
      console.log('Seeding initial products/Updating inventory...');
      const batch = writeBatch(db);
      
      INITIAL_PRODUCTS.forEach((product) => {
        if (!existingNames.includes(product.name)) {
          const docRef = doc(productCollection);
          batch.set(docRef, {
            ...product,
            id: docRef.id,
            createdAt: serverTimestamp()
          });
        }
      });
      
      await batch.commit();
      console.log('Inventory updated.');
    }
  } catch (error) {
    console.warn('Seeding failed (likely unauthenticated):', error);
  }
};

export const getProducts = async (constraints: any[] = []) => {
  const path = 'products';
  try {
    // We only try to seed if we are authenticated, as per new rules
    if (auth.currentUser) {
      await seedProducts();
    }
    const q = query(productCollection, ...constraints);
    const snapshot = await getDocs(q);
    
    // Fallback logic for development preview:
    // If the database is empty or restricted, return initial data so user sees products
    if (snapshot.empty) {
      let filtered = INITIAL_PRODUCTS.map((p, i) => ({ ...p, id: `seed-${i}` }));
      
      // Basic simulation of category filter if present in constraints
      // This is a simplified version for common development needs
      const categoryConstraint = constraints.find(c => c._query && c._query.filters && c._query.filters.some((f: any) => f.field.path === 'category'));
      // Note: constraints are complex objects, let's keep it simple and just return matched category if we can detect it
      // For now, if snapshot is empty, returning all is safer than returning nothing, 
      // but let's try to detect category if possible or just return all and let the component handle filtering if it can
      
      return filtered;
    }

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn('Firestore fetch failed, falling back to local data:', error);
    return INITIAL_PRODUCTS.map((p, i) => ({ ...p, id: `seed-${i}` }));
  }
};

export const getProductById = async (id: string) => {
  const path = `products/${id}`;
  try {
    // Check if it's a seed fallback ID
    if (id.startsWith('seed-')) {
      const idx = parseInt(id.split('-')[1]);
      return { id, ...INITIAL_PRODUCTS[idx] };
    }

    const docRef = doc(db, 'products', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    
    // Name-based fallback for better navigation
    const fallback = INITIAL_PRODUCTS.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase() || p.name === id);
    return fallback ? { id, ...fallback } : null;
  } catch (error) {
    console.warn('Firestore get failed, falling back to local data lookup:', error);
    return null;
  }
};
