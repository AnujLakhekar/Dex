import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const StockPieChart = ({ data }) => {
  // Colors for each slice of the pie chart
  const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#10B981'];

  // Prepare data for the Pie chart (stock data)
  
  const pieData = data.products.map((item, index) => ({
    name: item.name,
    value: item.stock, 
  }));
  
  console.log(pieData)

  return (
    <>
      {pieData.length == 0 ? (
        <motion.div
          className="m-3 grid grid-cols-1 grid-rows-1 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-medium mb-4 text-gray-100">Stock Overview</h2>
          <div className="h-64">Nothing Found Yet</div>
        </motion.div>
      ) : (
        <motion.div
          className="m-3 grid grid-cols-1 grid-rows-1 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-lg font-medium mb-4 text-gray-100">Stock Overview</h2>
          <div className="h-64">
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="80%"
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default StockPieChart;
