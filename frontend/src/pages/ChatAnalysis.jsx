// // // pages/ChatAnalysis.jsx
// // import React, { useEffect, useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";

// // const ChatAnalysis = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { chatText, conversation } = location.state || {};
// //   const [stats, setStats] = useState(null);
// //   const [selectedUser, setSelectedUser] = useState("Overall");


// //   const charts = [
// //     { title: "Active Weekdays", url: "http://127.0.0.1:5000/active-weekdays" },
// //     {
// //       title: "Active Months (Line)",
// //       url: "http://127.0.0.1:5000/active-month",
// //     },
// //     {
// //       title: "Monthly Distribution (Pie)",
// //       url: "http://127.0.0.1:5000/active-month-pie",
// //     },
// //     {
// //       title: "Monthly Activation",
// //       url: "http://127.0.0.1:5000//plot-monthly-activation",
// //     },
// //     { title: "HeatMap", url: "http://127.0.0.1:5000//plot-heatmap" },
// //     { title: "Active Hours", url: "http://127.0.0.1:5000/active-hours" },
// //     { title: "Busiest Day", url: "http://127.0.0.1:5000/busy-day" },
// //   ];
// //   useEffect(() => {
// //     const fetchStats = async () => {
// //       try {
// //         const response = await fetch(
// //           `http://127.0.0.1:5000/chat-stats?t=${Date.now()}`
// //         );
// //         const data = await response.json();
// //         console.log("Fetched data:", data);
// //         setStats(data);
// //       } catch (error) {
// //         console.error("Error fetching stats:", error);
// //       }
// //     };

// //     fetchStats();
// //   }, []);

// //   useEffect(() => {
// //     if (stats) {
// //       console.log("Updated stats:", stats);
// //     }
// //   }, [stats]);

// //   const userStats =
// //   selectedUser === "Overall"
// //     ? stats?.overall
// //     : stats?.per_user?.[selectedUser];


// //   useEffect(() => {
// //     charts.forEach((chart) => {
// //       console.log("Loading chart:", chart.url);
// //     });
// //   }, []);

// //   // if (!chatText) {
// //   //   return (
// //   //     <div className="p-6 text-center">
// //   //       <p className="text-gray-300">No chat data available. Go back and export again.</p>
// //   //       <button
// //   //         onClick={() => navigate("/")}
// //   //         className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
// //   //       >
// //   //         Go Back
// //   //       </button>
// //   //     </div>
// //   //   );
// //   // }

// //   return (
// //     <div className="p-8 min-h-screen w-[1000px] mx-auto overflow-y-auto text-white">
// //       <h1 className="text-3xl font-bold mb-4">Chat Analysis Dashboard</h1>

// // <p className="text-gray-400 mb-6 flex gap-4">
// //   Conversation between:
// //   <div>
// //     <select
// //       name="user"
// //       id="user-select"
// //       className="px-3 py-1 bg-white text-gray-800 rounded-lg"
// //       value={selectedUser}
// //       onChange={(e) => setSelectedUser(e.target.value)}
// //     >
// //       <option value="Overall">Overall</option>
// //       {stats?.per_user &&
// //         Object.keys(stats.per_user).map((user, index) => (
// //           <option key={index} value={user}>
// //             {user}
// //           </option>
// //         ))}
// //     </select>
// //   </div>
// // </p>


// //       {/* Grid of Chart Cards */}
// //       {/* Grid of Chart Cards */}
// //       <div className="bg-gray-700 p-5">
// //         <div className="flex gap-20 mb-10 pl-16">
// //   <div>
// //     <div className="text-gray-200 font-semibold text-xl">Total Messages</div>
// //     <div className="ml-16 text-lg">{userStats?.messages ?? userStats?.total_messages ?? 0}</div>
// //   </div>

// //   <div>
// //     <div className="text-gray-200 font-semibold text-xl">Text Messages</div>
// //     <div className="ml-16 text-lg">
// //       {userStats?.text_messages ?? userStats?.total_text_messages ?? 0}
// //     </div>
// //   </div>

// //   <div>
// //     <div className="text-gray-200 font-semibold text-xl">Media Shared</div>
// //     <div className="ml-16 text-lg">
// //       {userStats?.media_shared ?? userStats?.total_media_shared ?? 0}
// //     </div>
// //   </div>

// //   <div>
// //     <div className="text-gray-200 font-semibold text-xl">Calls Done</div>
// //     <div className="ml-16 text-lg">
// //       {userStats?.calls_done ?? userStats?.total_calls_done ?? 0}
// //     </div>
// //   </div>
// // </div>


// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
// //   {charts.map((chart, index) => (
// //     <div
// //       key={index}
// //       className="bg-gray-900 p-4 rounded-lg shadow-md border border-gray-700"
// //     >
// //       <h2 className="text-lg font-semibold mb-3 text-blue-400">
// //         {chart.title}
// //       </h2>
// //       <div className="flex justify-center">
// //         <img
// //           src={`${chart.url}?${encodeURIComponent(selectedUser)}&v=${index}-${Date.now()}`}
// //           alt={chart.title}
// //           className="w-full h-[300px] object-contain rounded-lg bg-gray-800"
// //           onError={(e) => {
// //             console.error("Error loading image:", chart.url);
// //             e.target.src = "/placeholder.png";
// //           }}
// //         />
// //       </div>
// //     </div>
// //   ))}
// // </div>

// //       </div>

// //       {/* Back Button */}
// //       <div className="mt-10 flex justify-center">
// //         <button
// //           onClick={() => navigate(-1)}
// //           className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
// //         >
// //           ⬅ Back
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ChatAnalysis;


// import React, { useState, useEffect } from "react";

// const ChatAnalysis = () => {
//   const [stats, setStats] = useState(null);
//   const [selectedUser, setSelectedUser] = useState("Overall");
//   const [charts, setCharts] = useState([]);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:5000/chat-stats?t=${Date.now()}`
//         );
//         const data = await response.json();
//         setStats(data);
//       } catch (error) {
//         console.error("Error fetching stats:", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   useEffect(() => {
//     if (!selectedUser) return;

//     // Dynamically build chart URLs based on user selection
//     const userPath = selectedUser === "Overall" ? "" : `/${selectedUser}`;
//     const base = "http://127.0.0.1:5000";

//     const newCharts = [
//       {
//         title: "Active Hours",
//         url: `${base}/active-hours${userPath}`,
//       },
//       {
//         title: "Active Weekdays",
//         url: `${base}/active-weekdays${userPath}`,
//       },
//       {
//         title: "Busiest Day",
//         url: `${base}/busy-day${userPath}`,
//       },
//       {
//         title: "Active Months (Line)",
//         url: `${base}/active-month${userPath}`,
//       },
//       {
//         title: "Monthly Distribution (Pie)",
//         url: `${base}/active-month-pie${userPath}`,
//       },
//       {
//         title: "Monthly Activation",
//         url: `${base}/plot-monthly-activation${userPath}`,
//       },
//       {
//         title: "HeatMap",
//         url: `${base}/plot-heatmap${userPath}`,
//       },
//     ];

//     setCharts(newCharts);
//   }, [selectedUser]);

  
//   return (
//     <div className="p-8 min-h-screen w-[1000px] mx-auto overflow-y-auto text-white">
//       <h1 className="text-3xl font-bold mb-4">Chat Analysis Dashboard</h1>
//       <p className="text-gray-400 mb-6 flex gap-4">
//         Conversation between:{" "}
//         <div>
//           <select
//             name="user"
//             id="user-select"
//             className="px-3 py-1 bg-white text-gray-800 rounded-lg"
//             value={selectedUser}
//             onChange={(e) => setSelectedUser(e.target.value)}
//           >
//             <option value="Overall">Overall</option>
//             {stats?.per_user &&
//               Object.keys(stats.per_user).map((user, index) => (
//                 <option key={index} value={user}>
//                   {user}
//                 </option>
//               ))}
//           </select>
//         </div>
//       </p>

//       {/* Stats Section */}
//       <div className="bg-gray-700 p-5">
//       <div className="flex gap-20 mb-10 pl-16">
//         <div>
//           <div className="text-gray-200 font-semibold text-xl">
//             Total Messages
//           </div>
//           <div className="ml-16 text-lg">
//             {selectedUser === "Overall"
//               ? stats?.overall?.total_messages
//               : stats?.per_user?.[selectedUser]?.messages}
//           </div>
//         </div>

//         <div>
//           <div className="text-gray-200 font-semibold text-xl">
//             Text Messages
//           </div>
//           <div className="ml-16 text-lg">
//             {selectedUser === "Overall"
//               ? stats?.overall?.total_text_messages
//               : stats?.per_user?.[selectedUser]?.text_messages}
//           </div>
//         </div>

//         <div>
//           <div className="text-gray-200 font-semibold text-xl">
//             Media Shared
//           </div>
//           <div className="ml-16 text-lg">
//             {selectedUser === "Overall"
//               ? stats?.overall?.total_media_shared
//               : stats?.per_user?.[selectedUser]?.media_shared}
//           </div>
//         </div>

//         <div>
//           <div className="text-gray-200 font-semibold text-xl">Calls Done</div>
//           <div className="ml-16 text-lg">
//             {selectedUser === "Overall"
//               ? stats?.overall?.total_calls_done
//               : stats?.per_user?.[selectedUser]?.calls_done}
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
//         {charts.map((chart, index) => (
//           <div
//             key={index}
//             className="bg-gray-900 p-4 rounded-lg shadow-md border border-gray-700"
//           >
//             <h2 className="text-lg font-semibold mb-3 text-blue-400">
//               {chart.title}
//             </h2>
//             <div className="flex justify-center">
//               <img
//                 src={`${chart.url}?v=${index}-${Date.now()}`}
//                 alt={chart.title}
//                 className="w-full h-[300px] object-contain rounded-lg bg-gray-800"
//                 onError={(e) => {
//                   console.error("Error loading image:", chart.url);
//                   e.target.src = "/placeholder.png";
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//       </div>

//       <div className="mt-10 flex justify-center">
//          <button
//            onClick={() => navigate(-1)}
//            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
//          >
//            ⬅ Back
//          </button>
//       </div> 
//     </div>
//   );
// };

// export default ChatAnalysis;




import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ChatAnalysis = () => {
  const [stats, setStats] = useState(null);
  const [selectedUser, setSelectedUser] = useState("Overall");
  const [charts, setCharts] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const navigate = useNavigate();
  // 🟦 Fetch chat stats
  const fetchStats = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/chat-stats?t=${Date.now()}`
      );
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

// 🟨 Handle drag and drop upload
const handleDrop = useCallback(
  async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (file.type !== "text/plain") {
      setUploadStatus("❌ Please upload a valid .txt file.");
      return;
    }

    setUploadStatus("⏳ Uploading...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("http://127.0.0.1:5000/upload-chat", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("✅ Chat file uploaded successfully!");

        // Wait for the backend to finish processing
        setTimeout(async () => {
          await fetchStats(); // Refresh stats
          setSelectedUser("Overall"); // Reset to overall view
          setUploadStatus("📊 Analysis updated!");
        }, 1500);
      } else {
        setUploadStatus("⚠️ Upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("❌ Server error while uploading.");
    }
  },
  [fetchStats]
);


  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  // 🟩 Update chart URLs based on selected user
  useEffect(() => {
    if (!selectedUser) return;

    const userPath = selectedUser === "Overall" ? "" : `/${selectedUser}`;
    const base = "http://127.0.0.1:5000";

    const newCharts = [
      { title: "Active Hours", url: `${base}/active-hours${userPath}` },
      { title: "Active Weekdays", url: `${base}/active-weekdays${userPath}` },
      { title: "Busiest Day", url: `${base}/busy-day${userPath}` },
      { title: "Active Months (Line)", url: `${base}/active-month${userPath}` },
      {
        title: "Monthly Distribution (Pie)",
        url: `${base}/active-month-pie${userPath}`,
      },
      {
        title: "Monthly Activation",
        url: `${base}/plot-monthly-activation${userPath}`,
      },
      { title: "HeatMap", url: `${base}/plot-heatmap${userPath}` },
    ];

    setCharts(newCharts);
  }, [selectedUser]);

  return (
    <div className="p-8 min-h-screen w-[1000px] mx-auto overflow-y-auto text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Chat Analysis Dashboard</h1>

        {/* 🔹 Drag & Drop Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-60 h-16  border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? "border-blue-400 bg-blue-900/20"
              : "border-gray-400 bg-gray-800"
          }`}
        >
          <p className="text-gray-100 text-md text-center px-2 ">
            {isDragging ? "Drop .txt file here 📂" : "Drag .txt file to upload chat"}
          </p>
          <input
            type="file"
            accept=".txt"
            className="hidden"
            id="fileInput"
            onChange={(e) => {
              const fakeEvent = { dataTransfer: { files: e.target.files } };
              handleDrop(fakeEvent);
            }}
          />
          
        </div>
      </div>

      {/* Upload Status */}
      {uploadStatus && (
        <p className="text-gray-300 mb-6 text-sm italic">{uploadStatus}</p>
      )}

      {/* User Selector */}
      <p className="text-gray-400 mb-6 flex gap-4">
        Conversation between:{" "}
        <div>
          <select
            name="user"
            id="user-select"
            className="px-3 py-1 bg-white text-gray-800 rounded-lg"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="Overall">Overall</option>
            {stats?.per_user &&
              Object.keys(stats.per_user).map((user, index) => (
                <option key={index} value={user}>
                  {user}
                </option>
              ))}
          </select>
        </div>
      </p>

      {/* Stats Section */}
      <div className="bg-gray-700 p-5 rounded-lg">
        <div className="flex gap-20 mb-10 pl-16">
          <div>
            <div className="text-gray-200 font-semibold text-xl">
              Total Messages
            </div>
            <div className="ml-16 text-lg">
              {selectedUser === "Overall"
                ? stats?.overall?.total_messages
                : stats?.per_user?.[selectedUser]?.messages}
            </div>
          </div>

          <div>
            <div className="text-gray-200 font-semibold text-xl">
              Text Messages
            </div>
            <div className="ml-16 text-lg">
              {selectedUser === "Overall"
                ? stats?.overall?.total_text_messages
                : stats?.per_user?.[selectedUser]?.text_messages}
            </div>
          </div>

          <div>
            <div className="text-gray-200 font-semibold text-xl">
              Media Shared
            </div>
            <div className="ml-16 text-lg">
              {selectedUser === "Overall"
                ? stats?.overall?.total_media_shared
                : stats?.per_user?.[selectedUser]?.media_shared}
            </div>
          </div>

          <div>
            <div className="text-gray-200 font-semibold text-xl">Calls Done</div>
            <div className="ml-16 text-lg">
              {selectedUser === "Overall"
                ? stats?.overall?.total_calls_done
                : stats?.per_user?.[selectedUser]?.calls_done}
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {charts.map((chart, index) => (
            <div
              key={index}
              className="bg-gray-900 p-4 rounded-lg shadow-md border border-gray-700"
            >
              <h2 className="text-lg font-semibold mb-3 text-blue-400">
                {chart.title}
              </h2>
              <div className="flex justify-center">
                <img
                  src={`${chart.url}?v=${index}-${Date.now()}`}
                  alt={chart.title}
                  className="w-full h-[300px] object-contain rounded-lg bg-gray-800"
                  onError={(e) => {
                    console.error("Error loading image:", chart.url);
                    e.target.src = "/placeholder.png";
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            ⬅ Back
          </button>
       </div> 
      </div>
    </div>
  );
};

export default ChatAnalysis;
