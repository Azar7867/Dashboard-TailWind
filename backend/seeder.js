import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import Bike from "./models/Bike.js";
import Review from "./models/Review.js";

dotenv.config();

const bikes = [
  {
    name: "Royal Enfield Classic 350",
    price: "₹1,93,080",
    insurance: "₹12,000",
    tax: "₹15,000",
    onroad: "₹2,20,000",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/183389/classic-350-right-front-three-quarter.jpeg"
  },
  {
    name: "KTM Duke 200",
    price: "₹1,96,685",
    insurance: "₹10,500",
    tax: "₹14,000",
    onroad: "₹2,21,000",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/51401/duke-200-right-front-three-quarter.jpeg"
  },
  {
    name: "Yamaha R15 V4",
    price: "₹1,82,300",
    insurance: "₹9,500",
    tax: "₹13,000",
    onroad: "₹2,05,000",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/103795/r15-v4-right-front-three-quarter.jpeg"
  },
  {
    name: "TVS Apache RTR 160",
    price: "₹1,20,000",
    insurance: "₹8,000",
    tax: "₹10,000",
    onroad: "₹1,38,000",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/44887/apache-rtr-160-right-front-three-quarter.jpeg"
  },
  {
    name: "Bajaj Pulsar NS200",
    price: "₹1,49,000",
    insurance: "₹9,000",
    tax: "₹11,000",
    onroad: "₹1,69,000",
    image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/41424/pulsar-ns200-right-front-three-quarter.jpeg"
  }
];

const reviews = [
  {
    user: "Rahul",
    bike: "Royal Enfield Classic 350",
    rating: 5,
    review: "Excellent comfort and powerful engine. Perfect for long rides.",
    time: "2 hours ago",
    avatar: "https://i.pravatar.cc/40?img=11"
  },
  {
    user: "Arjun",
    bike: "KTM Duke 200",
    rating: 4,
    review: "Great performance but mileage could be better.",
    time: "5 hours ago",
    avatar: "https://i.pravatar.cc/40?img=12"
  },
  {
    user: "Vijay",
    bike: "Yamaha R15 V4",
    rating: 5,
    review: "Amazing design and smooth handling.",
    time: "1 day ago",
    avatar: "https://i.pravatar.cc/40?img=13"
  },
  {
    user: "Karthik",
    bike: "TVS Apache RTR 160",
    rating: 4,
    review: "Best bike under budget with good pickup.",
    time: "2 days ago",
    avatar: "https://i.pravatar.cc/40?img=14"
  },
  {
    user: "Suresh",
    bike: "Bajaj Pulsar NS200",
    rating: 3,
    review: "Good performance but maintenance is slightly high.",
    time: "3 days ago",
    avatar: "https://i.pravatar.cc/40?img=15"
  }
];

// IMPORT DATA
const importData = async () => {
  try {
    await connectDB();

    await Bike.deleteMany();
    await Review.deleteMany();

    await Bike.insertMany(bikes);
    await Review.insertMany(reviews);

    console.log("Data Imported Successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// DELETE DATA
const destroyData = async () => {
  try {
    await connectDB();

    await Bike.deleteMany();
    await Review.deleteMany();

    console.log("Data Deleted ❌");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// CLI COMMAND
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}