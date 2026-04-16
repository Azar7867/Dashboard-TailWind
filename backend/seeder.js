import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import Bike from "./models/Bike.js";
import Review from "./models/Review.js";

dotenv.config();

const bikes = [
  // {
  //   name: "Royal Enfield Classic 350",
  //   price: "₹1,93,080",
  //   insurance: "₹12,000",
  //   tax: "₹15,000",
  //   onroad: "₹2,20,000",
  //   image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/183389/classic-350-right-front-three-quarter.jpeg"
  // },
  // {
  //   name: "KTM Duke 200",
  //   price: "₹1,96,685",
  //   insurance: "₹10,500",
  //   tax: "₹14,000",
  //   onroad: "₹2,21,000",
  //   image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/51401/duke-200-right-front-three-quarter.jpeg"
  // },
  // {
  //   name: "Yamaha R15 V4",
  //   price: "₹1,82,300",
  //   insurance: "₹9,500",
  //   tax: "₹13,000",
  //   onroad: "₹2,05,000",
  //   image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/103795/r15-v4-right-front-three-quarter.jpeg"
  // },
  // {
  //   name: "TVS Apache RTR 160",
  //   price: "₹1,20,000",
  //   insurance: "₹8,000",
  //   tax: "₹10,000",
  //   onroad: "₹1,38,000",
  //   image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/44887/apache-rtr-160-right-front-three-quarter.jpeg"
  // },
  // {
  //   name: "Bajaj Pulsar NS200",
  //   price: "₹1,49,000",
  //   insurance: "₹9,000",
  //   tax: "₹11,000",
  //   onroad: "₹1,69,000",
  //   image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/41424/pulsar-ns200-right-front-three-quarter.jpeg"
  // }
   { name: "Royal Enfield Classic 350", price: "₹1,93,080", insurance: "₹12,000", tax: "₹15,000", onroad: "₹2,20,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/183389/classic-350-right-front-three-quarter.jpeg" },
  { name: "Royal Enfield Bullet 350", price: "₹1,74,000", insurance: "₹11,500", tax: "₹14,000", onroad: "₹2,00,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/183391/bullet-350-right-front-three-quarter.jpeg" },
  { name: "Royal Enfield Hunter 350", price: "₹1,50,000", insurance: "₹10,000", tax: "₹12,000", onroad: "₹1,72,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/124013/hunter-350-right-front-three-quarter.jpeg" },

  { name: "KTM Duke 125", price: "₹1,78,000", insurance: "₹9,000", tax: "₹12,000", onroad: "₹1,99,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/128415/duke-125-right-front-three-quarter.jpeg" },
  { name: "KTM Duke 200", price: "₹1,96,685", insurance: "₹10,500", tax: "₹14,000", onroad: "₹2,21,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/51401/duke-200-right-front-three-quarter.jpeg" },
  { name: "KTM Duke 250", price: "₹2,38,000", insurance: "₹11,500", tax: "₹15,000", onroad: "₹2,65,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/128413/duke-250-right-front-three-quarter.jpeg" },
  { name: "KTM RC 200", price: "₹2,18,000", insurance: "₹11,000", tax: "₹14,500", onroad: "₹2,45,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/51403/rc-200-right-front-three-quarter.jpeg" },

  { name: "Yamaha R15 V4", price: "₹1,82,300", insurance: "₹9,500", tax: "₹13,000", onroad: "₹2,05,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/103795/r15-v4-right-front-three-quarter.jpeg" },
  { name: "Yamaha MT 15 V2", price: "₹1,68,000", insurance: "₹9,000", tax: "₹12,500", onroad: "₹1,90,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/115869/mt-15-right-front-three-quarter.jpeg" },
  { name: "Yamaha FZ S FI", price: "₹1,22,000", insurance: "₹8,000", tax: "₹10,000", onroad: "₹1,40,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130051/fz-s-fi-right-front-three-quarter.jpeg" },

  { name: "TVS Apache RTR 160", price: "₹1,20,000", insurance: "₹8,000", tax: "₹10,000", onroad: "₹1,38,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/44887/apache-rtr-160-right-front-three-quarter.jpeg" },
  { name: "TVS Apache RTR 160 4V", price: "₹1,30,000", insurance: "₹8,500", tax: "₹10,500", onroad: "₹1,49,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/44889/apache-rtr-160-4v-right-front-three-quarter.jpeg" },
  { name: "TVS Apache RTR 200 4V", price: "₹1,43,000", insurance: "₹9,000", tax: "₹11,000", onroad: "₹1,63,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/44891/apache-rtr-200-4v-right-front-three-quarter.jpeg" },
  { name: "TVS Ronin", price: "₹1,49,000", insurance: "₹9,500", tax: "₹11,500", onroad: "₹1,70,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/124839/ronin-right-front-three-quarter.jpeg" },

  { name: "Bajaj Pulsar 125", price: "₹90,000", insurance: "₹6,500", tax: "₹8,000", onroad: "₹1,05,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/41392/pulsar-125-right-front-three-quarter.jpeg" },
  { name: "Bajaj Pulsar 150", price: "₹1,10,000", insurance: "₹7,500", tax: "₹9,000", onroad: "₹1,28,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/41410/pulsar-150-right-front-three-quarter.jpeg" },
  { name: "Bajaj Pulsar NS200", price: "₹1,49,000", insurance: "₹9,000", tax: "₹11,000", onroad: "₹1,69,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/41424/pulsar-ns200-right-front-three-quarter.jpeg" },
  { name: "Bajaj Pulsar RS200", price: "₹1,72,000", insurance: "₹9,500", tax: "₹12,000", onroad: "₹1,95,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/41426/pulsar-rs200-right-front-three-quarter.jpeg" },

  { name: "Honda Shine", price: "₹80,000", insurance: "₹6,000", tax: "₹7,500", onroad: "₹95,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/131973/shine-right-front-three-quarter.jpeg" },
  { name: "Honda Unicorn", price: "₹1,10,000", insurance: "₹7,500", tax: "₹9,000", onroad: "₹1,27,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/131975/unicorn-right-front-three-quarter.jpeg" },
  { name: "Honda Hornet 2.0", price: "₹1,40,000", insurance: "₹8,500", tax: "₹10,500", onroad: "₹1,59,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/124013/hornet-20-right-front-three-quarter.jpeg" },

  { name: "Hero Splendor Plus", price: "₹75,000", insurance: "₹5,500", tax: "₹7,000", onroad: "₹88,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130059/splendor-plus-right-front-three-quarter.jpeg" },
  { name: "Hero HF Deluxe", price: "₹65,000", insurance: "₹5,000", tax: "₹6,500", onroad: "₹78,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130057/hf-deluxe-right-front-three-quarter.jpeg" },
  { name: "Hero Xtreme 160R", price: "₹1,20,000", insurance: "₹8,000", tax: "₹10,000", onroad: "₹1,38,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130061/xtreme-160r-right-front-three-quarter.jpeg" },

  { name: "Suzuki Gixxer", price: "₹1,30,000", insurance: "₹8,500", tax: "₹10,500", onroad: "₹1,49,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130067/gixxer-right-front-three-quarter.jpeg" },
  { name: "Suzuki Gixxer SF", price: "₹1,40,000", insurance: "₹9,000", tax: "₹11,000", onroad: "₹1,60,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130069/gixxer-sf-right-front-three-quarter.jpeg" },

  { name: "Jawa 42", price: "₹1,98,000", insurance: "₹11,500", tax: "₹14,000", onroad: "₹2,25,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/124011/jawa-42-right-front-three-quarter.jpeg" },
  { name: "Jawa Perak", price: "₹2,13,000", insurance: "₹12,000", tax: "₹15,000", onroad: "₹2,40,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/124015/perak-right-front-three-quarter.jpeg" },

  { name: "BMW G 310 R", price: "₹2,90,000", insurance: "₹13,000", tax: "₹18,000", onroad: "₹3,25,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130073/g-310-r-right-front-three-quarter.jpeg" },
  { name: "BMW G 310 GS", price: "₹3,20,000", insurance: "₹14,000", tax: "₹20,000", onroad: "₹3,60,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130075/g-310-gs-right-front-three-quarter.jpeg" },

  { name: "Kawasaki Ninja 300", price: "₹3,43,000", insurance: "₹15,000", tax: "₹22,000", onroad: "₹3,85,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130079/ninja-300-right-front-three-quarter.jpeg" },
  { name: "Kawasaki Ninja 400", price: "₹5,20,000", insurance: "₹18,000", tax: "₹30,000", onroad: "₹5,80,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130081/ninja-400-right-front-three-quarter.jpeg" },

  { name: "Ducati Monster", price: "₹12,00,000", insurance: "₹40,000", tax: "₹1,20,000", onroad: "₹13,60,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130083/monster-right-front-three-quarter.jpeg" },
  { name: "Ducati Panigale V2", price: "₹20,00,000", insurance: "₹60,000", tax: "₹2,00,000", onroad: "₹22,60,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130085/panigale-v2-right-front-three-quarter.jpeg" },

  { name: "Benelli TNT 300", price: "₹3,40,000", insurance: "₹14,000", tax: "₹22,000", onroad: "₹3,80,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/130087/tnt-300-right-front-three-quarter.jpeg" },

  { name: "Aprilia RS 457", price: "₹4,10,000", insurance: "₹15,000", tax: "₹25,000", onroad: "₹4,50,000", image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/180001/rs457-right-front-three-quarter.jpeg" }
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