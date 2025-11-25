import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Community from '../pages/Community';
import Dashboard from '../pages/Dashboard';
import Layout from '../pages/Layout';
import BlogTitles from '../pages/generation/BlogTitles';
import GenerateImage from '../pages/generation/GenrateImage.jsx';
import RemoveBG from '../pages/generation/RemoveBG';
import RemoveObject from '../pages/generation/RemoveObject';
import ReviewResume from '../pages/generation/ReviewResume';
import WriteArticle from '../pages/generation/WriteArticle';
import AboutUs from '../pages/AboutUs';
import ContactUs from '../pages/ContactUs';
import PrivacyPolicy from '../pages/PrivacyPolicy';

const MainRouting = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />

        {/* AI Section with nested routes */}
        <Route path='/ai' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='community' element={<Community />} />
          <Route path='blog-titles' element={<BlogTitles />} />
          <Route path='generate-images' element={<GenerateImage />} />
          <Route path='remove-background' element={<RemoveBG />} />
          <Route path='remove-object' element={<RemoveObject />} />
          <Route path='review-resume' element={<ReviewResume />} />
          <Route path='write-article' element={<WriteArticle />} />
        </Route>

        {/* Static pages */}
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
      </Routes>
    </div>
  );
};

export default MainRouting;
