import React from 'react';
import { motion } from 'framer-motion';

import aboutImage from '../assets/about.jpg'; // Replace with actual image URLs
import missionImage from '../assets/people.jpg';
import valuesImage from '../assets/peopl.jpg';

function About() {
  const contentData = [
    {
      title: "About Us",
      image: aboutImage,
      content: "Welcome to our healthcare website! We are dedicated to providing high-quality medical services..."
    },
    {
      title: "Our Mission",
      image: missionImage,
      content: "Our mission is to improve the health and well-being of our patients by..."
    },
    {
      title: "Our Values",
      image: valuesImage,
      content: "At our healthcare facility, we are committed to the following values: compassion, excellence, integrity..."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 1 } }
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-8 px-4 md:px-8 lg:px-16 ">
      <motion.h2
        className="text-3xl font-semibold mb-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {contentData[0].title}
      </motion.h2>

      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-6">
        <div className="w-full md:w-2/5 p-4">
          <motion.img
            src={contentData[0].image}
            alt={contentData[0].title}
            className="w-full h-auto rounded-lg shadow-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          />
        </div>
        <div className="w-full md:w-3/5 p-4">
          <motion.p
            className="text-gray-700"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {contentData[0].content}
          </motion.p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center mt-8 md:space-x-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
          <img src={contentData[1].image} alt={contentData[1].title} className="w-full rounded-lg mb-4 shadow" />
          <h2 className="text-lg font-semibold mb-2">{contentData[1].title}</h2>
          <p className="text-gray-700">{contentData[1].content}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 mt-4 md:mt-0">
          <img src={contentData[2].image} alt={contentData[2].title} className="w-full rounded-lg mb-4 shadow" />
          <h2 className="text-lg font-semibold mb-2">{contentData[2].title}</h2>
          <p className="text-gray-700">{contentData[2].content}</p>
        </div>
      </div>
    </div>
  );
}

export default About;
