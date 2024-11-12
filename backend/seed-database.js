import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Product } from './models/Product.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Organic Bananas',
    description: 'Fresh, organic bananas. Perfect for snacking or baking.',
    price: 0.99,
    category: 'Fruits',
    imageUrl: 'https://example.com/images/bananas.jpg',
  },
  {
    name: 'Whole Milk',
    description: 'Creamy, fresh whole milk. Great for drinking or cooking.',
    price: 3.49,
    category: 'Dairy',
    imageUrl: 'https://example.com/images/milk.jpg',
  },
  {
    name: 'Whole Wheat Bread',
    description: 'Nutritious whole wheat bread. Perfect for sandwiches or toast.',
    price: 2.99,
    category: 'Bakery',
    imageUrl: 'https://example.com/images/bread.jpg',
  },
  {
    name: 'Chicken Breast',
    description: 'Lean, boneless chicken breast. Excellent source of protein.',
    price: 5.99,
    category: 'Meat',
    imageUrl: 'https://example.com/images/chicken.jpg',
  },
  {
    name: 'Spinach',
    description: 'Fresh, organic spinach. Packed with nutrients and perfect for salads.',
    price: 2.49,
    category: 'Vegetables',
    imageUrl: 'https://example.com/images/spinach.jpg',
  },
];

async function seedDatabase() {
  try {
    // Replace URI with your MongoDB Atlas connection string
    await mongoose.connect('mongodb+srv://admin:xFm1z6FAjPom40jk@cluster0.oibvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${insertedProducts.length} sample products`);

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedDatabase();
