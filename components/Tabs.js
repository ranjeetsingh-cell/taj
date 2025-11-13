'use client';
import { useState } from 'react';

const Tabs = () => {
  const tabData = [
    {
      name: 'Watches',
      subTabs: [
        { name: 'By Brand', form: 'brand' },
        { name: 'By Price', form: 'price' },
        { name: 'By Type', form: 'type' },
      ],
    },
    {
      name: 'Accessories',
      subTabs: [
        { name: 'By Color', form: 'color' },
        { name: 'By Material', form: 'material' },
      ],
    },
    {
      name: 'Straps',
      subTabs: [
        { name: 'Leather', form: 'leather' },
        { name: 'Metal', form: 'metal' },
      ],
    },
  ];

  const [activeMain, setActiveMain] = useState(0);
  const [activeSub, setActiveSub] = useState(0);

  const handleMainTabClick = (index) => {
    setActiveMain(index);
    setActiveSub(0); // reset sub tab
  };

  const renderForm = () => {
    const formType = tabData[activeMain].subTabs[activeSub].form;

    switch (formType) {
      case 'brand':
        return <BrandSearchForm />;
      case 'price':
        return <PriceSearchForm />;
      case 'type':
        return <TypeSearchForm />;
      case 'color':
        return <ColorSearchForm />;
      case 'material':
        return <MaterialSearchForm />;
      case 'leather':
        return <LeatherSearchForm />;
      case 'metal':
        return <MetalSearchForm />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded-xl">
      {/* Main Tabs */}
      <div className="flex gap-4 mb-3 border-b pb-2">
        {tabData.map((tab, i) => (
          <button
            key={i}
            onClick={() => handleMainTabClick(i)}
            className={`px-4 py-2 rounded-md ${
              activeMain === i ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-3 mb-4">
        {tabData[activeMain].subTabs.map((sub, i) => (
          <button
            key={i}
            onClick={() => setActiveSub(i)}
            className={`px-3 py-1 rounded-md ${
              activeSub === i ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {sub.name}
          </button>
        ))}
      </div>

      {/* Dynamic Search Form */}
      <div className="mt-4">{renderForm()}</div>
    </div>
  );
};

export default Tabs;

/* Simple mock forms */
const BrandSearchForm = () => (
  <form className="flex gap-2">
    <input placeholder="Enter Brand" className="border p-2 flex-1 rounded-md" />
    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
  </form>
);

const PriceSearchForm = () => (
  <form className="flex gap-2">
    <input placeholder="Min Price" className="border p-2 rounded-md flex-1" />
    <input placeholder="Max Price" className="border p-2 rounded-md flex-1" />
    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Go</button>
  </form>
);

const TypeSearchForm = () => (
  <form className="flex gap-2">
    <select className="border p-2 rounded-md flex-1">
      <option>Analog</option>
      <option>Digital</option>
      <option>Smart</option>
    </select>
    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
  </form>
);

const ColorSearchForm = () => (
  <form className="flex gap-2">
    <input placeholder="Enter Color" className="border p-2 flex-1 rounded-md" />
    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Find</button>
  </form>
);

const MaterialSearchForm = () => (
  <form className="flex gap-2">
    <input placeholder="Material Type" className="border p-2 flex-1 rounded-md" />
    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
  </form>
);

const LeatherSearchForm = () => (
  <form className="flex gap-2">
    <input placeholder="Leather Type" className="border p-2 flex-1 rounded-md" />
    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
  </form>
);

const MetalSearchForm = () => (
  <form className="flex gap-2">
    <input placeholder="Metal Type" className="border p-2 flex-1 rounded-md" />
    <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Search</button>
  </form>
);
